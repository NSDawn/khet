import { getDailyVariance } from "./Items";

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
        rain: 0,
        weatherType: "sunny"
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
    "sultry": "️‍🔥", 
    "sunny": "☀︎",
    "cloudy": "🌤︎",
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
    return getDailyVariance("climateHighs")[date.getMonth()][date.getDate()];
}
export function getTemperatureLows(date: Date): number {
    return getDailyVariance("climateLows")[date.getMonth()][date.getDate()];
}