import axios from "axios";

const fetch = (movie, currentPage, year = "", type = "") =>
  axios.get("/", {
    params: {
      s: `${movie}`,
      apikey: "f461051c",
      y: year,
      type,
      page: currentPage,
    },
  });

// eslint-disable-next-line no-undef
export const moviesApi = {
  fetch,
};
