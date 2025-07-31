import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="bg-gray-700 rounded-lg p-4 shadow hover:shadow-lg">
      <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
      <p>{movie.year} · {movie.genre}</p>
      <p className="text-yellow-400 mt-1">⭐ {movie.rating}</p>
      <Link
        to={`/movie/${movie.id}`}
        className="mt-4 inline-block bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
      >
        Buy Tickets
      </Link>
    </div>
  );
}
