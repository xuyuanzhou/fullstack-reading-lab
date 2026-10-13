package lab.order.g0;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
  private final OrderList orders;

  public OrderController(OrderList orders) {
    this.orders = orders;
  }

  @GetMapping("/orders")
  public List<OrderRow> list() {
    return orders.all();
  }

  @PostMapping("/orders")
  public ResponseEntity<?> create(@RequestBody OrderRequest body) {
    try {
      return ResponseEntity.status(201).body(orders.add(body.sku(), body.amount()));
    } catch (InvalidOrderException ex) {
      return ResponseEntity.badRequest().body(Map.of("type", ex.type()));
    }
  }

  public record OrderRequest(String sku, BigDecimal amount) {}
}
