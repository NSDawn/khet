import { useGlobal } from "../GlobalContextHandler";
import InventoryPanel from "../components/InventoryPanel";
import { Inventory } from "../game/Inventory";
import { useTranslation } from "react-i18next";
import { State } from "../GlobalContextHandler";
import "./InventorySection.css";
import StandardSection from "./StandardSection";

export default function InventorySection(props: {inventory: State<Inventory>, inventoryId: State<string>}) {
    const { t } = useTranslation(); 

    return (
        <StandardSection title={t(`ui.inventory.${props.inventoryId[0]}.h`)}>
            <InventoryPanel inventory={props.inventory} inventoryId={props.inventoryId}/>
        </StandardSection>
    )
}