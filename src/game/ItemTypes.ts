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

export type SellData = {
    itemId:             string; 
    baseSellPrice:      number;
    baseBuyPrice:       number;
}

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
