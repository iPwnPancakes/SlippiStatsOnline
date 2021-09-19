import { FileParserFactory } from '../FileParserFactory';
import { Mock } from 'moq.ts';
import { SlippiGameFactory } from '../../../models/SlippiGameFactory';
import { File } from '../../../models/File';
import { SupportedFileExtensionEnum } from '../../../models/SupportedFileExtensionEnum';
import { SlpFileParser } from '../Parsers/SlpFileParser';
import { ZipFileParser } from '../Parsers/ZipFileParser';

describe('Services: FileParserFactory', () => {
    test('should return a parser for .slp files', () => {
        const slippiGameFactory = new Mock<SlippiGameFactory>().object();
        const parserFactory = new FileParserFactory(slippiGameFactory);

        const fakeBuffer = new Mock<Buffer>().object();
        const file = new Mock<File>()
            .setup(file => file.extension)
            .returns(SupportedFileExtensionEnum.SLP)
            .object();
        const parser = parserFactory.makeParser(file);

        expect(parser).toBeInstanceOf(SlpFileParser);
    });

    test('should return a parser for .zip files', () => {
        const slippiGameFactory = new Mock<SlippiGameFactory>().object();
        const parserFactory = new FileParserFactory(slippiGameFactory);

        const file = new Mock<File>()
            .setup(file => file.extension)
            .returns(SupportedFileExtensionEnum.ZIP)
            .object();
        const parser = parserFactory.makeParser(file);

        expect(parser).toBeInstanceOf(ZipFileParser);
    });
});
