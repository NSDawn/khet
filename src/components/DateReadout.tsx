import { useGlobal } from "../GlobalContextHandler";
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";

export default function DateReadout(props:{date: Date}) {
    // const [date, _] = useGlobal().date;
    
    // let day: number = 0;
    // let month: number = 0; 
    // let year: number = 0;
    // let weekday: number = 0;

    // function updateDate() {
    //     let dateObj = new Date(date);
    //     day = dateObj.getDate();
    //     weekday = dateObj.getDay();
    //     month = dateObj.getMonth();
    //     year = dateObj.getFullYear();
    // } 
    // updateDate();
    // useEffect(updateDate, [date]);

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