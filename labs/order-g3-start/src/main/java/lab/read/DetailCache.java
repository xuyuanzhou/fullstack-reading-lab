package lab.read;

import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Supplier;

/** 未命中时读库并返回。读到的状态还没有放进缓存。 */
public class DetailCache {
  private final ConcurrentHashMap<Long, String> values = new ConcurrentHashMap<>();

  public String read(long id, Supplier<String> load) {
    String hit = values.get(id);
    if (hit != null) return hit;
    String loaded = load.get();
    beforePut();
    return loaded;
  }

  public void delete(long id) {
    values.remove(id);
  }

  public String get(long id) {
    return values.get(id);
  }

  /** 测试在读取之后、放入之前停下。正式调用里这里是空的，窗口仍然存在。 */
  protected void beforePut() {}
}
