import { GlobalSingleton } from "../GlobalContextHandler";
import { Vector } from "./UtilTypes";
import _WorldMapDataRef from "./WorldMapDataRef.json";
const WorldMapDataRef: Record<string, MapData> = _WorldMapDataRef;

export function getDefaultSpot(): Spot {
    return {
        domain: "main",
        world: "playerFarm",
        local: "farmhouse",
    }
}

export function makeSpot(local: string, world: string, domain: string = "main"): Spot {
    return {
        domain: domain, world: world, local: local,
    }
}

export function getMapData(key: string): MapData {
    return WorldMapDataRef[key];
}

export function changeSpot(G: GlobalSingleton, inSpot: Spot) {
    const [_, setSpot] = G.spot;
    setSpot(inSpot);
}

export type Spot = {
    domain: string;
    world: string;
    local: string;
}

export type MapData = {
    mapId: string;
    type: string; // "domain" | "world" | "local"
    spots: MapSpot[];
}

export type MapSpot = {
    destination: Spot;
    position: Vector; // grid is 100/150
    size: Vector;
    icon?: string;
}
