import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";

@Resolver()
class HelloWorld {
  // the second parm {} is optional tweaking
  @Query(() => String, { name: "helloOptionalName" })
  async hello() {
    return "Hello World";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloWorld],
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
