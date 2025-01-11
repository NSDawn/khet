import { useGlobal } from "../GlobalContextHandler";
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import DateReadout from "../components/DateReadout";
import InventoryPanel from "../components/InventoryPanel";
import { formatNumber, formatTemperature } from "../i18n/i18nNumeric";
import MoneyReadout from "../components/MoneyReadout";

export default function InfoSection() {
    
    const G = useGlobal();
    const [rupees, setRupees] = G.rupees;
    const [date, setDate] = G.date;
    const [gameConfig, _] = G.gameConfig;

    return (
        <section>
            <h2>₹ {<MoneyReadout moneyState={G.rupees} />} </h2>
            <h4> 
                <DateReadout />
            </h4>
            <h3>{formatTemperature(32, gameConfig.unitTemperature)} </h3>
            <InventoryPanel inventory={G.personalInventory} inventoryId={G.personalInventoryId}/>
        </section>
    )
}