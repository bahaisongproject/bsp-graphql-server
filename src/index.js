const { GraphQLServer } = require("graphql-yoga");
const { makeSchema, objectType, intArg, stringArg } = require("nexus");
const { PrismaClient } = require("@prisma/client");
const { nexusPrismaPlugin } = require("nexus-prisma");
const types = require("./types");
const prisma = new PrismaClient();

new GraphQLServer({
  schema: makeSchema({
    types,
    plugins: [nexusPrismaPlugin()],
    outputs: {
      schema: __dirname + "/../schema.graphql",
      typegen: __dirname + "/generated/nexus.ts",
    },
  }),
  context: { prisma },
}).start(() => console.log(`🚀 GraphQL server ready at: http://localhost:4000\n`));