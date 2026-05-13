import axios from "axios";

const BASE_URL =
  "https://api.themoviedb.org/3";

export const searchMovies = async (
  query: string
) => {

  const response = await axios.get(
    `${BASE_URL}/search/movie`,
    {
      params: {
        api_key:
          process.env.TMDB_API_KEY,

        query,
      },

      timeout: 10000,

      headers: {
        Accept: "application/json",
      },
    }
  );

  return response.data.results;
};

export const getMovieDetails =
  async (id: string) => {

    const response = await axios.get(
      `${BASE_URL}/movie/${id}`,
      {
        params: {
          api_key:
            process.env.TMDB_API_KEY,
        },

        timeout: 10000,

        headers: {
          Accept: "application/json",
        },
      }
    );

    return response.data;
};