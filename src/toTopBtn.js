import React, {useState, useEffect}from "react";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./sass/toTopBtn_style.scss";

const ToTopBtn = () =>{

    const [topBtn, setTopBtn] = useState(false);

    function getScrollTop() {
        
        if (window.pageYOffset > window.innerHeight/2) {
            setTopBtn(true);
        }
        else{
            setTopBtn(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", getScrollTop);

        return () =>{
            window.removeEventListener("scroll", getScrollTop);
        }
        
    }, [])

    return (
        <>
            {topBtn && <div className="top-btn" onClick={() => window.scrollTo(0,0)}>
                <FontAwesomeIcon icon={faArrowUp} className="btn"/>
            </div>}
        </>
    )

}

export default ToTopBtn;