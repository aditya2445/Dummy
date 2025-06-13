import { QUERY_KEYS } from "constants/query";

import { movieDetailsApi } from "apis/details";
import { moviesApi } from "apis/movies";
import { useQuery } from "react-query";

// eslint-disable-next-line import/exports-last
export default function useShowMovies(movieParams) {
  const qqq = useQuery({
    queryKey: [QUERY_KEYS.MOVIES, movieParams.search, movieParams.page],
    queryFn: () => moviesApi.fetch(movieParams.search, movieParams.page),
    enabled: !!movieParams.search,
    keepPreviousData: true,
  });

  return qqq;
}

const useShowMovieDetails = movieId =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIENAME, movieId],
    queryFn: () => movieDetailsApi.fetch(movieId),
    enabled: !!movieId,
  });

export { useShowMovieDetails };
