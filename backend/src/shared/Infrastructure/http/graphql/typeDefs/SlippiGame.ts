import { gql } from "apollo-server";

export const SlippiGame = gql`
    type SlippiGame {
        metadata: SlippiGameMetadata
        playerStats: [PlayerGameData]
    }
`;