import Fastify from "fastify";
import cors from "@fastify/cors";
import './src/database';

const fastify = Fastify({});
const serverPort: Record<string, number> = {
  "1": 9090, 
  "2": 9091,  
};

const serverId = process.argv[2] || "1";
const port = serverPort[serverId] || serverPort["1"];

fastify.register(require("@fastify/swagger"), {
  swagger: {
    info: {
      title: "Кейс от компании",
      description: "",
      version: "0.0.1",
    },
    externalDocs: {
      url: "http://swagger.io", // Изменен протокол на http
      description: "Find more info here",
    },
    tags: [
      {
        name: "Авторизация",
        description: "Конечные точки, связанные с авторизацией пользователя.",
      },
    ],
    schemes: ["http", "https"], // Изменен протокол на http
    consumes: ["application/json"],
    produces: ["application/json"],
  },
  exposeRoute: true,
});

fastify.register(cors, {})

fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
  staticCSP: true,
  transformSpecificationClone: true,
});

fastify.register(require("./src/routers/user"), {
  logLevel: "warn",
  prefix: "/user",
});
fastify.register(require("./src/routers/store"), {
  logLevel: "warn",
  prefix: "/store",
});
fastify.register(require("./src/routers/metric"), {
  logLevel: "warn",
  prefix: "/metric",
});
fastify.register(require("./src/routers/product"), {
  logLevel: "warn",
  prefix: "/product",
});

fastify.listen({ port }, (err) => {
  if (err) throw err;
  console.log("Start server...");

});

