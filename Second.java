import java.util.stream.IntStream;

public class Second {
    public static void main(String[] args) {
        IntStream.rangeClosed(1,5).map(n -> 6-n).forEachOrdered(n -> {
            System.out.println(n);
        });
    }
}
