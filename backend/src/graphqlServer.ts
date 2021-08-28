import { ApolloServer, gql } from "apollo-server";
import { Character } from "./graphql/typeDefs/Character";
import { Stage } from "./graphql/typeDefs/Stage";
import { Player } from "./graphql/typeDefs/Player";
import { PlayerGameData } from "./graphql/typeDefs/PlayerGameData";
import { SlippiGameMetadata } from "./graphql/typeDefs/SlippiGameMetadata";
import { SlippiGame } from "./graphql/typeDefs/SlippiGame";
import { DateTimeResolver } from "graphql-scalars";
import { GetGamesByTag } from "./commands/GetGamesByTag/GetGamesByTag";
import { connectionFactory } from "./database/mongodb/connectionFactory";
import { MongoDbSlippiGameRepository } from "./repositories/Implementations/MongoDbSlippiGameRepository";
import { SlippiGameMapper } from "./repositories/DataMappers/SlippiGameMapper";
import { config } from 'dotenv';
import { toObject as charactersToObject } from "./models/Characters";
import { toObject as stagesToObject } from "./models/Stages";

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
            Character: charactersToObject(),
            Stage: stagesToObject(),
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
