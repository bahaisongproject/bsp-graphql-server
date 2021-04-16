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

    t.string("words", {
      nullable: true,
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
        sources = sources
          .filter((obj, pos, arr) => {
            return (
              arr
                .map((mapObj) => mapObj["source_id"])
                .indexOf(obj["source_id"]) === pos
            );
          })
          .filter((source) => source.source_author != null);

        let source_authors = sources.map(({ source_author }) => source_author);

        // Only keep unique source authors
        source_authors = source_authors.filter((obj, pos, arr) => {
          return (
            arr
              .map((mapObj) => mapObj["source_id"])
              .indexOf(obj["source_id"]) === pos
          );
        });

        if (source_authors.length > 2) {
          return `${source_authors.slice(0, -1).join(", ")} & ${
            source_authors[source_authors.length - 1]
          }`;
        } else if (source_authors.length > 0) {
          return source_authors.join(" & ");
        } else {
          return null;
        }
      },
    });

    t.string("music", {
      nullable: true,
      resolve: async (parent, args, ctx) => {
        const contributors = await ctx.prisma.song
          .findOne({ where: { song_id: parent.song_id } })
          .contributors();

        const song_description = await ctx.prisma.song.findOne({
          where: { song_id: parent.song_id },
        })["song_description"];

        const contributor_names = contributors.map(
          ({ contributor_name }) => contributor_name
        );

        if (contributor_names.length == 0 && song_description) {
          return song_description;
        } else if (contributor_names.length > 2) {
          return `${contributor_names.slice(0, -1).join(", ")} & ${
            contributor_names[contributor_names.length - 1]
          }`;
        } else if (contributor_names.length > 0) {
          return contributor_names.join(" & ");
        } else {
          return null;
        }
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
