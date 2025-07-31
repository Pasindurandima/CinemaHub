import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const Booking = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const movieFromState = location.state?.movie;

  const [movie, setMovie] = useState(movieFromState || null);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [ticketCount, setTicketCount] = useState(1);

  // Optional: simulate fetching if accessed directly
  useEffect(() => {
    if (!movieFromState) {
      const dummyMovies = [
        {
          id: 1,
          title: "Avatar: The Way of Water",
          description: "Experience the epic return to Pandora with stunning visuals and groundbreaking technology.",
          rating: 8.2,
          genre: "Sci-Fi, Adventure",
          duration: "3h 12m",
          image: "/assets/hero.jpg",
        },
        {
          id: 2,
          title: "Top Gun: Maverick",
          description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
          rating: 8.7,
          genre: "Action, Drama",
          duration: "2h 10m",
          image: "/assets/hero.jpg",
        },
      ];

      const foundMovie = dummyMovies.find(m => m.id === parseInt(movieId));
      if (foundMovie) {
        setMovie(foundMovie);
      } else {
        navigate('/movies', { replace: true });
      }
    }
  }, [movieFromState, movieId, navigate]);

  if (!movie) return null;

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time.');
      return;
    }

    navigate(`/select-seat/${movie.id}`, {
      state: {
        movie,
        date: selectedDate,
        time: selectedTime,
        tickets: ticketCount,
      },
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full rounded-lg mb-6 max-h-[400px] object-cover"
        />
        <p className="text-gray-300 mb-4">{movie.description}</p>

        <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
          <span><strong>Genre:</strong> {movie.genre}</span>
          <span><strong>Duration:</strong> {movie.duration}</span>
          <span><strong>Rating:</strong> ⭐ {movie.rating}</span>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-white">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-white">Number of Tickets</label>
            <input
              type="number"
              min="1"
              value={ticketCount}
              onChange={(e) => setTicketCount(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-white">Choose Time</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Time</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="7:00 PM">7:00 PM</option>
              <option value="10:00 PM">10:00 PM</option>
            </select>
          </div>

          <button
            onClick={handleConfirmBooking}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
