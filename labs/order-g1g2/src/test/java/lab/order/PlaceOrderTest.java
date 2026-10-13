package lab.order;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class PlaceOrderTest {
  @Container
  static final MySQLContainer<?> MYSQL = new MySQLContainer<>("mysql:8.4");

  @DynamicPropertySource
  static void datasource(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", MYSQL::getJdbcUrl);
    registry.add("spring.datasource.username", MYSQL::getUsername);
    registry.add("spring.datasource.password", MYSQL::getPassword);
  }

  @Autowired JdbcTemplate jdbc;
  @Autowired OrderStore store;
  @Autowired PlaceOrderService orders;
  @Autowired MockMvc mvc;

  @BeforeEach
  void seed() {
    jdbc.update("DELETE FROM orders");
    jdbc.update("DELETE FROM stock");
    jdbc.update("INSERT INTO stock (sku, quantity, version) VALUES ('pen', 1, 0)");
  }

  @Test
  void listIsEmptyThenShowsTheCreatedOrder() throws Exception {
    mvc.perform(get("/orders"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(0));
    mvc.perform(post("/orders").header("Idempotency-Key", "list-1").contentType(MediaType.APPLICATION_JSON).content("{\"sku\":\"pen\"}"))
        .andExpect(status().isCreated());
    mvc.perform(get("/orders"))
        .andExpect(jsonPath("$.length()").value(1))
        .andExpect(jsonPath("$[0].sku").value("pen"))
        .andExpect(jsonPath("$[0].orderId").isNumber());
  }

  @Test
  void firstPostCreatesAndReplayReturnsTheSameOrder() throws Exception {
    mvc.perform(post("/orders").header("Idempotency-Key", "k1").contentType(MediaType.APPLICATION_JSON).content("{\"sku\":\"pen\"}"))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.replay").value(false));
    mvc.perform(post("/orders").header("Idempotency-Key", "k1").contentType(MediaType.APPLICATION_JSON).content("{\"sku\":\"pen\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.replay").value(true));
    assertEquals(0, stockOnFreshConnection());
    assertEquals(1, orderCountOnFreshConnection());
  }

  @Test
  void sameKeyWithAnotherSkuConflictsAndDoesNotChangeStock() throws Exception {
    orders.place("k1", "pen");
    mvc.perform(post("/orders").header("Idempotency-Key", "k1").contentType(MediaType.APPLICATION_JSON).content("{\"sku\":\"book\"}"))
        .andExpect(status().isConflict())
        .andExpect(jsonPath("$.type").value("idempotency-conflict"));
    assertEquals(0, stockOnFreshConnection());
    assertEquals(1, orderCountOnFreshConnection());
  }

  @Test
  void twentyBuyersLeaveOneOrderAndZeroStock() throws Exception {
    List<Future<PlaceResult>> results = race(20, index -> orders.place("buyer-" + index, "pen"));
    long created = results.stream().filter(future -> {
      try {
        return !future.get().replay();
      } catch (Exception ex) {
        return false;
      }
    }).count();
    assertEquals(1, created);
    assertEquals(0, stockOnFreshConnection());
    assertEquals(1, orderCountOnFreshConnection());
  }

  @Test
  void twentyRetriesOfOneKeyLeaveOneOrder() throws Exception {
    List<Future<PlaceResult>> results = race(20, index -> orders.place("same-key", "pen"));
    long id = results.get(0).get().orderId();
    for (Future<PlaceResult> result : results) assertEquals(id, result.get().orderId());
    assertEquals(0, stockOnFreshConnection());
    assertEquals(1, orderCountOnFreshConnection());
  }

  @Test
  void staleVersionUpdatesNoRow() {
    assertStaleVersionUpdatesNoRow(() -> store.decrementIfVersion("pen", 999));
    assertEquals(1, jdbc.queryForObject("SELECT quantity FROM stock WHERE sku = 'pen'", Integer.class));
  }

  @Test
  void naiveWriteFailsTheStaleVersionContract() {
    NaiveStockWrite naive = new NaiveStockWrite(jdbc);
    assertThrows(AssertionError.class, () -> assertStaleVersionUpdatesNoRow(() -> naive.assignIgnoringVersion("pen", 0)));
    assertEquals(0, jdbc.queryForObject("SELECT quantity FROM stock WHERE sku = 'pen'", Integer.class));
  }

  private static void assertStaleVersionUpdatesNoRow(Update update) {
    int rows = update.run();
    if (rows != 0) throw new AssertionError("过期版本改动了行");
  }

  private List<Future<PlaceResult>> race(int threads, Attempt attempt) throws Exception {
    CyclicBarrier start = new CyclicBarrier(threads);
    try (var pool = Executors.newFixedThreadPool(threads)) {
      List<Future<PlaceResult>> results = new ArrayList<>();
      for (int index = 0; index < threads; index++) {
        int current = index;
        results.add(pool.submit(() -> {
          start.await();
          return attempt.place(current);
        }));
      }
      return results;
    }
  }

  private int stockOnFreshConnection() throws Exception {
    try (var connection = DriverManager.getConnection(MYSQL.getJdbcUrl(), MYSQL.getUsername(), MYSQL.getPassword());
         var statement = connection.createStatement();
         var rows = statement.executeQuery("SELECT quantity FROM stock WHERE sku = 'pen'")) {
      rows.next();
      return rows.getInt(1);
    }
  }

  private int orderCountOnFreshConnection() throws Exception {
    try (var connection = DriverManager.getConnection(MYSQL.getJdbcUrl(), MYSQL.getUsername(), MYSQL.getPassword());
         var statement = connection.createStatement();
         var rows = statement.executeQuery("SELECT COUNT(*) FROM orders")) {
      rows.next();
      return rows.getInt(1);
    }
  }

  @FunctionalInterface
  interface Update {
    int run();
  }

  @FunctionalInterface
  interface Attempt {
    PlaceResult place(int index) throws Exception;
  }
}
