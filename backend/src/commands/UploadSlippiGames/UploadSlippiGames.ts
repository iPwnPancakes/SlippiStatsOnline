import { UseCase } from '../../core/UseCase';
import { left, right } from '../../core/Either';
import { FileParserFactory } from '../../services/SlippiFileParser/FileParserFactory';
import { File } from '../../models/File';
import { ISlippiGameRepository } from '../../repositories/ISlippiGameRepository';
import { UploadSlippiGamesResponse } from './UploadSlippiGamesResponse';
import { FileNotParseableError, UnsupportedFileParserError } from './UploadSlippiGamesErrors';
import { Result } from '../../core/Result';

export class UploadSlippiGames implements UseCase<UploadSlippiGamesDTO, Promise<UploadSlippiGamesResponse>> {
    public constructor(
        private parserFactory: FileParserFactory,
        private slippiGameRepository: ISlippiGameRepository
    ) {}

    async execute({ extension, data, filename }: UploadSlippiGamesDTO): Promise<UploadSlippiGamesResponse> {
        const createFileModelResult = File.create({ extension, data, filename });
        if (createFileModelResult.isFailure) {
            return left(createFileModelResult);
        }

        const file = createFileModelResult.getValue();
        const parser = this.parserFactory.makeParser(file);

        if (parser === null) {
            return left(new UnsupportedFileParserError());
        }

        const parseResult = parser.parse(file);
        if (parseResult.isFailure) {
            return left(new FileNotParseableError());
        }

        const response = parseResult.getValue();
        await this.slippiGameRepository.saveBulk(response.games);

        return right(Result.ok(null));
    }
}
