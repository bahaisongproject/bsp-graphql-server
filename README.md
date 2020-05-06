# A GraphQL server for bahá'í song project

The bahá'í song project GraphQL server provides a flexible way for accessing information about the songs currently published on bahá'í song project.

Checkout the bahá'í song project API at http://api.bahaisongproject.com/.

1. Clone repo with `git clone git@github.com:bahaisongproject/bsp-graphql-server.git`
1. `cd` into repo with `cd bsp-graphql-server`
1. Use correct node version: `nvm use`
1. Install dependencies: `yarn`

## What you can do now

- Start node app with `yarn run dev`. You can access the GraphQL Playground at `http://localhost:4000/`
- Open Prisma studio with `npx prisma studio --experimental`. This should open a page at `http://localhost:5555/`

## Changing the database schema

1. Change database schema (directly in sqlite3 or using an application such as DB Browser for SQLite)
1. Adapt `prisma/schema.prisma` to reflect changes in database. If you want you can also run `npx prisma introspect` to automatically change the `prisma/schema.prisma`. In that case you need to make a backup of `prisma/schema.prisma` beforehand and reapply custom changes manually.
1. Regenerate Prisma client (after changing database schema) with `npx prisma generate`. This updates the Prisma Client in `node_modules`.
1. Update types in `src/types` to reflect new database schema. Running `yarn run dev` will start the server and use the nexus-prisma plugin to generate `schema.graphql` based on the new schema.
1. Since Heroku reuses the cached `node_modules` if the package.json does not change, but we change the Prisma Client in `node_modules` with `npx prisma generate`, we have to force Heroku to rebuild packages after changing the database schema. Install heroku-repo with `heroku plugins:install heroku-repo` and then purge cache with `heroku repo:purge_cache -a bsp-graphql-server` before pushing
1. When using with Gatsby: Remove .cache of Gatsby development server and start again `rm -rf .cache && yarn run dev`

## Querying the API
The following queries are possible:
```
type Query {
  contributor(where: ContributorWhereUniqueInput!): Contributor
  contributors: [Contributor!]!
  excerpt(where: ExcerptWhereUniqueInput!): Excerpt
  excerpts: [Excerpt!]!
  language(where: LanguageWhereUniqueInput!): Language
  languages: [Language!]!
  performance(where: PerformanceWhereUniqueInput!): Performance
  performances: [Performance!]!
  song(where: SongWhereUniqueInput!): Song
  songs: [Song!]!
  source(where: SourceWhereUniqueInput!): Source
  sources: [Source!]!
  tag(where: TagWhereUniqueInput!): Tag
  tags: [Tag!]!
}
```

### Example queries
Get all songs and associated performances
```
query {
  songs {
    title
    performances {
      content_url
    }
  }
}
```

Get all songs, the song contributors, performance urls, and excerpts upon which the songs are based
```
query {
  songs {
    contributors {
      contributor_name
    }
    performances {
      content_url
    }
    excerpts {
      source {
        source_author
        source_description
      }
      excerpt_text
    }
  }
}
```

### Types
#### Contributor
```
type Contributor {
  contributor_id: Int!
  contributor_name: String
  contributor_url: String
  performances: [Performance!]!
  songs: [Song!]!
}

input ContributorWhereUniqueInput {
  contributor_id: Int
}
```

#### Excerpt
```
type Excerpt {
  excerpt_id: Int!
  excerpt_text: String
  excerpt_transliteration: String
  language: Language
  songs: [Song!]!
  source: Source
}

input ExcerptWhereUniqueInput {
  excerpt_id: Int
}
```

#### Language
```
type Language {
  excerpts: [Excerpt!]!
  language_code: String
  language_id: Int!
  language_name_en: String
  language_name_native: String
  songs: [Song!]!
}

input LanguageWhereUniqueInput {
  language_id: Int
}
```

#### Performance
```
type Performance {
  content_url: String
  contributors: [Contributor!]!
  main_performance: String
  performance_description: String
  performance_id: Int!
  performance_prio: Int
  published: String
  song: Song
  soundcloud_id: String
  youtube_id: String
}

input PerformanceWhereUniqueInput {
  performance_id: Int
}
```

#### Song
```
type Song {
  contributors: [Contributor!]!
  excerpts: [Excerpt!]!
  languages: [Language!]!
  performances: [Performance!]!
  slug: String!
  song_description: String
  song_id: Int!
  sources: [Source!]!
  tags: [Tag!]!
  title: String
}

input SongWhereUniqueInput {
  slug: String
  song_id: Int
}
```

#### Source
```
type Source {
  excerpts: [Excerpt!]!
  songs: [Song!]!
  source_author: String
  source_description: String
  source_id: Int!
}

input SourceWhereUniqueInput {
  source_id: Int
}
```

#### Tag
```
type Tag {
  songs: [Song!]!
  tag_description: String
  tag_id: Int!
  tag_name: String
}
```