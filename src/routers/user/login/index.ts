import { FastifyInstance } from "fastify";
import { authUser, register } from "../../../controllers/user/login";
import { ILoginSchema, loginSchema } from "../../../types/user/login.t";

const schemaName = {
    tags: [
        "Авторизация"
    ]
}

export default (
    fastify: FastifyInstance,
    opts: any,
    done: (err?: Error | undefined) => void
) => {
    fastify.post<{
        Body: ILoginSchema
    }>(
        "/auth",
        {
            schema: {
                headers: {},
                ...schemaName,
                body: loginSchema
            },
        },
        async (req, res) => {
            const response = await authUser(req.body)
            res.send(response);
        }
    );
    fastify.post<{
        Body: ILoginSchema
    }>(
        "/register",
        {
            schema: {
                headers: {},
                ...schemaName,
                body: loginSchema
            },
        },
        async (req, res) => {
            const response = await register(req.body)
            res.send(response);
        }
    );
    done();
};