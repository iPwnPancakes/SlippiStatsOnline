import { gql } from "apollo-server";

export const SlippiGame = gql`
    type SlippiGame {
        id: String
        metadata: SlippiGameMetadata
        playerStats: [PlayerGameData]
    }

    extend type Query {
        GetSlippiGamesByTag(tag: String): [SlippiGame]
    }
`;
