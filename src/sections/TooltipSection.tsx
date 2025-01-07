import { useGlobal } from "../GlobalContextHandler";
import "./TooltipSection.css";
import { useState, useEffect } from "react";
import { getItem, getPrimaryGrouping } from "../game/Items";
import { useTranslation } from "react-i18next";

export function TooltipSection() {

    const [tooltipStyle, setTooltipStyle] = useState({});
    const [enabled, setEnabled] = useState(true);
    const [tooltipData, setTooltipData] = useGlobal().tooltipData;
    const { t } = useTranslation();

    useEffect(() => {
        setTooltipStyle({
            ...tooltipStyle,
            left: `${tooltipData.pageX + 10}px`,
            top: `${tooltipData.pageY + 10}px`,
        })
        setEnabled(tooltipData.enabled);
    }, [tooltipData])


    return (
        <section 
            className={`tooltip ${enabled? "enabled": ""}`} 
            style={tooltipStyle}
        >
            {tooltipData.type === "inventoryItem" ? <>
                <h2>{getItem(tooltipData.id ?? "").icon} {t(`item.${tooltipData.id}`)}</h2>
                <h3>{t(`item.group.${getPrimaryGrouping(tooltipData.id ?? "").groupId}`)}</h3>
                { getPrimaryGrouping(tooltipData.id ?? "").subgroupId ?
                    <span>{t(`item.subgroup.${getPrimaryGrouping(tooltipData.id ?? "").subgroupId}`)}</span>
                : null}
            </> : null}
        </section>
    )
}

export type TooltipData = { 
    pageX: number,
    pageY: number,
    enabled: boolean,
    type?: string,
    id?: string,
    otherData?: string[]
}

export function getDefaultTooltipData(): TooltipData {
    return {
        pageX: 0,
        pageY: 0,
        enabled: false,
        type: undefined,
        id: undefined,
        otherData: undefined,
    }
}