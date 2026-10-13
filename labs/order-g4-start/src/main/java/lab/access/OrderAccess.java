package lab.access;

import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderAccess {
  private final JdbcTemplate jdbc;

  public OrderAccess(JdbcTemplate jdbc) {
    this.jdbc = jdbc;
  }

  public OrderView read(long orderId, Long accountId) {
    Account account = active(accountId);
    OrderRow order = jdbc.query(
        "SELECT id, tenant_id, owner_id, sku FROM sale_order WHERE id = ?",
        rs -> rs.next() ? new OrderRow(rs.getLong("id"), rs.getLong("tenant_id"), rs.getLong("owner_id"), rs.getString("sku")) : null,
        orderId);
    if (order == null) throw new AccessDeniedException("not-found", 404);
    if (order.tenantId() != account.tenantId()) throw new AccessDeniedException("cross-tenant", 403);
    return new OrderView(order.id(), order.sku());
  }

  public List<OrderView> findBySku(Long accountId, String sku) {
    active(accountId);
    return jdbc.query(
        "SELECT id, sku FROM sale_order WHERE sku = '" + sku + "'",
        (rs, row) -> new OrderView(rs.getLong("id"), rs.getString("sku")));
  }

  private Account active(Long accountId) {
    if (accountId == null) throw new AccessDeniedException("anonymous", 401);
    Account account = jdbc.query(
        "SELECT id, tenant_id, role_name, revoked FROM account WHERE id = ?",
        rs -> rs.next() ? new Account(rs.getLong("id"), rs.getLong("tenant_id"), rs.getString("role_name"), rs.getBoolean("revoked")) : null,
        accountId);
    if (account == null) throw new AccessDeniedException("anonymous", 401);
    return account;
  }

  private record Account(long id, long tenantId, String roleName, boolean revoked) {}

  private record OrderRow(long id, long tenantId, long ownerId, String sku) {}
}
