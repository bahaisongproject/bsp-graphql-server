  
const { objectType } = require('nexus')

const Source = objectType({
    name: 'Source',
    definition(t) {
      t.model.source_id()
      t.model.source_author()
      t.model.source_description()
      t.list.field('songs', {
        type: 'Song',
        resolve: async (parent, args, ctx) => {
          const excerpts = await ctx.prisma.source.findOne({where: {source_id: parent.source_id}}).excerpts()

          console.log(excerpts)

          let songs = []


          // Add songs based on these excerpts
          for (const i in excerpts) {
            const excerpt_songs = await ctx.prisma.excerpt.findOne({where: {excerpt_id: excerpts[i]['excerpt_id']}}).songs()
            songs = songs.concat(excerpt_songs)
          }

          // Only keep unique songs
          songs = songs.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj['song_id']).indexOf(obj['song_id']) === pos;
          })

          return songs
        }
      })

      t.model.excerpts({
        pagination: false,
      })
    },
  })

module.exports = {
    Source,
}