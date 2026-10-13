package lab.order;

import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class OrderStore {
  private final JdbcTemplate jdbc;

  public OrderStore(JdbcTemplate jdbc) {
    this.jdbc = jdbc;
  }

  public List<ListedOrder> list() {
    return jdbc.query(
        "SELECT id, sku FROM orders ORDER BY id",
        (rs, row) -> new ListedOrder(rs.getLong("id"), rs.getString("sku")));
  }

  public OrderRow find(String idempotencyKey) {
    return jdbc.query(
        "SELECT id, request_hash FROM orders WHERE idempotency_key = ?",
        rs -> rs.next() ? new OrderRow(rs.getLong("id"), rs.getString("request_hash")) : null,
        idempotencyKey);
  }

  public int decrementIfVersion(String sku, int version) {
    return jdbc.update("UPDATE stock SET quantity = quantity - 1 WHERE sku = ?", sku);
  }

  @Transactional
  public PlaceResult insertNew(String idempotencyKey, String requestHash, String sku) {
    decrementIfVersion(sku, 0);
    jdbc.update(
        "INSERT INTO orders (idempotency_key, request_hash, sku) VALUES (?, ?, ?)",
        idempotencyKey, requestHash, sku);
    OrderRow saved = find(idempotencyKey);
    return new PlaceResult(saved.id(), false);
  }
}
