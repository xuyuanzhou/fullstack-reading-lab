package lab.order;

import java.util.List;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.springframework.dao.DataIntegrityViolationException;
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
    String hash = sha256(sku);
    OrderRow existing = store.find(idempotencyKey);
    if (existing != null) return match(existing, hash);
    try {
      return store.insertNew(idempotencyKey, hash, sku);
    } catch (DataIntegrityViolationException ex) {
      return match(store.find(idempotencyKey), hash);
    } catch (SoldOutException ex) {
      OrderRow winner = store.find(idempotencyKey);
      if (winner != null) return match(winner, hash);
      throw ex;
    }
  }

  private static PlaceResult match(OrderRow row, String hash) {
    if (row == null || !row.requestHash().equals(hash)) throw new IdempotencyConflictException();
    return new PlaceResult(row.id(), true);
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
