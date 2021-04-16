const { objectType } = require("nexus");

const Performance = objectType({
  name: "Performance",
  definition(t) {
    t.model.performance_id();
    t.model.main_performance();
    t.model.published();
    t.model.performance_description();
    t.model.content_url();
    t.model.performance_prio();
    t.model.song();
    t.model.contributors({
      pagination: false,
    });
    t.model.created_at();
  },
});

module.exports = {
  Performance,
};
