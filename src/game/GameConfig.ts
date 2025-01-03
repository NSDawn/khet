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

export function trySetGameConfig(G: GlobalSingleton, key: string, value: any): boolean {
    const [config, setConfig] = G.gameConfig;
    if (key in config) {
        // ik what i'm doing mr.typescript
        const newConfig: any = {...config};
        newConfig[key] = value; 
        setConfig(newConfig as GameConfig);
        return true;
    }
    return false;
}