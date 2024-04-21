import { StoreDB } from "../../database";
import { IStoreListSchema } from "../../types/store/list.t";
export const storeList = async () => {
    const stores = await StoreDB.find().lean();
    return {
        list: [stores]
    }
}