import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SchemaHeadersAuth, preHandlerUser } from "../../../controllers/valid/valid";
import { storeCoordschema, IStoreCoordSchema } from "../../../types/store/getCoord";
import { storeCoord } from "../../../controllers/store/getCoord";

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
      Headers: { token: string }
  }>(
        "",
        {
          schema: {
            ...schemaName,
            headers: SchemaHeadersAuth,
            querystring: storeCoordschema 
          },
        },
        async (req: FastifyRequest, res: FastifyReply) => {
            let user = req.headers["user"];
            const query = req.query as IStoreCoordSchema
            if (typeof user === 'string') {
                const response = await storeCoord({query})
                return response
            }
        }
      );
    done();
};