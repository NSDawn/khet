import { useGlobal } from "../GlobalContextHandler";
import { formatTemperature } from "../i18n/i18nNumeric";

export function WeatherReadout(props: {date: Date, temperatureOnly: boolean}) {
    
    const [gameConfig, setGameConfig] = useGlobal().gameConfig;
   
    return (
        

        <>
            <span className="emoji-icon"></span>
            Rainy&nbsp;
            <span className="emoji-icon">🔼</span>
            {formatTemperature(32, gameConfig.unitTemperature, true)}
            &nbsp;
            <span className="emoji-icon">🔽</span>
            {formatTemperature(15, gameConfig.unitTemperature, true)}
        </>
    )
}