import { useGlobal } from "../GlobalContextHandler"

export default function Header() {
    
    let [gameConfig, setGameConfig] = useGlobal().gameConfig;

    return (
        <header>
            
        </header>
    )
}