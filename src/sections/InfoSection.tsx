import { useGlobal } from "../GlobalContextHandler";
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import DateReadout from "../components/DateReadout";
import { formatNumber, formatTemperature } from "../i18n/i18nNumeric";

export default function InfoSection() {
    
    const [capital, setCapital] = useGlobal().capital;
    const [date, setDate] = useGlobal().date;
    const [gameConfig, _] = useGlobal().gameConfig;

    const { t } = useTranslation(); 
    const MILLISECONDS_IN_ONE_DAY = 1000 * 60 * 60 * 24;

    return (
        <section>
            <h2>₹ {formatNumber(capital, gameConfig.numberFormat)} </h2>
            <h4> 
                <DateReadout />
                <button onClick={() => {
                    setCapital(capital + Math.floor(Math.random() * 5000));
                    setDate(date + MILLISECONDS_IN_ONE_DAY);
                }}/>
            </h4>
            <h3>{formatTemperature(32, gameConfig.unitTemperature)} </h3>
        </section>
    )
}