import React, {useState, useRef, useEffect} from "react";
import SwitchDarkMode from "./Switch_darkMode";
import "./sass/header.scss" ;
import "./sass/searchBar.scss";
import PopUpMobile from "./popUp_mobile";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter,faMapMarkerAlt  } from "@fortawesome/free-solid-svg-icons";

function Header({setInput}) {
    
    const [description, setDescription] = useState({});
    const [isShown, setIsShown] = useState(false);
    const [location, setLocation] = useState("");
    const [check, setCheck] = useState("");

    const refCheck = useRef(null);
    const refContainer = useRef(null);
    
    function sendInput() {
        setInput({description,location,check});
        setIsShown(false);
        setCheck(false);
        Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
        
        if (refCheck.current !== null) {
            refCheck.current.checked = false;
        }
        
        setLocation("");
        setDescription("");
    }

    function sendInputKey(e) {
        if (e.which === 13) {
            setInput({description,location,check});
            setIsShown(false);
            setCheck(false);
        }
    }

    function togglePopUp() {
        if (isShown) {
            setIsShown(false);
        }
        else{
            setIsShown(true);
        }
    }

    return <>
        <div className="top-container">
            <header className="header">
                <h1>devjobs</h1>
                <SwitchDarkMode/>
            </header>

                <section className="searchBar_container">
                    <form action="" className="form_input">
                        <div className="input_container">
                            <label htmlFor="input" className="visually-hidden">Search by title</label>
                            <FontAwesomeIcon icon={faSearch} className="search_icon"></FontAwesomeIcon>
                            <input type="text" placeholder="Filter by title..." className="input" id="input" onChange={e => setDescription(e.target.value)} onKeyPress={e => sendInputKey(e)} />
                        </div>
                        <div className="location_container">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="i"></FontAwesomeIcon>
                            <input type="text" placeholder="Filter by location..." className="input_location" onChange={e => setLocation(e.target.value)} onKeyPress={e => sendInputKey(e)}/>
                        </div>
                        {isShown || <div className="checkbox_container1" ref={refContainer}>
                            <input type="checkbox" name="full_time1" id="checkbox" className="checkbox" onChange={b => setCheck(b.target.checked)} ref={refCheck}/>
                            <label htmlFor="checkbox">Full Time</label> 
                        </div>}
                    </form>

                    <div className="funnel_container" onClick={() => togglePopUp()}>
                        <FontAwesomeIcon icon={faFilter} className="filter_icon"></FontAwesomeIcon>
                    </div>

                    <div className="btn_container">
                        <button type="button" className="btn_searchBar" onClick={() => sendInput()} aria-label="search">
                            <FontAwesomeIcon icon={faSearch} className="search_icon"></FontAwesomeIcon>
                            <span>Search</span>
                        </button>
                    </div>
            </section>
            
            {isShown && <PopUpMobile setIsShown={setIsShown} setLocation={setLocation} setCheck={setCheck}/>}

        </div>
    </>
}



export default Header;