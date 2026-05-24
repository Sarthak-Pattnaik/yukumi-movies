import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import PageWrapper
  from "../components/layout/PageWrapper";

import SectionTitle
  from "../components/layout/SectionTitle";

import api from "../services/api";

const ReviewCard = ({
  review,
  fetchReviews,
}: any) => {

  const [editing, setEditing] =
    useState(false);

  const [text, setText] =
    useState(
      review.reviewText
    );

  const handleUpdate =
    async () => {

      try {

        await api.patch(

          `/movies/reviews/${review._id}`,

          {
            reviewText: text,
          }
        );

        setEditing(false);

        fetchReviews();

      } catch (error) {

        console.log(error);
      }
    };

  const handleDelete =
    async () => {

      try {

        await api.delete(
          `/movies/reviews/${review._id}`
        );

        fetchReviews();

      } catch (error) {

        console.log(error);
      }
    };

  const handleLike =
    async () => {

      try {

        await api.patch(
          `/movies/reviews/like/${review._id}`
        );

        fetchReviews();

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div
      className="group rounded-3xl border border-zinc-800 bg-[#171717]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-[#1b1b1b]/90"
    >

      <div
        className="mb-5 flex items-center justify-between"
      >

        <div
          className="flex items-center gap-4"
        >

          <div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10b981]/15 text-lg font-bold text-[#10b981]"
          >

            {
              review.userId
                ?.username?.[0]
                ?.toUpperCase()
            }

          </div>

          <div>

            <h3
              className="text-lg font-semibold tracking-tight text-white"
            >

              {
                review.userId
                  ?.username
              }

            </h3>

            <p
              className="text-sm text-zinc-500"
            >

              Movie Review

            </p>

          </div>

        </div>

        <div
          className="rounded-full border border-zinc-700 bg-black/40 px-3 py-1 text-xs text-zinc-400"
        >

          {review.likeCount}
          {" "}
          likes

        </div>

      </div>

      {editing ? (

        <div
          className="space-y-4"
        >

          <textarea
            rows={5}

            value={text}

            onChange={(e) =>
              setText(
                e.target.value
              )
            }

            className="w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 text-zinc-200 outline-none transition-all placeholder:text-zinc-500 focus:border-[#10b981]"
          />

          <div
            className="flex gap-3"
          >

            <button
              onClick={
                handleUpdate
              }

              className="emerald-button"
            >

              Save Changes

            </button>

            <button
              onClick={() =>
                setEditing(
                  false
                )
              }

              className="rounded-xl border border-zinc-700 px-5 py-2 text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
            >

              Cancel

            </button>

          </div>

        </div>

      ) : (

        <p
          className="leading-8 text-zinc-300"
        >

          {review.reviewText}

        </p>

      )}

      {!editing && (

        <div
          className="mt-6 flex items-center gap-3"
        >

          <button
            onClick={handleLike}

            className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-black/40 px-4 py-2 text-sm text-zinc-300 transition-all duration-300 hover:border-[#10b981] hover:bg-[#10b981]/10 hover:text-white"
          >

            <span>
              👍
            </span>

            {review.likeCount}

          </button>

          <button
            onClick={() =>
              setEditing(
                true
              )
            }

            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:text-white"
          >

            Edit

          </button>

          <button
            onClick={
              handleDelete
            }

            className="rounded-xl border border-red-900/50 px-4 py-2 text-sm text-red-400 transition-all duration-300 hover:border-red-500 hover:bg-red-500/10 hover:text-red-300"
          >

            Delete

          </button>

        </div>

      )}

    </div>
  );
};

const MovieDetails = () => {

  const { id } = useParams();

  const [movie, setMovie] =
    useState<any>(null);

  const [reviewText, setReviewText] =
    useState("");

  const [reviews, setReviews] =
    useState<any[]>([]);

  const fetchReviews =
    async () => {

      try {

        const res =
          await api.get(
            `/movies/reviews/${id}`
          );

        setReviews(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    const fetchMovie = async () => {

      try {

        const res = await api.get(
          `/movies/${id}`
        );

        setMovie(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchMovie();
    fetchReviews();

  }, [id]);

  const handleAddToList =
    async () => {

      try {

        await api.post(
          "/movies/list",

          {

            movie: {

              id:
                movie.id,

              title:
                movie.title,

              poster_path:
                movie.poster_path,

              backdrop_path:
                movie.backdrop_path,
            },

            status:
              "plan_to_watch",

            rating: 8,
          }
        );

        alert(
          "Movie added to list"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to add movie"
        );
      }
    };

  const handleSubmitReview =
    async () => {

      try {

        await api.post(
          "/movies/reviews",

          {
            movie: {

              id:
                movie.id,

              title:
                movie.title,

              poster_path:
                movie.poster_path,

              backdrop_path:
                movie.backdrop_path,
            },

            reviewText,
          }
        );

        setReviewText("");

        fetchReviews();

      } catch (error) {

        console.log(error);

        alert(
          "Review failed"
        );
      }
    };

  if (!movie) {

    return (

      <PageWrapper>

        <div
          className="flex min-h-[60vh] items-center justify-center text-zinc-500"
        >

          Loading movie...

        </div>

      </PageWrapper>
    );
  }

  return (

    <PageWrapper>

      <section
        className="relative overflow-hidden rounded-[2rem] space-y-20"
      >

        <div
          className="absolute inset-0"
        >

          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}

            alt={movie.title}

            className="h-full w-full object-cover"
          />

          <div
            className="absolute inset-0 bg-black/70"
          />

          <div
            className="absolute inset-0 bg-linear-to-t from-[#0f0f0f] via-[#0f0f0f]/70 to-black/30"
          />

        </div>

        <div
          className="relative z-10 flex min-h-175 items-end gap-12 px-12 py-16"
        >

          <div
            className="shrink-0"
          >

            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}

              alt={movie.title}

              className="w-[320px] rounded-3xl shadow-2xl animate-[floatSlow_6s_ease-in-out_infinite]"
            />

          </div>

          <div
            className="max-w-3xl"
          >

            <p
              className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#10b981]"
            >

              {movie.release_date?.split("-")[0]}

            </p>

            <h1
              className="mb-6 text-7xl font-bold leading-none tracking-tight"
            >

              {movie.title}

            </h1>

            <div
              className="mb-8 flex flex-wrap gap-3"
            >

              {movie.genres?.map(
                (genre: any) => (

                  <span
                    key={genre.id}

                    className="rounded-full border border-zinc-700 bg-black/40 px-4 py-2 text-sm text-zinc-300 backdrop-blur-sm"
                  >

                    {genre.name}

                  </span>

                )
              )}

            </div>

            <p
              className="mb-10 max-w-2xl text-lg leading-relaxed text-zinc-300"
            >

              {movie.overview}

            </p>

            <div
              className="flex items-center gap-6"
            >

              <div
                className="rounded-2xl bg-[#10b981] px-6 py-3 text-lg font-bold text-black shadow-lg"
              >

                ★
                {" "}
                {movie.vote_average?.toFixed(1)}

              </div>

              <button
                className="emerald-button"
                onClick={handleAddToList}
              >

                Add To List

              </button>

            </div>

          </div>

        </div>

      </section>

      <section
        className="mt-20 space-y-20"
      >

        <SectionTitle
          title="Reviews"
        />

        <div
          className="rounded-3xl border border-zinc-800 bg-[#171717]/80 p-6 backdrop-blur-sm"
        >

          <textarea
            rows={5}
            cols={50}
            placeholder="Write review..."
            value={reviewText}
            onChange={(e) =>
              setReviewText(
                e.target.value
              )
            }
          />

          <br />

          <button
            onClick={handleSubmitReview}
            className="emerald-button"
          >
            Submit Review
          </button>

          {reviews.map((review) => (

            <ReviewCard
              key={review._id}
              review={review}
              fetchReviews={fetchReviews}
            />

          ))}

        </div>

      </section>


    </PageWrapper>
  );
};

export default MovieDetails;