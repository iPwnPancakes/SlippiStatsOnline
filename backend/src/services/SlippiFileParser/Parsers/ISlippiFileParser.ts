import { SlippiGame } from "../../../models/SlippiGame";
import { File } from "../../../models/File";
import { Result } from "../../../core/Result";

export interface ParseResult {
    successfullyParsedFilenames: string[];
    failedToParseFilenames: string[];
    games: SlippiGame[]
}

export interface ISlippiFileParser {
    parse(file: File): Result<ParseResult>;
}
