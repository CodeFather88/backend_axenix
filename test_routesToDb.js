// Подключение к MongoDB
const { MongoClient } = require('mongodb');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// URI вашей базы данных MongoDB
const uri = "mongodb://localhost:27017/hackaton";

// Функция для чтения данных из файла
async function readDataFromFile(filePath) {
    try {
        const data = await readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Ошибка чтения файла:", error);
        return null;
    }
}

// Функция для добавления данных в базу данных
async function addDataToDatabase(data) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db("hackaton");
        const collection = database.collection("pointRoutes");
        // Вставка данных
        const result = await collection.insertMany(data);
        console.log(`Данные успешно добавлены. Вставлено документов: ${result.insertedCount}`);
    } catch (error) {
        console.error("Произошла ошибка:", error);
    } finally {
        await client.close();
    }
}

// Путь к файлу с данными
const filePath = "./routesPoints.json";

// Вызов функций чтения данных из файла и добавления их в базу данных
readDataFromFile(filePath)
    .then(data => {
        if (data && Array.isArray(data.routes)) {
            addDataToDatabase(data.routes);
        } else {
            console.error("Ошибка: Неверный формат данных в файле.");
        }
    })
    .catch(error => console.error("Произошла ошибка:", error));
