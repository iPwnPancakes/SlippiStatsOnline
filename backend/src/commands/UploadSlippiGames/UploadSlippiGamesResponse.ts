import { Either } from "../../core/Either";
import { FileNotParseableError, UnsupportedFileParserError } from "./UploadSlippiGamesErrors";
import { AppError } from "../../core/AppErrors";
import { Result } from "../../core/Result";

export type UploadSlippiGamesResponse = Either<
    FileNotParseableError | UnsupportedFileParserError | AppError | Result<any>,
    Result<void>
>;
