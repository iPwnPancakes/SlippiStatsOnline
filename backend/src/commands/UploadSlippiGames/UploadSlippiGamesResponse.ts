import { Either } from '../../core/Either';
import { AppError } from '../../core/AppErrors';
import { Result } from '../../core/Result';
import { FileNotParseableError, UnsupportedFileParserError } from './UploadSlippiGamesErrors';

export type UploadSlippiGamesResponse = Either<FileNotParseableError | UnsupportedFileParserError | AppError | Result<any>, Result<void>>;
