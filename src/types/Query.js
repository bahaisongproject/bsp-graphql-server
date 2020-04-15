const { objectType } = require("nexus");

const Query = objectType({
  name: "Query",
  definition(t) {
    t.crud.song();
    t.crud.contributor();
    t.crud.performance();
    t.crud.source();
    t.crud.tag();
    t.crud.excerpt();
    t.crud.language();

    t.list.field("songs", {
      type: "Song",
      resolve: (_, _args, ctx) => {
        return ctx.prisma.song.findMany();
      },
    });

    t.list.field("contributors", {
      type: "Contributor",
      resolve: (_, _args, ctx) => {
        return ctx.prisma.contributor.findMany();
      },
    });

    t.list.field("performances", {
      type: "Performance",
      resolve: (_, _args, ctx) => {
        return ctx.prisma.performance.findMany();
      },
    });

    t.list.field("sources", {
      type: "Source",
      resolve: (_, _args, ctx) => {
        return ctx.prisma.source.findMany();
      },
    });

    t.list.field("tags", {
      type: "Tag",
      resolve: (_, _args, ctx) => {
        return ctx.prisma.tag.findMany();
      },
    });

    t.list.field("excerpts", {
      type: "Excerpt",
      resolve: (_, _args, ctx) => {
        return ctx.prisma.excerpt.findMany();
      },
    });

    t.list.field("languages", {
      type: "Language",
      resolve: (_, _args, ctx) => {
        return ctx.prisma.language.findMany();
      },
    });
  },
});

module.exports = {
  Query,
};
