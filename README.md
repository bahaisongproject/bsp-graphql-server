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
2. Adapt `prisma/schema.prisma` to reflect changes in database. If you want you can also run `npx prisma introspect` to automatically change the `prisma/schema.prisma`. In that case you need to make a backup of `prisma/schema.prisma` beforehand and reapply custom changes manually.
3. Regenerate Prisma client (after changing database schema) with `npx prisma generate`.