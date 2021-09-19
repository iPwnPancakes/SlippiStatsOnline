import { File } from '../../models/File';
import { ISlippiFileParser } from './Parsers/ISlippiFileParser';
import { SupportedFileExtensionEnum } from '../../models/SupportedFileExtensionEnum';
import { SlpFileParser } from './Parsers/SlpFileParser';
import { ZipFileParser } from './Parsers/ZipFileParser';
import { SlippiGameFactory } from '../../models/SlippiGameFactory';
import { FileNotSupportedError } from './Errors/SlippiFileParserErrors';

export class FileParserFactory {
    public constructor(private slippiGameFactory: SlippiGameFactory) {}

    public makeParser(file: File): ISlippiFileParser {
        switch (file.extension) {
            case SupportedFileExtensionEnum.SLP: {
                return new SlpFileParser(this.slippiGameFactory);
            }
            case SupportedFileExtensionEnum.ZIP: {
                return new ZipFileParser();
            }
            default: {
                throw new FileNotSupportedError();
            }
        }
    }
}
