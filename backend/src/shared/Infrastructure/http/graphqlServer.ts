import { ApolloServer, gql } from "apollo-server";
import { Character } from "./graphql/typeDefs/Character";
import { Stage } from "./graphql/typeDefs/Stage";
import { Player } from "./graphql/typeDefs/Player";
import { PlayerGameData } from "./graphql/typeDefs/PlayerGameData";
import { SlippiGameMetadata } from "./graphql/typeDefs/SlippiGameMetadata";
import { SlippiGame } from "./graphql/typeDefs/SlippiGame";
import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars";
import { GetGamesByTag } from "../../../modules/SlippiGames/UseCases/GameMatches/GetGamesByTag/GetGamesByTag";
import { connectionFactory } from "../database/mongodb/connectionFactory";
import { MongoDbSlippiGameRepository } from "../../../modules/SlippiGames/Repositories/Implementations/MongoDbSlippiGameRepository";
import { SlippiGameMapper } from "../../../modules/SlippiGames/DataMappers/SlippiGameMapper";
import { config } from 'dotenv';
import { Characters } from "../../../modules/SlippiGames/Domain/Characters";
import { Stages } from "../../../modules/SlippiGames/Domain/Stages";

const basicTypeDefs = gql`
    scalar DateTime

    type Query {
        _blank: String
    }
`;

async function createGraphQlServer(): Promise<ApolloServer> {
    config();
    const mongoDbUri: string | undefined = process.env.MONGO_DB_URI;
    if (mongoDbUri === undefined || mongoDbUri === '') {
        throw new Error('MongoDB URI is not set');
    }

    const dbConnection = await connectionFactory(mongoDbUri);
    const slippiGameMapper = new SlippiGameMapper();
    const mongoSlippiGameRepository = new MongoDbSlippiGameRepository(dbConnection, slippiGameMapper);
    const getGamesByTagUseCase = new GetGamesByTag(mongoSlippiGameRepository);

    return new ApolloServer({
        typeDefs: [
            basicTypeDefs,
            Character,
            Stage,
            Player,
            PlayerGameData,
            SlippiGameMetadata,
            SlippiGame
        ],
        resolvers: {
            DateTime: DateTimeResolver,
            Character: {
                C_FALCON: 0,
                DK: 1,
                FOX: 2,
                GAME_WATCH: 3,
                KIRBY: 4,
                BOWSER: 5,
                LINK: 6,
                LUIGI: 7,
                MARIO: 8,
                MARTH: 9,
                MEWTWO: 10,
                NESS: 11,
                PEACH: 12,
                PIKACHU: 13,
                ICE_CLIMBERS: 14,
                JIGGLYPUFF: 15,
                SAMUS: 16,
                YOSHI: 17,
                ZELDA: 18,
                SHEIK: 19,
                FALCO: 20,
                Y_LINK: 21,
                DR_MARIO: 22,
                ROY: 23,
                PICHU: 24,
                GANON: 25
            },
            Stage: {
                FOD: 2,
                STADIUM: 3,
                YOSHIS: 3,
                DREAMLAND: 28,
                BATTLEFIELD: 31,
                FD: 32
            },
            Query: {
                async GetSlippiGamesByTag(_, args) {
                    const response = await getGamesByTagUseCase.execute({ playerTag: args.tag });

                    if (response.isLeft()) {
                        throw response.value;
                    }

                    const games = response.value.getValue();
                    return games.map(game => slippiGameMapper.toDTO(game));
                }
            }
        }
    });
}

createGraphQlServer().then(server => {
    server.listen().then(({ url }) => {
        console.log('Server ready at ' + url);
    });
});
