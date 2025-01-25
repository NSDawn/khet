import { useEffect, useState } from "react";
import { trySetGameConfig } from "../../game/GameConfig";
import { GlobalSingleton, useGlobal } from "../../GlobalContextHandler";
import './Debug.css';

export default function DebugButton() {

    const G = useGlobal();
    const [debugEnabled, setDebugEnabled] = useState(G.gameConfig[0].debug);

    useEffect(() => {
        trySetGameConfig(G, "debug", debugEnabled)
    }, [debugEnabled])


    return (
        <button 
            className={`debug-button emoji-icon ${debugEnabled? "enabled" : ""}`}
            onClick={() => {setDebugEnabled(!debugEnabled)}}
        >
            🪲
        </button>
    )
}