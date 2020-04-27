const { GraphQLServer } = require("graphql-yoga");
const { makeSchema, objectType, intArg, stringArg } = require("nexus");
const { PrismaClient } = require("@prisma/client");
const { nexusPrismaPlugin } = require("nexus-prisma");
const types = require("./types");
const express = require('express');
const app = express();
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

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.send('An alligator approaches!');
});
app.get('/.well-known/acme-challenge/XKFh8ZO8ntJHAqCE_ZmE9g6TcgnDcohS5gQr5oW3ROY', (req, res) => {
  res.send('XKFh8ZO8ntJHAqCE_ZmE9g6TcgnDcohS5gQr5oW3ROY.GXkDLsnZLko_IqiZsi-SgsqhpMCaP3ivQUhJ5XzmeUU');
});
let server = app.listen(() => {
  console.log('Listening', server.address().port)
})