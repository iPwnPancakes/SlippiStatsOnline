import { ApolloServer, gql } from "apollo-server";
import { Character } from "./graphql/typeDefs/Character";
import { Stage } from "./graphql/typeDefs/Stage";

const basicTypeDefs = gql`
    scalar DateTime
`;

const server = new ApolloServer({
    typeDefs: [
        basicTypeDefs,
        Character,
        Stage
    ]
})