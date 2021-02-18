import React, {useContext, useState} from "react";
import './sass/App.scss';
import Header from './header';
import JobPost from "./job_post_list";
import Provider from "./Provider";
import {ThemeContext} from "./context";

function App() {

  const [input, setInput] = useState();
  const {dark} = useContext(ThemeContext);
  
  return <>
    <div className="wrapper" dark-theme={dark.toString()}>
      <Provider>
        <Header setInput={setInput} />
        <JobPost input={input} />
      </Provider>
    </div>
  </>;
}

export default App;
