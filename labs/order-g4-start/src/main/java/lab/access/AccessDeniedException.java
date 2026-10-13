package lab.access;

public class AccessDeniedException extends RuntimeException {
  private final String type;
  private final int status;

  public AccessDeniedException(String type, int status) {
    this.type = type;
    this.status = status;
  }

  public String type() {
    return type;
  }

  public int status() {
    return status;
  }
}
