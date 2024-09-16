import java.util.stream.IntStream;

public class First {
    public static void main(String[] args) {
        IntStream.range(1,6).forEachOrdered(n -> {
            System.out.println(n);
        });
    }
}
