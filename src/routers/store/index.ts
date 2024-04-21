import { FastifyInstance } from "fastify";

export default (
    fastify: FastifyInstance,
    opts: {},
    done: (err?: Error | undefined) => void
) => {

    fastify.register(require("./create"), {
        prefix: "/create"
    })
    fastify.register(require("./list"), {
        prefix: "/list"
    })
    fastify.register(require("./getCoord"), {
        prefix: "/getCoord"
    })



    done();
};