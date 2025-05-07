package softserve.academy.mylist

import android.os.Bundle
import android.util.Log
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.compose.viewModel
import kotlinx.coroutines.launch
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.Path
import softserve.academy.mylist.ui.theme.MyListTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d("APP_LIFECYCLE", "MainActivity onCreate: Application Started")
        enableEdgeToEdge()
        setContent {
            MyListTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Surface(modifier = Modifier.padding(innerPadding)) {
                        ShoppingListScreen()
                    }
                }
            }
        }
    }
}

// API Data Models and Retrofit Setup
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

@Composable
fun ShoppingItemCard(
    item: ShoppingItemDto,
    onToggleBought: () -> Unit = {},
    onDelete: () -> Unit = {}
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .background(
                Color.LightGray,
                MaterialTheme.shapes.large
            )
            .clickable { onToggleBought() }
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = item.text,
            modifier = Modifier.weight(1f),
            fontSize = 18.sp
        )
        IconButton(onClick = { onDelete() }) {
            Icon(imageVector = Icons.Default.Delete, contentDescription = "Delete Item")
        }
        Checkbox(checked = item.is_bought, onCheckedChange = {
            onToggleBought()
        })
    }
}

@Composable
fun AddItemButton(addItem: (String) -> Unit = {}) {
    var text by remember { mutableStateOf("") }

    Column {
        OutlinedTextField(
            value = text,
            onValueChange = { text = it },
            label = { Text("Add Item") }
        )
        Button(onClick = {
            if (text.isNotEmpty()) {
                addItem(text)
                text = ""
            }
        }) {
            Text("Add")
        }
    }
}

@Composable
fun ShoppingListScreen(
    viewModel: ShoppingListViewModel = viewModel()
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        item {
            AddItemButton { viewModel.addItem(it) }
        }
        itemsIndexed(viewModel.shoppingList) { ix, item ->
            ShoppingItemCard(
                item = item,
                onToggleBought = { viewModel.toggleBought(ix) },
                onDelete = { viewModel.deleteItem(item.id.id.String) }
            )
        }
    }
}

@Preview(showBackground = true, showSystemUi = true)
@Composable
fun ShoppingListScreenPreview() {
    ShoppingListScreen()
}

@Composable
fun ShoppingItemCardPreview() {
    var toggleState by remember { mutableStateOf(false) }
    ShoppingItemCard(
        item = ShoppingItemDto(
            id = ApiItemIdWrapper("item", ApiItemId("example-id")),
            text = "Молоко",
            is_bought = toggleState
        ),
        onToggleBought = { toggleState = !toggleState },
        onDelete = { /* Handle delete */ }
    )
}
