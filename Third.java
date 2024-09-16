import java.util.stream.IntStream;

public class Third {
    public static void main(String[] args) {
        IntStream.range(1,10).forEach(n -> {
            IntStream.range(1,10).forEach(p -> {
                System.out.print(p + " * " + n + " = " + n*p + "\t");
            });
            System.out.println();
        });
    }
}
