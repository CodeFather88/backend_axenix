import { ProductDB } from "../../database";
import { IProductListSchema } from "../../types/product/list.t";

export const productList = async ({ user, query }: { user: any, query: IProductListSchema }) => {
    try {
        const PAGE_LIMIT = 30;
        const { page, search } = query;
        const offset = PAGE_LIMIT * (page - 1);
        const filter: any = { userId: user.id };
        if (search) {
            filter.$text = { $search: search };
        }
        const productsQuery = ProductDB.find(filter)
            .select("-_id -__v")
            .skip(offset)
            .limit(PAGE_LIMIT)
            .lean();

        const countQuery = ProductDB.countDocuments(filter);
        const [products, count] = await Promise.all([productsQuery, countQuery]);
        const maxPage = Math.ceil(count / PAGE_LIMIT);
        return {
            maxPage,
            list: [products]
        };
    } catch (error) {
        throw new Error("Failed to fetch product list");
    }
};
