import { PropsWithChildren, createContext, useContext, useState } from "react";
const GlobalContext = createContext<GlobalSingleton>(null as unknown as GlobalSingleton);

function GlobalContextHandler(props: PropsWithChildren) {
    const capital = useState(0);
    const date = useState(Date.now());
    
    return (
        <GlobalContext.Provider value={{
            "capital": capital,
            "date": date,
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextHandler;

export type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];
export type GlobalSingleton = {
    date: State<number>,
    capital: State<number>,
};

export function useGlobal() {
    return useContext(GlobalContext);
}
