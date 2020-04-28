const { objectType } = require("nexus");

const Performance = objectType({
  name: "Performance",
  definition(t) {
    t.model.performance_id();
    t.model.main_performance();
    t.model.published();
    t.model.youtube_id();
    t.model.soundcloud_id();
    t.model.content_url();
    t.model.performance_prio();
    t.model.song();
    t.model.contributors({
      pagination: false,
    });
  },
});

module.exports = {
  Performance,
};
