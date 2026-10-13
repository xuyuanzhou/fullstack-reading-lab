package lab.order;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PlaceOrderService {
  private final OrderStore store;

  public PlaceOrderService(OrderStore store) {
    this.store = store;
  }

  public List<ListedOrder> list() {
    return store.list();
  }

  public PlaceResult place(String idempotencyKey, String sku) {
    return store.insertNew(idempotencyKey, sha256(sku), sku);
  }

  static String sha256(String sku) {
    try {
      byte[] digest = MessageDigest.getInstance("SHA-256").digest(sku.getBytes(StandardCharsets.UTF_8));
      StringBuilder hex = new StringBuilder(digest.length * 2);
      for (byte value : digest) hex.append(String.format("%02x", value));
      return hex.toString();
    } catch (NoSuchAlgorithmException ex) {
      throw new IllegalStateException(ex);
    }
  }
}
