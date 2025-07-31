import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const SelectSeat = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [warningMessage, setWarningMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const { movieId } = useParams();
  const location = useLocation();
  
  // Get booking details from previous component (Booking)
  const bookingData = location.state || {};
  const { movie, date, time, tickets } = bookingData;

  const seatLayout = [
    { row: 'A', leftSeats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'], rightSeats: [] },
    { row: 'B', leftSeats: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'], rightSeats: [] },
    { row: 'C/E', leftSeats: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'], rightSeats: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'] },
    { row: 'D/F', leftSeats: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9'], rightSeats: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9'] },
    { row: 'G/I', leftSeats: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9'], rightSeats: ['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9'] },
    { row: 'H/J', leftSeats: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9'], rightSeats: ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9'] }
  ];

  const showWarningMessage = (message) => {
    setWarningMessage(message);
    setShowWarning(true);
    setTimeout(() => {
      setShowWarning(false);
    }, 3000);
  };

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => {
      const isSelected = prev.includes(seatId);
      
      if (isSelected) {
        // Remove seat
        return prev.filter(s => s !== seatId);
      } else {
        // Add seat only if we haven't reached the ticket limit
        if (tickets && prev.length >= tickets) {
          showWarningMessage(`You can only select ${tickets} seat${tickets > 1 ? 's' : ''} as per your booking.`);
          return prev;
        }
        return [...prev, seatId];
      }
    });
  };

  const proceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      showWarningMessage('Please select at least one seat');
      return;
    }

    // Check if selected seats match the number of tickets booked
    if (tickets && selectedSeats.length !== tickets) {
      showWarningMessage(`Please select exactly ${tickets} seat${tickets > 1 ? 's' : ''} as per your booking.`);
      return;
    }

    // Navigate to payment page with all necessary data
    navigate(`/payment/${movieId}`, {
      state: { 
        selectedSeats,
        bookingDetails: {
          movie,
          date,
          time,
          tickets
        }
      }
    });
  };

  const renderSeatButton = (seatId) => {
    const isSelected = selectedSeats.includes(seatId);
    return (
      <button
        key={seatId}
        onClick={() => toggleSeat(seatId)}
        className={`w-12 h-12 border-2 border-red-600 rounded-md text-sm font-medium transition-all duration-200 ${
          isSelected
            ? 'bg-red-600 text-white shadow-lg'
            : 'bg-transparent text-gray-300 hover:bg-red-600/20'
        }`}
      >
        {seatId}
      </button>
    );
  };

  const renderFullWidthRow = (seats) => (
    <div className="flex justify-center gap-2 mb-3">
      {seats.map(seatId => renderSeatButton(seatId))}
    </div>
  );

  const renderSplitRow = (leftSeats, rightSeats) => (
    <div className="flex justify-center items-center gap-2 mb-3">
      <div className="flex gap-2">{leftSeats.map(renderSeatButton)}</div>
      <div className="w-32"></div>
      <div className="flex gap-2">{rightSeats.map(renderSeatButton)}</div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 bg-black text-white relative">
      {/* Beautiful Warning Toast */}
      <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        showWarning ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl shadow-2xl border border-red-400 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">!</span>
            </div>
            <p className="font-medium text-lg">{warningMessage}</p>
          </div>
          <div className="mt-2 w-full bg-red-700 bg-opacity-50 rounded-full h-1">
            <div className="bg-white h-1 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-light text-center mb-6">Select your seat</h1>
        
        {/* Show booking info if available */}
        {movie && (
          <div className="text-center mb-6 text-gray-300">
            <p className="text-xl font-medium text-white mb-2">{movie.title}</p>
            {date && time && (
              <p className="text-lg">{date} at {time}</p>
            )}
            {tickets && (
              <p className="text-red-400 font-medium mt-2">
                Please select {tickets} seat{tickets > 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}

        {/* Screen Indicator */}
        <div className="mb-16">
          <div className="relative mx-auto max-w-4xl">
            <div className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full mb-3 mx-16"></div>
            <p className="text-center text-gray-400 text-sm font-light">screen side</p>
          </div>
        </div>

        {/* Seating area */}
        <div className="max-w-6xl mx-auto">
          {renderFullWidthRow(seatLayout[0].leftSeats)}
          {renderFullWidthRow(seatLayout[1].leftSeats)}

          <div className="mb-8"></div>

          {renderSplitRow(seatLayout[2].leftSeats, seatLayout[2].rightSeats)}
          {renderSplitRow(seatLayout[3].leftSeats, seatLayout[3].rightSeats)}

          <div className="mb-8"></div>

          {renderSplitRow(seatLayout[4].leftSeats, seatLayout[4].rightSeats)}
          {renderSplitRow(seatLayout[5].leftSeats, seatLayout[5].rightSeats)}
        </div>

        {/* Selected seats info */}
        {selectedSeats.length > 0 && (
          <div className="text-center mt-8 mb-6">
            <p className="text-lg text-gray-300 mb-3">
              Selected Seats ({selectedSeats.length}{tickets ? `/${tickets}` : ''}):
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedSeats.map(seat => (
                <span key={seat} className="bg-red-600 px-3 py-1 rounded text-sm font-medium">
                  {seat}
                </span>
              ))}
            </div>
            {tickets && selectedSeats.length < tickets && (
              <p className="text-yellow-400 text-sm mt-2">
                Please select {tickets - selectedSeats.length} more seat{tickets - selectedSeats.length > 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}

        {/* Proceed to checkout button */}
        <div className="text-center mt-12">
          <button
            onClick={proceedToCheckout}
            disabled={selectedSeats.length === 0 || (tickets && selectedSeats.length !== tickets)}
            className={`px-12 py-4 rounded-full font-medium text-lg transition-all duration-300 ${
              selectedSeats.length > 0 && (!tickets || selectedSeats.length === tickets)
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            Proceed To checkout →
          </button>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-red-600 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 border-2 border-red-600 rounded"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSeat;