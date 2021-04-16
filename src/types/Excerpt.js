const { objectType } = require("nexus");

const Excerpt = objectType({
  name: "Excerpt",
  definition(t) {
    t.model.excerpt_id();
    t.model.excerpt_text();
    t.model.excerpt_transliteration();
    t.model.language();
    t.model.source();
    t.model.songs({
      pagination: false,
    });
    t.list.field("all_translations", {
      type: "Excerpt",
      resolve: async (parent, args, ctx) => {
        const translations = await ctx.prisma.source
          .findOne({
            where: { source_id: parent.source_id },
          })
          .excerpts();
        return translations;
      },
    });
    t.list.field("all_translations", {
      type: "Excerpt",
      resolve: async (parent, args, ctx) => {
        const translations = await ctx.prisma.source
          .findOne({
            where: { source_id: parent.source_id },
          })
          .excerpts();
        return translations;
      },
    });
  },
});

module.exports = {
  Excerpt,
};
