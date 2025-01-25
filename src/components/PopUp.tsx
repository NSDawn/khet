import { useEffect, useRef } from "react";
import "./PopUp.css";

export default function PopUp(props: {children: React.ReactNode, onClose: () => void}) {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            props.onClose();
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [props.onClose]);

    return (
        <div className="pop-up-outside">
            <section 
                className="pop-up"
                ref={popupRef}
            >
                {props.children}
            </section>
        </div>  
    )
}