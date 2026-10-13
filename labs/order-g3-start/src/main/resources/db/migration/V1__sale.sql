CREATE TABLE product (
  id BIGINT PRIMARY KEY,
  name VARCHAR(64) NOT NULL
);

CREATE TABLE sale_order (
  id BIGINT PRIMARY KEY,
  product_id BIGINT NOT NULL,
  created_at DATETIME(3) NOT NULL,
  status VARCHAR(16) NOT NULL,
  INDEX idx_sale_created_id (created_at, id)
);
