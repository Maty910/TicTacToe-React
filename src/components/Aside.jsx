import { useState } from "react"
import { useEffect } from "react"

import './../index.css'

export function Aside () {
    const Mode = {
        Dark:'Dark',
        Light:'Light'
    }

    const Languages = {
        English:'enlang',
        Español:'eslang'
    }

    const [mode, setMode] = useState(Mode.Dark)
    const [language, setLanguage] = useState(Languages.English)

    const modeText = mode === Mode.Dark ? 'Switch to Light' : 'Swith to Dark'
    const modeStyles = mode === Mode.Dark ? 'darkmode' : 'lightmode' /*Clase CSS */

    const languageText = language === Languages.English ? 'Switch to ES' : 'Switch to EN'

    const changeLanguage = () => {
        setLanguage(prevLanguage => 
            prevLanguage === Languages.English ? Languages.Español : Languages.English
        );
    };

    const changeMode = () => {
        setMode(prevMode => 
            prevMode === Mode.Dark ? Mode.Light : Mode.Dark
        );
    };
    
    useEffect(() => {
        document.body.className = modeStyles
    }), [modeStyles]
    

    const content = {
        title: language === Languages.English ? 'Tic Tac Toe' : 'Ta Te Tí',
        author: language === Languages.English ? 'by Maty' : 'por Maty'
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button  className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>〇✕</button> {/* Botón para abrir/cerrar el menú */}
            <aside className={isOpen ? 'open' : ''}>
                <h2>{content.title}</h2>
                <p>{content.author}</p>
                <button className={modeStyles} onClick={changeMode}>{modeText}</button>
                <button className={modeStyles} onClick={changeLanguage}>{languageText}</button>
            </aside>
        </>
    )
}