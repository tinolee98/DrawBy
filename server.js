require("dotenv").config();
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core/dist/plugin/drainHttpServer";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload";

async function startApolloServer() {
  const PORT = process.env.PORT;
  const app = express();
  app.use(graphqlUploadExpress());
  const httpServer = http.createServer(app);

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async (ctx) => {
      try {
        const token = ctx.req.headers.authorization.split(" ")[1];
        if (ctx.req) {
          return { loggedInUser: await getUser(token) };
        } else {
          const {
            connection: { context },
          } = ctx;
          return {
            loggedInUser: context.loggedInUser,
          };
        }
      } catch (e) {
        return { loggedInUser: null };
      }
    },
    playground: true,
    introspection: true,
    // context: async (ctx) => {
    //   const token = ctx.req.headers.authorization.split(" ")[1];
    //   loggedInUser: await getUser(token);
    //   //console.log(await getUser(token));
    // },
  });

  await apollo.start();

  apollo.applyMiddleware({
    app,
    path: "/graphql",
    // context 부분 추가 필요 (httpServer 사용할 때 header 읽는 법 까먹음.. 복습 필요)
  });
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
  );
}
startApolloServer();
// require("dotenv").config();
// import express from "express";
// import { typeDefs, resolvers } from "./schema";
// import { ApolloServer } from "apollo-server-express";
// import { getUser } from "./users/users.utils";
// import logger from "morgan";

// const PORT = process.env.PORT;
// const apollo = new ApolloServer({
//   resolvers,
//   typeDefs,
//   // context: async ({ req }) => {
//   //   return {
//   //     loggedInUser: await getUser(req.headers.authorization),
//   //   };
//   // },
// });

// const app = express();
// app.use(logger("tiny"));
// apollo.applyMiddleware({ app });
// app.use("/static", express.static("uploads"));

// app.listen({ port: PORT }, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT} ✅`);
// });
