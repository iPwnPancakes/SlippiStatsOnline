export enum Stages {
    FOD = 2,
    STADIUM = 3,
    YOSHIS = 3,
    DREAMLAND = 28,
    BATTLEFIELD = 31,
    FD = 32
}

export function lookupStageByValue(stageCode: Number): Stages | null {
    const keys = Object.keys(Stages);
    const key = keys.find(key => Stages[key] === stageCode);

    return Stages[key] ?? null;
}

export function toObject(): Object {
    return {
        FOD: 2,
        STADIUM: 3,
        YOSHIS: 3,
        DREAMLAND: 28,
        BATTLEFIELD: 31,
        FD: 32
    };
}
