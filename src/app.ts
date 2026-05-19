import express from "express";
import movieRouter from "./routes/movies";
import reviewRouter from "./routes/reviews";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/movies", movieRouter);
app.use("/movies", reviewRouter);
app.get("/", (req, res) => {
    res.json({
        message: "Movie Review API is running",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
