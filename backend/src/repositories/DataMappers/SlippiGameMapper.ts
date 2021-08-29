import { SlippiGame } from "../../models/SlippiGame";
import { PlayerGameData } from "../../models/PlayerGameData";
import { Player } from "../../models/Player";
import { PlayerTag } from "../../models/PlayerTag";
import { Characters, lookupCharacterByValue } from "../../models/Characters";
import { Result } from "../../core/Result";
import { SlippiGameMetadata } from "../../models/SlippiGameMetadata";
import { lookupStageByValue } from "../../models/Stages";

export class SlippiGameMapper {
    public toDomain(raw: any): SlippiGame | null {
        const p1Tag = PlayerTag.create({ tag: raw.p1Tag });
        const p2Tag = PlayerTag.create({ tag: raw.p2Tag });

        if (p1Tag.isFailure || p2Tag.isFailure) {
            return null;
        }

        const p1 = Player.create({ tag: p1Tag.getValue(), username: raw.p1Code });
        const p2 = Player.create({ tag: p2Tag.getValue(), username: raw.p2Code });

        if (p1.isFailure || p2.isFailure) {
            return null;
        }

        const p1Character = lookupCharacterByValue(raw.p1Character);
        const p2Character = lookupCharacterByValue(raw.p2Character);

        if (p1Character === null || p2Character === null) {
            return null;
        }

        const player1Data = SlippiGameMapper.rawToPlayerGameData(1, p1.getValue(), p1Character, raw);
        const player2Data = SlippiGameMapper.rawToPlayerGameData(2, p2.getValue(), p1Character, raw);

        if (player1Data.isFailure || player2Data.isFailure) {
            return null;
        }

        const playerWinNumber = raw.win;
        if (raw.win !== 1 && raw.win !== 2) {
            return null;
        }

        const stage = lookupStageByValue(raw.stage);
        if (!stage) {
            return null;
        }

        const metadata = SlippiGameMetadata.create({
            date: raw.date,
            victoriousPlayer: playerWinNumber === 1 ? p1.getValue() : p2.getValue(),
            lraStart: raw.lraStart,
            timeout: raw.timeout,
            wasFourStock: raw.fourStocks,
            stage: stage,
            totalFrames: raw.numFrames
        });

        if (metadata.isFailure) {
            return null;
        }

        return new SlippiGame({
            id: raw.id,
            metadata: metadata.getValue(),
            p1GameData: player1Data.getValue(),
            p2GameData: player2Data.getValue()
        });
    }

    public toPersistence(game: SlippiGame): any {
        const metadata = game.getMetadata();
        const p1 = game.getP1GameData().getPlayer();

        return {
            _id: game.getID(),
            win: game.getMetadata().getWinner().isEqual(p1) ? 1 : 2,
            lraStart: metadata.wasLraStarted(),
            timeout: metadata.wasLraStarted(),
            stage: metadata.getStage(),
            date: metadata.getDate(),
            numFrames: metadata.getTotalFrames(),
            fourStocks: metadata.props.wasFourStock,
            ...SlippiGameMapper.playerGameDataToPersistence(1, game.getP1GameData()),
            ...SlippiGameMapper.playerGameDataToPersistence(2, game.getP2GameData())
        };
    }

    private static rawToPlayerGameData(playerNumber: number, player: Player, character: Characters, raw: any): Result<PlayerGameData> {
        return PlayerGameData.create({
            player,
            character,
            stocksTaken: raw[`p${ playerNumber }StocksTaken`],
            stocksRemaining: raw[`p${ playerNumber }StockDifferential`],
            totalPercentDamage: raw[`p${ playerNumber }TotalDamage`],
            apm: raw[`p${ playerNumber }Apm`],
            totalOpenings: raw[`p${ playerNumber }Openings`],
            totalNeutralInteractionsWon: raw[`p${ playerNumber }NeutralWins`],
            totalNeutralInteractionsLost: raw[`p${ playerNumber }NeutralLosses`],
            totalSuccessfulConversions: raw[`p${ playerNumber }Conversions`],
            totalMissedConversions: raw[`p${ playerNumber }MissedConversions`],
            totalCounterHits: raw[`p${ playerNumber }CounterHits`],
            totalNegativeCounterHits: raw[`p${ playerNumber }NegativeCounterHits`],
            totalBeneficialTrades: raw[`p${ playerNumber }BeneficialTrades`],
            totalNegativeTrades: raw[`p${ playerNumber }NegativeTrades`],
        });
    }

