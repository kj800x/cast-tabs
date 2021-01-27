import React from "react";

import { Songs } from "./scenes/songs-scene/Songs";
import { Song } from "./scenes/song-scene/Song";
import { Home } from "./scenes/home-scene/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/songs">
          <Songs />
        </Route>
        <Route path="/song/:songId">
          <Song />
        </Route>
        <Route path="/">
          <Songs />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
