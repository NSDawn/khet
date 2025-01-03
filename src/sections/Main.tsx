import InfoSection from "./InfoSection.tsx";
import SettingsSection from "./SettingsSection.tsx";
import InventorySection from "./InventorySection.tsx";
import DebugConsoleSection from "./DebugConsoleSection.tsx";

export default function Main() {
    return (
        <main className="theme-default">
            <InfoSection />
            <InventorySection />
            <SettingsSection />
            <DebugConsoleSection />
        </main>
    )
}