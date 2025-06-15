import React, { useEffect, useRef, useState } from "react";

import PageLoader from "components/commons/PageLoader";
import useShowMovies from "hooks/reactQuery/useShowMovies";
import useDebounce from "hooks/useDebounce";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Filter } from "neetoicons";
import { Input, Pagination, Toastr } from "neetoui";
import { mergeLeft } from "ramda";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import MovieCard from "./MovieCard";

const Search = () => {
  const [movieName, setMovieName] = useState("");
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [movieChecked, setMovieChecked] = useState(true);
  const [seriesChecked, setSeriesChecked] = useState(true);
  const reference = useRef(null);
  const history = useHistory();
  const queryParams = useQueryParams();
  const { page, s: search } = queryParams;

  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === "/") {
        e.preventDefault();
        reference.current.focus();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
  }, []);

  const debouncedInputValue = useDebounce(inputValue);

  const computeType =
    movieChecked && seriesChecked ? "" : movieChecked ? "movie" : "series";

  const movieParams = {
    search,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    year: debouncedInputValue || "",
    type: computeType,
  };

  const handlePageNavigation = page => {
    setCurrentPage(page);
    history.replace(buildUrl("/", mergeLeft({ page }, queryParams)));
  };

  const updateQueryParams = useFuncDebounce(value => {
    const params = {
      s: value,
      apikey: "f461051c",
      page: DEFAULT_PAGE_INDEX,
    };
    history.replace(buildUrl("/", filterNonNull(params)));
  });

  const { data: movieList = {}, isFetching } = useShowMovies(movieParams);

  const totalResultsToBePassed = parseInt(movieList.totalResults || 0, 10);

  return (
    <div className="relative mt-2 w-9/12 p-2">
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center gap-2">
          <Input
            className="rounded-sm"
            placeholder="Search"
            ref={reference}
            value={movieName}
            onChange={e => {
              setMovieName(e.target.value);
              setCurrentPage(DEFAULT_PAGE_INDEX);
              updateQueryParams(e.target.value);
            }}
          />
          <Filter onClick={() => setIsFilterOpen(true)} />
        </div>
        {movieList.Response === "False" ? (
          Toastr.error(`Error: ${movieList.Error}`, { autoClose: 3000 })
        ) : isFetching ? (
          <div className="flex h-full items-center justify-center">
            <PageLoader />
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="mt-3 grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {movieList?.Search?.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
            <div className="mb-2 mt-4 self-end">
              <Pagination
                count={totalResultsToBePassed}
                navigate={handlePageNavigation}
                pageNo={currentPage || DEFAULT_PAGE_INDEX}
                pageSize={DEFAULT_PAGE_SIZE}
              />
            </div>
          </div>
        )}
      </div>
      {isFilterOpen && (
        <div className="absolute right-8 top-10 z-50 flex items-center justify-center rounded-md bg-opacity-50 shadow-md">
          <div className="flex flex-col gap-2 rounded-md bg-white p-3">
            <button
              className="self-end font-semibold"
              onClick={() => setIsFilterOpen(false)}
            >
              x
            </button>
            <div>
              <p className="font-semibold">Year</p>
              <input
                className="rounded-md border-2 px-1 text-black"
                placeholder="YYYY"
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
              />
            </div>
            <div className="mt-1">
              <p className="font-semibold">Type</p>
              <div className="flex gap-2">
                <label htmlFor="">
                  <input
                    checked={movieChecked}
                    className="mr-1 rounded-md"
                    id="movie"
                    type="checkbox"
                    onClick={() => setMovieChecked(!movieChecked)}
                  />
                  Movie
                </label>
                <label htmlFor="">
                  <input
                    checked={seriesChecked}
                    className="mr-1 rounded-md"
                    id="series"
                    type="checkbox"
                    onClick={() => setSeriesChecked(!seriesChecked)}
                  />
                  Series
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
