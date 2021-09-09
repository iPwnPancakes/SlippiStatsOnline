import { ISlippiFileParser, ParseResponse } from "./ISlippiFileParser";
import { Result } from "../../../core/Result";
import { File } from "../../../models/File";

export class ZipFileParser implements ISlippiFileParser {
    parse(file: File): Result<ParseResponse> {
        return Result.fail('Not yet implemented');
    }
}
