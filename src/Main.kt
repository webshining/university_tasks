import java.lang.Exception

// Власний виняток для некоректних оцінок
class InvalidGradeException(message: String) : Exception(message)

fun main() {
    print("Введіть кількість студентів: ")
    val n = readLine()?.toIntOrNull() ?: 0

    val names = Array<String?>(n) { null }
    val grades = Array<Int>(n) { 0 }

    var i = 0
    while (i < n) {
        print("Введіть ім'я студента #${i + 1} (або натисніть Enter, якщо не здав анкету): ")
        val inputName = readLine()
        // Elvis-оператор для імені
        names[i] = if (inputName.isNullOrBlank()) "Unknown" else inputName

        var validGrade = false
        while (!validGrade) {
            try {
                print("Введіть оцінку студента #${i + 1} (0–100): ")
                val inputGrade = readLine()?.toIntOrNull()
                // Перевірка на null та діапазон
                if (inputGrade == null || inputGrade < 0 || inputGrade > 100) {
                    throw InvalidGradeException("Оцінка повинна бути від 0 до 100!")
                }
                grades[i] = inputGrade
                validGrade = true
            } catch (e: InvalidGradeException) {
                println("Помилка: ${e.message} Спробуйте ще раз.")
            } catch (e: Exception) {
                println("Виникла помилка вводу. Спробуйте ще раз.")
            }
        }
        i++
    }

    // Підрахунок середньої, мінімальної та максимальної оцінок
    val average = grades.average()
    val maxGrade = grades.maxOrNull() ?: 0
    val minGrade = grades.minOrNull() ?: 0

    println("\n=== Результати ===")
    println("Середня оцінка: %.2f".format(average))
    println("Найвища оцінка: $maxGrade")
    println("Найнижча оцінка: $minGrade")

    // Відмінники
    println("\nВідмінники (оцінка ≥ 90):")
    var foundExcellence = false
    for (j in 0 until n) {
        if (grades[j] >= 90) {
            println("${names[j]}: ${grades[j]}")
            foundExcellence = true
        }
    }
    if (!foundExcellence) println("Немає відмінників.")

    // Коментар щодо рівня групи
    val comment = when {
        average >= 90 -> "Високий рівень"
        average in 70.0..89.99 -> "Середній рівень"
        else -> "Низький рівень"
    }
    println("\nЗагальний коментар: $comment")
}