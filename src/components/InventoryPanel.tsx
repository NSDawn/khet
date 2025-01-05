import { useState, useEffect, useTransition } from "react";
import { useGlobal } from "../GlobalContextHandler";
import { getItem, checkItemTag, getSellData, getPriceFromDate } from "../game/ItemTypes";
import { useTranslation } from "react-i18next";

export default function InventoryPanel() {

    const { t } = useTranslation();
    const [inventory, _] = useGlobal().inventory;
    const [date, __] = useGlobal().dateJSReadOnly;
    const [mode, setMode] = useState(""); // "" is default state
    const modeButtons = [
        { mode: "sell", icon: "💸" }
    ];
    
    useEffect(() => {

    })

    function clickModeButton(inMode: string) {
        setMode(mode == inMode ? "" : inMode);    
    }

    return (
        <div className="inventory-panel">
            <div className="inventory-mode-buttons">
                {
                    modeButtons.map((v, i) => 
                        <button 
                            className={`emoji-icon ${mode == v.mode ? "selected" : ""}`}
                            onClick={() => {clickModeButton(v.mode)}}
                            key={`${i}`}
                        >
                            {v.icon}
                        </button>
                    )

                }
            </div>
            <ol>
                {
                    inventory.map((itemInstance, i) => 
                        <li key={`${i}`}>
                            <span className="icon emoji-icon">
                                {getItem(itemInstance.itemId).icon}
                            </span>
                            <span className="item-name">
                                {t(`item.${itemInstance.itemId}`)}
                            </span>
                            { mode == "sell" && checkItemTag(itemInstance.itemId, "canSell") ?
                                <>
                                    <span className="price">
                                        {t(`@₹${getPriceFromDate(itemInstance.itemId, date, false)}`)}
                                    </span>
                                    { itemInstance.quantity > 10 ? 
                                        <button className="sell-all-button emoji-icon">
                                        👐
                                        </button>
                                    : null}
                                    <button className="sell-1-button emoji-icon">
                                        👍
                                    </button>
                                </>
                            : null}
                            <span className="quantity">
                                {itemInstance.quantity}
                            </span>
                        </li>
                    )
                }
            </ol>
        </div>
    )
}