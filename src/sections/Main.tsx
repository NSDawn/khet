import { useGlobal } from "../GlobalContextHandler.tsx";
import InfoSection from "./InfoSection.tsx";
import SettingsSection from "./SettingsSection.tsx";
import InventorySection from "./InventorySection.tsx";
import DebugConsoleSection from "./DebugConsoleSection.tsx";
import { TooltipSection } from "./TooltipSection.tsx";
import { useEffect } from "react";
import { changeLanguage } from "i18next";

export default function Main() {
    const G = useGlobal()
    const [gameConfig, _] = G.gameConfig;
    
    useEffect(() => {
        changeLanguage(gameConfig.locale)
    }, [gameConfig.locale])

    return (
        <main className="theme-default">
            <TooltipSection />
            <InfoSection />
            <InventorySection inventory={G.farmhouseInventory} inventoryId={G.farmhouseInventoryId[0]} />
            <SettingsSection />
            {
                gameConfig.debug && gameConfig.showDebugConsole ? 
                <DebugConsoleSection /> : null
            }
        </main>
    )
}