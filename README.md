# <p align="center">Лабораторна робота 5</p>

### <p align="center">Створення Android-додатку "Список покупок"</p>

## 📑 Навігація

-   [Технології](#технології)
-   [Внесені зміни в проект з відео](#внесені-зміни-в-проект-з-відео)
    -   [API-моделі та інтерфейс](#додано-взаємодію-з-api)
    -   [ViewModel та логіка обробки](#змінено-функціонал-роботи-з-item)
-   [Фінальний вигляд додатку](#фінальний-вигляд-додатку)
-   [Що знаходиться в БД](#що-знаходиться-в-бд)

---

## 🛠 Технології:

-   Rust (RESTful API)
    -   axum
    -   SurrealDB
    -   tokio
-   Kotlin (Android APP)
    -   retrofit2
-   Ngrok

---

## 🔧 Внесені зміни в проект з відео

### ✅ Додано взаємодію з API

> Використовується API, реалізоване на Rust з SurrealDB (та RocksDB як бекенд), замість локального збереження.

```kt
data class ApiItemId(val String: String)
data class ApiItemIdWrapper(val tb: String, val id: ApiItemId)
data class ShoppingItemDto(
    val id: ApiItemIdWrapper,
    val text: String,
    val is_bought: Boolean
)

data class CreateItemDto(
    val text: String,
    val is_bought: Boolean = false
)

interface ShoppingApi {
    @GET("api/items")
    suspend fun getItems(): List<ShoppingItemDto>

    @POST("api/items")
    suspend fun addItem(@Body item: CreateItemDto)

    @PATCH("api/items/{id}")
    suspend fun updateItem(@Path("id") id: String)

    @DELETE("api/items/{id}")
    suspend fun deleteItem(@Path("id") id: String)
}

object RetrofitInstance {
    val api: ShoppingApi by lazy {
        retrofit2.Retrofit.Builder()
            .baseUrl("https://8afb-176-104-21-234.ngrok-free.app/")
            .addConverterFactory(retrofit2.converter.gson.GsonConverterFactory.create())
            .build()
            .create(ShoppingApi::class.java)
    }
}
```

### ⚙️ Змінено функціонал роботи з Item

```kt
class ShoppingListViewModel : ViewModel() {
    private val _shoppingList = mutableStateListOf<ShoppingItemDto>()
    val shoppingList: List<ShoppingItemDto> get() = _shoppingList

    init {
        loadItems()
    }

    fun loadItems() {
        viewModelScope.launch {
            try {
                val items = RetrofitInstance.api.getItems()
                Log.d("API_RESPONSE", "Loaded items: $items")
                _shoppingList.clear()
                _shoppingList.addAll(items)
            } catch (e: Exception) {
                Log.e("API_ERROR", "Failed to load items", e)
            }
        }
    }

    fun addItem(name: String) {
        viewModelScope.launch {
            try {
                RetrofitInstance.api.addItem(CreateItemDto(name))
                loadItems()
            } catch (e: Exception) {
                Log.e("API_ERROR", "Failed to add item", e)
            }
        }
    }

    fun toggleBought(index: Int) {
        viewModelScope.launch {
            try {
                val item = _shoppingList[index]
                val id = item.id.id.String
                val newValue = !item.is_bought
                RetrofitInstance.api.updateItem(id)
                _shoppingList[index] = item.copy(is_bought = newValue)
            } catch (e: Exception) {
                Log.e("API_ERROR", "Failed to toggle item bought state", e)
            }
        }
    }

    fun deleteItem(id: String) {
        viewModelScope.launch {
            try {
                RetrofitInstance.api.deleteItem(id)
                loadItems()
            } catch (e: Exception) {
                Log.e("API_ERROR", "Failed to delete item", e)
            }
        }
    }
}

```

---

## 📱 Фінальний вигляд додатку

![](/images/app.png)

---

## 🗄 Що знаходиться в БД

![](/images/db.png)
