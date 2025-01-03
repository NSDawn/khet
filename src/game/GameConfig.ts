import { GlobalSingleton, useGlobal } from "../GlobalContextHandler";
import DefaultGameConfig from "./DefaultGameConfig.json";

export type GameConfig = {
    locale: string,
    unitTemperature: string, // "Celsius" || "Fahrenheit" || "Kelvin"
    debug: boolean,
    showDebugConsole: boolean;
}

export function getDefaultGameConfig(): GameConfig {
    return DefaultGameConfig;
}

export function trySetGameConfig(key: string, value: any): boolean {
    const [config, setConfig] = useGlobal().gameConfig;
    if (key in config) {
        setConfig({...config, key: value} as GameConfig);
        return true;
    }
    return false;
}