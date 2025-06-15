import React, { useEffect, useRef, useState } from "react";

import { Alert, Typography } from "neetoui";
import useHistoryStore from "stores/useHistoryStore";

import HistoryCard from "./HistoryCard";

const History = () => {
  const {
    historyMovies: history,
    lastSelectedMovie,
    clearHistory,
  } = useHistoryStore();
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);

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
      <div className="flex items-center justify-between px-4">
        <p className="mt-2 text-center text-xl font-semibold">View History</p>
        <button
          className="mt-2 text-center text-sm font-semibold text-red-700"
          onClick={() => setShouldShowDeleteAlert(true)}
        >
          Clear All
        </button>
        <Alert
          isOpen={shouldShowDeleteAlert}
          submitButtonLabel="Yes, remove"
          title="Remove item?"
          message={
            <Typography>
              Are you sure to remove all movies from history ?
            </Typography>
          }
          onClose={() => setShouldShowDeleteAlert(false)}
          onSubmit={() => {
            clearHistory();
            setShouldShowDeleteAlert(false);
          }}
        />
      </div>
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
