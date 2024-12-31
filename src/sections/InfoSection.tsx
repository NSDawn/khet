import { useGlobal } from "../GlobalContextHandler";
import { useTranslation } from 'react-i18next';
import i18n, { getLocales, getLocalesT } from "../i18n/i18n";

export default function InfoSection() {
    
    const [capital, setCapital] = useGlobal().capital;
    const { t } = useTranslation();

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedLanguage: string = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    const locales = getLocales();
    const localesT = getLocalesT();

    return (
        <section>
            <h2>₹ {capital}</h2>
            <br />
            <button onClick={() => setCapital(capital +1)}/>
            <br />

        </section>
    )
}