import { PlayerGameData } from "./PlayerGameData";
import { SlippiGameMetadata } from "./SlippiGameMetadata";

interface SlippiGameProps {
    id: string,
    metadata: SlippiGameMetadata;
    p1GameData: PlayerGameData;
    p2GameData: PlayerGameData;
}

export class SlippiGame {
    constructor(public readonly props: SlippiGameProps) {
    }

    getID(): string {
        return this.props.id;
    }

    getP1GameData(): PlayerGameData {
        return this.props.p1GameData;
    }

    getP2GameData(): PlayerGameData {
        return this.props.p2GameData;
    }

    getMetadata(): SlippiGameMetadata {
        return this.props.metadata;
    }
}
