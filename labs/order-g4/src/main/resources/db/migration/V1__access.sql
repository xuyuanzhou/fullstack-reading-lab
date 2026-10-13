CREATE TABLE account (
  id BIGINT PRIMARY KEY,
  tenant_id BIGINT NOT NULL,
  role_name VARCHAR(16) NOT NULL,
  revoked BOOLEAN NOT NULL
);

CREATE TABLE sale_order (
  id BIGINT PRIMARY KEY,
  tenant_id BIGINT NOT NULL,
  owner_id BIGINT NOT NULL,
  sku VARCHAR(64) NOT NULL
);
