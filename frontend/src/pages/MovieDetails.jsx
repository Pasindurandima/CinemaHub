import React from "react";
import { useParams, Link } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Movie Details - ID: {id}</h1>
      <p>TODO: Show details, trailers, cast, etc.</p>
      <Link
        to={`/booking/${id}`}
        className="mt-4 inline-block bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
      >
        Book Now
      </Link>
    </div>
  );
}
