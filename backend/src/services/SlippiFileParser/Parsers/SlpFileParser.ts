import { SlippiGame as SlippiGameModel } from "../../../models/SlippiGame";
import { SlippiGame } from "@slippi/slippi-js";
import { Player } from "../../../models/Player";
import { PlayerTag } from "../../../models/PlayerTag";
import { ISlippiFileParser, ParseResponse } from "./ISlippiFileParser";
import { File } from "../../../models/File";
import { Result } from "../../../core/Result";

export class SlpFileParser implements ISlippiFileParser {
    parse(file: File): Result<ParseResponse> {
        let game: SlippiGame;

        try {
            game = new SlippiGame(file.props.data);
        } catch (e) {
            console.error(e);
            return Result.fail('Could not parse the file');
        }

        const playerDomainModels = game.getSettings().players.map((player, index) => {
            const tagResult = PlayerTag.create({ tag: player.nametag });

            if (tagResult.isFailure) {
                return tagResult;
            }

            const username = game.getMetadata().players[index].names.code;
            return Player.create({ tag: tagResult.getValue(), username });
        });

        if (playerDomainModels.some(result => result.isFailure)) {
            const failedResult = playerDomainModels.find(result => result.isFailure);
            console.error(failedResult.error);

            return Result.fail('System is not compatible with your slp file');
        }

        return Result.fail('Not yet implemented');
    }
}
