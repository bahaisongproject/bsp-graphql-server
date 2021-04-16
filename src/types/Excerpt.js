const { objectType, stringArg } = require("nexus");

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
        const all_translations = await ctx.prisma.source
          .findOne({
            where: { source_id: parent.source_id },
          })
          .excerpts();
        return all_translations;
      },
    });
    t.field("translation", {
      type: "Excerpt",
      args: {
        language_code: stringArg(),
      },
      resolve: async (parent, { language_code }, ctx) => {
        const all_translations = await ctx.prisma.source
          .findOne({
            where: { source_id: parent.source_id },
          })
          .excerpts();
        for (const i in all_translations) {
          const language = await ctx.prisma.language.findOne({
            where: { language_id: all_translations[i]["language_id"] },
          });
          if (language["language_code"] == language_code) {
            return all_translations[i];
          }
        }
        return "nil";
      },
    });
  },
});

module.exports = {
  Excerpt,
};
