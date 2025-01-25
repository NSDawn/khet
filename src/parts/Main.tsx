import { useGlobal } from "../GlobalContextHandler.tsx";
import InfoSection from "../sections/InfoSection.tsx";
import SettingsSection from "../sections/SettingsSection.tsx";
import InventorySection from "../sections/InventorySection.tsx";
import DebugConsoleSection from "../sections/debug/DebugConsoleSection.tsx";
import Header from "./Header.tsx";
import { TooltipSection } from "../sections/TooltipSection.tsx";
import { useEffect } from "react";
import { changeLanguage } from "i18next";
import DebugButton from "../components/debug/DebugButton.tsx";
import DebugInventorySection from "../sections/debug/DebugInventorySection.tsx";

export default function Main() {
    const G = useGlobal()
    const [gameConfig, _] = G.gameConfig;
    const [spot, __] = G.spot;
    
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
                        <section>
                            PLOT 1 GOES HERE
                        </section>
                    </>
                : null}
                </>
            : null}
            {
                gameConfig.debug && gameConfig.showDebugConsole ? 
                <>
                    <DebugConsoleSection /> 
                    <DebugInventorySection />
                </>
            : null}
            <DebugButton />
        </main>
    )
}