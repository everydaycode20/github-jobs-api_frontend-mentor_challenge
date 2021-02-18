import React from "react";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./sass/popUpMobile_style.scss";

function PopUpMobile({setIsShown, setLocation, setCheck}) {

    
        return <>
        <form action="" className="filter">
            <div className="close" onClick={() => setIsShown(false)}>Close</div>
            <div className="input_location">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="i"></FontAwesomeIcon>
                <input type="text" className="input_location_filter" placeholder="Filter by location..." onChange={e => setLocation(e.target.value)}/>
            </div>
            <div className="checkbox_container">
                <input type="checkbox" name="full_time" id="checkbox" className="checkbox" onChange={e => setCheck(e.target.checked)}/>
                <label htmlFor="checkbox">Full Time Only</label>
            </div>
        </form>
        </>
}

export default PopUpMobile;