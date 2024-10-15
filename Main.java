import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Hotel hotel = new Hotel();
        Scanner scanner = new Scanner(System.in);
        boolean running = true;

        while (running) {
            System.out.println("1. Add Room");
            System.out.println("2. Add Booking");
            System.out.println("3. Remove Booking");
            System.out.println("4. List Rooms");
            System.out.println("5. List Bookings");
            System.out.println("6. Exit");
            System.out.print("Choose an option: ");
            int choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    System.out.print("Enter room number: ");
                    int roomNumber = scanner.nextInt();
                    scanner.nextLine();
                    System.out.print("Enter room type: ");
                    String type = scanner.nextLine();
                    System.out.print("Enter room price: ");
                    double price = scanner.nextDouble();
                    scanner.nextLine();
                    hotel.addRoom(new Room(roomNumber, type, price));
                    System.out.println("Room added successfully.");
                    break;
                case 2:
                    System.out.print("Enter guest name: ");
                    String name = scanner.nextLine();
                    System.out.print("Enter guest email: ");
                    String email = scanner.nextLine();
                    Guest guest = new Guest(name, email);

                    System.out.print("Enter room number: ");
                    roomNumber = scanner.nextInt();
                    scanner.nextLine();
                    Room room = null;
                    for (Room r : hotel.getAvailableRooms(LocalDate.now(), LocalDate.now().plusDays(1))) {
                        if (r.getRoomNumber() == roomNumber) {
                            room = r;
                            break;
                        }
                    }
                    if (room == null) {
                        System.out.println("Room not available.");
                        break;
                    }

                    try {
                        System.out.print("Enter check-in date (YYYY-MM-DD): ");
                        LocalDate checkIn = LocalDate.parse(scanner.nextLine());

                        System.out.print("Enter check-out date (YYYY-MM-DD): ");
                        LocalDate checkOut = LocalDate.parse(scanner.nextLine());

                        if (checkIn.isAfter(checkOut)) {
                            System.out.println("Check-in date cannot be after check-out date.");
                            break;
                        }

                        hotel.addBooking(new Booking(room, guest, checkIn, checkOut));
                        System.out.println("Booking added successfully.");
                    } catch (DateTimeParseException e) {
                        System.out.println("Invalid date format. Please try again.");
                    }
                    break;
                case 3:
                    System.out.print("Enter guest email to remove booking: ");
                    email = scanner.nextLine();
                    Booking bookingToRemove = null;
                    for (Booking booking : hotel.getBookings()) {
                        if (booking.getGuest().getEmail().equals(email)) {
                            bookingToRemove = booking;
                            break;
                        }
                    }
                    if (bookingToRemove != null) {
                        hotel.removeBooking(bookingToRemove);
                        System.out.println("Booking removed successfully.");
                    } else {
                        System.out.println("Booking not found.");
                    }
                    break;
                case 4:
                    hotel.listRooms();
                    break;
                case 5:
                    hotel.listBookings();
                    break;
                case 6:
                    running = false;
                    System.out.println("Exiting...");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }

        scanner.close();
    }
}