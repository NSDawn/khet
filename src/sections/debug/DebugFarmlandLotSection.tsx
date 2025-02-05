import { useEffect, useState } from "react";
import LotSection from "../LotSection"
import { FarmlandSlot, LotData, makeFarmlandLot, makeFarmlandLotData } from "../../game/Lots";
import { incrementDayFarmlandSlot, plantInFarmlandSlot, waterFarmlandSlot } from "../../game/Farming";
import { Temperature } from "../../game/DateAndClimate";

export default function DebugFarmlandLotSection() {

    const [farmlandLot, setFarmlandLot] = useState(JSON.stringify(makeFarmlandLot(1, "Debug Lot")));
    let farmlandLotData = (JSON.parse(farmlandLot) as LotData).farmlandLotData;
    const [inputSeedId, setInputSeedId] = useState("");
    const [inputRain, setInputRain] = useState("0");
    const [inputTempHigh, setInputTempHigh] = useState("30");
    const [inputTempLow, setInputTempLow] = useState("20");
    let inputTemperature: Temperature;
    updateTemperature();

    function updateSlot(s: FarmlandSlot, idx: number) {
        let j = JSON.parse(farmlandLot);
        j.farmlandLotData!.slots[idx] = s;
        setFarmlandLot(JSON.stringify(j));
    }

    useEffect(() => {
        farmlandLotData = (JSON.parse(farmlandLot) as LotData).farmlandLotData;
    }, [farmlandLot])

    useEffect(updateTemperature, [inputTempHigh, inputTempLow])

    function updateTemperature() {
        inputTemperature = {high: parseInt(inputTempHigh), low: parseInt(inputTempLow)}
    }

    return (
        <LotSection title="Debug Farmland Lot" lotData={JSON.parse(farmlandLot)} setDataJSONFn={setFarmlandLot}>
            <div>
                Water:
                {
                    [1, 2, 3, 4, 5].map((i) => <button className="emoji-icon" key={i} 
                            onClick={() => updateSlot(waterFarmlandSlot(farmlandLotData?.slots[0]!, i), 0)}
                        > 
                        {i}
                    </button>)
                }
                <br/>
                Plant SeedId:
                <input value={inputSeedId} onChange={e => setInputSeedId(e.target.value)} />
                <button className="emoji-icon" 
                    onClick={() => updateSlot(plantInFarmlandSlot(farmlandLotData?.slots[0]!, inputSeedId), 0)}
                >  
                    🌱
                </button>
                <br/>
                Temperature: 
                high: <input value={inputTempHigh} onChange={e => setInputTempHigh(e.target.value)} /> low: <input value={inputTempLow} onChange={e => setInputTempLow(e.target.value)} />
                <br />
                Rain:
                <input value={inputRain} onChange={e => setInputRain(e.target.value)} />
                <button className="emoji-icon" 
                    onClick={() => updateSlot(incrementDayFarmlandSlot(farmlandLotData?.slots[0] as FarmlandSlot, parseInt(inputRain), inputTemperature) as FarmlandSlot, 0)}
                >  
                    ➡️
                </button>
            </div>
        </LotSection>
    )
}