import React, { forwardRef } from "react";

import { Delete } from "neetoicons";
import useHistoryStore from "stores/useHistoryStore";

// eslint-disable-next-line react/display-name
const HistoryCard = forwardRef(({ movie, lastSelectedMovie }, ref) => {
  const isActive = lastSelectedMovie === movie.imdbID;
  const { removeFromHistory } = useHistoryStore();
  const deleteHandler = movie => {
    removeFromHistory(movie.imdbID);
  };

  return (
    <div
      ref={ref}
      className={`mt-2 flex items-center justify-between rounded-md p-3 text-center ${
        isActive ? "activeColor text-white" : "cardBackground text-black"
      }`}
    >
      <p>{movie.Title}</p>
      <Delete className="cursor-pointer" onClick={() => deleteHandler(movie)} />
    </div>
  );
});

export default HistoryCard;
