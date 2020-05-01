import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });

  const apolloServer = new ApolloServer({ schema });
  const app = Express();
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("Server started on port http://127.0.0.1:4000/graphql");
  });
};

main();

// setTimeout(() => {
//   const some = 2121;
//   // In VS Code press Command + Shift + P and select Debug: Toggle Auto Attach
//   // Add break points here to test debugging
//   console.log("some", some);
// }, 2000);
// console.log("Hello from");
