import { MoveTimeline } from "./MoveTimeline";
import { PlayerData } from "./PlayerData";
import { Stages } from "./Stages";

export class SlippiGame {
    constructor(
        private id: string,
        private player1Data: PlayerData,
        private player2Data: PlayerData,
        private stage: Stages,
        private moveTimeline: MoveTimeline
    ) {
    }

    getID(): string {
        return this.id;
    }

    getPlayer1(): PlayerData {
        return this.player1Data;
    }

    getPlayer2Data(): PlayerData {
        return this.player2Data;
    }

    getStage(): Stages {
        return this.stage;
    }

    getMoveTimeline(): MoveTimeline {
        return this.moveTimeline;
    }
}
