console.log(
  "process.env.NODE_ENV",
  process.env.NODE_ENV || "undefined-production"
);
let root = "dist/";
let file = "js";
if (process.env.NODE_ENV === "development") {
  root = "src/";
  file = "ts";
}
module.exports = {
  name: "default",
  type: "postgres",
  host: "rogue.db.elephantsql.com",
  port: 5432,
  username: "qxpmjubd",
  password: "dHeUqbqZPp0s7kGLhEgA1rQ8ZfQTOex3",
  database: "qxpmjubd",
  synchronize: true,
  logging: true,
  entities: [root + "entity/*." + file],
};
