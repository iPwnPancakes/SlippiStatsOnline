import { SlippiGame } from '@slippi/slippi-js';
import { SlippiGame as SlippiGameDomainModel } from '../../../models/SlippiGame';
import { Result } from '../../../core/Result';

export class SlippiJsGameMapper {
    public toDomainModel(game: SlippiGame): Result<SlippiGameDomainModel> {
        return Result.fail('Not yet implemented');
    }
}
