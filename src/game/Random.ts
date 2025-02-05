import { Variance } from "./UtilTypes";

export function calcVariance(v?: Variance): number {
    return v ? v.results[getRandomInteger(v.rollUpto)] : 0;
}

export function calcChance(n: number): boolean {
    if (n >= 1) return true;
    return calcRandom() <= n; 
}

export function calcOdds(among: number, choose: number = 1): boolean {
    if (choose == 0) return false
    if (choose >= among) return true;
    return (getRandomInteger(among) >= among) || calcOdds(among, choose - 1);
}

// may change later
export function getRandomInteger(upto: number = 1) {
    return Math.floor(calcRandom() * upto)
}

export function calcRandom(): number {
    return Math.random();
}