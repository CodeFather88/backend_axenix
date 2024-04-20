import { UserDB, StoreDB, MetricDB } from "../../database";

export function degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadiusMeters = 6371000; // Радиус Земли в метрах

    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusMeters * c;
    return distance;
}

export enum MetricTypeEnum {
    UserWithUser="UserWithUser",
    UserWithStore="UserWithStore",
    StoreWithStore="StoreWithStore"
}

export const updateUserWithUserMetrics = async () => {
    try {
        // Получаем все пользователей из базы данных
        const allUsers = await UserDB.find({}, { id: 1, height: 1, width: 1 }).lean();
        
        // Собираем данные о метриках для пользователей с другими пользователями
        const userMetrics = allUsers.flatMap(user => {
            return allUsers.map(otherUser => {
                if (otherUser.id !== user.id) {
                    const distance = calculateDistance(user.height, user.width, otherUser.height, otherUser.width);
                    // Рассчитываем время в пути
                    const avgSpeed = 16.66; // Средняя скорость в км/ч
                    const duration = distance / avgSpeed;
                    return {
                        first: `user_${user.id}`,
                        second: `user_${otherUser.id}`,
                        distance,
                        duration,
                        type: MetricTypeEnum.UserWithUser
                    };
                }
                return null;
            }).filter(Boolean);
        });
        
        // Вставляем метрики пакетно в базу данных
        await MetricDB.insertMany(userMetrics);
        
        console.log("User with user metrics updated successfully");
    } catch (err) {
        console.error("Error while updating user with user metrics:")
    }
}
