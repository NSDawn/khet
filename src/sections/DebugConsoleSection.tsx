import { KeyboardEvent, useState } from "react";
import "./DebugConsoleSection.css";
import { putItem } from "../game/Inventory";
import { useGlobal } from "../GlobalContextHandler";
import { trySetGameConfig } from "../game/GameConfig";

export default function DebugConsoleSection() {

    const [consoleHistory, setConsoleHistory] = useState("");
    const [inputText, setInputText] = useState("");
    const G = useGlobal();

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Enter") {
            let escapedtextInput = inputText;
            escapedtextInput = escapedtextInput.trim();
            setInputText("");

            if (escapedtextInput == "") return;

            while (escapedtextInput.includes("<") || escapedtextInput.includes(">")) {
                escapedtextInput = escapedtextInput.replace("<", "&lt;").replace(">", "&gt;");
            }
            setConsoleHistory(consoleHistory + escapedtextInput + "<br />" + runCommand(escapedtextInput) + "<br />");
            
            
            setTimeout(() => {
                const consoleHistoryDiv = document.querySelector("div.debug-console-history");
                if (consoleHistoryDiv) {consoleHistoryDiv.scrollTop = consoleHistoryDiv.scrollHeight};
            }, 20);
        }
    }

    function runCommand(cmdString: string): string {
        const cmd = cmdString.split(" ");
    
        switch (cmd[0]) {
            case "inv" : 
                if (cmd.length !== 3) {
                    return "i don't understand sis<br/>usage: inv [itemId] [quantity]"
                }
                if (!putItem(G, cmd[1], parseInt(cmd[2]))) return "something went wrong, boss."
                return "done.";
            case "config" : 
                if (cmd.length !== 3) {
                    return "i don't understand sis<br/>usage: config [configId] [value]"
                }
                let val: string | number | boolean | null;
                if (cmd[2] === "null") {
                    val = null;
                } else if (cmd[2] === "true") {
                    val = true;
                } else if (cmd[2] === "false") {
                    val = false;
                } else if (!cmd[2].split("").some((c) => "1234567890.".includes(c))) {
                    if (cmd[2].includes(".")) { val = parseFloat(cmd[2])}
                    else (val = parseInt(cmd[2]))
                } else {
                    val = cmd[2];
                }
                if (!trySetGameConfig(G, cmd[1], val)) {return "that game config don't seem to exist"}
                return "sounds good, queen";
            default: 
                return "girl i dunno that command";
        }
    }
    
    return (
        <section>
            <div className="debug-console-history" dangerouslySetInnerHTML={{__html: consoleHistory}}>
                
            </div>
            <input className="debug-console-input" type="text" value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={handleKeyDown} />
        </section>
    )
}

