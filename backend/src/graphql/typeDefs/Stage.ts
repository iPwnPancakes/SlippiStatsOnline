import { gql } from 'apollo-server';

export const Stage = gql`
    enum Stage {
        FOD
        STADIUM
        YOSHIS
        DREAMLAND
        BATTLEFIELD
        FD
    }
`;