const { objectType } = require("nexus");

const Song = objectType({
  name: "Song",
  definition(t) {
    t.model.song_id();
    t.model.title();
    t.model.slug();
    t.model.song_description();
    t.model.created_at();
    t.model.performances({
      pagination: false,
    });
    t.model.excerpts({
      pagination: false,
    });
    t.list.field("languages", {
      type: "Language",
      resolve: async (parent, args, ctx) => {
        let languages = await ctx.prisma.song
          .findOne({ where: { song_id: parent.song_id } })
          .additional_languages();

        // Excerpts in language
        const excerpts = await ctx.prisma.song
          .findOne({ where: { song_id: parent.song_id } })
          .excerpts();

        // Add songs based on these excerpts
        for (const i in excerpts) {
          const excerpt_language = await ctx.prisma.excerpt
            .findOne({ where: { excerpt_id: excerpts[i]["excerpt_id"] } })
            .language();
          languages.push(excerpt_language);
        }

        // Only keep unique languages
        languages = languages.filter((obj, pos, arr) => {
          return (
            arr
              .map((mapObj) => mapObj["language_id"])
              .indexOf(obj["language_id"]) === pos
          );
        });

        return languages;
      },
    });

    t.list.field("sources", {
      type: "Source",
      resolve: async (parent, args, ctx) => {
        const excerpts = await ctx.prisma.song
          .findOne({ where: { song_id: parent.song_id } })
          .excerpts();

        let sources = [];

        // Add sources based on these excerpts
        for (const i in excerpts) {
          const excerpt_source = await ctx.prisma.excerpt
            .findOne({ where: { excerpt_id: excerpts[i]["excerpt_id"] } })
            .source();
          sources.push(excerpt_source);
        }

        // Only keep unique sources
        sources = sources.filter((obj, pos, arr) => {
          return (
            arr
              .map((mapObj) => mapObj["source_id"])
              .indexOf(obj["source_id"]) === pos
          );
        });

        return sources;
      },
    });

    t.model.tags({
      pagination: false,
    });
    t.model.contributors({
      pagination: false,
    });
  },
});

module.exports = {
  Song,
};
