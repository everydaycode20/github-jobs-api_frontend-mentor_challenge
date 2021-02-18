import React, {useContext} from "react";
import sunIcon from "./icons/sunny-outline.svg";
import moonIcon from "./icons/moon-outline.svg";
import "./sass/dark_mode.scss";
import {ThemeContext} from "./context";

function SwitchDarkMode(){

    const {dark,setDark} = useContext(ThemeContext);

    return <>

        <div className="dark_mode">
            <img src={sunIcon} alt="sun icon" className="sun_icon"/>
            <label className="switch">
                <input type="checkbox" defaultChecked={dark} className="checkbox" onChange={e => setDark(e.target.checked)}/>
                <div className="switch_circle"></div>
            </label>
            <img src={moonIcon} alt="moon icon"/>
        </div>

    </>
}

export default SwitchDarkMode;