import java.util.Scanner;

public class Fifth {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            System.out.print("Введіть перше число: ");
            int num1 = scanner.nextInt();
            
            System.out.print("Введіть друге число: ");
            int num2 = scanner.nextInt();

            int result = num1 * num2;
            System.out.println("Результат множення: " + result);

            System.out.print("Введіть 1 для завершення або будь-яке інше число для повторення: ");
            choice = scanner.nextInt();

        } while (choice != 1);

        System.out.println("Програма завершена.");
        scanner.close();
    }
}
