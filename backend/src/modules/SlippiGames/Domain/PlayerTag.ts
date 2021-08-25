export class PlayerTag {
    private readonly tag: string;

    constructor(tag: string) {
        this.tag = tag.replace('-', '#');
    }

    toString(): string {
        return this.tag;
    }
}
