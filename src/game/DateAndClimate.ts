import { GlobalSingleton } from "../GlobalContextHandler";
import { getDailyVariance } from "./Items";
import __WeatherTypesRef from "./WeatherTypesRef.json";
const weatherTypeByTemperature = __WeatherTypesRef;

export function getNumberOfDaysInMonth(monthZeroIndexed: number, year: number = 1): number {
    if (isLeapYear(year) && monthZeroIndexed === 1) return 29;
    return numberOfDaysPerMonth[monthZeroIndexed];
}

export function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

const numberOfDaysPerMonth: number[] = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
]

export function getWeather(date: Date): Weather {
    return {
        temperature: getTemperature(date),
        rain: getRain(date),
        weatherType: getWeatherType(date)
    }
}

export type Weather = {
    temperature: Temperature;
    rain: number; // 0 | 1 | 2
    weatherType: string;
}

export type Temperature = {
    high: number;
    low: number;
}

export function getWeatherTypeIcon(key: string) {
    return weatherTypeIcons[key] ?? "🤔";
}

const weatherTypeIcons: Record<string, string> = {
    "arid": "🔥",
    "sultry": "️🌤︎", 
    "sunny": "☀︎",
    "cloudy": "⛅",
    "hazy": "🌥︎",
    "overcast": "☁︎",
    "rainy": "🌧︎",
    "stormy": "⛈",
    "snowy": "🌨︎",
}

export function getTemperature(date: Date): Temperature {
    return {
        high: getTemperatureHighs(date),
        low: getTemperatureLows(date),
    }
}

export function getTemperatureHighs(date: Date): number {
    return getTemperatureHighsOrLows(date, "climateHighs", 9);
}
export function getTemperatureLows(date: Date): number {
    return getTemperatureHighsOrLows(date, "climateLows", 7);
}

export function avgTemperature(temp: Temperature): number {
    return Math.ceil(((temp.high) * 1.5 + temp.low * 0.5) /2);
}

export function getRain(date: Date): number {
    return getTemperatureHighsOrLows(date, "climateRain", 21);
}

export function getDaysUntilRain(date: Date): number {
    let i = 0;
    let iDate = new Date(date);
    const iLimit = 364;
    while (getRain(iDate) === 0) {
        i += 1;
        iDate.setDate(iDate.getDate() + 1);
        if (i >= iLimit) break;
    }
    if (i >= iLimit) return -1;
    return i;
}

function getTemperatureHighsOrLows(date: Date, key: string, offset: number): number {
    const highsOrLows = getDailyVariance(key)[date.getMonth()];
    const idx = getDateOffset(offset, date, highsOrLows.length);
    return highsOrLows[idx];
}
  
export function getDateOffset(inherentOffset: number, date: Date, mod: number = -1, offsetPerYear: number = 3): number {
    const rawOut = (date.getDate() + inherentOffset + (date.getFullYear() * offsetPerYear));
    if (mod > 0) return rawOut % mod;
    return rawOut;
}

export function getWeatherType(date: Date): string {
    const rain = getRain(date);
    const daysUntilRain = getDaysUntilRain(date);
    const avgTemp = avgTemperature(getTemperature(date));
    if (rain > 0) {
        if (avgTemp <= 10) return "snowy";
        if (rain === 1) return "rainy";
        if (rain === 2) return "stormy";
    }
    for (let temperature of weatherTypeByTemperature) {
        if (avgTemp < temperature.temperature) continue;
        for (let weatherType of temperature.weatherTypes) {
            if (daysUntilRain < weatherType.daysUntilRain) continue;
            return weatherType.weatherType;
        }
    }
    return "sunny";
}

export function incrementDayGlobal(G: GlobalSingleton) {
    const [date, setDate] = G.date;
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    setDate(date + millisecondsInADay);
}




