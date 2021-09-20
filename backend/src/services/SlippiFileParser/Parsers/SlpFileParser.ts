import { ISlippiFileParser, ParseResult } from './ISlippiFileParser';
import { File } from '../../../models/File';
import { Result } from '../../../core/Result';
import { SlippiGameFactory } from '../../../models/SlippiGameFactory';
import { SlippiJsGameFactory } from './SlippiJsGameFactory';
import { SlippiJsGameMapper } from './SlippiJsGameMapper';

export class SlpFileParser implements ISlippiFileParser {
    constructor(
        private slippiGameFactory: SlippiGameFactory,
        private slippiJsGameFactory: SlippiJsGameFactory,
        private slippiJsGameMapper: SlippiJsGameMapper
    ) {}

    parse(file: File): Result<ParseResult> {
        let game;

        try {
            game = this.slippiJsGameFactory.fromBuffer(file.props.data);
        } catch (e) {
            console.error(e);
            return Result.fail('Could not parse the file');
        }

        const createSlippiModelResult = this.slippiJsGameMapper.toDomainModel(game);
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
