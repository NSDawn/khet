import { useGlobal } from "../GlobalContextHandler";
import { trySetGameConfig } from "../game/GameConfig";
import { useTranslation } from 'react-i18next';
import i18n, { getLocales, getLocalesT } from "../i18n/i18n";
import { getNumberFormats, getUnitsTemperature } from "../i18n/i18nNumeric";

export default function SettingsSection() {
    
    const { t } = useTranslation();
    const G = useGlobal();
    const [gameConfig, _] = G.gameConfig;

    function handleChangeSelectLanguage(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedLanguage: string = event.target.value;
        trySetGameConfig(G, "locale", selectedLanguage);
    };

    const locales = getLocales();
    const localesT = getLocalesT();

    return (
        <section>
            <h2>{t("ui.settings.title")}</h2>
            <div>
                <label htmlFor="language-select">{t('ui.settings.language')}: </label>
                <select id="language-select" onChange={handleChangeSelectLanguage} defaultValue={gameConfig.locale}>
                    {
                        locales.map((locale, i) => 
                            <option value={locale} key={i}>
                                {localesT[i]}
                            </option>
                        )
                    }
                </select>
            </div>
            <div>
                <label htmlFor="unit-temperature-select">{t('ui.settings.unitTemperature')}: </label>
                <select id="unit-temperature-select" onChange={(e) => trySetGameConfig(G, "unitTemperature", e.target.value)} defaultValue={gameConfig.locale}>
                    {
                        getUnitsTemperature().map((unit, i) => 
                            <option value={unit} key={i}>
                                {t(`ui.settings.unitTemperature.${unit}`)}
                            </option>
                        )
                    }
                </select>
            </div>
            <div>
                <label htmlFor="number-format-select">{t('ui.settings.numberFormat')}: </label>
                <select id="number-format-select" onChange={(e) => trySetGameConfig(G, "numberFormat", e.target.value)} defaultValue={gameConfig.locale}>
                    {
                        getNumberFormats().map((unit, i) => 
                            <option value={unit} key={i}>
                                {t(`ui.settings.numberFormat.${unit}`)}
                            </option>
                        )
                    }
                </select>
            </div>
            
        </section>
    )
}