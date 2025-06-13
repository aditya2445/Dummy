import axios from "axios";

const fetch = id =>
  axios.get("/", {
    params: {
      i: id,
      apikey: "f461051c",
    },
  });

// eslint-disable-next-line no-undef
export const movieDetailsApi = {
  fetch,
};
