import { SlippiGame as SlippiGameFile } from "@slippi/slippi-js";
import { ISlippiFileParser, ParseResult } from "./ISlippiFileParser";
import { File } from "../../../models/File";
import { Result } from "../../../core/Result";
import { SlippiGameFactory } from "../../../models/SlippiGameFactory";

export class SlpFileParser implements ISlippiFileParser {
    constructor(private slippiGameFactory: SlippiGameFactory) {}

    parse(file: File): Result<ParseResult> {
        let game: SlippiGameFile;

        try {
            game = new SlippiGameFile(file.props.data);
        } catch (e) {
            console.error(e);
            return Result.fail('Could not parse the file');
        }

        const player1 = game.getSettings().players[0];
        const player2 = game.getSettings().players[1];

        const players = {
            player1: {
                username: player1.displayName,
                tag: player1.nametag
            },
            player2: {
                username: player2.displayName,
                tag: player1.nametag
            }
        };

        const dto = { players };

        const createSlippiModelResult = this.slippiGameFactory.createFromDTO(dto);

        if (createSlippiModelResult.isFailure) {
            return Result.fail(createSlippiModelResult.error.toString());
        }

        return Result.ok({
            successfullyParsedFilenames: [file.props.filename],
            failedToParseFilenames: [],
            games: [createSlippiModelResult.getValue()]
        });
    }
}
