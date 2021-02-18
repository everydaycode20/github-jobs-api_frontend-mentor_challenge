import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Details from "./details";
import {ThemeContext} from "./context";

function Page() {

  const [dark, setDark] = useState(false);

  return <>
  <ThemeContext.Provider value={{dark, setDark}}>
    <Router>
      <React.StrictMode>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/:id" children={<Details/>}></Route>
      </React.StrictMode>
    </Router>
  </ThemeContext.Provider>
  </>

}

ReactDOM.render(
  <Page>
  </Page>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
