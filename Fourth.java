import java.util.Scanner;
import java.util.stream.IntStream;

public class Fourth {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Введите число: ");
        int n = scanner.nextInt();

        int result = IntStream.range(1,n+1).sum();
        System.out.println(result);
    }
}
