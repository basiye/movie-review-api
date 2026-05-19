import express from "express";
import { movies, reviews } from "../data";

const router = express.Router();

// GET /movies/:movieId/reviews
router.get("/:movieId/reviews", (req, res) => {
  const movieId = Number(req.params.movieId);

  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found",
    });
  }

  const movieReviews = reviews.filter(
    (r) => r.movieId === movieId
  );

  const averageRating =
    movieReviews.length > 0
      ? movieReviews.reduce((sum, r) => sum + r.rating, 0) /
        movieReviews.length
      : 0;

  res.json({
    reviews: movieReviews,
    averageRating,
  });
});

// POST /movies/:movieId/reviews
router.post("/:movieId/reviews", (req, res) => {
  const movieId = Number(req.params.movieId);

  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found",
    });
  }

  const { author, content, rating } = req.body;

  if (!author || !content || rating === undefined) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  if (
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 5
  ) {
    return res.status(400).json({
      message: "Rating must be an integer between 1 and 5",
    });
  }

  const newReview = {
    id: reviews.length + 1,
    movieId,
    author,
    content,
    rating,
    createdAt: new Date().toISOString(),
  };

  reviews.push(newReview);

  res.status(201).json(newReview);
});

// DELETE /movies/:movieId/reviews/:id
router.delete("/:movieId/reviews/:id", (req, res) => {
  const movieId = Number(req.params.movieId);
  const reviewId = Number(req.params.id);

  const index = reviews.findIndex(
    (r) =>
      r.id === reviewId &&
      r.movieId === movieId
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  const deletedReview = reviews.splice(index, 1)[0];

  res.json({
    message: "Review deleted successfully",
    review: deletedReview,
  });
});

export default router;