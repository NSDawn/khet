import { useGlobal } from "../GlobalContextHandler";
import InventoryPanel from "../components/InventoryPanel";
import { Inventory } from "../game/Inventory";
import { useTranslation } from "react-i18next";
import { State } from "../GlobalContextHandler";
import "./InventorySection.css";

export default function InventorySection(props: {inventory: State<Inventory>, inventoryId: string}) {
    const { t } = useTranslation(); 

    return (
        <section>
            <h2>{t(`ui.inventory.${props.inventoryId}.h`)}</h2>
            <InventoryPanel inventory={props.inventory}/>
        </section>
    )
}