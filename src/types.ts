export interface Movie{
    id: number;
    title: string;
    director: string;
    year: number;
    genre: string;
}

export interface Review{
    id: number;
    movieId: number;
    author: string;
    rating: number;
    createdAt: string;
}