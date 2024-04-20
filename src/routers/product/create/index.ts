import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { preHandlerUser, SchemaHeadersAuth } from "../../../controllers/valid/valid";
import { IProductCreateSchema, productCreateSchema } from "../../../types/product/create.t";
import { createNewProduct } from "../../../controllers/product/create";


const schemaName = {
    tags: [
    "Методы работы с продуктами"
    ]
}
export default  (
    fastify: FastifyInstance,
    opts: {},
    done: (err?: Error | undefined) => void
) => {
    fastify.addHook("preHandler", async (req, res) => {
       await preHandlerUser(req, res)
    })

    fastify.post<{ 
      Headers: { token: string },
      Body: IProductCreateSchema
  }>(
        "",
        {
          schema: {
            ...schemaName,
            headers: SchemaHeadersAuth,
            body: productCreateSchema 
          },
        },
        async (req: FastifyRequest, res: FastifyReply) => {
            let user = req.headers["user"];
            const body = req.body as IProductCreateSchema
            if (typeof user === 'string') {
                user = JSON.parse(user);
                const response = await createNewProduct({user, body})
                return response
            }
        }
      );
    done();
};