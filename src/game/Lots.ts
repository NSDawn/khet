import { getValidGrowData } from "./Farming";

export type LotData = {
    type?: string,
    displayName?: string,
    farmlandLotData?: null | FarmlandLotData,
}

export type FarmlandLotData = { 
    slots: FarmlandSlot[];
}

export type FarmlandSlot = {
    seedId?: string | null;
    stage?: number;
    cropStatusId?: string;
    daysRemainingInStage?: number;
    stageId?: string;
    watered: number;
    daysElapsed: DayTracker;
    daysWatered: DayTracker;
    daysTooHot: DayTracker;
    daysTooCold: DayTracker;
    soil: Soil;
}

export type Soil = {
    n: number;
    p: number;
    k: number;
    s: number;
}

export type DayTracker = {
    total: number;
    sinceLastStage: number;
}

export function getDefaultFarmlandLot(displayName = "") {
    return makeFarmlandLot(15, displayName);
} 
export function makeFarmlandLot(size: number, displayName = "" ): LotData {
    return {
        type: "farmland",
        displayName: displayName,
        farmlandLotData: makeFarmlandLotData(size)
    }
}
export function makeFarmlandLotData(size: number = 15, data: FarmlandSlot[] = []): FarmlandLotData {
    return {
        slots: data.concat((Array(size - data.length) as FarmlandSlot[]).fill(getDefaultFarmlandSlot()))
    };
} 
export function getDefaultFarmlandSlot(): FarmlandSlot {
    return {
        seedId: null,
        watered: 0,
        cropStatusId: undefined,
        daysRemainingInStage: 0,
        stage: 0,
        daysElapsed: makeDayTracker(),
        daysWatered: makeDayTracker(),
        daysTooCold: makeDayTracker(),
        daysTooHot: makeDayTracker(),
        soil: getDefaultSoil(),
    }
}
export function makeDayTracker(total = 0, sinceLastStage = 0): DayTracker {
    return {total: total, sinceLastStage: sinceLastStage};
}
export function getDefaultSoil(): Soil {
    return makeSoil(3, 2, 2, 1);
}
export function makeSoil(n = 0, p = 0, k = 0, s = 0): Soil {
    return {n: n, p: p, k: k, s: s};
}

export function getFarmlandSlotIcon(seedId: string = "", stage: number = 0) {
    if (seedId == null || seedId === "") {
        return "🟫";
    }
    return getValidGrowData(seedId).icon;
}
