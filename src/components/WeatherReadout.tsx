import { useTranslation } from "react-i18next";
import { avgTemperature, getTemperature, getWeather, getWeatherType, getWeatherTypeIcon, incrementDayGlobal } from "../game/DateAndClimate";
import { useGlobal } from "../GlobalContextHandler";
import { formatTemperature } from "../i18n/i18nNumeric";
import { useEffect, useState } from "react";

export function WeatherReadout(props: {date: Date, temperatureOnly: boolean}) {
    
    const G = useGlobal()
    const [gameConfig, setGameConfig] = G.gameConfig;
    const [date, setDate] = G.date;
    const [dateJSReadOnly, _] = G.dateJSReadOnly;
    const { t } = useTranslation();
    const [weather, setWeather] = useState(getWeather(dateJSReadOnly));

    useEffect(() => {
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
                onClick={() => incrementDayGlobal(G)}
            >
                {`->`}
            </button>
        </>
    )
}