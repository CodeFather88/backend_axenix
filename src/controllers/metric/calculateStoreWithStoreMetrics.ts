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
        const allStores = await StoreDB.find({}, { _id: 1, height: 1, width: 1 }).lean();
        const storeMetrics: StoreMetric[] = [];
        for (let i = 0; i < allStores.length; i++) {
            for (let j = i + 1; j < allStores.length; j++) {
                const store1 = allStores[i];
                const store2 = allStores[j];
                const distance = calculateDistance(store1.height, store1.width, store2.height, store2.width);
                const avgSpeed = 8.746087871 //взяли среднее значение из выборки в excel
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
        await MetricDB.insertMany(storeMetrics);
        return { status: "ok" }
    } catch (err) {
        console.error("Error while updating store metrics:", err);
    }
};