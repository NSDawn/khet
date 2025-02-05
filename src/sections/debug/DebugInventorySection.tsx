import { useGlobal } from "../../GlobalContextHandler";
import InventoryPanel from "../../components/InventoryPanel";
import { getDebugInventory, Inventory } from "../../game/Inventory";
import { useTranslation } from "react-i18next";
import { State } from "../../GlobalContextHandler";
import "./DebugSections.css";
import { useEffect, useState } from "react";
import StandardSection from "../StandardSection";

export default function DebugInventorySection() {
    const { t } = useTranslation(); 
    const invState = useState(getDebugInventory(99999));
    const invIdState = useState("");

    // useEffect(() => {
    //    invState[1](getDebugInventory(999))
    // }, [invState[0]])

    return (
        <StandardSection title="Debug Inventory">
            <button className="emoji-icon" onClick={() => invState[1](getDebugInventory(99999))}> 🔁 </button>
            <InventoryPanel inventory={invState} inventoryId={invIdState} />
            
        </StandardSection>
    )
}