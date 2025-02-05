import { ItemInstance } from "./Items";

export type Vector = { 
    x: number;
    y: number;
    z?: number;
    w?: number;
}

export type NumericalRange = {
    high: number;
    low: number;
}

export type Variance = {
    rollUpto: number;
    results: number[]; 
}

export type DropTable = Drop[];

export type Drop = {
    rollUpto: number;
    rolls?: number;
    results: (ItemInstance | null)[];
}

