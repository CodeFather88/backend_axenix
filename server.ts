import Fastify from "fastify";
import cors from "@fastify/cors";
import './src/database'
const fastify = Fastify({});
fastify.register(cors, {});


const serverPort: Record<string, number> = {
  "1": 9090,
  "2": 9091,
};

const serverId = process.argv[2] || "1";


const port = serverPort[serverId] || serverPort["1"];

// fastify.setNotFoundHandler((request, reply) => {
//   reply.redirect("/404.html");
// });

// fastify.addHook("onSend", (request, reply, payload: string, done) => {
//   const timestamp = Date.now();
//   let jsonPayload;

//   try {
//     jsonPayload = JSON.parse(payload);
//     jsonPayload = {
//       ...jsonPayload,
//       timestamp: timestamp,
//       id: Number(serverId),
//     };
//   } catch (error) {
//     //fastify.log.error(error);
//   }

//   done(null, JSON.stringify(jsonPayload));
// });

fastify.register(require("@fastify/swagger"), {
  swagger: {
    info: {
      title: "Кейс от компании",
      description: "",
      version: "0.0.1",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    tags: [
      {
        name: "Авторизация",
        description:
          "Конечные точки, связанные с авторизацией пользователя.",
      },
    ],
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
  exposeRoute: true,
});

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

// fastify.register(require("./routers/users"), {
//   logLevel: "warn",
//   prefix: "/users",
// })


fastify.listen({ port }, (err) => {
  if (err) throw err;
  console.log("Start server...");
});