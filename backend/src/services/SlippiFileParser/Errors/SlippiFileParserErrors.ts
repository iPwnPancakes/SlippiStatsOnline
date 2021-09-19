import { Result } from '../../../core/Result';
import { UseCaseError } from '../../../core/UseCaseError';

export class FileNotSupportedError extends Result<UseCaseError> {
    public constructor() {
        super(false, { message: 'No parser exists for this File type' });
    }
}
