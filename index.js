const fs = require('fs');
const mongoose = require('mongoose');
const parse = require('csv-parse');

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/hackaton', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// Определение модели коллекции
const Product = mongoose.model('Product', {
  Product_Name: String,
  Product_Cost: Number,
  Manufacture_Date: Date,
  Expiry_Date: Date,
  SKU: String,
  Store_Name: String,
  Store_Address: String,
  Region: String,
  Sale_Date: Date,
  Quantity_Sold: Number,
  Product_Amount: Number,
  Product_Measure: String,
  Product_Volume: Number,
  Manufacturer: String
});

// Чтение данных из CSV файла и загрузка в MongoDB
fs.readFile('./data_hakaton2.csv', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading CSV file:', err);
    return;
  }

  // Парсинг CSV данных
  parse(data, { columns: true }, (err, records) => {
    if (err) {
      console.error('Error parsing CSV:', err);
      return;
    }

    // Загрузка каждой записи в MongoDB
    Product.insertMany(records)
      .then(result => {
        console.log('Records inserted successfully:', result);
        mongoose.connection.close(); // Закрыть соединение после завершения операции
      })
      .catch(err => {
        console.error('Error inserting records into MongoDB:', err);
      });
  });
});
