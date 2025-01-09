import { useState, useEffect, useTransition } from "react";
import { useGlobal } from "../GlobalContextHandler";
import { getItem, checkItemTag, getSellData, getPriceFromDate, makeItemInstance, ItemInstance, cloneItemInstance, flipQuantity } from "../game/Items";
import { useTranslation } from "react-i18next";
import { getInventoryData, Inventory, putItem, transferItem } from "../game/Inventory";
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
        { mode: "in", icon: "🔽" },
        { mode: "out10", icon: "🔼"},
        { mode: "outAll", icon: "⏫"},
        { mode: "trash", icon: "🚮"},
    ];
    const [tooltipData, setTooltipData] = useGlobal().tooltipData;
    const [idCount, setIdCount] = useState(0);
    const [idCountLimit, setIdCountLimit] = useState(-1);
    const [quantityCount, setQuantityCount] = useState(0);
    const [quantityCountLimit, setQuantityCountLimit] = useState(-1);
    const [limitDisplay, setLimitDisplay] = useState("");
    const [searchInput, setSearchInput] = useState("");
    
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
            if (!inventoryTransferData.inId || inventoryTransferData.inId[0] !== props.inventoryId[0]) {
                inventoryTransferData.in = props.inventory;
                inventoryTransferData.inId = props.inventoryId;
                setInventoryTransferData({...inventoryTransferData});
            }
        }
    }, [mode])

    useEffect(() => {
        if (mode !== "in") return;
        if (inventoryTransferData.inId && inventoryTransferData.inId[0] !== props.inventoryId[0]) {
            setMode("");
        }
    }, [inventoryTransferData]);

    function clickModeButton(inMode: string) {
        setMode(mode == inMode ? "" : inMode);    
    }
    
    function handleItemTransfer(itemInstance: ItemInstance) {
        if (mode === "in") return;

        if (mode === "trash") {
            putItem(props.inventory, props.inventoryId[0], flipQuantity(itemInstance));
            return;
        }
        let quantityToSend = 1;
        if (mode === "out10") quantityToSend = Math.min(itemInstance.quantity, 10);
        if (mode === "outAll") quantityToSend = itemInstance.quantity;

        const newInventoryTransferData = {...inventoryTransferData, out: props.inventory, outId: props.inventoryId};
        setInventoryTransferData(newInventoryTransferData);
        transferItem(newInventoryTransferData, makeItemInstance(itemInstance.itemId, quantityToSend));
        
    }

    return (
        <div className="inventory-panel">
            <div className="row inventory-mode-buttons">
                {
                    modeButtons.map((v, i) => 
                        <button 
                            className={`emoji-icon ${v.mode} ${mode == v.mode ? "selected" : ""}`}
                            onClick={() => {clickModeButton(v.mode)}}
                            key={`${i}`}
                            onMouseMove={(e) => setTooltipData({...tooltipData, type: "inventoryButton", id: v.mode, pageX: e.pageX, pageY: e.pageY, enabled: true})}
                            onMouseOut={() => setTooltipData({...tooltipData, enabled: false})}
                        >
                            {v.icon}
                        </button>
                    )

                }
            </div>
            <div className="row">
                <button
                    className={`small-clickable-no-outline emoji-icon`}
                    onClick={() => {setSearchInput("")}}
                >
                    {(searchInput === "")? "🔎" : "ｘ"}
                </button>
                <input 
                    type="text" 
                    value={searchInput}
                    onChange={(e) => {setSearchInput(e.target.value)}}
                    className={`search-input`}
                />
                <div className="limits right">{limitDisplay}</div>
            </div>
            <ol>
                {
                    inventory.map((itemInstance, i) => 
                        <li 
                            key={`${i}`} 
                            onMouseMove={(e) => setTooltipData({...tooltipData, type: "inventoryItem", id: itemInstance.itemId, otherData: [itemInstance.quantity.toString()], pageX: e.pageX, pageY: e.pageY, enabled: true})}
                            onMouseOut={() => setTooltipData({...tooltipData, enabled: false})}
                            onClick={() => {handleItemTransfer(itemInstance)}}
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