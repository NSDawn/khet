import { useState } from "react";
import { FarmlandLotData, FarmlandSlot, getFarmlandSlotIcon } from "../../game/Lots";
import "./Lots.css";
import { useGlobal } from "../../GlobalContextHandler";
import { getValidGrowData, plantInFarmlandSlot } from "../../game/Farming";

export default function FarmlandLot(props: {data: FarmlandLotData, setDataFn: (s: FarmlandLotData) => void }) {
    
    let [tooltipData, setTooltipData] = useGlobal().tooltipData;

    function updateSlot(s: FarmlandSlot, idx: number) {
        props.data.slots[idx] = s;
        props.setDataFn(props.data);
    }
    
    return (
        <div className="farmland-lot">
            {props.data.slots.map((v, i) =>  
                <div
                    key={i} className="farmland-slot emoji-icon"
                    onMouseMove={(e) => setTooltipData({...tooltipData, type: "farmlandSlot", id: v.seedId, otherData: [JSON.stringify(v, null, "\n")], pageX: e.pageX, pageY: e.pageY, enabled: true})}
                    onMouseOut={() => setTooltipData({...tooltipData, enabled: false})}
                    onClick={() => {updateSlot(plantInFarmlandSlot(v, "wheat"), i)}}
                >
                    <div className="main-icon">
                        {getFarmlandSlotIcon(v.seedId ?? "", v.stage)}
                    </div>
                    <div className="indicator water-indicator">
                        {getWaterIndicatorString(v)}
                    </div>
                    <div className="indicator progress-indicator">
                        {`13/~53d`}
                    </div>
                    <div className="indicator progress-indicator progress-indicator-total">
                        {`(56/~123d)`}
                    </div>
                    
                    
                </div>
            )}
        </div>
    )
}

function getWaterIndicatorString(farmlandSlot: FarmlandSlot): string {
    let w = farmlandSlot.watered;
    let ret = "";
    while (w > 0) {
        ret += "💧";
        w --;
    }
    if (ret === "") ret = "-";
    return ret; 
}

function getProgressIndicator(farmlandSlot: FarmlandSlot, total = false) {
    if (!farmlandSlot.seedId || !farmlandSlot.stage) return "";
    const data = getValidGrowData(farmlandSlot.seedId);

    if (total) {
        // TODO: make progressIndicator translatable
        // FINISH
        return `${farmlandSlot.daysRemainingInStage} /~${data.stages[farmlandSlot.stage].lengthDays}`
    }
}