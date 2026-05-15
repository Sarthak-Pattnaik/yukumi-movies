import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

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

  return (

    <div
      style={{
        border:
          "1px solid gray",

        padding: "10px",

        marginTop: "10px",
      }}
    >

      <h3>
        {
          review.userId
            ?.username
        }
      </h3>

      {editing ? (

        <>

          <textarea
            rows={4}
            cols={40}
            value={text}
            onChange={(e) =>
              setText(
                e.target.value
              )
            }
          />

          <br />

          <button
            onClick={
              handleUpdate
            }
          >
            Save
          </button>

        </>

      ) : (

        <p>
          {review.reviewText}
        </p>

      )}

      <button
        onClick={() =>
          setEditing(
            !editing
          )
        }
      >
        Edit
      </button>

      <button
        onClick={
          handleDelete
        }
      >
        Delete
      </button>

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

  if (!movie) {
    return <h1>Loading...</h1>;
  }

  const handleAddToList =
    async () => {

      try {

        await api.post(
          "/movies/list",
          {
            movieId: movie.id,

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
            movieId: movie.id,

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

  return (

    <div>

      <h1>
        {movie.title}
      </h1>

      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />

      <button onClick={handleAddToList}>
        Add To List
      </button>

      <p>
        {movie.overview}
      </p>

      <h3>
        Release Date:
        {movie.release_date}
      </h3>

      <h3>
        Rating:
        {movie.vote_average}
      </h3>

      <hr />

      <h2>Reviews</h2>

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
      >
        Submit Review
      </button>

      <hr />

      {reviews.map((review) => (

  <ReviewCard
    key={review._id}
    review={review}
    fetchReviews={fetchReviews}
  />

))}

    </div>
  );
};

export default MovieDetails;