    private static playerGameDataToPersistence(playerNumber: number, playerGameData: PlayerGameData): any {
        return {
            [`p${ playerNumber }Code`]: playerGameData.getPlayer().tag.toString(),
            [`p${ playerNumber }Tag`]: playerGameData.getPlayer().username,
            [`p${ playerNumber }Character`]: playerGameData.getCharacter(),
            [`p${ playerNumber }StocksTaken`]: playerGameData.props.stocksTaken,
            [`p${ playerNumber }StockDifferential`]: playerGameData.props.stocksRemaining,
            [`p${ playerNumber }TotalDamage`]: playerGameData.props.totalPercentDamage,
            [`p${ playerNumber }Apm`]: playerGameData.props.apm,
            [`p${ playerNumber }Openings`]: playerGameData.props.totalOpenings,
            [`p${ playerNumber }NeutralWins`]: playerGameData.props.totalNeutralInteractionsWon,
            [`p${ playerNumber }NeutralLosses`]: playerGameData.props.totalNeutralInteractionsLost,
            [`p${ playerNumber }Conversions`]: playerGameData.props.totalSuccessfulConversions,
            [`p${ playerNumber }MissedConversions`]: playerGameData.props.totalMissedConversions,
            [`p${ playerNumber }CounterHits`]: playerGameData.props.totalCounterHits,
            [`p${ playerNumber }NegativeCounterHits`]: playerGameData.props.totalNegativeCounterHits,
            [`p${ playerNumber }BeneficialTrades`]: playerGameData.props.totalBeneficialTrades,
            [`p${ playerNumber }NegativeTrades`]: playerGameData.props.totalNegativeTrades,
        };
    }

    public toDTO(game: SlippiGame): any {
        return {
            id: game.getID(),
            metadata: SlippiGameMapper.metadataToDTO(game.getMetadata()),
            playerStats: [
                SlippiGameMapper.playerGameDataToDTO(game.getP1GameData()),
                SlippiGameMapper.playerGameDataToDTO(game.getP2GameData())
            ]
        };
    }

    private static metadataToDTO(metadata: SlippiGameMetadata): any {
        return {
            win: SlippiGameMapper.playerToDTO(metadata.getWinner()),
            lraStart: metadata.wasLraStarted(),
            timeout: metadata.wasTimeout(),
            stage: metadata.getStage(),
            date: metadata.getDate(),
            totalFrames: metadata.getTotalFrames(),
            fourStock: metadata.props.wasFourStock
        };
    }

    private static playerToDTO(player: Player): any {
        return {
            username: player.username,
            tag: player.tag.toString()
        };
    }

    private static playerGameDataToDTO(playerGameData: PlayerGameData): any {
        return {
            player: SlippiGameMapper.playerToDTO(playerGameData.getPlayer()),
            character: playerGameData.getCharacter(),
            stocksTaken: playerGameData.props.stocksTaken,
            stocksRemaining: playerGameData.props.stocksRemaining,
            apm: playerGameData.props.apm,
            totalDamageDealt: playerGameData.props.totalPercentDamage,
            totalOpenings: playerGameData.props.totalOpenings,
            totalNeutralInteractionsWon: playerGameData.props.totalNeutralInteractionsWon,
            totalNeutralInteractionsLost: playerGameData.props.totalNeutralInteractionsLost,
            totalSuccessfulConversions: playerGameData.props.totalSuccessfulConversions,
            totalMissedConversions: playerGameData.props.totalMissedConversions,
            totalCounterHits: playerGameData.props.totalCounterHits,
            totalNegativeCounterHits: playerGameData.props.totalNegativeCounterHits,
            totalBeneficialTrades: playerGameData.props.totalBeneficialTrades,
            totalNegativeTrades: playerGameData.props.totalNegativeTrades,
        }
    }
}
