import { gql } from "apollo-server";

export const PlayerGameData = gql`
    type PlayerGameData {
        player: Player
        character: Character
        stocksTaken: Int
        stocksLost: Int
        apm: Float
        totalDamageDealt: Float
        totalOpenings: Int
        totalNeutralInteractionsWon: Int
        totalNeutralInteractionsLost: Int
        totalSuccessfulConversions: Int
        totalMissedConversions: Int
        totalCounterHits: Int
        totalNegativeCounterHits: Int
        totalBeneficialTrades: Int
        totalNegativeTrades: Int
    }
`;
