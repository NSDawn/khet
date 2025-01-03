import { useGlobal } from "../GlobalContextHandler";
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import DateReadout from "../components/DateReadout";

export default function InfoSection() {
    
    const [capital, setCapital] = useGlobal().capital;
    const [date, setDate] = useGlobal().date;

    const { t } = useTranslation(); 
    const MILLISECONDS_IN_ONE_DAY = 1000 * 60 * 60 * 24;

    return (
        <section>
            <h2>₹ {capital} </h2>
            <h3> 
                <DateReadout />
                <button onClick={() => {
                    setDate(date + MILLISECONDS_IN_ONE_DAY);
                }}/>
            </h3>
        </section>
    )
}