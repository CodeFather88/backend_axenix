import { FastifyInstance } from "fastify";
import { preHandlerUser, SchemaHeadersAuth } from "../../../controllers/valid/valid";
import { updateUserWithStoreMetrics } from "../../../controllers/metric/calculateUserWithStoreMetrics";
import { updateUserWithUserMetrics } from "../../../controllers/metric/calculateUserWithUserMetrics";

const schemaName = {
    tags: [
    "Обновление метрик"
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

    fastify.get<{ Headers: { token: string } }>(
        "/userWithUser",
        {
          schema: {
            ...schemaName,
            headers: SchemaHeadersAuth,
          },
        },
        async (req, res) => {
            let user = req.headers["user"];
            if (typeof user === 'string') {
                user = JSON.parse(user);
                const result = await updateUserWithUserMetrics()
                res.send(result)
            }
        }
      );
    done();
};