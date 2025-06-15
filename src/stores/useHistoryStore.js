import { isNotEmpty } from "neetocist";
// import { assoc, dissoc, evolve } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useHistoryStore = create(
  persist(
    set => ({
      historyMovies: [],
      lastSelectedMovie: null,
      favouriteMovies: [],
      addToHistory: movie =>
        set(({ historyMovies }) => {
          const movieExists = historyMovies.find(
            mv => mv.imdbID === movie.imdbID
          );

          if (isNotEmpty(movie) && !movieExists) {
            return {
              historyMovies: [movie, ...historyMovies],
              lastSelectedMovie: movie.imdbID,
            };
          }

          return { historyMovies, lastSelectedMovie: movie.imdbID };
        }),
      addToFavourites: movie => {
        set(state =>
          state.favouriteMovies.includes(movie)
            ? state
            : { favouriteMovies: [...state.favouriteMovies, movie] }
        );
      },
      removeFromFavourites: movieId => {
        set(state => ({
          favouriteMovies: state.favouriteMovies.filter(
            movie => movie.imdbID !== movieId
          ),
        }));
      },
      removeFromHistory: movieId =>
        set(({ historyMovies }) => {
          if (isNotEmpty(movieId)) {
            return {
              historyMovies: historyMovies.filter(
                item => item.imdbID !== movieId
              ),
            };
          }

          return {};
        }),
      clearHistory: () => set({ historyMovies: [] }),
    }),
    { name: "user-history" }
  )
);

export default useHistoryStore;
