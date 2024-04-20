import { StoreDB, MetricDB } from "../../database";
import { MetricTypeEnum, calculateDistance } from "./calculateUserWithUserMetrics";

type StoreMetric = {
    first: string;
    second: string;
    distance: number;
    duration: number;
    type: MetricTypeEnum;
};

export const updateMetricsStoreWithStore = async () => {
    try {
        // Получаем все магазины из базы данных
        const allStores = await StoreDB.find({}, { _id: 1, height: 1, width: 1 }).lean();
        
        // Собираем данные о метриках для магазинов с другими магазинами
        const storeMetrics: StoreMetric[] = [];

        // Вычисляем метрики для каждой пары магазинов
        for (let i = 0; i < allStores.length; i++) {
            for (let j = i + 1; j < allStores.length; j++) {
                const store1 = allStores[i];
                const store2 = allStores[j];
                
                const distance = calculateDistance(store1.height, store1.width, store2.height, store2.width);
                
                // Рассчитываем время в пути
                const avgSpeed = 16.66; // Средняя скорость в км/ч
                const duration = distance / avgSpeed;

                storeMetrics.push({
                    first: `store_${store1._id}`,
                    second: `store_${store2._id}`,
                    distance,
                    duration,
                    type: MetricTypeEnum.StoreWithStore
                });
            }
        }

        // Вставляем метрики пакетно в базу данных
        await MetricDB.insertMany(storeMetrics);
        
        console.log("Store metrics updated successfully");
    } catch (err) {
        console.error("Error while updating store metrics:", err);
    }
};