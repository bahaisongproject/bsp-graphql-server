const { objectType } = require("nexus");

const Tag = objectType({
  name: "Tag",
  definition(t) {
    t.model.tag_id();
    t.model.tag_name();
    t.model.tag_description();
    t.model.tag_slug();
    t.model.songs({
      pagination: false,
    });
  },
});

module.exports = {
  Tag,
};
