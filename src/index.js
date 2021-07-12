const { GraphQLServer } = require("graphql-yoga");
const { makeSchema, objectType, intArg, stringArg } = require("nexus");
const { PrismaClient } = require("@prisma/client");
const { nexusPrismaPlugin } = require("nexus-prisma");
const tar = require("tar");
const fs = require("fs");
const fetch = require("node-fetch");
const types = require("./types");
const prisma = new PrismaClient();

const url = "https://www.bahaisongproject.com/bahai-songs-archive.tar.gz";
const tarFile = `${__dirname}/bahai-songs-archive.tar.gz`;
const targetDir = `${__dirname}`;

const downloadFile = async (url, path) => {
  if (!fs.existsSync(path)) {
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(path);
    return await new Promise((resolve, reject) => {
      res.body.pipe(fileStream);
      res.body.on("error", reject);
      fileStream.on("finish", resolve);
    });
  }
};

const extractArchive = async (tarFile, targetDir) => {
  return await new Promise((resolve, reject) => {
    fs.createReadStream(tarFile).pipe(tar.extract(targetDir));
  });
};

const startServer = async () => {
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
  }).start(() =>
    console.log(`🚀 GraphQL server ready at: http://localhost:4000\n`)
  );
};

downloadFile(url, tarFile)
  .then(() => console.log(`📦 Downloaded song sheets to ${tarFile}`))
  .then(extractArchive(tarFile, targetDir))
  .then(() => console.log(`📦 Extracted song sheets to ${targetDir}`))
  .then(startServer);
