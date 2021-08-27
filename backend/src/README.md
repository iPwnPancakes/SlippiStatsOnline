# Folder Structure
- /commands
  - A Command encapsulates a single operation. These are meant to be used by the REST Api as well as the GraphQL server
- /core
  - Core files are shared around the project
- /database
  - Database configs & ORM/ODM models go here
- /graphql
  - This is where the gql TypeDefs live
- /models
  - All the model classes in the system live here
- /repositories
  - All the classes we use to access the data in a database live here
- /restApi
  - The Rest Api routers/controllers live here

## Servers
These are the files that start up each individual server
- GraphQL Server: graphqlServer.ts
- Express Rest API Server: httpServer.ts