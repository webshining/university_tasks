import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class Bus {
    private String driverName;
    private int busNumber;
    private int routeNumber;
    private String brand;
    private int yearOfStart;
    private int mileage;

    public Bus(String driverName, int busNumber, int routeNumber, String brand, int yearOfStart, int mileage) {
        setDriverName(driverName);
        setBusNumber(busNumber);
        setRouteNumber(routeNumber);
        setBrand(brand);
        setYearOfStart(yearOfStart);
        setMileage(mileage);
    }

    // Геттери і Сеттери
    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        if (driverName == null || driverName.isEmpty()) {
            throw new IllegalArgumentException("Ім'я водія не може бути порожнім.");
        }
        this.driverName = driverName;
    }

    public int getBusNumber() {
        return busNumber;
    }

    public void setBusNumber(int busNumber) {
        if (busNumber <= 0) {
            throw new IllegalArgumentException("Номер автобуса повинен бути додатним.");
        }
        this.busNumber = busNumber;
    }

    public int getRouteNumber() {
        return routeNumber;
    }

    public void setRouteNumber(int routeNumber) {
        if (routeNumber <= 0) {
            throw new IllegalArgumentException("Номер маршруту повинен бути додатним.");
        }
        this.routeNumber = routeNumber;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        if (brand == null || brand.isEmpty()) {
            throw new IllegalArgumentException("Марка автобуса не може бути порожньою.");
        }
        this.brand = brand;
    }

    public int getYearOfStart() {
        return yearOfStart;
    }

    public void setYearOfStart(int yearOfStart) {
        if (yearOfStart < 1900 || yearOfStart > 2024) {
            throw new IllegalArgumentException("Некоректний рік початку експлуатації.");
        }
        this.yearOfStart = yearOfStart;
    }

    public int getMileage() {
        return mileage;
    }

    public void setMileage(int mileage) {
        if (mileage < 0) {
            throw new IllegalArgumentException("Пробіг не може бути від'ємним.");
        }
        this.mileage = mileage;
    }

    @Override
    public String toString() {
        return "Водій: " + driverName + ", Номер автобуса: " + busNumber + 
               ", Номер маршруту: " + routeNumber + ", Марка: " + brand + 
               ", Рік початку експлуатації: " + yearOfStart + ", Пробіг: " + mileage + " км.";
    }

    public static Bus[] createBusArray(int n) {
        Bus[] buses = new Bus[n];

        buses[0] = new Bus("Андрій А.А.", 13, 13, "Mercedes", 2015, 120000);
        buses[1] = new Bus("Петро П.П.", 12, 12, "Revolution", 2018, 80000);
        buses[2] = new Bus("Володимир В.В.", 11, 11, "Ducati", 2020, 50000);

        return buses;
    }

    public static void printBusList(Bus[] buses) {
        Arrays.stream(buses).forEach(System.out::println);
    }

    public static void main(String[] args) {
        System.setOut(new PrintStream(System.out, true, StandardCharsets.UTF_8));
        Bus[] buses = createBusArray(3);

        printBusList(buses);
    }
}
