import { useTranslation } from "react-i18next";
import { getWeather, getWeatherType, getWeatherTypeIcon } from "../game/DateAndClimate";
import { useGlobal } from "../GlobalContextHandler";
import { formatTemperature } from "../i18n/i18nNumeric";
import { useEffect, useState } from "react";

export function WeatherReadout(props: {date: Date, temperatureOnly: boolean}) {
    
    const [gameConfig, setGameConfig] = useGlobal().gameConfig;
    const [date, setDate] = useGlobal().date;
    const [dateJSReadOnly, _] = useGlobal().dateJSReadOnly;
    const { t } = useTranslation();
    const [weather, setWeather] = useState(getWeather(dateJSReadOnly));

    useEffect(() => {
        console.log(getWeather(dateJSReadOnly));
        setWeather(getWeather(dateJSReadOnly));
    }, [dateJSReadOnly, date])
   
    return (
        
        <>
            <span className="emoji-icon">{getWeatherTypeIcon(weather.weatherType)}</span>
            {t(`climate.weather.${weather.weatherType}`)}&nbsp;
            <span className="emoji-icon">🔼</span>
            {formatTemperature(weather.temperature.high, gameConfig.unitTemperature, true)}
            &nbsp;
            <span className="emoji-icon">🔽</span>
            {formatTemperature(weather.temperature.low, gameConfig.unitTemperature, true)}
            &nbsp;<button
                onClick={() => setDate(date + (24 * 60 * 60 * 1000))}
            >
                {`->`}
            </button>
        </>
    )
}