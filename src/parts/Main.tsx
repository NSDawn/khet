import { useGlobal } from "../GlobalContextHandler.tsx";
import InfoSection from "../sections/InfoSection.tsx";
import SettingsSection from "../sections/SettingsSection.tsx";
import InventorySection from "../sections/InventorySection.tsx";
import DebugConsoleSection from "../sections/DebugConsoleSection.tsx";
import { TooltipSection } from "../sections/TooltipSection.tsx";
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
            <InventorySection inventory={G.farmhouseInventory} inventoryId={G.farmhouseInventoryId} />
            <SettingsSection />
            {
                gameConfig.debug && gameConfig.showDebugConsole ? 
                <DebugConsoleSection /> : null
            }
        </main>
    )
}