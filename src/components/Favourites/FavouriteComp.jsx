import React from "react";

import useHistoryStore from "stores/useHistoryStore";

const FavouriteComp = () => {
  const { favouriteMovies } = useHistoryStore();
  console.log(favouriteMovies);

  return (
    <div className="flex flex-col gap-2">
      {favouriteMovies.length > 0 ? (
        favouriteMovies.map(movie => (
          <div
            className="favouriteColor flex items-center justify-between p-2 shadow-md"
            key={movie.imdbID}
          >
            <p className="font-bold">{movie?.Title}</p>
            <p className="childText">
              <span className="parentText font-medium">Rating:</span>{" "}
              {movie?.imdbRating}/10
            </p>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center p-2 shadow-md">
          <p className="font-bold">No Favourites</p>
        </div>
      )}
    </div>
  );
};

export default FavouriteComp;
