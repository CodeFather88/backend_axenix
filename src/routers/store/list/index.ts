import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SchemaHeadersAuth, preHandlerUser } from "../../../controllers/valid/valid";
import { getUserInfo } from "../../../controllers/user/info";
import { IStoreCreateSchema, storeCreateSchema } from "../../../types/store/create.t";
import { createNewStore } from "../../../controllers/store/create";
import { IStoreListSchema, storeListSchema } from "../../../types/store/list.t";
import { storeList } from "../../../controllers/store/list";


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

    fastify.get<{ 
      Headers: { token: string },
      Querystring: IStoreListSchema
  }>(
        "",
        {
          schema: {
            ...schemaName,
            headers: SchemaHeadersAuth,
            querystring: storeListSchema 
          },
        },
        async (req: FastifyRequest, res: FastifyReply) => {
            let user = req.headers["user"];
            const query = req.query as IStoreListSchema
            if (typeof user === 'string') {
                user = JSON.parse(user);
                const response = await storeList({user, query})
                return response
            }
        }
      );
    done();
};