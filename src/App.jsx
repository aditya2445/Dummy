// import React from "react";

// import Favourites from "components/Favourites/Favourites";
// import Home from "components/Home/Home";
// import {
//   BrowserRouter as Router,
//   NavLink,
//   Route,
//   Switch,
// } from "react-router-dom";

// const App = () => (
//   <Router>
//     <div className="min-h-screen bg-white text-black">
//       <header className="flex items-center gap-2 p-4 shadow-md">
//         <div className="text-2xl font-extrabold">
//           <span className="text-blue-600">Cine</span>
//           <span className="text-black">Searcher</span>
//         </div>
//         <nav className="flex space-x-6 text-lg font-medium">
//           <NavLink
//             exact
//             activeClassName="text-blue-600"
//             className="text-gray-700 hover:text-blue-500"
//             to="/"
//           >
//             Home
//           </NavLink>
//           <NavLink
//             activeClassName="text-blue-600"
//             className="text-gray-700 hover:text-blue-500"
//             to="/favourites"
//           >
//             Favourites
//           </NavLink>
//         </nav>
//       </header>
//       <main className="overflow-y-auto p-6">
//         <Switch>
//           <Route exact component={Home} path="/" />
//           <Route component={Favourites} path="/favourites" />
//         </Switch>
//       </main>
//     </div>
//   </Router>
// );

// export default App;

import React from "react";

import Home from "components/Home/Home";
import { ReactQueryDevtools } from "react-query/devtools";

const App = () => (
  <div>
    <Home />
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </div>
);

export default App;
