import React, { useState } from "react";

import useHistoryStore from "stores/useHistoryStore";

import MovieDetailModal from "./common/MovieDetailModal";

const MovieCard = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToHistory } = useHistoryStore();
  // const { data, isLoading, isError } = useShowMovieDetails(movie.imdbID);

  const clickHandler = () => {
    setIsModalOpen(!isModalOpen);
    addToHistory(movie);
  };

  return (
    <div className="h-68 flex w-full flex-col items-center overflow-hidden rounded-xl bg-white p-4 shadow-md">
      <img
        alt={movie.Title}
        className="h-40 w-32 rounded-md object-cover"
        loading="lazy"
        src={movie?.Poster}
        title={movie.Title}
        onError={e => {
          e.target.onerror = null;
          e.target.src =
            "https://m.media-amazon.com/images/S/pv-target-images/867b2c1eb7505ed37e04f142184157046a883fa8e0e1b4fa7af7f762cd70b94e._SX1080_FMjpg_.jpg";
        }}
      />
      <h1 className="mt-3 w-full self-start font-bold">
        {movie.Title.length > 20
          ? `${movie.Title.slice(0, 20)}...`
          : movie.Title}
      </h1>
      <p className="self-start text-xs font-bold text-gray-600">
        {movie.Type.toUpperCase()} . {movie.Year}
      </p>
      <button
        className="mt-auto self-start rounded-md bg-gray-200 p-1 text-sm text-blue-700"
        onClick={() => clickHandler({ movie })}
      >
        View Details
      </button>
      {isModalOpen && (
        <MovieDetailModal id={movie.imdbID} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default MovieCard;
