import { PlayerData } from "./PlayerData";
import { Stages } from "./Stages";

interface SlippiGameProps {
    id: string,
    player1Data: PlayerData;
    player2Data: PlayerData;
    stage: Stages;
}

export class SlippiGame {
    constructor(public readonly props: SlippiGameProps) {
    }

    getID(): string {
        return this.props.id;
    }

    getPlayer1(): PlayerData {
        return this.props.player1Data;
    }

    getPlayer2Data(): PlayerData {
        return this.props.player2Data;
    }

    getStage(): Stages {
        return this.props.stage;
    }
}
