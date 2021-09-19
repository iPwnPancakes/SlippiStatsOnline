import { UploadSlippiGames } from '../UploadSlippiGames/UploadSlippiGames';
import { It, Mock } from 'moq.ts';
import { FileParserFactory } from '../../services/SlippiFileParser/FileParserFactory';
import { ISlippiGameRepository } from '../../repositories/ISlippiGameRepository';
import { FileNotParseableError, UnsupportedFileParserError } from '../UploadSlippiGames/UploadSlippiGamesErrors';
import { ISlippiFileParser } from '../../services/SlippiFileParser/Parsers/ISlippiFileParser';
import { Result } from '../../core/Result';

describe('UseCase: UploadSlippiGames', () => {
    test('should fail when missing parser', async () => {
        const fakeParserFactory = new Mock<FileParserFactory>()
            .setup(parserFactory => parserFactory.makeParser(It.IsAny()))
            .returns(null)
            .object();
        const fakeSlippiFileRepository = new Mock<ISlippiGameRepository>().object();
        const fakeBuffer = new Mock<Buffer>().object();
        const useCase = new UploadSlippiGames(fakeParserFactory, fakeSlippiFileRepository);

        const result = await useCase.execute({ extension: 'csv', data: fakeBuffer, filename: 'someFileName.csv' });
        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(UnsupportedFileParserError);
    });

    test('should fail when we could not parse the file', async () => {
        const fakeParserInstance = new Mock<ISlippiFileParser>()
            .setup(parser => parser.parse(It.IsAny()))
            .returns(Result.fail('Some reason'))
            .object();
        const fakeParserFactory = new Mock<FileParserFactory>()
            .setup(parserFactory => parserFactory.makeParser(It.IsAny()))
            .returns(fakeParserInstance)
            .object();
        const fakeSlippiFileRepository = new Mock<ISlippiGameRepository>().object();
        const fakeBuffer = new Mock<Buffer>().object();
        const useCase = new UploadSlippiGames(fakeParserFactory, fakeSlippiFileRepository);

        const result = await useCase.execute({ extension: 'csv', data: fakeBuffer, filename: 'someFileName.csv' });
        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(FileNotParseableError);
    });

    test('should save parsed files', async () => {
        const fakeParser = new Mock<ISlippiFileParser>()
            .setup(parser => parser.parse(It.IsAny()))
            .returns(
                Result.ok({
                    games: [],
                    failedToParseFilenames: [],
                    successfullyParsedFilenames: []
                })
            )
            .object();
        const fakeParserFactory = new Mock<FileParserFactory>()
            .setup(parserFactory => parserFactory.makeParser(It.IsAny()))
            .returns(fakeParser)
            .object();
        const fakeSlippiFileRepository = new Mock<ISlippiGameRepository>()
            .setup(repo => repo.saveBulk(It.IsAny()))
            .returns(Promise.resolve([]))
            .object();
        const fakeBuffer = new Mock<Buffer>().object();
        const useCase = new UploadSlippiGames(fakeParserFactory, fakeSlippiFileRepository);

        const result = await useCase.execute({ extension: 'csv', data: fakeBuffer, filename: 'someFileName.csv' });
        expect(result.isRight()).toBeTruthy();
        expect(result.value).toEqual(Result.ok(null));
    });
});
