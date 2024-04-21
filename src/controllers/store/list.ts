import { StoreDB } from "../../database";
import { IStoreListSchema } from "../../types/store/list.t";
export const storeList = async ({ user, query }: { user: any, query: IStoreListSchema }) => {
    const PAGE_LIMIT = 30
    const { page, search } = query
    const searchFields = search ? { score: { $meta: "textScore" } } : {}
    const offset = PAGE_LIMIT * (page - 1);
    const filter = search ? { $text: { $search: search } } : {};
    const storesQuery = StoreDB.find(filter, searchFields).skip(offset).limit(PAGE_LIMIT).lean();
    const countQuery = StoreDB.find(filter).countDocuments();
    const [stores, count] = await Promise.all([storesQuery, countQuery]);
    const maxPage = Math.ceil(count / PAGE_LIMIT);
    return {
        maxPage,
        list: [stores]
    }
}