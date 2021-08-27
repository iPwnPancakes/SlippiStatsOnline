import { gql } from "apollo-server";

export const Player = gql`
    type Player {
        username: String
        tag: String
    }
`;