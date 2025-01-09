import { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";
import { ItemInstance, makeItemInstance, makeValidItemInstance } from "./game/Items";
import { GameConfig, getDefaultGameConfig } from "./game/GameConfig";
import { getDefaultTooltipData, TooltipData } from "./sections/TooltipSection";
import { getDefaultInventoryTransferData, InventoryTransferData } from "./game/Inventory";

const GlobalContext = createContext<GlobalSingleton>(null as unknown as GlobalSingleton);

function GlobalContextHandler(props: PropsWithChildren) {
    const rupees = useState(125000);
    const date = useState(Date.now());
    const dateJSReadOnly = useState(new Date(date[0]));
    
    useEffect(() => {
        dateJSReadOnly[1](new Date(date[0]))
    }, [date[0]])

    const tooltipData: State<TooltipData> = useState(getDefaultTooltipData());

    const inventoryTransferData = useState(getDefaultInventoryTransferData());

    const farmhouseInventory = useState(
        [
            makeValidItemInstance("diesel", 99), 
            makeValidItemInstance("rice", 5),
        ]
    );

    const farmhouseInventoryId = useState("farmhouseL0");
    
    const personalInventory = useState(
        [
            makeValidItemInstance("wheat", 9),
            makeValidItemInstance("rice", 5),
        ]
    );

    const personalInventoryId = useState("personalL0");

    const gameConfig = useState(getDefaultGameConfig());
    
    
    return (
        <GlobalContext.Provider value={{
            "rupees": rupees,
            "date": date,
            "dateJSReadOnly": dateJSReadOnly,
            "tooltipData": tooltipData,
            "inventoryTransferData": inventoryTransferData,
            "farmhouseInventory": farmhouseInventory,
            "farmhouseInventoryId": farmhouseInventoryId,
            "personalInventory": personalInventory,
            "personalInventoryId": personalInventoryId,
            "gameConfig": gameConfig
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextHandler;

export type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];
export type GlobalSingleton = {
    date: State<number>,
    dateJSReadOnly: State<Date>,
    rupees: State<number>,
    tooltipData: State<TooltipData>,
    inventoryTransferData: State<InventoryTransferData>
    farmhouseInventory: State<ItemInstance[]>,
    farmhouseInventoryId: State<string>,
    personalInventory: State<ItemInstance[]>,
    personalInventoryId: State<string>,
    gameConfig: State<GameConfig>
};

export type SaveableGlobalSingleton = {
    date: State<number>,
    rupees: State<number>,
    farmhouseInventory: State<ItemInstance[]>,
    farmhouseInventoryId: State<string>,
    personalInventory: State<ItemInstance[]>,
    personalInventoryId: State<string>,
    gameConfig: State<GameConfig>
}

export function useGlobal() {
    return useContext(GlobalContext);
}
