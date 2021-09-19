import { SlippiGame } from '@slippi/slippi-js';

export class SlippiJsGameFactory {
    public fromBuffer(data: Buffer | ArrayBuffer): SlippiGame {
        return new SlippiGame(data);
    }
}
