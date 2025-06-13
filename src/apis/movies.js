import axios from "axios";

const fetch = (movie, currentPage) =>
  axios.get("/", {
    params: {
      s: `${movie}`,
      apikey: "f461051c",
      page: currentPage,
    },
  });

// eslint-disable-next-line no-undef
export const moviesApi = {
  fetch,
};
