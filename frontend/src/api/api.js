import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

// api.interceptors.request.use(config => {

  // config.headers = config.headers || {}; 

//   // console.log(Cookies.get("csrf_access_token"));
//   console.log("Cookies^");

//   // if (Cookies.get("csrftoken")!==undefined)
//   //   config.headers["X-CSRF-TOKEN"] = Cookies.get("csrf_access_token");
  
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

export default api;