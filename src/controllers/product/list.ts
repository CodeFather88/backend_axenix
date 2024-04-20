import { ProductDB } from "../../database";
import { IProductListSchema } from "../../types/product/list.t";

export const productList = async ({ user, query }: { user: any, query: IProductListSchema }) => {
    try {
        const PAGE_LIMIT = 30;
        const { page, search } = query;
        const offset = PAGE_LIMIT * (page - 1);
        const filter: any = { userId: user.id }; // Фильтр по userId текущего пользователя
        if (search) {
            filter.$text = { $search: search }; // Добавляем условие поиска, если есть
        }

        // Запрос на получение списка продуктов
        const productsQuery = ProductDB.find(filter)
            .select("-_id -__v") // Исключаем лишние поля из результата
            .skip(offset)
            .limit(PAGE_LIMIT)
            .lean();

        // Запрос на получение общего количества продуктов
        const countQuery = ProductDB.countDocuments(filter);

        // Выполнение запросов параллельно
        const [products, count] = await Promise.all([productsQuery, countQuery]);

        // Вычисление максимального количества страниц
        const maxPage = Math.ceil(count / PAGE_LIMIT);

        // Возврат результата
        return {
            maxPage,
            list: products
        };
    } catch (error) {
        // Обработка ошибок
        console.error("Error while fetching product list:", error);
        throw new Error("Failed to fetch product list");
    }
};
