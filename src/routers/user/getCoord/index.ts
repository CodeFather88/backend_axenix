import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SchemaHeadersAuth, preHandlerUser } from "../../../controllers/valid/valid";
import { storeCoordschema, IStoreCoordSchema } from "../../../types/store/getCoord";
import { storeCoord } from "../../../controllers/store/getCoord";
import { IUserCoordSchema, userCoordschema } from "../../../types/user/getCoord.t";
import { userCoord } from "../../../controllers/user/getCoord";

const schemaName = {
  tags: [
    "Методы работы с пользователями"
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
    Headers: { token: string }
  }>(
    "",
    {
      schema: {
        ...schemaName,
        headers: SchemaHeadersAuth,
        querystring: userCoordschema
      },
    },
    async (req: FastifyRequest, res: FastifyReply) => {
      let user = req.headers["user"];
      const query = req.query as IUserCoordSchema
      if (typeof user === 'string') {
        const response = await userCoord()
        return response
      }
    }
  );
  done();
};