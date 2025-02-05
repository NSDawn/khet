import FarmlandLot from "../components/lots/FarmlandLot";
import { FarmlandLotData, FarmlandSlot, LotData, makeFarmlandLotData } from "../game/Lots";
import StandardSection from "./StandardSection";

export default function LotSection(props: {title: string, lotData: LotData, setDataJSONFn: (s: string) => void, children?: React.ReactNode}) {
    
    function setFarmlandLotData(f: FarmlandLotData) {
        props.lotData.farmlandLotData = f;
        props.setDataJSONFn(JSON.stringify(props.lotData));
    }

    return (
        <StandardSection title={props.title}> 
            {(props.lotData.type === "farmland") ? 
                <FarmlandLot data={props.lotData.farmlandLotData as FarmlandLotData} setDataFn={setFarmlandLotData} />
            : null}
            {(props.lotData.type === "" || props.lotData.type == null) ?
                <></>
            : null}
            {props.children}
        </StandardSection>
    )
}
