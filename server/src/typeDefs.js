import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar JSON

  type Song {
    id: Int!
    title: String!
    artist: String!
    album: String
    url: String
    content: JSON
  }

  type Query {
    allSongs: [Song!]!
  }

  type Mutation {
    createSong(payload: JSON!): Song!
    updateSong(id: Int!, payload: JSON!): Song!
    deleteSong(id: Int!): Int
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
