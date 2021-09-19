import { UseCaseError } from '../../core/UseCaseError';
import { Result } from '../../core/Result';

export class FileNotParseableError extends Result<UseCaseError> {
    public constructor() {
        super(false, { message: 'File was not able to be parsed as a slippi game' });
    }
}

export class UnsupportedFileParserError extends Result<UseCaseError> {
    public constructor() {
        super(false, { message: 'File extension not supported' });
    }
}
