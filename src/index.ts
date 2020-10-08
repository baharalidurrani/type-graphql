import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import http from "http";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";
const PORT = 4000;

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  });

  const apolloServer = new ApolloServer({ schema });
  const app = Express();
  apolloServer.applyMiddleware({ app });
  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
    );
  });
  // app.listen(4000, () => {
  //   console.log("Server started on port http://127.0.0.1:4000/graphql");
  // });
};

main();

// setTimeout(() => {
//   const some = 2121;
//   // In VS Code press Command + Shift + P and select Debug: Toggle Auto Attach
//   // Add break points here to test debugging
//   console.log("some", some);
// }, 2000);
// console.log("Hello from");
