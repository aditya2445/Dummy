import React from "react";

// import PageLoader from "components/commons/PageLoader";
import PageLoader from "components/commons/PageLoader";
import { useShowMovieDetails } from "hooks/reactQuery/useShowMovies";
import { Close, Rating, RatingFilled } from "neetoicons";
import { Tooltip } from "neetoui";
import useHistoryStore from "stores/useHistoryStore";

import Genre from "./Genre";

const MovieDetailModal = ({ id: imdbID, setIsModalOpen }) => {
  const { data, isFetching } = useShowMovieDetails(imdbID);
  const { favouriteMovies, addToFavourites, removeFromFavourites } =
    useHistoryStore();
  // console.log(favouriteMovies);
  const arr = favouriteMovies.map(ele => ele.imdbID);
  const isAvailableInFavorites = arr.includes(data?.imdbID);
  const clickHandler = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleClickOnStar = () => {
    addToFavourites(data);
  };

  const handleClickOnFullStar = movieId => {
    removeFromFavourites(movieId);
  };

  return isFetching ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <PageLoader />
    </div>
  ) : (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute m-4 w-2/5 rounded-md bg-white">
        <div className="p-4">
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl font-bold">{data?.Title}</h1>
                {isAvailableInFavorites ? (
                  <RatingFilled
                    className="cursor-pointer"
                    onClick={() => handleClickOnFullStar(data.imdbID)}
                  />
                ) : (
                  <Tooltip content="Add to Favourites" placement="top">
                    <span>
                      <Rating
                        className="cursor-pointer"
                        onClick={handleClickOnStar}
                      />
                    </span>
                  </Tooltip>
                )}
              </div>
              <div className="mb-2 mt-2 flex gap-2">
                {data?.Genre?.split(", ").length > 0 &&
                  data?.Genre?.split(", ").map((ele, ind) => (
                    <Genre details={ele} key={ind} />
                  ))}
              </div>
            </div>
            <div>
              <Close className="cursor-pointer" onClick={clickHandler} />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-1/3">
              <img
                className="h-full rounded-md object-contain"
                src={data?.Poster}
                alt={
                  data?.Title ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSucnDglR3WRb-uyId2KLDKdpGoC1QlLa8DZw&s"
                }
                onError={e => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSucnDglR3WRb-uyId2KLDKdpGoC1QlLa8DZw&s";
                }}
              />
            </div>
            <div className="flex w-2/3 flex-col gap-1 p-2">
              <p className="italic">{data?.Plot}</p>
              <p>
                <span className="font-bold">Director:</span> {data?.Director}
              </p>
              <p>
                <span className="font-bold">Actors:</span> {data?.Actors}
              </p>
              <p>
                <span className="font-bold">Awards:</span> {data?.Awards}
              </p>
              <p>
                <span className="font-bold">Country:</span> {data?.Country}
              </p>
              <p>
                <span className="font-bold">Runtime:</span> {data?.Runtime}
              </p>
              <p>
                <span className="font-bold">Released:</span> {data?.Released}
              </p>
              <p>
                <span className="font-bold">Language:</span> {data?.Language}
              </p>
              <p>
                <span className="font-bold">Rated:</span> {data?.Rated}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;
