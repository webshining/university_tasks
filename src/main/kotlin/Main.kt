import kotlin.random.Random
import kotlinx.coroutines.*

class Student(
    name: String,
    age: Int = 0,
    grades: List<Int> = listOf()
) {

    private var internalName: String = name.trim().replaceFirstChar { it.uppercase() }
    private var _age: Int = age
    private var _grades: List<Int> = grades

    var name: String
        get() = internalName
        set(value) {
            internalName = value.trim().replaceFirstChar { it.uppercase() }
        }

    var age: Int
        get() = _age
        set(value) {
            if (value >= 0) _age = value
        }

    val isAdult: Boolean
        get() = _age >= 18

    val status: String by lazy {
        if (isAdult) "Adult" else "Minor"
    }

    init {
        println("Student object created for $name")
    }

    fun getAverage(): Double {
        return if (_grades.isNotEmpty()) _grades.average() else 0.0
    }

    fun processGrades(operation: (Int) -> Int) {
        _grades = _grades.map(operation)
    }

    fun updateGrades(grades: List<Int>) {
        _grades = grades
    }

    operator fun plus(other: Student): List<Int> {
        return this._grades + other._grades
    }

    operator fun times(multiplier: Int): List<Int> {
        return _grades.map { it * multiplier }
    }

    override operator fun equals(other: Any?): Boolean {
        return other is Student &&
                this.name == other.name &&
                this.getAverage() == other.getAverage()
    }

    override fun toString(): String {
        return "Student(name=$name, age=$age, grades=$_grades, average=${getAverage()}, status=$status)"
    }
}

class Group(vararg students: Student) {
    private val studentList = students.toList()

    operator fun get(index: Int): Student = studentList[index]

    fun getTopStudent(): Student? {
        return studentList.maxByOrNull { it.getAverage() }
    }
}

// Асинхронна функція
suspend fun fetchGradesFromServer(): List<Int> {
    delay(2000)
    return List(5) { Random.nextInt(60, 100) }
}

// Main
fun main() = runBlocking {
    // Створення студента через конструктор з одним аргументом
    val student1 = Student("  ivan  ")
    student1.age = 19

    // Використання іменованих аргументів
    val student2 = Student(name = "Oksana", age = 20, grades = listOf(85, 90, 78))

    println(student1)
    println(student2)

    // Запуск асинхронної операції
    val deferredGrades = async { fetchGradesFromServer() }
    val fetchedGrades = deferredGrades.await()

    println("Fetched grades: $fetchedGrades")
    student1.updateGrades(fetchedGrades)

    // Перевірка оператора +
    val combinedGrades = student1 + student2
    println("Combined Grades: $combinedGrades")

    // Перевірка оператора *
    val scaledGrades = student1 * 2
    println("Scaled Grades: $scaledGrades")

    // Перевірка ==
    val isEqual = student1 == student2
    println("Students equal? $isEqual")

    // Перевірка lazy
    println("${student1.name}'s status is: ${student1.status}")

    // Створення групи
    val group = Group(student1, student2)
    println("Top student in group: ${group.getTopStudent()}")
}