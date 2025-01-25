import { useState } from "react";
import { useGlobal } from "../GlobalContextHandler"
import { getMapData, Spot } from "../game/World";

export default function MapDisplay(props: {type: "domain" | "world" | "local", onSelectFn: (destination: Spot) => void, selectedSpot: Spot}) {

    let mapKey: string = "";
    
    if (props.type === "domain") mapKey = props.selectedSpot.domain;
    else if (props.type === "world") mapKey = props.selectedSpot.world;
    else if (props.type === "local") mapKey = props.selectedSpot.local;
    
    const mapData = getMapData(mapKey);

    return (
        <div className="map-display">
            {
                mapData.spots.map((iSpot, i) => 
                    <div role="button" key={i} className="emoji-icon map-spot" style={{
                        
                        left: `${(iSpot.position.x -(iSpot.size.x/2) )/ 3}vw`,
                        top: `${(iSpot.position.y -(iSpot.size.y/2)) / 3}vw`,
                        width: `${iSpot.size.x / 3}vw`,
                        height: `${iSpot.size.y / 3}vw`,
                    }}
                        onClick={() => props.onSelectFn(iSpot.destination)}
                    >
                        {iSpot.icon}
                    </div>
                )
            }
        </div>
    )
}