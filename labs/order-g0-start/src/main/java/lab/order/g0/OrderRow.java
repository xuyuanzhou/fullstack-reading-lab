package lab.order.g0;

import java.math.BigDecimal;

public record OrderRow(long id, String sku, BigDecimal amount) {}
