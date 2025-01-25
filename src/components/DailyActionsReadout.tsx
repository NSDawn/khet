import { useTranslation } from "react-i18next";
import { State } from "../GlobalContextHandler";

export default function DailyActionsReadout(props: {dailyActions: State<number>, dailyActionsLimit: number}) {
    
    const { t } = useTranslation();

    return (
        <>
            {`${t("ui.dailyActions")}: ${props.dailyActions[0]}/${props.dailyActionsLimit}`}
        </>
    )
}