import React, {useState,useEffect, useContext} from "react";
import "./sass/job_post.scss";
import {Link} from "react-router-dom";
import ToTopBtn from "./toTopBtn";
import loading from "./icons/loading_icon.gif";
import {ThemeContext} from "./context";

function JobPost({input}){

    const [jobs, setJobs] = useState([]);
    const [isFound, setIsFound] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [length, setLength] = useState(false);
    const [count, setCount] = useState(2);
    const [loadingPost, setLoadingPost] = useState(false)
    const {dark} = useContext(ThemeContext);
    const [error, setError] = useState(false)

    let url;

    function getJobs() {
        setIsLoading(true);
        setJobs([]);
        setCount(2);
        let specialChar;
        if (!input) {
            url = fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://jobs.github.com/positions.json?page=1&search=code`)}`);
        }
        else{
            if (Object.keys(input.description).length === 0 && input.description.constructor === Object) {
                input.description = "";
            }
            else{
                let inputSplit = input.description.split("");
                inputSplit.forEach((inputWord, index) => {

                    if (!inputWord.match(/[a-z]/i)) {
                        specialChar = `%${input.description.charCodeAt(index).toString(16)}`;
                        input.description = input.description.replace(inputWord, specialChar);
                    }
                });
            }
            
            url = fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://jobs.github.com/positions.json?utf8=\u2713&description=${input.description}&full_time=${input.check}&location=${input.location}&page=1`)}`);
        }

        url.then(response => {
            setIsLoading(true);
            return response.json();
        }).then(data => {
            if (data.length === 0) {
                setIsFound(false);
                setIsLoading(false);
                setLength(false);
            }
            else{
                setIsFound(true);
                setIsLoading(false);
                if (data.length === 50) {
                    setLength(true);
                }
                else{
                    setLength(false);
                }
            }
            setJobs(old => [...old, data]);
            setError(false);
        }).catch(err =>{
            setError(true);
            console.log(err);
        });
    }

    function getMoreJobs() {
        setCount(count + 1);
        setLoadingPost(true);
        if (!input) {
            url = fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://jobs.github.com/positions.json?page=${count}&search=code`)}`);
        }
        else{
            url = fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://jobs.github.com/positions.json?utf8=\u2713&description=${input.description}&full_time=${input.check}&location=${input.location}&page=${count}`)}`);
        }
        url.then(response =>{
            return response.json();
        }).then(data =>{
            if (data.length !== 50) {
                setLength(false);
            }
            setJobs(old => [...old, data]);
            setLoadingPost(false);
            setError(false);
        }).catch(err =>{
            setError(true);
            console.log(err);
        });
    }

    useEffect(() => {
        
        getJobs();
        
    }, [input]);

    function getTime(subs){
        let hours = Math.ceil(subs / (60 * 60 * 1000));
        
        if (hours > 24) {
            return `${Math.floor(subs / (1000 * 60 * 60 * 24))} days ago`;
        }
        else{
            let estHours = Math.floor(subs / (60 * 60 * 1000));
            if (estHours < 1) {
                return `${Math.floor(subs / (60 * 1000))} minutes ago`;
            }
            else{
                return `${estHours} hours ago`;
            }
        }
    }
     //
    // DOM---------------------------------------------------------------------
    //
    if (error) {
        return <main className="job_post_list"><h4>:( Something went wrong, please refresh your browser or use a different search term</h4></main>
    }
    if (isLoading) {
        return <main className="job_post_list"><img src={loading} alt="loading icon"/></main>
    }
    if (isFound) {
        return <>
        <ToTopBtn dark-theme={dark.toString()}/>
        <main className="job_post_list" dark-theme={dark.toString()}>
            {jobs.map(job =>
                job.map(j =>{
                    const {id, type, created_at, title, company, location} = j;

                    let time = created_at.split(" ");
                    let created = new Date(`${time[1]} ${time[2]}, ${time[5]} ${time[3]}`);
                    let subs = Math.abs(created - new Date());

                    return (
                        <Link to={`/${j.id}`} className="job_post" key={id}>
                            <section key={id} className="post">
                                <div className="first_line">
                                    <span className="time">{getTime(subs)}</span>
                                    <span className="dot"></span>
                                    <span className="kind_job">{type}</span>
                                </div>
                                <span className="position">{title}</span>
                                <span className="company">{company}</span>
                                <span className="location">{location}</span>
                            </section>
                        </Link>
                    )
                }))}
        </main>
        {loadingPost && <div className="loading-post-container"><img src={loading} alt="loading icon" className="loading-post"/></div>}

        {length && <div className="load_btn_container" onClick={() => getMoreJobs()}>
            <button type="button" className="load_btn">Load More</button>
        </div>}
        
    </>
    }
    if (!isFound) {
        return <main className="job_post_list"><h4 className="message">Nothing found</h4></main>
    }
}

export default JobPost;