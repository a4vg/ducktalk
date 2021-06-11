import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import logo from "../assets/logo.svg";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.jsx</code> and save to reload.
          </p>

          <div>
            <nav>
              <ul>
                <li>
                  <Link className="App-link" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="App-link" to="/about">
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Home() {
  return <h2>Home page</h2>;
}

function About() {
  return <h2>About page</h2>;
}

export default App;
