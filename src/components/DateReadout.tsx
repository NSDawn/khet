import { useGlobal } from "../GlobalContextHandler";
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";

export default function DateReadout() {
    const [date, _] = useGlobal().date;
    
    let day: number = 0;
    let month: number = 0; 
    let year: number = 0;
    let weekday: number = 0;

    function updateDate() {
        let dateObj = new Date(date);
        day = dateObj.getDate();
        weekday = dateObj.getDay();
        month = dateObj.getMonth();
        year = dateObj.getFullYear();
    } 
    updateDate();
    useEffect(updateDate, [date]);

    const { t } = useTranslation(); 
    
    return (
        <>
            {
                t("ui.calendar.date.template")
                    .replace("$$[day]", t(`ui.calendar.day.${day}`))
                    .replace("$$[month]", t(`ui.calendar.month.${month}`))
                    .replace("$$[weekday]", t(`ui.calendar.weekday.${weekday}`))
                    .replace("$$[year]", `${year}`)
                    
            }
        </>
    )
}