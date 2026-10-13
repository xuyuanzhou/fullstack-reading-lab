package lab.read;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicInteger;
import javax.sql.DataSource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DelegatingDataSource;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@Testcontainers
class ReadTest {
  @Container
  static final MySQLContainer<?> MYSQL = new MySQLContainer<>("mysql:8.4");

  @DynamicPropertySource
  static void datasource(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", MYSQL::getJdbcUrl);
    registry.add("spring.datasource.username", MYSQL::getUsername);
    registry.add("spring.datasource.password", MYSQL::getPassword);
  }

  @Autowired JdbcTemplate jdbc;
  @Autowired OrderReads reads;

  @BeforeEach
  void seed() {
    jdbc.update("DELETE FROM sale_order");
    jdbc.update("DELETE FROM product");
    jdbc.update("INSERT INTO product (id, name) VALUES (1, 'pen'), (2, 'book')");
    jdbc.update(
        """
        INSERT INTO sale_order (id, product_id, created_at, status) VALUES
        (1, 1, '2026-10-13 08:00:00.000', 'new'),
        (2, 2, '2026-10-13 08:00:00.000', 'new'),
        (3, 1, '2026-10-13 09:00:00.000', 'new'),
        (4, 2, '2026-10-13 10:00:00.000', 'new'),
        (5, 1, '2026-10-13 10:00:00.000', 'new')
        """);
  }

  @Test
  void keysetVisitsEachRowOnceAndEndsOnAnEmptyPage() {
    List<Long> seen = new ArrayList<>();
    List<SaleCursor> page = reads.firstPage(2);
    while (!page.isEmpty()) {
      page.forEach(row -> seen.add(row.id()));
      SaleCursor last = page.get(page.size() - 1);
      page = reads.nextPage(last.createdAt(), last.id(), 2);
    }
    assertEquals(List.of(5L, 4L, 3L, 2L, 1L), seen);
    assertTrue(reads.nextPage(Timestamp.valueOf("2026-10-13 08:00:00"), 1L, 2).isEmpty());
  }

  @Test
  void createdAtOnlySkipsTheTiedRow() {
    SaleCursor first = reads.firstPage(1).get(0);
    assertEquals(5L, first.id());
    assertEquals(List.of(3L), new NaiveCreatedAtPage(jdbc).next(first.createdAt()));
    assertEquals(4L, reads.nextPage(first.createdAt(), first.id(), 1).get(0).id());
  }

  @Test
  void joinUsesFewerStatementsThanPerOrderLookup() {
    CountingDataSource counting = new CountingDataSource(jdbc.getDataSource());
    OrderReads counted = new OrderReads(new JdbcTemplate(counting));
    counting.statements.set(0);
    List<String> lookedUp = counted.namesByLookup();
    int lookupStatements = counting.statements.get();
    counting.statements.set(0);
    List<String> joined = counted.namesByJoin();
    int joinStatements = counting.statements.get();
    assertEquals(List.of("pen", "book", "pen", "book", "pen"), lookedUp);
    assertEquals(lookedUp, joined);
    assertEquals(5, lookupStatements - joinStatements);
  }

  @Test
  void keysetPlanUsesTheCreatedAtIndex() {
    assertEquals("idx_sale_created_id", reads.explainKey());
  }

  @Test
  void staleRefillKeepsThePreWriteStatus() throws Exception {
    CountDownLatch loaded = new CountDownLatch(1);
    CountDownLatch wrote = new CountDownLatch(1);
    DetailCache cache = new DetailCache() {
      @Override
      protected void beforePut() {
        loaded.countDown();
        try {
          wrote.await();
        } catch (InterruptedException ex) {
          Thread.currentThread().interrupt();
        }
      }
    };
    try (ExecutorService pool = Executors.newSingleThreadExecutor()) {
      Future<String> read = pool.submit(() -> cache.read(5, () ->
          jdbc.queryForObject("SELECT status FROM sale_order WHERE id = 5", String.class)));
      loaded.await();
      jdbc.update("UPDATE sale_order SET status = 'paid' WHERE id = 5");
      cache.delete(5);
      wrote.countDown();
      assertEquals("new", read.get());
    }
    assertEquals("paid", jdbc.queryForObject("SELECT status FROM sale_order WHERE id = 5", String.class));
    assertEquals("new", cache.get(5));
    assertNull(cache.get(4));
  }

  private static final class CountingDataSource extends DelegatingDataSource {
    final AtomicInteger statements = new AtomicInteger();

    CountingDataSource(DataSource target) {
      super(target);
    }

    @Override
    public java.sql.Connection getConnection() throws java.sql.SQLException {
      java.sql.Connection raw = obtainTargetDataSource().getConnection();
      return (java.sql.Connection) java.lang.reflect.Proxy.newProxyInstance(
          java.sql.Connection.class.getClassLoader(),
          new Class<?>[] {java.sql.Connection.class},
          (proxy, method, args) -> {
            if ("prepareStatement".equals(method.getName()) || "createStatement".equals(method.getName())) {
              statements.incrementAndGet();
            }
            try {
              return method.invoke(raw, args);
            } catch (java.lang.reflect.InvocationTargetException ex) {
              throw ex.getCause();
            }
          });
    }
  }
}
