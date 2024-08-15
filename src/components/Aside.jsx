import { useState } from "react"
import { useEffect } from "react"

import './../index.css'

export function ColorMode () {
    const Mode = {
        Dark:'Dark',
        Light:'Light'
    }

    const [mode, setMode] = useState(Mode.Dark)
    
    const modeText = mode === Mode.Dark ? 'Switch to Dark' : 'Swith to Light'
    const modeStyles = mode === Mode.Dark ? 'darkmode' : 'lightmode'


    const changeMode = () => {
        if (mode === Mode.Dark) {
            setMode(Mode.Light)
        } else {
            setMode(Mode.Dark)
        }
    }
    
    useEffect(() => {
        document.body.className = modeStyles
    }), [modeStyles]
    

    return (
        <aside>
            <h2>
                Tic Tac Toe
            </h2>
            <p>by Maty</p>
            <button className={modeStyles} onClick={changeMode}>{modeText}</button>
        </aside>
    )
}