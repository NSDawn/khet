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
    const invState = useState(getDebugInventory(999));
    const invIdState = useState("");

    useEffect(() => {
        invState[1](getDebugInventory(999))
    }, [invState[0]])

    return (
        <StandardSection title="Debug Inventory">
            
            <InventoryPanel inventory={invState} inventoryId={invIdState}/>
        </StandardSection>
    )
}