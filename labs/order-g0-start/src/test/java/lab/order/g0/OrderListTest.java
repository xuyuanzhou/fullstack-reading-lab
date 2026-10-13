package lab.order.g0;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class OrderListTest {
  @Autowired MockMvc mvc;
  @Autowired OrderList orders;

  @BeforeEach
  void empty() {
    orders.clear();
  }

  @Test
  void emptyListBeforeAnyOrder() throws Exception {
    mvc.perform(get("/orders"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(0));
  }

  @Test
  void threeSyntheticOrdersStayInSubmitOrder() throws Exception {
    create("{\"sku\":\"pen\",\"amount\":\"1.50\"}");
    create("{\"sku\":\"book\",\"amount\":\"12.00\"}");
    create("{\"sku\":\"cup\",\"amount\":\"3.25\"}");
    mvc.perform(get("/orders"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(3))
        .andExpect(jsonPath("$[0].sku").value("pen"))
        .andExpect(jsonPath("$[0].amount").value(1.50))
        .andExpect(jsonPath("$[1].sku").value("book"))
        .andExpect(jsonPath("$[2].sku").value("cup"));
  }

  @Test
  void negativeAmountIsRejectedAndListStaysEmpty() throws Exception {
    mvc.perform(post("/orders").contentType(MediaType.APPLICATION_JSON).content("{\"sku\":\"pen\",\"amount\":-1}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.type").value("invalid-amount"));
    mvc.perform(get("/orders")).andExpect(jsonPath("$.length()").value(0));
  }

  @Test
  void tooManyFractionDigitsAreRejected() throws Exception {
    mvc.perform(post("/orders").contentType(MediaType.APPLICATION_JSON).content("{\"sku\":\"pen\",\"amount\":\"1.234\"}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.type").value("invalid-amount"));
    mvc.perform(get("/orders")).andExpect(jsonPath("$.length()").value(0));
  }

  private void create(String json) throws Exception {
    mvc.perform(post("/orders").contentType(MediaType.APPLICATION_JSON).content(json))
        .andExpect(status().isCreated());
  }
}
