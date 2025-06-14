import React, { useEffect, useRef } from "react";

import useHistoryStore from "stores/useHistoryStore";

import HistoryCard from "./HistoryCard";

const History = () => {
  const { historyMovies: history, lastSelectedMovie } = useHistoryStore();

  const refer = useRef({});

  useEffect(() => {
    // if (refer.current) {
    //   refer.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "center",
    //   });
    // }
    if (lastSelectedMovie && refer.current[lastSelectedMovie]) {
      refer.current[lastSelectedMovie].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [lastSelectedMovie]);

  return (
    <div className="hidden h-screen w-1/4 flex-col md:flex">
      <p className="mt-3 text-center text-2xl font-bold">View History</p>
      <div className="mt-5 flex-1 overflow-y-auto rounded-md">
        {history.length > 0 ? (
          history.map(movie => (
            <HistoryCard
              key={movie.imdbID}
              lastSelectedMovie={lastSelectedMovie}
              movie={movie}
              ref={ele => (refer.current[movie.imdbID] = ele)}
            />
          ))
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-2xl font-bold">No History</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
