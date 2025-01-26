import { useState } from "react";
import "./StandardSection.css";

export default function StandardSection(props: {title: React.ReactNode, children: React.ReactNode, additionalClassNames?: string[]}) {
   
    const [isOpen, setIsOpen] = useState(true);

    return (
        <section className={`standard-section ${isOpen? "open": ""} ${props.additionalClassNames?.reduce((a, v) => (a + " " + v), "")}`}>
            <div className="title-area">
                <h2>{props.title}</h2>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="emoji-icon"
                >
                    {!isOpen ? `➕` : `➖`}
                </button>
            </div>
            <div className={`content`}>
                {isOpen?
                    props.children
                : null}
            </div>
        </section>
    )
}