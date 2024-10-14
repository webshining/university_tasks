import java.util.Scanner;

class A {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int counter = 1;
        boolean pin_code_coincided = false;

        while (counter <= 5) {
            String correct = sc.nextLine();
            String vasya = sc.nextLine();
            
            if (correct.equals(vasya)) {
                System.out.println("CORRECT");
                pin_code_coincided = true;
                break;
            } else {
                System.out.println("INCORRECT " + counter);
                counter++;
            }
        }

        if (!pin_code_coincided) {
            System.out.println("Error");
        }
    }
}
