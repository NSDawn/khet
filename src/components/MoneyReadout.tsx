import { useEffect, useState } from "react";
import { State, useGlobal } from "../GlobalContextHandler"
import { formatNumber } from "../i18n/i18nNumeric";

export default function MoneyReadout(props: {moneyState: State<number>}) {
    const [money, _] = props.moneyState;
    const [gameConfig, __] = useGlobal().gameConfig;
    const [moneyReadout, setMoneyReadout] = useState(0);
    const [closingGap, setClosingGap] = useState(false);
    const closeGapDelay = 10;
    const closeGapRate = 0.1;

    useEffect(() => {
        if (!closingGap) {
            setClosingGap(true);
            closeGap();
        };
    }, [money]);

    useEffect(() => {
        closeGap();
    }, [moneyReadout])

    function closeGap() {
        if (moneyReadout !== money) {
            setTimeout(() => {
                if (moneyReadout < money) {
                    setMoneyReadout(moneyReadout + Math.ceil(closeGapRate * (money - moneyReadout)));
                } else {
                    setMoneyReadout(moneyReadout + Math.floor(closeGapRate * (money - moneyReadout)));
                }
            }, closeGapDelay);
        }
        setClosingGap(false);
    }

    return (
        <>
            {formatNumber(moneyReadout, gameConfig.numberFormat)}
        </>
    )
}