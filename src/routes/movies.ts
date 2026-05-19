import express from "express";
import { movies } from "../data";

const router = express.Router();

//GET /movies
router.get("/", (req, res) => {
    res.json(movies);
});

//GET /movies/:id
router.get("/:id", (req,res) => {
    const id = Number(req.params.id);
    const movie = movies.find((m) => m.id === id);

    if(!movie){
        return res.status(404).json({ message: "Movie not found"});
    }
    res.json(movie);
});

//POST /movies
router.post("/",(req, res) => {
    const { title, director, year, genre} = req.body;

    if(!title || !director || !year || !genre){
        return res.status(400).json({ message: "Missing required fields"});
    }

    const alreadyExits = movies.some(
        (m) => m.title === title && m.director === director
    );

    if(alreadyExits){
        return res.status(409).json({ message: "Movie already exits"});
    }
    const newMovie = {
        id: movies.length + 1,
        title,
        director,
        year,
        genre,
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// PATCH /movies/:id
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const { title, director, year, genre } = req.body;

  if (title !== undefined) movie.title = title;
  if (director !== undefined) movie.director = director;
  if (year !== undefined) movie.year = year;
  if (genre !== undefined) movie.genre = genre;

  res.json(movie);
});

// DELETE /movies/:id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = movies.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const deletedMovie = movies.splice(index, 1)[0];

  res.json({
    message: "Movie deleted successfully",
    movie: deletedMovie,
  });
});
export default router;