import { useDeferredValue } from "react";
import { State } from "../GlobalContextHandler";
import { GlobalSingleton } from "../GlobalContextHandler";
import { checkGrouping, cloneItemInstance, flipQuantity, ItemInstance, makeItemInstance } from "./Items";
import { Grouping } from "./Items";

export type InventoryData = {
    inventoryId: string,
    idLimit?: number,
    quantityLimit?: number,
    filter?: InventoryFilter,
}

import __InventoryDataRef from "./InventoryDataRef.json";
import InventoryPanel from "../components/InventoryPanel";
const InventoryDataRef: Record<string, InventoryData> = __InventoryDataRef;

export function getInventoryData(inventoryId: string): InventoryData | null {
    return InventoryDataRef[inventoryId] || null;
}

export type InventoryFilter = {
    mode: string // "whitelist" || "blacklist"
    itemIdList?: string[],
    itemGroupingList?: Grouping[],
}

export type Inventory = ItemInstance[];

export type InventoryTransferData = {
    in?: State<Inventory>,
    inId?: State<string>,
    out?: State<Inventory>
    outId?: State<string>,
}

export function getDefaultInventoryTransferData(): InventoryTransferData {
    return {};
}

export function putItemNaively(invState: State<ItemInstance[]>, putItemInstance: ItemInstance): boolean {

    const [inventory, setInventory] = invState;
    let itemInstanceToEdit: ItemInstance | null = null;
    for (let itemInstance of inventory) {
        if (itemInstance.itemId == putItemInstance.itemId) {
            itemInstanceToEdit = itemInstance;
        }
    }
    console.log(itemInstanceToEdit);


    if (putItemInstance.quantity == 0) return (itemInstanceToEdit == null);
    
    if (putItemInstance.quantity > 0) {
        if (itemInstanceToEdit == null) {
            //setInventory([...inventory, cloneItemInstance(putItemInstance)]);
            // why did this work? vv and not this ^^ no idea
            inventory.push(cloneItemInstance(putItemInstance));
            setInventory([...inventory]);
            return true;
        }
        itemInstanceToEdit.quantity += putItemInstance.quantity;
        setInventory([...inventory]);
        return true;
    }

    if (itemInstanceToEdit == null) return false;
    if (itemInstanceToEdit.quantity + putItemInstance.quantity < 0) return false;
    
    itemInstanceToEdit.quantity += putItemInstance.quantity;
    setInventory([...inventory]);
    
    if (itemInstanceToEdit.quantity == 0) {
        setInventory(inventory.filter((v) => v.itemId !== putItemInstance.itemId));
    }
    
    return true;
}

export function putItem(invState: State<Inventory>, inventoryId: string, putItemInstance: ItemInstance): boolean {
    if (!checkValidPutInventory(invState, inventoryId, putItemInstance)) return false;
    return putItemNaively(invState, putItemInstance);
}


export function transferItem(data: InventoryTransferData, transferItemInstance: ItemInstance): boolean {
    if (!data.in) return false; 
    if (!data.inId) return false;
    if (!data.out) return false;
    if (!data.outId) return false;
    if (checkValidPutInventory(data.out, data.outId[0], flipQuantity(transferItemInstance))) {
        // known bug: if the _AMT_ of items in the IN Inventory is insufficient, it will still transfer.
        if (putItem(data.in, data.inId[0], cloneItemInstance(transferItemInstance))) {
            putItem(data.out, data.outId[0], flipQuantity(transferItemInstance));
            return true;
        } 
        
    }
    return false;
}

export function checkValidPutInventory(invState: State<Inventory>, inventoryId: string, checkItemInstance: ItemInstance): boolean {
    const inventoryData = getInventoryData(inventoryId);
    const [inventory, _] = invState;
    if (inventoryData == null) return true;
    if (inventoryData.idLimit && inventoryData.idLimit < inventory.length) return false;
    const inventoryTotalQuantity = inventory.reduce((a, v) => (v.quantity + a), 0);
    if (inventoryData.quantityLimit && inventoryData.quantityLimit < inventoryTotalQuantity + checkItemInstance.quantity) return false;
    if (inventoryData.filter) {
        if (inventoryData.filter.mode = "whitelist") {
            if (inventoryData.filter.itemIdList?.includes(checkItemInstance.itemId)) return true;
            if (
                inventoryData.filter.itemGroupingList &&
                inventoryData.filter.itemGroupingList.some((grouping) => checkGrouping(checkItemInstance.itemId, grouping))
            ) return true;
            return false;
        } else if (inventoryData.filter.mode = "blacklist") {
            if (inventoryData.filter.itemIdList?.includes(checkItemInstance.itemId)) return false;
            if (
                inventoryData.filter.itemGroupingList &&
                inventoryData.filter.itemGroupingList.some((grouping) => checkGrouping(checkItemInstance.itemId, grouping))
            ) return false;
            return true;
        }
    }
    return true;
}