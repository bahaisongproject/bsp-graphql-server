const { GraphQLServer } = require('graphql-yoga')
const { makeSchema, objectType, intArg, stringArg } = require('nexus')
const { PrismaClient } = require('@prisma/client')
const { nexusPrismaPlugin } = require('nexus-prisma')

const Contributor = objectType({
    name: 'Contributor',
    definition(t) {
      t.model.contributor_id()
      t.model.contributor_name()
      t.model.contributor_url()
      t.model.performances({
        pagination: false,
      })
      t.model.songs({
        pagination: false,
      })
    },
  })

const Song = objectType({
  name: 'Song',
  definition(t) {
    t.model.song_id()
    t.model.title()
    t.model.performances({
        pagination: false,
      })
    t.model.excerpts({
        pagination: false,
      })
    t.list.field('languages', {
      type: 'Language',
      resolve: async (parent, args, ctx) => {
        let languages = await ctx.prisma.song.findOne({where: { song_id: parent.song_id }}).additional_languages()

        // Excerpts in language
        const excerpts = await ctx.prisma.song.findOne({where: {song_id: parent.song_id}}).excerpts()
        
        // Add songs based on these excerpts
        for (const i in excerpts) {
          const excerpt_language = await ctx.prisma.excerpt.findOne({where: {excerpt_id: excerpts[i]['excerpt_id']}}).language()
          languages.push(excerpt_language)
        }


        // Only keep unique songs
        languages = languages.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj['language_id']).indexOf(obj['language_id']) === pos;
        })

        return languages
      }
    })

    t.model.tags({
        pagination: false,
      })
    t.model.contributors({
        pagination: false,
      })
    t.string('slug', {
        resolve: ({ title }, args, ctx) => title.toLowerCase(),
    })
  },
})

const Performance = objectType({
    name: 'Performance',
    definition(t) {
      t.model.performance_id()
      t.model.main_performance()
      t.model.published()
      t.model.youtube_id()
      t.model.soundcloud_id()
      t.model.song()
      t.model.contributors({
        pagination: false,
      })
    },
  })

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

const Excerpt = objectType({
    name: 'Excerpt',
    definition(t) {
        t.model.excerpt_id()
        t.model.excerpt_text()
        t.model.language()
        t.model.source()
        t.model.songs({
            pagination: false,
        })
    },
})

const Language = objectType({
    name: 'Language',
    definition(t) {
        t.model.language_id()
        t.model.language_code()
        t.model.language_name_en()
        t.model.language_name_native()
        t.list.field('songs', {
          type: 'Song',
          resolve: async (parent, args, ctx) => {
            let songs = await ctx.prisma.language.findOne({where: {language_id: parent.language_id}}).songs()

            // Excerpts in language
            const excerpts = await ctx.prisma.language.findOne({where: {language_id: parent.language_id}}).excerpts()
            
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

const Tag = objectType({
    name: 'Tag',
    definition(t) {
        t.model.tag_id()
        t.model.tag_name()
        t.model.tag_description()
        t.model.songs({
            pagination: false,
        })
    },
})


const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.song()
    t.crud.contributor()
    t.crud.performance()
    t.crud.source()
    t.crud.tag()
    t.crud.excerpt()
    t.crud.language()

    t.list.field('songs', {
      type: 'Song',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.song.findMany()
      },
    })

    t.list.field('contributors', {
      type: 'Contributor',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.contributor.findMany()
      },
    })

    t.list.field('performances', {
      type: 'Performance',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.performance.findMany()
      },
    })

    t.list.field('sources', {
      type: 'Source',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.source.findMany()
      },
    })

    t.list.field('tags', {
      type: 'Tag',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.tag.findMany()
      },
    })

    t.list.field('excerpts', {
      type: 'Excerpt',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.excerpt.findMany()
      },
    })

    t.list.field('languages', {
      type: 'Language',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.language.findMany()
      },
    })

  },
})



const prisma = new PrismaClient()

new GraphQLServer({
  schema: makeSchema({
    types: [Query, Song, Performance, Contributor, Source, Excerpt, Language, Tag],
    plugins: [nexusPrismaPlugin()],
    outputs: {
      schema: __dirname + '/../schema.graphql',
      typegen: __dirname + '/generated/nexus.ts',
    },
  }),
  context: { prisma },
}).start(() =>
  console.log(
    `🚀 Server ready at: http://localhost:4000\n`,
  ),
)

module.exports = { Query, Song, Performance, Contributor, Source, Excerpt, Language, Tag }
