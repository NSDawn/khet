import { useGlobal } from "../GlobalContextHandler";
import "./TooltipSection.css";
import { useState, useEffect } from "react";
import { checkItemTag, getItem, getPrimaryGrouping } from "../game/Items";
import { useTranslation } from "react-i18next";
import { getPriceFromDate } from "../game/Items";
import { formatNumber } from "../i18n/i18nNumeric";

export function TooltipSection() {

    const [tooltipStyle, setTooltipStyle] = useState({});
    const [enabled, setEnabled] = useState(true);
    const [tooltipData, setTooltipData] = useGlobal().tooltipData;
    const [date, _] = useGlobal().dateJSReadOnly;
    const [gameConfig, __] = useGlobal().gameConfig;
    const { t } = useTranslation();

    useEffect(() => {
        setTooltipStyle({
            left: `${tooltipData.pageX + 10}px`,
            top: `${tooltipData.pageY + 10}px`,
        })
        setEnabled(tooltipData.enabled);
    }, [tooltipData])

    function getFormattedPrice(getTotal: boolean = false): string { // only use if mode is inventoryItem
        let price = getPriceFromDate(tooltipData.id as string, date, false);
        if (getTotal && tooltipData.otherData) {
            price *= parseInt(tooltipData.otherData[0]);
        }
        return formatNumber(price, gameConfig.numberFormat);

    }

    return (
        <section 
            className={`tooltip ${enabled? "enabled": ""}`} 
            style={tooltipStyle}
        >
            {tooltipData.type === "inventoryItem" ? <>
                <h2><span className="emoji-icon">{getItem(tooltipData.id ?? "").icon}</span> {t(`item.${tooltipData.id}`)}</h2>
                <h3>{t(`item.group.${getPrimaryGrouping(tooltipData.id ?? "").groupId}`)}</h3>
                { getPrimaryGrouping(tooltipData.id ?? "").subgroupId ?
                    <h4>{t(`item.subgroup.${getPrimaryGrouping(tooltipData.id ?? "").subgroupId}`)}</h4>
                : null}
                <div>
                    <p>
                        { (checkItemTag(tooltipData.id as string, "canSell")) ?
                            <>
                                <span>
                                    ₹{getFormattedPrice()}
                                    &nbsp;&#40;₹{getFormattedPrice(true)}&#41;
                                </span>
                                <br />
                            </>
                        : null}
                        {t(`item.${tooltipData.id}.flavor`)}
                    </p> 
                </div>
                
            </> : null}

            {tooltipData.type === "inventoryButton" ? <>
                <span>{t(`ui.inventory.button.${tooltipData.id}`)}</span>
            </> :null}

            {tooltipData.type === "farmlandSlot" ? <>
                <span>
                    {(tooltipData.otherData??[])[0]}
                </span>
            </> :null}
        </section>
    )
}

export type TooltipData = { 
    pageX: number,
    pageY: number,
    enabled: boolean,
    type?: string,
    id?: string | null,
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