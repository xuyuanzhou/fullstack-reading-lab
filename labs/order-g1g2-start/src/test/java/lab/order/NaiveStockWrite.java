package lab.order;

import org.springframework.jdbc.core.JdbcTemplate;

/** 先读再把算好的数量写回去，不带版本条件。用来对照正确的条件更新。 */
public class NaiveStockWrite {
  private final JdbcTemplate jdbc;

  public NaiveStockWrite(JdbcTemplate jdbc) {
    this.jdbc = jdbc;
  }

  public int assignIgnoringVersion(String sku, int newQuantity) {
    return jdbc.update("UPDATE stock SET quantity = ? WHERE sku = ?", newQuantity, sku);
  }
}
