const { objectType, stringArg } = require("nexus");
const moment = require("moment");

const Performance = objectType({
  name: "Performance",
  definition(t) {
    t.model.performance_id();
    t.model.published();
    t.model.performance_description();
    t.model.content_url();
    t.model.performance_prio();
    t.model.song();
    t.model.contributors({
      pagination: false,
    });
    t.string("created_at", {
      args: {
        formatString: stringArg(),
      },
      nullable: true,
      resolve: async (parent, { formatString }, ctx) => {
        const song = await ctx.prisma.performance.findOne({
          where: { performance_id: parent.performance_id },
        });
        dateStr = song.created_at;
        formatString = formatString ? formatString : null;
        dateFormatted = moment(dateStr).format(formatString);
        return dateFormatted;
      },
    });
  },
});

module.exports = {
  Performance,
};
