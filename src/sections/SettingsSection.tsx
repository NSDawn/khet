import { useGlobal } from "../GlobalContextHandler";
import { useTranslation } from 'react-i18next';
import i18n, { getLocales, getLocalesT } from "../i18n/i18n";

export default function SettingsSection() {
    
    const { t } = useTranslation();

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedLanguage: string = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    const locales = getLocales();
    const localesT = getLocalesT();

    return (
        <section>
            <h2>{t("ui.settings.title")}</h2>
            
            <label htmlFor="language-select">{t('ui.settings.language')}: </label>
            <select id="language-select" onChange={handleChange} defaultValue={i18n.language}>
                {
                    locales.map((locale, i) => 
                        <option value={locale} key={i}>
                            {localesT[i]}
                        </option>
                    )
                }
            </select>
        </section>
    )
}