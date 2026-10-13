package lab.order;

import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
  private final PlaceOrderService orders;

  public OrderController(PlaceOrderService orders) {
    this.orders = orders;
  }

  @GetMapping("/orders")
  public List<ListedOrder> list() {
    return orders.list();
  }

  @PostMapping("/orders")
  public ResponseEntity<Map<String, Object>> create(
      @RequestHeader("Idempotency-Key") String idempotencyKey,
      @RequestBody Map<String, String> body) {
    try {
      PlaceResult result = orders.place(idempotencyKey, body.get("sku"));
      return ResponseEntity.status(result.replay() ? 200 : 201).body(Map.of(
          "orderId", result.orderId(),
          "replay", result.replay()));
    } catch (IdempotencyConflictException ex) {
      return ResponseEntity.status(409).body(Map.of("type", "idempotency-conflict"));
    } catch (SoldOutException ex) {
      return ResponseEntity.status(409).body(Map.of("type", "sold-out"));
    }
  }
}
