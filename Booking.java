import java.time.LocalDate;

public class Booking {
    private Room room;
    private Guest guest;
    private LocalDate checkIn;
    private LocalDate checkOut;

    public Booking(Room room, Guest guest, LocalDate checkIn, LocalDate checkOut) {
        this.room = room;
        this.guest = guest;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
    }

    public Room getRoom() {
        return room;
    }

    public Guest getGuest() {
        return guest;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "room=" + room +
                ", guest=" + guest +
                ", checkIn=" + checkIn +
                ", checkOut=" + checkOut +
                '}';
    }
}

