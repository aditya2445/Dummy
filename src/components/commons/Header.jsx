import React from "react";

import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => (
  <header className="flex items-center gap-2 p-4 shadow-md">
    <div className="text-2xl font-extrabold">
      <span className="text-blue-600">Cine</span>
      <span className="text-black">Searcher</span>
    </div>
    <nav className="flex space-x-6 text-lg font-medium">
      <NavLink
        exact
        activeClassName="text-blue-600"
        className="text-gray-700 hover:text-blue-500"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        activeClassName="text-blue-600"
        className="text-gray-700 hover:text-blue-500"
        to="/favourites"
      >
        Favourites
      </NavLink>
    </nav>
  </header>
);

export default Header;
