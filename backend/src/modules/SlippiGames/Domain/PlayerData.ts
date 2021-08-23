import { Characters } from "./Characters";

export class PlayerData {
    constructor(private tag: string, private character: Characters) {
    }

    public getTag(): string {
        return this.tag;
    }

    public getCharacter(): Characters {
        return this.character;
    }
}
