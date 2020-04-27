const { GraphQLServer } = require("graphql-yoga");
const { makeSchema, objectType, intArg, stringArg } = require("nexus");
const { PrismaClient } = require("@prisma/client");
const { nexusPrismaPlugin } = require("nexus-prisma");
const types = require("./types");
var static = require('node-static');

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
}).start(() => console.log(`🚀 Server ready at: http://localhost:4000\n`));


var file = new static.Server('./public');
require('http').createServer(function (request, response) {
  request.addListener('end', function () {
      //
      // Serve files!
      //
      file.serve(request, response);
  }).resume();
}).listen(8080);