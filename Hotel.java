import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Hotel {
    private List<Room> rooms;
    private List<Booking> bookings;
    public Hotel() {
        rooms = new ArrayList<>();
        bookings = new ArrayList<>();
    }

    public void addRoom(Room room) {
        rooms.add(room);
    }

    public void addBooking(Booking booking) {
        bookings.add(booking);
    }

    public void removeBooking(Booking booking) {
        bookings.remove(booking);
    }
    
    public List<Booking> getBookings() {
        return bookings;
    }

    public List<Room> getAvailableRooms(LocalDate checkIn, LocalDate checkOut) {
        List<Room> availableRooms = new ArrayList<>(rooms);
        for (Booking booking : bookings) {
            if (booking.getCheckIn().isBefore(checkOut) && booking.getCheckOut().isAfter(checkIn)) {
                availableRooms.remove(booking.getRoom());
            }
        }
        return availableRooms;
    }

    public void listRooms() {
        for (Room room : rooms) {
            System.out.println(room);
        }
    }

    public void listBookings() {
        for (Booking booking : bookings) {
            System.out.println(booking);
        }
    }
}