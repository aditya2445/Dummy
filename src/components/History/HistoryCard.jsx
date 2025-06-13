import React, { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const HistoryCard = forwardRef(({ movie, lastSelectedMovie }, ref) => {
  const isActive = lastSelectedMovie === movie.imdbID;

  return (
    <div
      ref={ref}
      className={`mt-2 rounded-md p-3 text-center ${
        isActive ? "activeColor text-white" : "cardBackground text-black"
      }`}
    >
      <p>{movie.Title}</p>
    </div>
  );
});

export default HistoryCard;
