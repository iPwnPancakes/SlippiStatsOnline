import { GetGamesByTag } from '../GetGamesByTag/GetGamesByTag';
import { It, Mock } from 'moq.ts';
import { ISlippiGameRepository } from '../../repositories/ISlippiGameRepository';
import { SlippiGame } from '../../models/SlippiGame';
import { Result } from '../../core/Result';

describe('UseCase: GetGamesByTag', () => {
    test('should fail if tag is empty', async () => {
        const fakeSlippiGameRepository = new Mock<ISlippiGameRepository>().object();
        const useCase = new GetGamesByTag(fakeSlippiGameRepository);

        const invalidTag = '';
        const result = await useCase.execute({ playerTag: invalidTag });
        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(Error);
    });

    test('should return all games associated with that tag', async () => {
        const fakeSlippiGameRepository = new Mock<ISlippiGameRepository>()
            .setup(repo => repo.getGamesByTag(It.IsAny()))
            .returns(Promise.resolve([]))
            .object();

        const useCase = new GetGamesByTag(fakeSlippiGameRepository);

        const tag = 'IPWN#473';
        const result = await useCase.execute({ playerTag: tag });
        expect(result.isRight()).toBeTruthy();

        const value: Result<SlippiGame[]> = result.value as Result<SlippiGame[]>;
        expect(value.getValue()).toEqual([]);
    });
});
