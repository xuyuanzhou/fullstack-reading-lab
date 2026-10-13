package lab.access;

import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
  private final OrderAccess access;

  public OrderController(OrderAccess access) {
    this.access = access;
  }

  @GetMapping("/orders/{id}")
  public ResponseEntity<?> read(
      @PathVariable long id,
      @RequestHeader(value = "Account-Id", required = false) Long accountId) {
    try {
      return ResponseEntity.ok(access.read(id, accountId));
    } catch (AccessDeniedException ex) {
      return ResponseEntity.status(ex.status()).body(Map.of("type", ex.type()));
    }
  }

  @GetMapping("/orders")
  public ResponseEntity<?> find(
      @RequestParam("sku") String sku,
      @RequestHeader(value = "Account-Id", required = false) Long accountId) {
    try {
      List<OrderView> rows = access.findBySku(accountId, sku);
      return ResponseEntity.ok(rows);
    } catch (AccessDeniedException ex) {
      return ResponseEntity.status(ex.status()).body(Map.of("type", ex.type()));
    }
  }
}
