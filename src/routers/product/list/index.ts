import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SchemaHeadersAuth, preHandlerUser } from "../../../controllers/valid/valid";
import { IProductListSchema, productListSchema } from "../../../types/product/list.t";
import { productList } from "../../../controllers/product/list";


const schemaName = {
    tags: [
        "Методы работы с продуктами"
    ]
}
export default (
    fastify: FastifyInstance,
    opts: {},
    done: (err?: Error | undefined) => void
) => {
    fastify.addHook("preHandler", async (req, res) => {
        await preHandlerUser(req, res)
    })

    fastify.get<{
        Headers: { token: string },
        Querystring: IProductListSchema
    }>(
        "",
        {
            schema: {
                ...schemaName,
                headers: SchemaHeadersAuth,
                querystring: productListSchema
            },
        },
        async (req: FastifyRequest, res: FastifyReply) => {
            let user = req.headers["user"];
            const query = req.query as IProductListSchema
            if (typeof user === 'string') {
                user = JSON.parse(user);
                const response = await productList({ user, query })
                return response
            }
        }
    );
    done();
};