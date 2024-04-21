import { UserDB, StoreDB, MetricDB } from "../../database";
import { calculateDistance, MetricTypeEnum } from "./calculateUserWithUserMetrics";

interface UserStoreMetric {
    firstPoint: string;
    secondPoint: string;
    distance: number;
    duration: number;
    type: MetricTypeEnum;
}

export const updateUserWithStoreMetrics = async () => {
    try {
        const allUsers = await UserDB.find({}, { userId: 1, height: 1, width: 1 }).lean();
        const allStores = await StoreDB.find({}, { storeId: 1, height: 1, width: 1 }).lean();

        const userStoreMetrics: UserStoreMetric[] = [];
        allUsers.forEach(user => {
            allStores.forEach(store => {
                const distance = calculateDistance(user.height, user.width, store.height, store.width);
                const avgSpeed = 8.746087871 //взяли среднее значение из выборки в excel
                const duration = distance / avgSpeed;
                userStoreMetrics.push({
                    firstPoint: `user_${user.id}`,
                    secondPoint: `store_${store.id}`,
                    distance,
                    duration,
                    type: MetricTypeEnum.UserWithStore
                });
            });
        });
        await MetricDB.insertMany(userStoreMetrics);
        return { status: "ok" }
    } catch (err) {
        console.error("Error while updating user with store metrics:", err);
    }
};
