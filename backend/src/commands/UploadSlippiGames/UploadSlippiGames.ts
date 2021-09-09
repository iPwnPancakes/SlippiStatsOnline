import { UseCase } from "../../core/UseCase";
import { left, right } from "../../core/Either";
import { FileParserFactory } from "../../services/SlippiFileParser/FileParserFactory";
import { File } from "../../models/File";
import { ISlippiGameRepository } from "../../repositories/ISlippiGameRepository";
import { UploadSlippiGamesResponse } from "./UploadSlippiGamesResponse";
import { UploadSlippiGamesErrors } from "./UploadSlippiGamesErrors";

export class UploadSlippiGames implements UseCase<UploadSlippiGamesDTO, Promise<UploadSlippiGamesResponse>> {
    public constructor(
        private parserFactory: FileParserFactory,
        private slippiGameRepository: ISlippiGameRepository
    ) {}

    async execute(request: UploadSlippiGamesDTO): Promise<UploadSlippiGamesResponse> {
        const createFileModelResult = File.create({ extension: request.extension, data: request.data });
        if (createFileModelResult.isFailure) {
            return left(createFileModelResult);
        }

        const file = createFileModelResult.getValue();
        const parser = this.parserFactory.makeParser(file);

        if (parser === null) {
            return left(new UploadSlippiGamesErrors.UnsupportedFileParserError());
        }

        const parseResult = parser.parse(file);
        if (parseResult.isLeft()) {
            return left(new UploadSlippiGamesErrors.FileNotParseableError());
        }

        await this.slippiGameRepository.saveBulk(parseResult.value);

        return right(null);
    }
}
