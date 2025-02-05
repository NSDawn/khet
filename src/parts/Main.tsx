import { useGlobal } from "../GlobalContextHandler.tsx";
import InfoSection from "../sections/InfoSection.tsx";
import SettingsSection from "../sections/SettingsSection.tsx";
import InventorySection from "../sections/InventorySection.tsx";
import DebugConsoleSection from "../sections/debug/DebugConsoleSection.tsx";
import Header from "./Header.tsx";
import { TooltipSection } from "../sections/TooltipSection.tsx";
import { useEffect, useState } from "react";
import { changeLanguage } from "i18next";
import DebugButton from "../components/debug/DebugButton.tsx";
import DebugInventorySection from "../sections/debug/DebugInventorySection.tsx";
import LotSection from "../sections/LotSection.tsx";
import { getDefaultFarmlandLot } from "../game/Lots.ts";
import DebugFarmlandLotSection from "../sections/debug/DebugFarmlandLotSection.tsx";

export default function Main() {
    const G = useGlobal()
    const [gameConfig, _] = G.gameConfig;
    const [spot, __] = G.spot;

    const [farmlandLot, setFarmlandLot] = useState(JSON.stringify(getDefaultFarmlandLot()));
    
    useEffect(() => {
        changeLanguage(gameConfig.locale)
    }, [gameConfig.locale])

    return (
        <main className="theme-default">
            <Header />
            <TooltipSection />
            <InfoSection />
            {spot.world === "playerFarm" ?
                <>
                {spot.local === "farmhouse" ?
                    <>
                        <InventorySection inventory={G.farmhouseInventory} inventoryId={G.farmhouseInventoryId} />
                        <SettingsSection />
                    </>
                : null}
                {spot.local === "plot1" ?
                    <>
                        <LotSection title={"butts"} lotData={JSON.parse(farmlandLot)} setDataJSONFn={setFarmlandLot}/>
                    </>
                : null}
                </>
            : null}
            {
                gameConfig.debug && gameConfig.showDebugConsole ? 
                <>
                    <DebugConsoleSection /> 
                    {spot.local === "farmhouse"?
                        <DebugInventorySection />
                    : null}
                    {spot.local === "plot1"?
                        <DebugFarmlandLotSection />
                    : null}
                    
                </>
            : null}
            <DebugButton />
        </main>
    )
}