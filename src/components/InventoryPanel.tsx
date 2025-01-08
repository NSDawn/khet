import { useState, useEffect, useTransition } from "react";
import { useGlobal } from "../GlobalContextHandler";
import { getItem, checkItemTag, getSellData, getPriceFromDate, makeItemInstance } from "../game/Items";
import { useTranslation } from "react-i18next";
import { getInventoryData, Inventory, transferItem } from "../game/Inventory";
import { State } from "../GlobalContextHandler";
import "./InventoryPanel.css";

export default function InventoryPanel(props: {inventory: State<Inventory>, inventoryId: State<string>}) {

    const { t } = useTranslation();
    const [inventory, _] = props.inventory;
    const [inventoryId, __] = props.inventoryId;
    const [date, ___] = useGlobal().dateJSReadOnly;
    const [inventoryTransferData, setInventoryTransferData] = useGlobal().inventoryTransferData;
    const [mode, setMode] = useState(""); // "" is default state
    const modeButtons = [
        { mode: "out", icon: "🔼" },
        { mode: "in", icon: "🔽" },
    ];
    const [tooltipData, setTooltipData] = useGlobal().tooltipData;
    const [idCount, setIdCount] = useState(0);
    const [idCountLimit, setIdCountLimit] = useState(-1);
    const [quantityCount, setQuantityCount] = useState(0);
    const [quantityCountLimit, setQuantityCountLimit] = useState(-1);
    const [limitDisplay, setLimitDisplay] = useState("");
    
    useEffect(() => {
        setIdCount(inventory.length);
        setQuantityCount(inventory.reduce((a, v) => a + v.quantity, 0))
        const data = getInventoryData(inventoryId);
        if (data) {
            setIdCountLimit(data.idLimit ?? -1);
            setQuantityCountLimit(data.quantityLimit ?? -1);
        }
    }, [inventory, inventoryId])

    useEffect(() => {
        let newLimitDisplay = "";
        if (idCountLimit != -1) {
            newLimitDisplay += `${idCount}/${idCountLimit}`;
        }
        if (quantityCountLimit != -1) {
            if (idCountLimit != -1) newLimitDisplay += " ";
            newLimitDisplay += `${quantityCount}/${quantityCountLimit}`;
        }
        setLimitDisplay(newLimitDisplay)
    }, [idCount, idCountLimit, quantityCount, quantityCountLimit])

    useEffect(() => {
        if (mode === "in") {
            if (inventoryTransferData.inId && inventoryTransferData.inId[0] === props.inventoryId[0]) return;
            inventoryTransferData.inId = props.inventoryId;
            inventoryTransferData.in = props.inventory;
            if (inventoryTransferData.outId && inventoryTransferData.outId[0] === props.inventoryId[0]) {
                inventoryTransferData.out = undefined;
                inventoryTransferData.outId = undefined;
            }
            setInventoryTransferData({...inventoryTransferData});
        } else if (mode === "out") {
            if (inventoryTransferData.outId && inventoryTransferData.outId[0] === props.inventoryId[0]) return;
            inventoryTransferData.outId = props.inventoryId;
            inventoryTransferData.out = props.inventory;
            if (inventoryTransferData.inId && inventoryTransferData.inId[0] === props.inventoryId[0]) {
                inventoryTransferData.in = undefined;
                inventoryTransferData.inId = undefined;
            }
            setInventoryTransferData({...inventoryTransferData});
        } else if (mode === "") {
            if (inventoryTransferData.outId && inventoryTransferData.outId[0] === props.inventoryId[0]) {
                inventoryTransferData.outId = undefined;
                inventoryTransferData.out = undefined;
                setInventoryTransferData({...inventoryTransferData});
            } else if (inventoryTransferData.inId && inventoryTransferData.inId[0] === props.inventoryId[0]) {
                inventoryTransferData.inId = undefined;
                inventoryTransferData.inId = undefined;
                setInventoryTransferData({...inventoryTransferData});
            };
        }
    }, [mode]);

    useEffect(() => {
        if (mode === "in") {
            if (!inventoryTransferData.inId || inventoryTransferData.inId[0] !== props.inventoryId[0]) {
                setMode("");
            }
        } else if (mode === "out") {
            if (!inventoryTransferData.outId || inventoryTransferData.outId[0] !== props.inventoryId[0]) {
                setMode("");
            }
        }
    }, [inventoryTransferData])

    function clickModeButton(inMode: string) {
        setMode(mode == inMode ? "" : inMode);    
    }

    return (
        <div className="inventory-panel">
            <div className="inventory-mode-buttons">
                {
                    modeButtons.map((v, i) => 
                        <button 
                            className={`emoji-icon ${v.mode} ${mode == v.mode ? "selected" : ""}`}
                            onClick={() => {clickModeButton(v.mode)}}
                            key={`${i}`}
                        >
                            {v.icon}
                        </button>
                    )

                }
            </div>
            <div className="limits">
                {limitDisplay}
            </div>
            <ol>
                {
                    inventory.map((itemInstance, i) => 
                        <li 
                            key={`${i}`} 
                            onMouseMove={(e) => setTooltipData({...tooltipData, type: "inventoryItem", id: itemInstance.itemId, otherData: [itemInstance.quantity.toString()], pageX: e.pageX, pageY: e.pageY, enabled: true})}
                            onMouseOut={() => setTooltipData({...tooltipData, enabled: false})}
                            onClick={() => {if (mode === "out") transferItem(inventoryTransferData, itemInstance)}}
                        >
                            <span className="icon emoji-icon">
                                {getItem(itemInstance.itemId).icon}
                            </span>
                            <span className="item-name">
                                {t(`item.${itemInstance.itemId}`)}
                            </span>
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