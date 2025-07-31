import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";


import Home from "./pages/Home.jsx";
import Booking from "./pages/Booking.jsx";
import Movies from "./pages/Movies.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Theaters from "./pages/Theaters.jsx";
import Releases from "./pages/Releases.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import NotFound from "./pages/NotFound.jsx";
import SelectSeat from "./pages/SelectSeat.jsx";
import Payment from "./pages/Payment.jsx";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:movieId" element={<Booking />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
          <Route path="/theaters" element={<Theaters />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
         
          <Route path="/select-seat/:movieId" element={<SelectSeat />} />
          <Route path="/payment/:movieId" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

    </div>
  );
}
