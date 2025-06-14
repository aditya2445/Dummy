import React from "react";

import Header from "components/commons/Header";
import Favourites from "components/Favourites/Favourites";
import Home from "components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => (
  <Router>
    <div className="min-h-screen bg-white text-black">
      <Header />
      <div className="overflow-y-auto p-6">
        <Switch>
          <Route exact component={Home} path="/" />
          <Route component={Favourites} path="/favourites" />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
