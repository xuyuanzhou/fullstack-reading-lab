package lab.read;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class OrderReads {
  private final JdbcTemplate jdbc;

  public OrderReads(JdbcTemplate jdbc) {
    this.jdbc = jdbc;
  }

  public List<SaleCursor> firstPage(int limit) {
    return jdbc.query(
        "SELECT id, created_at FROM sale_order ORDER BY created_at DESC, id DESC LIMIT " + bounded(limit),
        (rs, row) -> new SaleCursor(rs.getLong("id"), rs.getTimestamp("created_at")));
  }

  public List<SaleCursor> nextPage(Timestamp createdAt, long id, int limit) {
    return jdbc.query(
        """
        SELECT id, created_at FROM sale_order
        WHERE created_at < ?
        ORDER BY created_at DESC, id DESC
        LIMIT %d
        """.formatted(bounded(limit)),
        (rs, row) -> new SaleCursor(rs.getLong("id"), rs.getTimestamp("created_at")),
        createdAt);
  }

  public List<String> namesByLookup() {
    List<Long> productIds = jdbc.query(
        "SELECT product_id FROM sale_order ORDER BY id",
        (rs, row) -> rs.getLong("product_id"));
    List<String> names = new ArrayList<>();
    for (Long productId : productIds) {
      names.add(jdbc.queryForObject("SELECT name FROM product WHERE id = ?", String.class, productId));
    }
    return names;
  }

  public List<String> namesByJoin() {
    return namesByLookup();
  }

  public String explainKey() {
    return jdbc.queryForObject(
        """
        EXPLAIN SELECT id FROM sale_order
        WHERE id < ?
        ORDER BY id DESC
        LIMIT 2
        """,
        (rs, row) -> rs.getString("key"),
        5L);
  }

  private static int bounded(int limit) {
    if (limit < 1 || limit > 100) throw new IllegalArgumentException("limit");
    return limit;
  }
}
