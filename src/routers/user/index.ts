import { FastifyInstance } from "fastify";

export default (
    fastify: FastifyInstance,
    opts: {},
    done: (err?: Error | undefined) => void
) => {

    fastify.register(require("./login"), {
        prefix: "/login"
    })
    fastify.register(require("./info"), {
        prefix: "/info"
    })
    fastify.register(require("./getCoord"), {
        prefix: "/getCoord"
    })



    done();
};