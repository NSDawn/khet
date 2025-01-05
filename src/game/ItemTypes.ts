import { GlobalSingleton } from '../GlobalContextHandler';
import __Items from './Items.json';
const Items: Record<string, Item> = __Items;
const missingItemId: string = "missing";

export type ItemInstance = {
    itemId:    string;
    quantity:   number;
}

export function makeItemInstance(itemId: string, quantity: number): ItemInstance {
    let validItemId = Items[itemId] ? itemId : missingItemId;
    return (
        { "itemId": validItemId, "quantity": quantity }
    )
}

export type Item = { 
    itemId:                 string;
    icon:                   string;
    tags:                   string[];
}

export function getItem(itemId: string): Item {
    let validItemId = Items[itemId] ? itemId : missingItemId;
    return (Items[validItemId]);
}

export function checkItemTag(itemId: string, tag: string): boolean {
    return getItem(itemId).tags.some((v) => v == tag);
}

export type SellData = {
    itemId:             string; 
    baseSellPrice:      number;
    baseBuyPrice?:       number;
    demandVariance?:             string;
    demandVarianceScalar?:       number;
    fluctuationVariance?:        string;
    fluctuationVarianceOffsetSeed?: number;
    fluctuationVarianceScalar?:  number;
}

export function getSellData(itemId: string): SellData {
    return SellDataRef[itemId] || SellDataRef["missing"];
}

export function getSellVariance(sellVarianceId: string): SellVariance {
    return SellVarianceRef[sellVarianceId] || SellVarianceRef["zero"];
}

export function getPrice(itemId: string, month: number = 0, day: number = 0, yearOffset: number = 0, getBuyPrice: boolean = false): number {
    const sellData = getSellData(itemId);
    if (getBuyPrice && sellData.baseBuyPrice == null) return 2 * getPrice(itemId, month, day, yearOffset, false);

    const basePrice = getBuyPrice ? sellData.baseBuyPrice as number : sellData.baseSellPrice;
    let demandVarianceSum = sellData.demandVariance ? getSellVariance(sellData.demandVariance)[month][day - 1] : 0;
    demandVarianceSum *= sellData.demandVarianceScalar || 1;
    const perYearFluctuationVarianceIdxOffset = 3;
    const fluctuationVariance = getSellVariance(sellData.fluctuationVariance || "zero");
    const fluctuationVarianceIdxOffset = (sellData.fluctuationVarianceOffsetSeed || 0) + (perYearFluctuationVarianceIdxOffset * yearOffset);
    const fluctuationVarianceIdx = (fluctuationVarianceIdxOffset + (day - 1)) % fluctuationVariance[month].length;
    let fluctuationVarianceSum = sellData.fluctuationVariance ? fluctuationVariance[month][fluctuationVarianceIdx] : 0;
    fluctuationVarianceSum *= sellData.fluctuationVarianceScalar || 1;
    return basePrice + demandVarianceSum + fluctuationVarianceSum;
}

export function getPriceFromDate(itemId: string, date: Date, getBuyPrice: boolean = false): number {
    return getPrice(itemId, date.getMonth(), date.getDate(), date.getFullYear(), getBuyPrice);
}

import __SellDataRef from "./SellDataRef.json";
const SellDataRef: Record<string, SellData> = __SellDataRef;

export type SellVariance = number[][];
import __SellVarianceRef from "./SellVarianceRef.json";
const SellVarianceRef: Record<string, SellVariance> = __SellVarianceRef;

export type EatData = {
    itemId:             string;
    calories:           number;
    protein:            number;
    carbohydrate:       number;
    vitaminC:           number;
}

export type CropData = { 
    itemId:                 string;
    primaryYieldItemId:     string;
    daysToHarvest:          Range;
    daysToSpoil:            Range;
    hardinessTemperature:   Range;
    hardinessDaysOfWater:   Range;
    yield:              ItemDrop[];  
    offYield:           ItemDrop[];   
}

export type Recipe = {
    method: string;
    items: ItemInstance[];
}

export type ItemDrop = {
    itemInstance: ItemInstance;
    chance: number; // between 0 and 1
}

export type Range = {
    min: number
    max: number
}
