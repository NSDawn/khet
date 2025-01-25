import { useTranslation } from "react-i18next";
import { useGlobal } from "../GlobalContextHandler";
import "./Map.css";
import PopUp from "./PopUp";
import { useState } from "react";
import MapDisplay from "./MapDisplay";
import { changeSpot, Spot } from "../game/World";

export default function MapReadout() {

    const G = useGlobal()
    const [gameConfig, setGameConfig] = G.gameConfig;
    const [spot, setSpot] = G.spot;
    const [selectedSpot, setSelectedSpot] = useState(spot);
    const { t } = useTranslation();
    const [popUpEnabled, setPopUpEnabled] = useState(false);
    const [mapType, setMapType] = useState("local" as MapType);

    function openDomainMap() {
        setMapType("domain");
        setPopUpEnabled(true);
    }

    function openWorldMap(worldKey: string) {
        setMapType("world");
        setPopUpEnabled(true);
    }

    function onSelectMap(spot: Spot) {
        setSelectedSpot(spot);
        if (mapType === "world") {
            changeSpot(G, spot);
            setPopUpEnabled(false);
        } else if (mapType === "domain") {
            openWorldMap(spot.world);
        }
    }

    return (
        <>
            { popUpEnabled ? 
                <PopUp onClose={() =>  setPopUpEnabled(false)}>
                    <MapDisplay type={mapType} selectedSpot={selectedSpot} onSelectFn={onSelectMap}/>
                </PopUp>
            : null}
            <button 
                className="a-button"
                onClick={openDomainMap}
            >
                <h2>{spot.world === "playerFarm" ? gameConfig.playerFarmName : t(`map.world.${spot.world}`)}</h2>
            </button>
            <br />
            <button 
                className="a-button"
                onClick={() => {openWorldMap(spot.world)}}
            >
                <h1>{t(`map.local.${spot.local}`)}</h1>
            </button>
        </>
    )
}

export type MapType = "domain" | "world" | "local";