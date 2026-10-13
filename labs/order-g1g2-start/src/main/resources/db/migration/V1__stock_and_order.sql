CREATE TABLE stock (
  sku VARCHAR(64) NOT NULL PRIMARY KEY,
  quantity INT NOT NULL,
  version INT NOT NULL
);

CREATE TABLE orders (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  idempotency_key VARCHAR(64) NOT NULL,
  request_hash CHAR(64) NOT NULL,
  sku VARCHAR(64) NOT NULL,
  UNIQUE KEY uk_orders_idempotency (idempotency_key)
);
