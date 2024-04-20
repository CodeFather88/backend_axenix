import { UserDB, StoreDB, MetricDB } from "../../database";
import { calculateDistance, MetricTypeEnum } from "./calculateUserWithUserMetrics";

export const updateUserWithStoreMetrics = async () => {
    try {
        // Получаем все пользователей из базы данных
        const allUsers = await UserDB.find({}, { id: 1, height: 1, width: 1 }).lean();
        
        // Получаем все склады из базы данных
        const allStores = await StoreDB.find({}, { id: 1, height: 1, width: 1 }).lean();
        
        // Собираем данные о метриках для пользователей с складами
        const userStoreMetrics = allUsers.flatMap(user => {
            return allStores.map(store => {
                const distance = calculateDistance(user.height, user.width, store.height, store.width);
                // Рассчитываем время в пути
                const avgSpeed = 16.66; // Средняя скорость в км/ч
                const duration = distance / avgSpeed;
                return {
                    first: `user_${user.id}`,
                    second: `store_${store.id}`,
                    distance,
                    duration,
                    type: MetricTypeEnum.UserWithStore
                };
            });
        });
        
        // Вставляем метрики пакетно в базу данных
        await MetricDB.insertMany(userStoreMetrics);
        
        console.log("User with store metrics updated successfully");
    }
  catch (err) {
        console.error("Error while updating user with store metrics:", err);
    }
};
