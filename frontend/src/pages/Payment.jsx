import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCreditCard } from 'react-icons/fa';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId } = useParams();
  
  // Get data from navigation state (from SelectSeat component)
  const selectedSeatsFromState = location.state?.selectedSeats || [];
  
  // For fallback, you can also get booking details if passed from earlier components
  const bookingDetails = location.state?.bookingDetails || {};
  
  const [selectedSeats, setSelectedSeats] = useState(selectedSeatsFromState);
  const seatPrice = 15;
  const totalPrice = selectedSeats.length * seatPrice;

  const [step, setStep] = useState('summary'); // 'summary' or 'card'

  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  // Redirect if no seats selected
  useEffect(() => {
    if (selectedSeats.length === 0) {
      // If no seats are selected, redirect back to seat selection
      navigate(`/select-seat/${movieId}`, { replace: true });
    }
  }, [selectedSeats, movieId, navigate]);

  const handleChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    const { number, name, expiry, cvv } = cardInfo;
    if (!number || !name || !expiry || !cvv) {
      alert('Please fill all card details');
      return;
    }

    alert(`Payment Successful! 
    Seats: ${selectedSeats.join(', ')}
    Total: ${totalPrice}`);
    
    // You can navigate to a success page or back to home
    navigate('/');
  };

  // Don't render if no seats (will redirect anyway)
  if (selectedSeats.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">No seats selected</p>
          <p className="text-gray-400">Redirecting to seat selection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-red-500">Payment</h1>

        {/* Summary Step */}
        {step === 'summary' && (
          <>
            {/* Movie Details (if available) */}
            {bookingDetails.movie && (
              <div className="bg-gray-900 border border-red-900 rounded-lg p-6 shadow-2xl mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-red-400">Booking Details</h2>
                <div className="space-y-2 text-gray-300">
                  <p><strong className="text-white">Movie:</strong> {bookingDetails.movie.title}</p>
                  {bookingDetails.date && <p><strong className="text-white">Date:</strong> {bookingDetails.date}</p>}
                  {bookingDetails.time && <p><strong className="text-white">Time:</strong> {bookingDetails.time}</p>}
                </div>
              </div>
            )}

            <div className="bg-gray-900 border border-red-900 rounded-lg p-6 shadow-2xl mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-red-400">Selected Seats</h2>
              <div className="flex flex-wrap gap-3">
                {selectedSeats.map(seat => (
                  <span
                    key={seat}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-colors duration-200"
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 border border-red-900 rounded-lg p-6 shadow-2xl mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-red-400">Payment Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-300">Price per Seat</span>
                  <span className="text-white font-medium">${seatPrice}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-300">Number of Seats</span>
                  <span className="text-white font-medium">{selectedSeats.length}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="text-white font-medium">${selectedSeats.length * seatPrice}</span>
                </div>
                <div className="border-t border-red-800 pt-4 mt-4">
                  <div className="flex justify-between text-2xl font-bold">
                    <span className="text-red-400">Total Amount</span>
                    <span className="text-red-500">${totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setStep('card')}
                className="px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 bg-red-600 hover:bg-red-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-red-500"
              >
                Confirm & Pay ${totalPrice} →
              </button>
            </div>
          </>
        )}

        {/* Card Payment Step */}
        {step === 'card' && (
          <div className="bg-gray-900 border border-red-900 rounded-lg p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setStep('summary')}
                className="text-red-400 hover:text-red-300 transition-colors duration-200"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-semibold text-red-400">Enter Card Details</h2>
              <div></div>
            </div>

            {/* Show summary at top of card form */}
            <div className="bg-black border border-red-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">
                  {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}: {selectedSeats.join(', ')}
                </span>
                <span className="text-red-400 font-bold text-xl">₹{totalPrice}</span>
              </div>
            </div>

            <div className="flex justify-center gap-6 mb-8 text-4xl">
              <FaCcVisa className="text-blue-400 hover:text-blue-300 transition-colors duration-200" />
              <FaCcMastercard className="text-red-500 hover:text-red-400 transition-colors duration-200" />
              <FaCcAmex className="text-green-400 hover:text-green-300 transition-colors duration-200" />
              <FaCreditCard className="text-gray-400 hover:text-gray-300 transition-colors duration-200" />
            </div>

            <form onSubmit={handleCardSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-red-400">Card Number</label>
                <input
                  type="text"
                  name="number"
                  maxLength="19"
                  className="w-full p-4 rounded-lg bg-black text-white border-2 border-red-800 focus:border-red-500 focus:outline-none transition-colors duration-200"
                  value={cardInfo.number}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-red-400">Cardholder Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-4 rounded-lg bg-black text-white border-2 border-red-800 focus:border-red-500 focus:outline-none transition-colors duration-200"
                  value={cardInfo.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium text-red-400">Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    maxLength="5"
                    className="w-full p-4 rounded-lg bg-black text-white border-2 border-red-800 focus:border-red-500 focus:outline-none transition-colors duration-200"
                    value={cardInfo.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label className="block mb-2 text-sm font-medium text-red-400">CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    maxLength="4"
                    className="w-full p-4 rounded-lg bg-black text-white border-2 border-red-800 focus:border-red-500 focus:outline-none transition-colors duration-200"
                    value={cardInfo.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="px-16 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-red-500"
                >
                  Pay ${totalPrice}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;