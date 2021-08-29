import { gql } from 'apollo-server';

export const SlippiGameMetadata = gql`
    type SlippiGameMetadata {
        win: Player
        lraStart: Boolean
        timeout: Boolean
        stage: Stage
        date: DateTime
        totalFrames: Int
        fourStock: Boolean
    }
`;
