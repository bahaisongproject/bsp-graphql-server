# A GraphQL server for bahá'í song project

The bahá'í song project GraphQL server provides a flexible way for accessing information about the songs currently published on bahá'í song project.

Access the GraphQL Playground at https://bsp-graphql-server.herokuapp.com/.

1. Clone repo with `git clone git@github.com:bahaisongproject/bsp-graphql-server.git`
1. `cd` into repo with `cd bsp-graphql-server`
1. Use correct node version: `nvm use`
1. Install dependencies: `npm install`

What you can do now

- Start node app with `npm run dev`. You can access the GraphQL Playground at `http://localhost:4000/`
- Open Prisma studio with `npx prisma studio --experimental`. This should open a page at `http://localhost:5555/`

Changing the database schema

1. Change database schema (directly in sqlite3 or using an application such as DB Browser for SQLite)
1. Adapt `prisma/schema.prisma` to reflect changes in database. If you want you can also run `npx prisma introspect` to automatically change the `prisma/schema.prisma`. In that case you need to make a backup of `prisma/schema.prisma` beforehand and reapply custom changes manually.
1. Regenerate Prisma client (after changing database schema) with `npx prisma generate`. This updates the Prisma Client in `node_modules`.
1. Update types in `src/types` to reflect new database schema. Running `np run dev` will start the server and use the nexus-prisma plugin to generate `schema.graphql` based on the new schema.
1. Since Heroku reuses the cached `node_modules` if the package.json does not change, but we change the Prisma Client in `node_modules` with `npx prisma generate`, we have to force Heroku to rebuild packages after changing the database schema. Install heroku-repo with `heroku plugins:install heroku-repo` and then purge cache with `heroku repo:purge_cache -a bsp-graphql-server` before commiting
