  
const { objectType } = require('nexus')

const Excerpt = objectType({
    name: 'Excerpt',
    definition(t) {
        t.model.excerpt_id()
        t.model.excerpt_text()
        t.model.language()
        t.model.source()
        t.model.songs({
            pagination: false,
        })
    },
})

module.exports = {
    Excerpt,
}