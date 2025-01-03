import { useGlobal } from "../GlobalContextHandler";
import InventoryPanel from "../components/InventoryPanel";
import "./InventorySection.css";

export default function InventorySection() {
    return (
        <section>
            <InventoryPanel />
        </section>
    )
}