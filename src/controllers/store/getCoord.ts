import { StoreDB } from "../../database";
import { IStoreListSchema } from "../../types/store/list.t";
import { PointTypeEnum } from "./PointTypeEnum";
export const storeCoord = async () => {

    const storesCoord = await StoreDB.find({}, { width: 1, height: 1, id: 1, _id: 0 }).lean();
    return {
        list: storesCoord.map(coord => ({ ...coord, type: PointTypeEnum.Store }))
    };
}