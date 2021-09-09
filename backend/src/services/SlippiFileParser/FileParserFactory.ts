import { File } from "../../models/File";
import { ISlippiFileParser } from "./Parsers/ISlippiFileParser";
import { SupportedFileExtensionEnum } from "../../models/SupportedFileExtensionEnum";
import { SlpFileParser } from "./Parsers/SlpFileParser";
import { ZipFileParser } from "./Parsers/ZipFileParser";

export class FileParserFactory {
    public makeParser(file: File): ISlippiFileParser {
        switch (file.extension) {
            case SupportedFileExtensionEnum.SLP: {
                return new SlpFileParser();
            }
            case SupportedFileExtensionEnum.ZIP: {
                return new ZipFileParser();
            }
            default: {
                return null;
            }
        }
    }
}
