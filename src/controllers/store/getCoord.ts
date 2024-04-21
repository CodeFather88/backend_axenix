import { StoreDB } from "../../database";
import { IStoreListSchema } from "../../types/store/list.t";
import { PointTypeEnum } from "./PointTypeEnum";
export const storeCoord = async ({ query }: { query: IStoreListSchema }) => {
    const PAGE_LIMIT = 30
    const { page } = query
    const offset = PAGE_LIMIT * (page - 1);
    const storesCoordQuery = StoreDB.find({}, { width: 1, height: 1, id: 1, _id: 0 }).skip(offset).limit(PAGE_LIMIT).lean();
    const countQuery = StoreDB.find({}, { width: 1, height: 1, id: 1, _id: 0 }).countDocuments();
    const [storesCoord, count] = await Promise.all([storesCoordQuery, countQuery]);
    const maxPage = Math.ceil(count / PAGE_LIMIT);
    return {
        maxPage,
        list: storesCoord.map(coord => ({ ...coord, type: PointTypeEnum.Store }))
    };
}