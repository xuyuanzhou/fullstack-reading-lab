package lab.order.g0;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class OrderList {
  private final List<OrderRow> rows = new ArrayList<>();
  private long nextId = 1;

  public synchronized List<OrderRow> all() {
    return List.copyOf(rows);
  }

  public synchronized OrderRow add(String sku, BigDecimal amount) {
    if (sku == null || sku.isBlank()) throw new InvalidOrderException("invalid-sku");
    OrderRow row = new OrderRow(nextId++, sku, amount);
    rows.add(row);
    return row;
  }

  public synchronized void clear() {
    rows.clear();
    nextId = 1;
  }
}
