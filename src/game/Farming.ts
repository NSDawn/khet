import { DropTable, NumericalRange, Variance } from "./UtilTypes";
import __GrowDataRef from "./GrowDataRef.json";
import { FarmlandLotData, FarmlandSlot, getDefaultFarmlandSlot, makeDayTracker } from "./Lots";
import { Temperature } from "./DateAndClimate";
import { calcVariance } from "./Random";
export const GrowDataRef: Record<string, GrowData> = __GrowDataRef;
export const farmlandSlotMaxWatered = 5;

export type GrowData = {
    seedItemId: string;
    mainYieldItemId: string;
    icon: string;
    stages: GrowthStage[];
}
export type GrowthStage = { 
    stageId: string; // at least should always be 'ready' and last stage should always be 'spoiled', with no lengthDays property.
    lengthDays?: number; // if left off, stage goes forever
    floodHardy?: boolean; // default is false
    lengthDaysVariance?: Variance;
    temperatureHardiness?: Hardiness;
    rainHardiness?: Hardiness;
    drops: DropTable;
    circumstantialSpoilages?: CircumstantialSpoilage;
}
export type Hardiness = {
    range: NumericalRange;
    allowance?: number;
}
export type CircumstantialSpoilage = {
    circumstanceId: string; 
    /* circumstanceIds: TODO LATER
        (simple chance)
        stolen

        (circumstances)
        infestationInsects: simple chance at first, but local infestation has 100x chance of spreading
        livestock: simple chance x number of livestock 
        
    */
    chance: number; // float 0-1 chance
}

export function plantInFarmlandSlot(slot: FarmlandSlot, seedId: string) {
    const ref = getValidGrowData(seedId);
    const newSlot = getDefaultFarmlandSlot();
    newSlot.seedId = seedId;
    newSlot.stageId = ref.stages[0].stageId;
    newSlot.daysRemainingInStage = ref.stages[0].lengthDays;
    slot = newSlot;
    return slot;
}

export function waterFarmlandSlot(slot: FarmlandSlot, quantity: number, mode: "add" | "set" = "set") {
    if (mode === "add") {
        slot.watered = Math.min(Math.max(slot.watered + quantity, 0), farmlandSlotMaxWatered);
    }
    if (mode === "set") {
        slot.watered = Math.min(Math.max(quantity, 0), farmlandSlotMaxWatered);
    }
    return slot;
}

export function incrementDayFarmlandSlot(slot: FarmlandSlot, rain: number, temperature: Temperature) {
    console.log(slot, rain, temperature);
    if (!slot.seedId || !slot.daysRemainingInStage || slot.stage === undefined) return slot;
    const ref = getValidGrowData(slot.seedId);
    
    const FLOOD_WATER = farmlandSlotMaxWatered;
    let cropStatus = "allOk";

    // tick up everything
    slot.daysRemainingInStage --;
    slot.daysElapsed.total ++; slot.daysElapsed.sinceLastStage ++;
    
    slot.watered = Math.min(Math.max(slot.watered - 1 + rain, 0), farmlandSlotMaxWatered);
    if (slot.watered > 0) {
        slot.daysWatered.total ++; slot.daysWatered.sinceLastStage ++;
    }

    if (ref.stages[slot.stage].temperatureHardiness) {
        if (temperature.low < ref.stages[slot.stage].temperatureHardiness!.range.low) {
            slot.daysTooCold.total ++; slot.daysTooCold.sinceLastStage ++;
        }
        if (temperature.high > ref.stages[slot.stage].temperatureHardiness!.range.high) {
            slot.daysTooHot.total ++; slot.daysTooHot.sinceLastStage ++;
        }
    }
    
    // check if crop spoils
    let doesCropSpoil = false; 
    if (slot.stageId !== "spoiled") {
        if (!ref.stages[slot.stage].floodHardy && slot.watered >= FLOOD_WATER) {
            doesCropSpoil = true;
            cropStatus = "spoiledFlooded";
        }
        if (ref.stages[slot.stage].temperatureHardiness) {
            if (slot.daysTooCold.sinceLastStage > (ref.stages[slot.stage].temperatureHardiness!.allowance ?? 0)) {
                doesCropSpoil = true;
                cropStatus = "spoiledTooCold";
            }
            if (slot.daysTooHot.sinceLastStage > (ref.stages[slot.stage].temperatureHardiness!.allowance ?? 0)) {
                doesCropSpoil = true;
                cropStatus = "spoiledTooHot";
            }
        }
        if (ref.stages[slot.stage].rainHardiness) {
            if (slot.daysWatered.sinceLastStage > ref.stages[slot.stage].rainHardiness!.range.high) {
                doesCropSpoil = true;
                cropStatus = "spoiledOverwatered"
            }
            else if ((slot.daysWatered.sinceLastStage + (slot.daysRemainingInStage ?? 0)) < ref.stages[slot.stage].rainHardiness!.range.low) {
                doesCropSpoil = true;
                cropStatus = "spoiledUnderwatered"
            }
        }
        if (ref.stages[slot.stage].circumstantialSpoilages) {
            // TODO: IMPLEMENT LATER!!
        }
    }

    // check if crop proceeds to the next stage
    let doesCropAdvance = false
    if (ref.stages[slot.stage].lengthDays && slot.daysRemainingInStage === 0) {
        doesCropAdvance = true;
    }

    // updates stage if crop advanced or spoil
    if (doesCropSpoil || doesCropAdvance) {
        if (doesCropSpoil) {
            slot.stage = ref.stages.length - 1; 
        } else if (doesCropAdvance) {
            slot.stage ++;
            let id = ref.stages[slot.stage].stageId;
            if (id === "spoiled") {
                cropStatus = "spoiledRotted";
            } else {
                cropStatus = "newStage";
            }
        }
        slot.daysElapsed.sinceLastStage = 0;
        slot.daysTooCold.sinceLastStage = 0;
        slot.daysTooHot.sinceLastStage = 0;
        slot.daysWatered.sinceLastStage = 0; 
        slot.daysRemainingInStage = ref.stages[slot.stage].lengthDays ?? 0 + calcVariance(ref.stages[slot.stage].lengthDaysVariance);
        slot.stageId = ref.stages[slot.stage].stageId;
    }
    
    if (slot.stageId === "ready") cropStatus = "ready";
    slot.cropStatusId = cropStatus;

    return slot;
}

/*
    CROP STATUSES

    (growing)
    justPlanted: for the day it was planted
    allOk: all okay
    newStage: new stage happened (but not ready)

    (ready)
    ready: can be harvested

    (spoiled)
    spoiledFlooded: crop spoiled due to flood (more than allowed amount of water (5 for now))
    spoiledTooCold: crop spoiled to too many days too cold. (often just one)
    spoiledTooHot: crop spoiled to too many days too hot. (often just one)
    spoiledUnderwatered: crop spoiled to too few days of watering (calculates until next stage)
    spoiledOverwatered: crop spoiled to too many days of watering. (rarer)
    spoiledRotted: crop rotted past the ready stage

*/
export function getValidGrowData(seedId: string) {
    return GrowDataRef[seedId] ?? GrowDataRef["missing"];
}

