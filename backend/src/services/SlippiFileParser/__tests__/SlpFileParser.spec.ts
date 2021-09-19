import { SlpFileParser } from '../Parsers/SlpFileParser';
import { Mock } from 'moq.ts';
import { SlippiGameFactory } from '../../../models/SlippiGameFactory';
import { SlippiJsGameFactory } from '../Parsers/SlippiJsGameFactory';
import { File } from '../../../models/File';
import { SupportedFileExtensionEnum } from '../../../models/SupportedFileExtensionEnum';

describe('Services: SlippiFileParser/Parsers/SlpFileParser', () => {
    test('should fail when given non-parsable slp file', () => {
        const slippiGameFactory = new Mock<SlippiGameFactory>().object();
        const slippiJsGameFactory = new Mock<SlippiJsGameFactory>().object();

        const fakeBuffer = new Mock<Buffer>().object();
        const file = new Mock<File>()
            .setup(file => file.props)
            .returns({
                filename: '',
                extension: SupportedFileExtensionEnum.SLP,
                data: fakeBuffer
            })
            .object();
        const slpFileParser = new SlpFileParser(slippiGameFactory, slippiJsGameFactory);

        const result = slpFileParser.parse(file);

        expect(result.isFailure).toBeTruthy();
    });

    test.todo('should fail when file has missing information that was required');

    test.todo('should return a slippi game domain model');
});
