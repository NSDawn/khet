import { useDeferredValue } from "react";
import { State } from "../GlobalContextHandler";
import { GlobalSingleton } from "../GlobalContextHandler";
import { ItemInstance, makeItemInstance } from "./ItemTypes";

export function putItem(G: GlobalSingleton, itemId:string, quantity: number): boolean {
    
    const [inventory, setInventory] = G.inventory;
    let itemInstanceToEdit: ItemInstance | null = null;
    for (let itemInstance of inventory) {
        if (itemInstance.itemId == itemId) {
            itemInstanceToEdit = itemInstance;
        }
    }

    if (quantity == 0) return (itemInstanceToEdit == null);
    
    if (quantity > 0) {
        if (itemInstanceToEdit == null) {
            setInventory([...inventory, makeItemInstance(itemId, quantity)]);
            return true;
        }
        itemInstanceToEdit.quantity += quantity;
        setInventory([...inventory]);
        return true;
    }

    if (itemInstanceToEdit == null) return false;
    if (itemInstanceToEdit.quantity + quantity < 0) return false;
    
    itemInstanceToEdit.quantity += quantity;
    setInventory([...inventory]);
    
    if (itemInstanceToEdit.quantity == 0) {
        setInventory(inventory.filter((v) => v.itemId !== itemId));
    }
    
    return true;
}