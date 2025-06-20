package com.example.myapplication

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.widget.ListView
import android.widget.ArrayAdapter
import android.widget.TextView

data class Product(
    val name: String,
    val price: Double,
    var quantity: Int = 0
)

class ProductAdapter(
    private val context: AppCompatActivity,
    private val products: List<Product>,
    private val onQuantityChanged: () -> Unit
) : ArrayAdapter<Product>(context, 0, products) {

    override fun getView(position: Int, convertView: android.view.View?, parent: android.view.ViewGroup): android.view.View {
        val view = convertView ?: context.layoutInflater.inflate(R.layout.product_list_item, parent, false)

        val nameText = view.findViewById<TextView>(R.id.productName)
        val priceText = view.findViewById<TextView>(R.id.productPrice)
        val quantityText = view.findViewById<TextView>(R.id.productQuantity)
        val addButton = view.findViewById<android.widget.Button>(R.id.addButton)
        val removeButton = view.findViewById<android.widget.Button>(R.id.removeButton)

        val product = products[position]
        nameText.text = product.name
        priceText.text = "${product.price} грн"
        quantityText.text = product.quantity.toString()

        addButton.setOnClickListener {
            product.quantity++
            quantityText.text = product.quantity.toString()
            onQuantityChanged()
        }

        removeButton.setOnClickListener {
            if (product.quantity > 0) {
                product.quantity--
                quantityText.text = product.quantity.toString()
                onQuantityChanged()
            }
        }

        return view
    }
}

class MainActivity : AppCompatActivity() {
    private val products = listOf(
        Product("Хліб", 20.0),
        Product("Молоко", 30.0),
        Product("Яблуко", 10.0)
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val listView: ListView = findViewById(R.id.productListView)
        val totalText: TextView = findViewById(R.id.totalTextView)

        val adapter = ProductAdapter(this, products) {
            val total = products.sumOf { it.price * it.quantity }
            totalText.text = "Загальна вартість: $total грн"
        }

        listView.adapter = adapter
    }
}
