import axios from "axios";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
// import { Toastr } from "neetoui";
import { evolve } from "ramda";

// const shouldShowToastr = response =>
//   typeof response === "object" && response?.noticeCode;

// const showSuccessToastr = response => {
//   if (shouldShowToastr(response.data)) Toastr.success(response.data);
// };

// const showErrorToastr = error => {
//   if (error.message === "error.networkError") {
//     Toastr.error("error.noInternetConnection");
//   } else if (error.response?.status !== 404) {
//     Toastr.error(error);
//   }
// };

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const requestInterceptors = () => {
  axios.interceptors.request.use(
    evolve({ data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
  );
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      transformResponseKeysToCamelCase(response);

      return response.data;
    },
    error => Promise.reject(error)
  );
};

export default function initializeAxios() {
  axios.defaults.baseURL = "https://www.omdbapi.com";
  setHttpHeaders();
  requestInterceptors();
  responseInterceptors();
}
