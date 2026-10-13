package lab.order.g0;

public class InvalidOrderException extends RuntimeException {
  private final String type;

  public InvalidOrderException(String type) {
    this.type = type;
  }

  public String type() {
    return type;
  }
}
