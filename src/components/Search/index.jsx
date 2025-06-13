import React, { useEffect, useRef, useState } from "react";

import PageLoader from "components/commons/PageLoader";
import useShowMovies from "hooks/reactQuery/useShowMovies";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Input, Pagination, Toastr } from "neetoui";
import { mergeLeft } from "ramda";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import MovieCard from "./MovieCard";

const Search = () => {
  const [movieName, setMovieName] = useState("");
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);
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

  const movieParams = {
    search,
    page: Number(page) || DEFAULT_PAGE_INDEX,
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
    <div className="mt-2 w-9/12 p-2">
      <div className="flex h-full flex-col gap-3">
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
    </div>
  );
};

export default Search;
