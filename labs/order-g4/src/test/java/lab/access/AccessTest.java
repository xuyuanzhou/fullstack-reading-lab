package lab.access;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class AccessTest {
  @Container
  static final MySQLContainer<?> MYSQL = new MySQLContainer<>("mysql:8.4");

  @DynamicPropertySource
  static void datasource(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", MYSQL::getJdbcUrl);
    registry.add("spring.datasource.username", MYSQL::getUsername);
    registry.add("spring.datasource.password", MYSQL::getPassword);
  }

  @Autowired MockMvc mvc;
  @Autowired JdbcTemplate jdbc;

  @BeforeEach
  void seed() {
    jdbc.update("DELETE FROM sale_order");
    jdbc.update("DELETE FROM account");
    jdbc.update(
        """
        INSERT INTO account (id, tenant_id, role_name, revoked) VALUES
        (10, 1, 'owner', false),
        (11, 1, 'clerk', false),
        (12, 1, 'owner', true),
        (20, 2, 'owner', false)
        """);
    jdbc.update(
        """
        INSERT INTO sale_order (id, tenant_id, owner_id, sku) VALUES
        (1, 1, 10, 'pen'),
        (2, 2, 20, 'book'),
        (3, 1, 12, 'tape')
        """);
  }

  @Test
  void ownerReadsOwnOrder() throws Exception {
    mvc.perform(get("/orders/1").header("Account-Id", 10))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.sku").value("pen"));
  }

  @Test
  void missingAccountIsAnonymous() throws Exception {
    mvc.perform(get("/orders/1"))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.type").value("anonymous"));
  }

  @Test
  void clerkDoesNotReadAnotherUsersOrder() throws Exception {
    mvc.perform(get("/orders/1").header("Account-Id", 11))
        .andExpect(status().isForbidden())
        .andExpect(jsonPath("$.type").value("not-owner"));
  }

  @Test
  void ownerRoleDoesNotBypassTheRowOwner() throws Exception {
    mvc.perform(get("/orders/3").header("Account-Id", 10))
        .andExpect(status().isForbidden())
        .andExpect(jsonPath("$.type").value("not-owner"));
  }

  @Test
  void otherTenantIsCrossTenant() throws Exception {
    mvc.perform(get("/orders/1").header("Account-Id", 20))
        .andExpect(status().isForbidden())
        .andExpect(jsonPath("$.type").value("cross-tenant"));
  }

  @Test
  void revokedOwnerCannotReadOwnOrder() throws Exception {
    mvc.perform(get("/orders/3").header("Account-Id", 12))
        .andExpect(status().isForbidden())
        .andExpect(jsonPath("$.type").value("revoked"));
  }

  @Test
  void quotedSkuDoesNotReturnOtherOrders() throws Exception {
    mvc.perform(get("/orders").header("Account-Id", 10).param("sku", "pen' OR '1'='1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(0));
    mvc.perform(get("/orders").header("Account-Id", 10).param("sku", "pen"))
        .andExpect(jsonPath("$.length()").value(1))
        .andExpect(jsonPath("$[0].sku").value("pen"));
  }
}
