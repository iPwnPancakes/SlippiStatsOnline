import { SlippiGame } from "./SlippiGame";
import { SlippiGameMetadata } from "./SlippiGameMetadata";
import { Player } from "./Player";
import { PlayerTag } from "./PlayerTag";
import { Result } from "../core/Result";
import { lookupStageByValue, Stages } from "./Stages";
import { PlayerGameData } from "./PlayerGameData";
import { lookupCharacterByValue } from "./Characters";

export class SlippiGameFactory {
    public createFromDTO(dto: any): Result<SlippiGame> {
        const createPlayer1TagResult = PlayerTag.create({ tag: dto.player1?.tag });
        const createPlayer2TagResult = PlayerTag.create({ tag: dto.player2?.tag });

        if (createPlayer1TagResult.isFailure || createPlayer2TagResult.isFailure) {
            return Result.fail(createPlayer1TagResult.isFailure ? createPlayer1TagResult.error.toString() : createPlayer2TagResult.error.toString());
        }

        const createPlayer1Result = Player.create({
            username: dto.player1?.username,
            tag: createPlayer1TagResult.getValue()
        });
        const createPlayer2Result = Player.create({
            username: dto.player2?.username,
            tag: createPlayer2TagResult.getValue()
        });

        if (createPlayer1Result.isFailure || createPlayer2Result.isFailure) {
            return Result.fail(createPlayer1Result.isFailure ? createPlayer1Result.error.toString() : createPlayer2Result.error.toString());
        }

        const p1Character = lookupCharacterByValue(dto.p1GameData.character);
        const p2Character = lookupCharacterByValue(dto.p2GameData.character);
        if (!p1Character) {
            return Result.fail('Invalid Character ID for player 1');
        } else if (!p2Character) {
            return Result.fail('Invalid Character ID for player 2');
        }

        const createPlayer1GameData = PlayerGameData.create({
            player: createPlayer1Result.getValue(),
            character: p1Character,
            stocksTaken: dto.p1GameData.stocksTaken,
            stocksRemaining: dto.p1GameData.stocksRemaining,
            apm: dto.p1GameData.apm,
            totalPercentDamage: dto.p1GameData.totalPercentDamage,
            totalOpenings: dto.p1GameData.totalOpenings,
            totalNeutralInteractionsWon: dto.p1GameData.totalNeutralInteractionsWon,
            totalNeutralInteractionsLost: dto.p1GameData.totalNeutralInteractionsLost,
            totalSuccessfulConversions: dto.p1GameData.totalSuccessfulConversions,
            totalMissedConversions: dto.p1GameData.totalMissedConversions,
            totalCounterHits: dto.p1GameData.totalCounterHits,
            totalNegativeCounterHits: dto.p1GameData.totalNegativeCounterHits,
            totalBeneficialTrades: dto.p1GameData.totalBeneficialTrades,
            totalNegativeTrades: dto.p1GameData.totalNegativeTrades
        });

        const createPlayer2GameData = PlayerGameData.create({
            player: createPlayer2Result.getValue(),
            character: p2Character,
            stocksTaken: dto.p2GameData.stocksTaken,
            stocksRemaining: dto.p2GameData.stocksRemaining,
            apm: dto.p2GameData.apm,
            totalPercentDamage: dto.p2GameData.totalPercentDamage,
            totalOpenings: dto.p2GameData.totalOpenings,
            totalNeutralInteractionsWon: dto.p2GameData.totalNeutralInteractionsWon,
            totalNeutralInteractionsLost: dto.p2GameData.totalNeutralInteractionsLost,
            totalSuccessfulConversions: dto.p2GameData.totalSuccessfulConversions,
            totalMissedConversions: dto.p2GameData.totalMissedConversions,
            totalCounterHits: dto.p2GameData.totalCounterHits,
            totalNegativeCounterHits: dto.p2GameData.totalNegativeCounterHits,
            totalBeneficialTrades: dto.p2GameData.totalBeneficialTrades,
            totalNegativeTrades: dto.p2GameData.totalNegativeTrades
        });

        if (createPlayer1GameData.isFailure || createPlayer2GameData.isFailure) {
            return createPlayer1GameData.isFailure ? Result.fail(createPlayer1GameData.error.toString()) : Result.fail(createPlayer2GameData.error.toString());
        }

        const victoriousPlayer = dto.metadata.victoriousPlayer === createPlayer1TagResult.getValue().props.tag ? createPlayer1Result.getValue() : createPlayer2Result.getValue();
        const stage = lookupStageByValue(dto.metadata.stage);

        if (!stage) {
            return Result.fail('Invalid Stage ID');
        }

        const createMetadataResult = SlippiGameMetadata.create({
            date: dto.metadata.date,
            victoriousPlayer: victoriousPlayer,
            lraStart: dto.metadata.lraStart,
            timeout: dto.metadata.timeout,
            wasFourStock: dto.metadata.wasFourStock,
            stage: stage,
            totalFrames: dto.metadata.totalFrames
        });

        if (createMetadataResult.isFailure) {
            return Result.fail(createMetadataResult.error.toString());
        }

        const game = new SlippiGame({
            id: dto.id,
            metadata: createMetadataResult.getValue(),
            p1GameData: createPlayer1GameData.getValue(),
            p2GameData: createPlayer2GameData.getValue()
        });

        return Result.ok(game);
    }
}
