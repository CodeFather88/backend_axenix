import { FastifyInstance } from "fastify";
import { getUserInfo } from "../../../controllers/user/info";
import { preHandlerUser, SchemaHeadersAuth } from "../../../controllers/valid/valid";


const schemaName = {
  tags: [
    "Получение пользователя"
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

  fastify.get<{ Headers: { token: string } }>(
    "/get",
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
        const userInfo = await getUserInfo(user)
        res.send(userInfo)
      }
    }
  );
  done();
};