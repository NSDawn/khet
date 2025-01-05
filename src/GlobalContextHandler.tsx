import { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";
import { ItemInstance, makeItemInstance } from "./game/ItemTypes";
import { GameConfig, getDefaultGameConfig } from "./game/GameConfig";

const GlobalContext = createContext<GlobalSingleton>(null as unknown as GlobalSingleton);

function GlobalContextHandler(props: PropsWithChildren) {
    const capital = useState(0);
    const date = useState(Date.now());
    const dateJSReadOnly = useState(new Date(date[0]));
    
    useEffect(() => {
        dateJSReadOnly[1](new Date(date[0]))
    }, [date[0]])

    const inventory = useState(
        [
            makeItemInstance("diesel", 99), 
            makeItemInstance("rice", 2),
            makeItemInstance("sgloobis", -1),
        ]
    );
    const gameConfig = useState(getDefaultGameConfig());
    
    
    return (
        <GlobalContext.Provider value={{
            "capital": capital,
            "date": date,
            "dateJSReadOnly": dateJSReadOnly,
            "inventory": inventory,
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
    capital: State<number>,
    inventory: State<ItemInstance[]>,
    gameConfig: State<GameConfig>
};

export type SaveableGlobalSingleton = {
    date: State<number>,
    capital: State<number>,
    inventory: State<ItemInstance[]>,
    gameConfig: State<GameConfig>
}

export function useGlobal() {
    return useContext(GlobalContext);
}
