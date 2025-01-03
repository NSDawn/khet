import { KeyboardEvent, useState } from "react";
import "./DebugConsoleSection.css";
import { putItem } from "../game/Inventory";
import { useGlobal } from "../GlobalContextHandler";

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
                    return "smth is wrong bro<br/>usage: inv [itemId] [quantity]"
                }
                putItem(G, cmd[1], parseInt(cmd[2]));
                return "done.";
            default: 
                return "cmd[0] not understood";
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

