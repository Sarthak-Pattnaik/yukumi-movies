import axios from "axios";

// Your brand new, private proxy endpoint
const BASE_URL = "https://my-tmdb-proxy.psarthak.workers.dev/3"; 

const tmdbClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, 
  headers: {
    Accept: "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
});

// Dynamic Token Injector
tmdbClient.interceptors.request.use((config) => {
  if (process.env.TMDB_READ_ACCESS_TOKEN) {
    config.headers.Authorization = `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`;
  } else {
    console.warn("WARNING: TMDB_READ_ACCESS_TOKEN is missing at request time!");
  }
  return config;
});

export const searchMovies = async (query: string) => {
  try {
    const response = await tmdbClient.get("/search/movie", {
      params: { query },
    });
    return response.data.results;
  } catch (error: any) {
    console.error("TMDB Proxy Search Error:", error.message);
    throw error;
  }
};

export const getMovieDetails = async (id: string) => {
  try {
    const response = await tmdbClient.get(`/movie/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`TMDB Proxy Details Error for ID ${id}:`, error.message);
    throw error;
  }
};