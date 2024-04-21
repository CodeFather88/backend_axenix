import { FastifyInstance } from "fastify";

export default (
    fastify: FastifyInstance,
    opts: {},
    done: (err?: Error | undefined) => void
) => {

    fastify.register(require("./storeWithStore"), {
        prefix: ""
    })
    fastify.register(require("./userWithStore"), {
        prefix: ""
    })
    fastify.register(require("./userWithUser"), {
        prefix: ""
    })



    done();
};