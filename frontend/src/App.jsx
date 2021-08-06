import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { initDB } from "react-indexed-db";

import { DBConfig } from "./DBConfig";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

initDB(DBConfig);

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
