  
const { objectType } = require('nexus')

const Contributor = objectType({
    name: 'Contributor',
    definition(t) {
      t.model.contributor_id()
      t.model.contributor_name()
      t.model.contributor_url()
      t.model.performances({
        pagination: false,
      })
      t.model.songs({
        pagination: false,
      })
    },
  })

module.exports = {
    Contributor,
}