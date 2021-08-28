export enum Characters {
    C_FALCON = 0,
    DK = 1,
    FOX = 2,
    GAME_WATCH = 3,
    KIRBY = 4,
    BOWSER = 5,
    LINK = 6,
    LUIGI = 7,
    MARIO = 8,
    MARTH = 9,
    MEWTWO = 10,
    NESS = 11,
    PEACH = 12,
    PIKACHU = 13,
    ICE_CLIMBERS = 14,
    JIGGLYPUFF = 15,
    SAMUS = 16,
    YOSHI = 17,
    ZELDA = 18,
    SHEIK = 19,
    FALCO = 20,
    Y_LINK = 21,
    DR_MARIO = 22,
    ROY = 23,
    PICHU = 24,
    GANON = 25
}

export function toObject(): Object {
    return {
        C_FALCON: 0,
        DK: 1,
        FOX: 2,
        GAME_WATCH: 3,
        KIRBY: 4,
        BOWSER: 5,
        LINK: 6,
        LUIGI: 7,
        MARIO: 8,
        MARTH: 9,
        MEWTWO: 10,
        NESS: 11,
        PEACH: 12,
        PIKACHU: 13,
        ICE_CLIMBERS: 14,
        JIGGLYPUFF: 15,
        SAMUS: 16,
        YOSHI: 17,
        ZELDA: 18,
        SHEIK: 19,
        FALCO: 20,
        Y_LINK: 21,
        DR_MARIO: 22,
        ROY: 23,
        PICHU: 24,
        GANON: 25
    };
}

export function lookupCharacterByValue(value: Number): Characters | null {
    const keys = Object.keys(Characters);
    const key = keys.find(key => Characters[key] === value);

    return Characters[key] ?? null;
}
