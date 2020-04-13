const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
async function main() {
    const allSongs = await prisma.song.findMany()
    console.log(allSongs)
}
main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })