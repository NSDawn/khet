import { GlobalSingleton } from '../GlobalContextHandler';
import __ItemRef from './ItemRef.json';
const ItemRef: Record<string, Item> = __ItemRef;
const missingItemId: string = "missing";

export type ItemInstance = {
    itemId:    string;
    quantity:   number;
}

export function makeItemInstance(itemId: string, quantity: number): ItemInstance {
    const validItemId = ItemRef[itemId] ? itemId : missingItemId;
    const validQuantity = quantity <= 0 ? 1 : quantity;
    return (
        { "itemId": validItemId, "quantity": validQuantity }
    )
}

export type Item = { 
    itemId:                 string;
    icon:                   string;
    groupSet?:            GroupSet;
    tags:                 string[];
}
type GroupSet = Group[];
export type Grouping = {
    groupId: string;
    subgroupId?: string,
}
type Group = {
    groupId: string,
    subgroupSet?: SubgroupSet;
}
type SubgroupSet = string[];

export function checkItem(itemId: string): boolean {
    return (!!ItemRef[itemId]);
}

export function getItem(itemId: string): Item {
    let validItemId = ItemRef[itemId] ? itemId : missingItemId;
    return (ItemRef[validItemId]);
}

export function getPrimaryGrouping(itemId: string): Grouping {
    const gs = (getItem(itemId).groupSet || ItemRef["missing"].groupSet) as GroupSet; 
    return {
        groupId: gs[0].groupId,
        subgroupId: gs[0].subgroupSet ? gs[0].subgroupSet[0] : undefined
    }
}

export function checkGrouping(itemId: string, grouping: Grouping): boolean {
    if (!checkItem(itemId)) return false;
    const item = getItem(itemId);
    if (!item.groupSet) return false;
    if (!item.groupSet.some((g) => g.groupId == grouping.groupId)) return false;
    if (!grouping.subgroupId) return true;
    if (!item.groupSet.some((g) => g.groupId == grouping.groupId || g.subgroupSet?.includes(grouping.subgroupId as string))) return true;
    return false;
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

export function getDailyVariance(sellVarianceId: string): DailyVariance {
    return DailyVarianceRef[sellVarianceId] || DailyVarianceRef["zero"];
}

export function getPrice(itemId: string, month: number = 0, day: number = 0, yearOffset: number = 0, getBuyPrice: boolean = false): number {
    const sellData = getSellData(itemId);
    if (getBuyPrice && sellData.baseBuyPrice == null) return 2 * getPrice(itemId, month, day, yearOffset, false);

    const basePrice = getBuyPrice ? sellData.baseBuyPrice as number : sellData.baseSellPrice;
    let demandVarianceSum = sellData.demandVariance ? getDailyVariance(sellData.demandVariance)[month][day - 1] : 0;
    demandVarianceSum *= sellData.demandVarianceScalar || 1;
    const perYearFluctuationVarianceIdxOffset = 3;
    const fluctuationVariance = getDailyVariance(sellData.fluctuationVariance || "zero");
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

export type DailyVariance = number[][];
import __DailyVarianceRef from "./DailyVarianceRef.json";
const DailyVarianceRef: Record<string, DailyVariance> = __DailyVarianceRef;

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
