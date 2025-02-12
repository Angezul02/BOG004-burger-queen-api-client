import {userToken} from '../Login/Login'

let tokenhelper = userToken


export const helpHttp = () => {
    
    const customFetch = (endpoint, options) => {
    const defaultHeaders = {
      "Content-Type": "application/json",
      authorization: "Bearer " + tokenhelper,
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeaders, ...options.headers }
      : defaultHeaders;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    setTimeout(() => controller.abort(), 5000);
    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  };
  const get = (url, options = {}) => customFetch(url, options);
  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };
  const patch = (url, options = {}) => {
    options.method = "PATCH";
    return customFetch(url, options);
  };
  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };
  return {
    get,
    post,
    patch,
    del,
  };
};
