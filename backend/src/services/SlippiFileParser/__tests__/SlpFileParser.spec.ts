import { SlpFileParser } from '../Parsers/SlpFileParser';
import { It, Mock } from 'moq.ts';
import { SlippiGameFactory } from '../../../models/SlippiGameFactory';
import { SlippiJsGameFactory } from '../Parsers/SlippiJsGameFactory';
import { File } from '../../../models/File';
import { SupportedFileExtensionEnum } from '../../../models/SupportedFileExtensionEnum';
import { SlippiJsGameMapper } from '../Parsers/SlippiJsGameMapper';
import { Result } from '../../../core/Result';
import { SlippiGame } from '@slippi/slippi-js';
import { SlippiGame as SlippiGameDomainModel } from '../../../models/SlippiGame';

describe('Services: SlippiFileParser/Parsers/SlpFileParser', () => {
    test('should fail when given non-parsable slp file', () => {
        const slippiGameFactory = new Mock<SlippiGameFactory>().object();
        const slippiJsGameFactory = new Mock<SlippiJsGameFactory>()
            .setup(factory => factory.fromBuffer(It.IsAny()))
            .throws(new Error('Some error'))
            .object();
        const slippiJsGameMapper = new Mock<SlippiJsGameMapper>().object();

        const fakeBuffer = new Mock<Buffer>().object();
        const file = new Mock<File>()
            .setup(file => file.props)
            .returns({ filename: '', extension: SupportedFileExtensionEnum.SLP, data: fakeBuffer })
            .object();
        const slpFileParser = new SlpFileParser(slippiGameFactory, slippiJsGameFactory, slippiJsGameMapper);

        const result = slpFileParser.parse(file);
        expect(result.isFailure).toBeTruthy();
        expect(result.error).toBe('Could not parse the file');
    });

    test('should fail when file could not map to the slippi game domain model', () => {
        const failedMapResult: Result<SlippiGameDomainModel> = Result.fail('failed to map');

        const fakeSlippiJsGame = new Mock<SlippiGame>().object();
        const slippiGameFactory = new Mock<SlippiGameFactory>().object();
        const slippiJsGameFactory = new Mock<SlippiJsGameFactory>()
            .setup(factory => factory.fromBuffer(It.IsAny()))
            .returns(fakeSlippiJsGame)
            .object();
        const slippiJsGameMapper = new Mock<SlippiJsGameMapper>()
            .setup(mapper => mapper.toDomainModel(It.IsAny()))
            .returns(failedMapResult)
            .object();

        const fakeBuffer = new Mock<Buffer>().object();
        const file = new Mock<File>()
            .setup(file => file.props)
            .returns({ filename: '', extension: SupportedFileExtensionEnum.SLP, data: fakeBuffer })
            .object();
        const slpFileParser = new SlpFileParser(slippiGameFactory, slippiJsGameFactory, slippiJsGameMapper);

        const result = slpFileParser.parse(file);
        expect(result.isFailure).toBeTruthy();
        expect(result.error).toBe(failedMapResult.error);
    });

    test('should return a single slippi game domain model', () => {
        const fakeDomainModel = new Mock<SlippiGameDomainModel>().object();

        const fakeSlippiJsGame = new Mock<SlippiGame>().object();
        const slippiGameFactory = new Mock<SlippiGameFactory>().object();
        const slippiJsGameFactory = new Mock<SlippiJsGameFactory>()
            .setup(factory => factory.fromBuffer(It.IsAny()))
            .returns(fakeSlippiJsGame)
            .object();
        const slippiJsGameMapper = new Mock<SlippiJsGameMapper>()
            .setup(mapper => mapper.toDomainModel(It.IsAny()))
            .returns(Result.ok(fakeDomainModel))
            .object();

        const fakeBuffer = new Mock<Buffer>().object();
        const file = new Mock<File>()
            .setup(file => file.props)
            .returns({ filename: '', extension: SupportedFileExtensionEnum.SLP, data: fakeBuffer })
            .object();
        const slpFileParser = new SlpFileParser(slippiGameFactory, slippiJsGameFactory, slippiJsGameMapper);

        const result = slpFileParser.parse(file);
        expect(result.isSuccess).toBeTruthy();
        expect(result.getValue().successfullyParsedFilenames).toHaveLength(1);
        expect(result.getValue().games).toHaveLength(1);
    });
});
