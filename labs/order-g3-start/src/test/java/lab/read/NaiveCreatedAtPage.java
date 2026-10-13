package lab.read;

import java.sql.Timestamp;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;

/** 只比较创建时间。同一时间的另一行会被跳过。 */
public class NaiveCreatedAtPage {
  private final JdbcTemplate jdbc;

  public NaiveCreatedAtPage(JdbcTemplate jdbc) {
    this.jdbc = jdbc;
  }

  public List<Long> next(Timestamp createdAt) {
    return jdbc.query(
        """
        SELECT id FROM sale_order
        WHERE created_at < ?
        ORDER BY created_at DESC, id DESC
        LIMIT 1
        """,
        (rs, row) -> rs.getLong("id"),
        createdAt);
  }
}
