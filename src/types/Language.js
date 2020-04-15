const { objectType } = require("nexus");

const Language = objectType({
  name: "Language",
  definition(t) {
    t.model.language_id();
    t.model.language_code();
    t.model.language_name_en();
    t.model.language_name_native();
    t.list.field("songs", {
      type: "Song",
      resolve: async (parent, args, ctx) => {
        let songs = await ctx.prisma.language
          .findOne({ where: { language_id: parent.language_id } })
          .songs();

        // Excerpts in language
        const excerpts = await ctx.prisma.language
          .findOne({ where: { language_id: parent.language_id } })
          .excerpts();

        // Add songs based on these excerpts
        for (const i in excerpts) {
          const excerpt_songs = await ctx.prisma.excerpt
            .findOne({ where: { excerpt_id: excerpts[i]["excerpt_id"] } })
            .songs();
          songs = songs.concat(excerpt_songs);
        }

        // Only keep unique songs
        songs = songs.filter((obj, pos, arr) => {
          return (
            arr.map((mapObj) => mapObj["song_id"]).indexOf(obj["song_id"]) ===
            pos
          );
        });

        return songs;
      },
    });
    t.model.excerpts({
      pagination: false,
    });
  },
});

module.exports = {
  Language,
};
