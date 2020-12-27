import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";

import GraphQLJSON from "graphql-type-json";
import { typeDefs } from "./typeDefs";
import { buildDataLoaders } from "./dataLoaders";

import { Song } from "./resolvers/Song";
import { Mutation } from "./resolvers/Mutation";
import { Query } from "./resolvers/Query";

const resolvers = {
  JSON: GraphQLJSON,

  Song: Song.resolver,

  Query: Query.resolver,
  Mutation: Mutation.resolver,
};

const dataLoaders = {
  Song: Song.loader,
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    dataLoaders: buildDataLoaders(dataLoaders),
  }),
  uploads: false,
  subscriptions: "/song/graphql",
  playground: {
    endpoint: "/song/graphql",
    settings: {
      "editor.theme": "dark",
    },
  },
});

export const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
