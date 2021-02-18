import React, {useEffect, useState, useContext}from "react";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {Link, useParams} from "react-router-dom";
import SwitchDarkMode from "./Switch_darkMode";
import "./sass/details_styles.scss";
import external_link_icon from "./icons/external_link_icon.png";
import ToTopBtn from "./toTopBtn";
import loading from "./icons/loading_icon.gif";
import {ThemeContext} from "./context";

function Details() {

    const [job, setJob] = useState([]);
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true)

    const {dark} = useContext(ThemeContext);

    useEffect(() => {
        setIsLoading(true);
        let url = fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://jobs.github.com/positions/${id}.json`)}`);

        url.then(response =>{
            return response.json();
        }).then(data =>{
            setJob(data);
            setIsLoading(false);
            
        });
        
    }, []);

    function setDate(date) {
        date = date.split(" ");
        return `${date[1]} ${date[2]} ${date[5]}`;
    }

    if (isLoading) {
        return (
        <>
            <div className="detail-container" dark-theme={dark.toString()}>
                <div className="top-container-h">
                    <header className="header">
                        <h1>devjobs</h1>
                        <SwitchDarkMode/>
                    </header>
                </div>
                <img src={loading} alt="loading icon" className="loading_icon"/>
            </div>
        </>)
    }
    if (!isLoading) {
        return (<>
        <div className="detail-container" dark-theme={dark.toString()}>
            <ToTopBtn/>
            <div className="top-container-h">
                <header className="header">
                    <h1>devjobs</h1>
                    <SwitchDarkMode/>
                </header>
            </div>
            
            <div className="main-container">
                <section className="container-post">
                    <section className="company">
                        <Link to="/" className="link_container"><div className="back-arrow-container"><FontAwesomeIcon icon={faArrowLeft}/><p>Back</p></div></Link>
                        <h3>{job.company}</h3>
                        {job.company_url ? (<p className="company_url">{job.company_url}</p>) : (<p className="company_url">not provided</p>)}
                        <p className="company_site_container">
                            {job.company_url ? (<a href={job.company_url} target="_blank"  rel="noreferrer">Company Site <img src={external_link_icon} alt="external link icon"/></a>) : (<a href={job.company_url} target="_blank"  rel="noreferrer" >Company Site not provided<img src={external_link_icon} alt="external link icon"/></a>)}</p>
                    </section>
                    <section className="job-description">
                        <div className="first_line">
                            <span className="time">{setDate(job.created_at)}</span>
                            <span className="dot"></span>
                            <span className="kind_job">{job.type}</span>
                        </div>
                        <span className="position">{job.title}</span>
                        <span className="location">{job.location}</span>
                        <div className="job-description-text" dangerouslySetInnerHTML={{__html: job.description}}></div>
                        <section className="how-apply">
                            <h3>How to Apply</h3>
                            <span className="apply" dangerouslySetInnerHTML={{__html: job.how_to_apply}}></span>
                        </section>
                    </section>
                </section>
            </div>
        </div>
        </>)
    }

};

export default Details;