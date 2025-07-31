import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, Clock, Phone, Car, Wifi, Coffee, Accessibility, ChevronDown, X, Film, Navigation, Calendar, Ticket, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Theaters = () => {
  const [theaters, setTheaters] = useState([]);
  const [filteredTheaters, setFilteredTheaters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const navigate = useNavigate();

  // Sample theater data - replace with actual API calls
  const allTheaters = [
    {
      id: 1,
      name: "CinemaHub IMAX Downtown",
      location: "Downtown",
      address: "123 Main Street, Downtown District",
      distance: "2.5 km",
      phone: "+1 (555) 123-4567",
      rating: 4.8,
      totalReviews: 1247,
      image: "/src/assets/theater1.jpg",
      amenities: ["IMAX", "Dolby Atmos", "Parking", "Food Court", "WiFi", "Accessibility"],
      screens: 12,
      totalSeats: 2400,
      priceRange: "$12 - $25",
      operatingHours: "10:00 AM - 11:30 PM",
      features: ["Premium Seating", "4DX Experience", "VIP Lounge"],
      description: "Experience movies like never before with our state-of-the-art IMAX technology and premium amenities.",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      name: "CinemaHub Westside Mall",
      location: "Westside",
      address: "456 Mall Avenue, Westside Shopping Center",
      distance: "4.2 km",
      phone: "+1 (555) 234-5678",
      rating: 4.6,
      totalReviews: 892,
      image: "/src/assets/theater2.jpg",
      amenities: ["Dolby Atmos", "Parking", "Food Court", "WiFi", "Gaming Zone"],
      screens: 8,
      totalSeats: 1600,
      priceRange: "$10 - $20",
      operatingHours: "11:00 AM - 12:00 AM",
      features: ["Recliner Seats", "Concession Delivery", "Birthday Packages"],
      description: "Family-friendly cinema with comfortable seating and a variety of dining options.",
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: 3,
      name: "CinemaHub Premium Uptown",
      location: "Uptown",
      address: "789 Elite Boulevard, Uptown District",
      distance: "6.8 km",
      phone: "+1 (555) 345-6789",
      rating: 4.9,
      totalReviews: 1563,
      image: "/src/assets/theater3.jpg",
      amenities: ["IMAX", "Dolby Atmos", "Valet Parking", "Fine Dining", "WiFi", "VIP Lounge", "Accessibility"],
      screens: 15,
      totalSeats: 3000,
      priceRange: "$15 - $35",
      operatingHours: "9:30 AM - 12:30 AM",
      features: ["Luxury Recliners", "In-Seat Service", "Private Screening Rooms"],
      description: "Luxury cinema experience with premium amenities and world-class service.",
      coordinates: { lat: 40.7831, lng: -73.9712 }
    },
    {
      id: 4,
      name: "CinemaHub Eastpark",
      location: "Eastside",
      address: "321 Park View Road, Eastpark Area",
      distance: "8.1 km",
      phone: "+1 (555) 456-7890",
      rating: 4.4,
      totalReviews: 678,
      image: "/src/assets/theater4.jpg",
      amenities: ["Dolby Atmos", "Parking", "Cafe", "WiFi", "Kids Play Area"],
      screens: 6,
      totalSeats: 1200,
      priceRange: "$8 - $18",
      operatingHours: "10:30 AM - 11:00 PM",
      features: ["Family Seating", "Student Discounts", "Group Bookings"],
      description: "Neighborhood cinema perfect for families with affordable pricing and kid-friendly facilities.",
      coordinates: { lat: 40.7282, lng: -73.7949 }
    },
    {
      id: 5,
      name: "CinemaHub Drive-In Classic",
      location: "Suburbs",
      address: "555 Vintage Drive, Suburban Area",
      distance: "12.3 km",
      phone: "+1 (555) 567-8901",
      rating: 4.7,
      totalReviews: 945,
      image: "/src/assets/theater5.jpg",
      amenities: ["Drive-In", "Parking", "Snack Bar", "Retro Experience"],
      screens: 3,
      totalSeats: 600,
      priceRange: "$15 - $25 per car",
      operatingHours: "7:00 PM - 1:00 AM (Weekends only)",
      features: ["Car-Side Service", "Double Features", "Vintage Atmosphere"],
      description: "Classic drive-in experience under the stars with nostalgic charm and modern comfort.",
      coordinates: { lat: 40.6892, lng: -74.0445 }
    },
    {
      id: 6,
      name: "CinemaHub Southgate",
      location: "Southside",
      address: "888 Commerce Street, Southgate Plaza",
      distance: "5.7 km",
      phone: "+1 (555) 678-9012",
      rating: 4.5,
      totalReviews: 756,
      image: "/src/assets/theater6.jpg",
      amenities: ["Dolby Atmos", "Parking", "Food Court", "WiFi", "Accessibility", "Gaming Zone"],
      screens: 10,
      totalSeats: 2000,
      priceRange: "$11 - $22",
      operatingHours: "10:00 AM - 11:45 PM",
      features: ["Standard & Premium Seating", "Party Packages", "Corporate Events"],
      description: "Modern multiplex with diverse entertainment options and flexible event hosting.",
      coordinates: { lat: 40.6782, lng: -74.0442 }
    }
  ];

  const locations = ['All', 'Downtown', 'Westside', 'Uptown', 'Eastside', 'Suburbs', 'Southside'];
  const amenityOptions = ['IMAX', 'Dolby Atmos', 'Parking', 'Food Court', 'WiFi', 'VIP Lounge', 'Accessibility', 'Gaming Zone'];

  useEffect(() => {
    setTheaters(allTheaters);
    setFilteredTheaters(allTheaters);
  }, []);

  useEffect(() => {
    let filtered = theaters.filter(theater => {
      const matchesSearch = theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           theater.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           theater.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = selectedLocation === 'All' || theater.location === selectedLocation;
      
      const matchesAmenities = selectedAmenities.length === 0 || 
                              selectedAmenities.every(amenity => theater.amenities.includes(amenity));
      
      return matchesSearch && matchesLocation && matchesAmenities;
    });

    // Sort theaters
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'screens':
          return b.screens - a.screens;
        default:
          return 0;
      }
    });

    setFilteredTheaters(filtered);
  }, [theaters, searchTerm, selectedLocation, selectedAmenities, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('All');
    setSelectedAmenities([]);
    setSortBy('name');
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      'IMAX': '🎬',
      'Dolby Atmos': '🔊',
      'Parking': '🚗',
      'Food Court': '🍿',
      'WiFi': '📶',
      'VIP Lounge': '👑',
      'Accessibility': '♿',
      'Gaming Zone': '🎮',
      'Drive-In': '🚙',
      'Snack Bar': '🥤',
      'Cafe': '☕',
      'Fine Dining': '🍽️',
      'Valet Parking': '🚗',
      'Kids Play Area': '🎪'
    };
    return icons[amenity] || '✨';
  };

  const TheaterCard = ({ theater }) => (
    <div className="group relative overflow-hidden rounded-xl bg-gray-900 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={theater.image} 
          alt={theater.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center">
          <Star className="w-3 h-3 mr-1 fill-current" />
          {theater.rating}
        </div>

        {/* Theater Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">{theater.name}</h3>
          
          <div className="flex items-center text-gray-300 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{theater.address}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="text-gray-300">
              <span className="text-white font-semibold">{theater.screens}</span> Screens
            </div>
            <div className="text-gray-300">
              <span className="text-white font-semibold">{theater.totalSeats}</span> Seats
            </div>
            <div className="text-gray-300">
              <span className="text-green-400 font-semibold">{theater.priceRange}</span>
            </div>
            <div className="text-gray-300">
              <span className="text-white font-semibold">{theater.totalReviews}</span> Reviews
            </div>
          </div>
          
          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {theater.amenities.slice(0, 4).map((amenity, index) => (
              <span key={index} className="bg-red-600/80 text-white px-2 py-1 rounded text-xs flex items-center">
                <span className="mr-1">{getAmenityIcon(amenity)}</span>
                {amenity}
              </span>
            ))}
            {theater.amenities.length > 4 && (
              <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
                +{theater.amenities.length - 4} more
              </span>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => setSelectedTheater(theater)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              View Showtimes
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200">
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TheaterModal = ({ theater, onClose }) => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={theater.image} 
            alt={theater.name}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{theater.name}</h2>
              <div className="flex items-center text-gray-300 mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{theater.address}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  <span className="font-semibold">{theater.rating}</span>
                  <span className="text-gray-400 ml-1">({theater.totalReviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-300 mb-6">{theater.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Theater Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Screens:</span>
                  <span className="text-white font-semibold">{theater.screens}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Seats:</span>
                  <span className="text-white font-semibold">{theater.totalSeats}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Price Range:</span>
                  <span className="text-green-400 font-semibold">{theater.priceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hours:</span>
                  <span className="text-white font-semibold">{theater.operatingHours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-blue-400 font-semibold">{theater.phone}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Amenities & Features</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {theater.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-gray-300 text-sm">
                    <span className="mr-2">{getAmenityIcon(amenity)}</span>
                    {amenity}
                  </div>
                ))}
              </div>
              
              <h4 className="text-lg font-semibold text-white mb-2">Special Features</h4>
              <div className="space-y-1">
                {theater.features.map((feature, index) => (
                  <div key={index} className="text-gray-300 text-sm flex items-center">
                    <ArrowRight className="w-3 h-3 mr-2 text-red-400" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={() => {
                navigate(`/showtimes/${theater.id}`, { state: { theater } });
                onClose();
              }}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              View Showtimes & Book Tickets
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Call Theater
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      

      {/* Page Header */}
      <div className="pt-24 pb-8 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            All Theaters
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Find the perfect cinema near you with premium amenities and comfortable seating
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-400">{allTheaters.length}</div>
              <div className="text-gray-400 text-sm">Theaters</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-400">{allTheaters.reduce((sum, t) => sum + t.screens, 0)}</div>
              <div className="text-gray-400 text-sm">Total Screens</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">{allTheaters.reduce((sum, t) => sum + t.totalSeats, 0)}</div>
              <div className="text-gray-400 text-sm">Total Seats</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">{locations.length - 1}</div>
              <div className="text-gray-400 text-sm">Locations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search theaters, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg transition-colors duration-200"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="distance">Sort by Distance</option>
                <option value="screens">Sort by Screens</option>
              </select>

              {/* Results Count */}
              <div className="text-gray-400 text-sm">
                {filteredTheaters.length} theaters found
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-800 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Amenities Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Amenities</label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {amenityOptions.map(amenity => (
                      <label key={amenity} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="sr-only"
                        />
                        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                          selectedAmenities.includes(amenity) 
                            ? 'bg-red-600 text-white' 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}>
                          <span>{getAmenityIcon(amenity)}</span>
                          <span>{amenity}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Clear Filters */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  <span>Clear All Filters</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Theaters Grid */}
      <div className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTheaters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTheaters.map((theater) => (
                <TheaterCard key={theater.id} theater={theater} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🎭</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Theaters Found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search criteria or filters to find theaters near you.
              </p>
              <button
                onClick={clearFilters}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Theater Modal */}
      {selectedTheater && (
        <TheaterModal 
          theater={selectedTheater} 
          onClose={() => setSelectedTheater(null)} 
        />
      )}

      {/* Newsletter Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Stay Updated with Theater News</h2>
          <p className="text-red-100 text-lg mb-8">
            Get notified about new theater openings, special events, and exclusive offers in your area
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-red-300"
            />
            <button className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-xl font-bold transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Film className="w-8 h-8 text-red-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                  CinemaHub
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your ultimate destination for the latest movies, premium cinema experience, and hassle-free ticket booking.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Now Playing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Coming Soon</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Theaters</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Gift Cards</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">YouTube</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 CinemaHub. All rights reserved. Designed for an exceptional cinema experience.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Theaters;