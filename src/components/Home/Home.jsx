import React from "react";

import History from "components/History";
import Search from "components/Search";

const Home = () => (
  <div className="relative flex h-screen justify-around overflow-hidden shadow-md">
    <Search />
    <History />
  </div>
);

export default Home;
