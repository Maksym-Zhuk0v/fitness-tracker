import axios from "axios";

// console.log(process.env.VERCEL_API_TOKEN);
// console.log(process.env.NODE_ENV);

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/",
  // process.env.NODE_ENV === "development"
  //   ? "http://localhost:5005/api/"
  //   : `${process.env.NEXT_PUBLIC_URL_API}/api/`,
  withCredentials: true,
});

export default axiosInstance;
