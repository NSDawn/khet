import { useGlobal } from "../GlobalContextHandler.tsx";
import InfoSection from "./InfoSection.tsx";
import SettingsSection from "./SettingsSection.tsx";
import InventorySection from "./InventorySection.tsx";
import DebugConsoleSection from "./DebugConsoleSection.tsx";
import { useEffect } from "react";
import { changeLanguage } from "i18next";

export default function Main() {
    const [gameConfig, _] = useGlobal().gameConfig;
    
    useEffect(() => {
        changeLanguage(gameConfig.locale)
    }, [gameConfig.locale])

    return (
        <main className="theme-default">
            <InfoSection />
            <InventorySection />
            <SettingsSection />
            {
                gameConfig.debug && gameConfig.showDebugConsole ? 
                <DebugConsoleSection /> : null
            }
        </main>
    )
}