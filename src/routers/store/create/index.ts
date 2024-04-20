import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { getUserInfo } from "../../../controllers/user/info";
import { IStoreCreateSchema, storeCreateSchema } from "../../../types/store/create.t";
import { createNewStore } from "../../../controllers/store/create";
import { preHandlerUser, SchemaHeadersAuth } from "../../../controllers/valid/valid";


const schemaName = {
    tags: [
    "Методы работы со складами"
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
      Body: IStoreCreateSchema
  }>(
        "",
        {
          schema: {
            ...schemaName,
            headers: SchemaHeadersAuth,
            body: storeCreateSchema 
          },
        },
        async (req: FastifyRequest, res: FastifyReply) => {
            let user = req.headers["user"];
            const body = req.body as IStoreCreateSchema
            if (typeof user === 'string') {
                user = JSON.parse(user);
                const response = await createNewStore({user, body})
                return response
            }
        }
      );
    done();
};