import { useGlobal } from "../GlobalContextHandler";
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";

export default function DateReadout(props:{date: Date}) {

    const { t } = useTranslation(); 
    
    return (
        <span className="white-space-nowrap">
            {
                t("ui.calendar.date.template")
                    .replace("$$[day]", t(`ui.calendar.day.${props.date.getDate()}`))
                    .replace("$$[month]", t(`ui.calendar.month.${props.date.getMonth()}`))
                    .replace("$$[weekday]", t(`ui.calendar.weekday.${props.date.getDay()}`))
                    .replace("$$[year]", `${props.date.getFullYear()}`)
                    
            }
        </span>
    )
}