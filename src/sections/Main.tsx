import { useGlobal } from "../GlobalContextHandler.tsx";
import InfoSection from "./InfoSection.tsx";
import SettingsSection from "./SettingsSection.tsx";
import InventorySection from "./InventorySection.tsx";
import DebugConsoleSection from "./DebugConsoleSection.tsx";

export default function Main() {
    const [gameConfig, _] = useGlobal().gameConfig;

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