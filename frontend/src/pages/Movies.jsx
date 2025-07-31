import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Clock, Calendar, Play, Ticket, Film, ArrowRight, ChevronDown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const [showFilters, setShowFilters] = useState(false);
  const [currentView, setCurrentView] = useState('now-playing'); // 'now-playing' or 'coming-soon'
  const navigate = useNavigate();

  // Sample movie data - replace with actual API calls
  const allMovies = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      genre: "Sci-Fi",
      rating: 8.2,
      duration: "3h 12m",
      releaseDate: "2024-01-15",
      description: "Experience the epic return to Pandora with stunning visuals and groundbreaking technology.",
      image: "/src/assets/avatar2.jpg",
      status: "now-playing",
      director: "James Cameron",
      cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
      language: "English",
      ageRating: "PG-13"
    },
    {
      id: 2,
      title: "Top Gun: Maverick",
      genre: "Action",
      rating: 8.7,
      duration: "2h 10m",
      releaseDate: "2024-02-20",
      description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
      image: "/src/assets/topgun.jpg",
      status: "now-playing",
      director: "Joseph Kosinski",
      cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
      language: "English",
      ageRating: "PG-13"
    },
    {
      id: 3,
      title: "Black Panther: Wakanda Forever",
      genre: "Action",
      rating: 7.9,
      duration: "2h 41m",
      releaseDate: "2024-01-10",
      description: "The people of Wakanda fight to protect their home from intervening world powers.",
      image: "/src/assets/blackpanthor.jpg",
      status: "now-playing",
      director: "Ryan Coogler",
      cast: ["Letitia Wright", "Lupita Nyong'o", "Danai Gurira"],
      language: "English",
      ageRating: "PG-13"
    },
    {
      id: 4,
      title: "Spider-Man: Across the Spider-Verse",
      genre: "Animation",
      rating: 8.9,
      duration: "2h 20m",
      releaseDate: "2024-08-15",
      description: "Miles Morales catapults across the Multiverse in this animated masterpiece.",
      image: "/src/assets/spiderman.jpg",
      status: "coming-soon",
      director: "Joaquim Dos Santos",
      cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
      language: "English",
      ageRating: "PG"
    },
    {
      id: 5,
      title: "Guardians of the Galaxy Vol. 3",
      genre: "Comedy",
      rating: 8.4,
      duration: "2h 30m",
      releaseDate: "2024-09-22",
      description: "The beloved band of misfits embark on their final adventure together.",
      image: "/src/assets/guardians.jpg",
      status: "coming-soon",
      director: "James Gunn",
      cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista"],
      language: "English",
      ageRating: "PG-13"
    },
    {
      id: 11,
      title: "hex: Action",
      genre: "Sci-Fi",
      rating: 8.2,
      duration: "3h 12m",
      releaseDate: "2024-01-15",
      description: "Experience the epic return to Pandora with stunning visuals and groundbreaking technology.",
      image: "/src/assets/hex.jpg",
      status: "now-playing",
      director: "James Cameron",
      cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
      language: "English",
      ageRating: "PG-13"
    },
    {
      id: 6,
      title: "The Flash",
      genre: "Adventure",
      rating: 7.2,
      duration: "2h 24m",
      releaseDate: "2024-10-10",
      description: "Barry Allen uses his super speed to change the past and save his family.",
      image: "/src/assets/flash.jpg",
      status: "coming-soon",
      director: "Andy Muschietti",
      cast: ["Ezra Miller", "Michael Keaton", "Sasha Calle"],
      language: "English",
      ageRating: "PG-13"
    },
    {
      id: 7,
      title: "Indiana Jones 5",
      genre: "Adventure",
      rating: 7.8,
      duration: "2h 34m",
      releaseDate: "2024-11-05",
      description: "The legendary archaeologist embarks on one final epic adventure.",
      image: "/src/assets/indiana.jpg",
      status: "coming-soon",
      director: "James Mangold",
      cast: ["Harrison Ford", "Phoebe Waller-Bridge", "Mads Mikkelsen"],
      language: "English",
      ageRating: "PG-13"
    },
    {
      id: 8,
      title: "John Wick: Chapter 4",
      genre: "Action",
      rating: 8.5,
      duration: "2h 49m",
      releaseDate: "2024-03-15",
      description: "John Wick uncovers a path to defeating The High Table.",
      image: "/src/assets/johnwick.jpg",
      status: "now-playing",
      director: "Chad Stahelski",
      cast: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"],
      language: "English",
      ageRating: "R"
    },
    {
      id: 9,
      title: "Oppenheimer",
      genre: "Drama",
      rating: 8.8,
      duration: "3h 0m",
      releaseDate: "2024-02-10",
      description: "The story of American scientist J. Robert Oppenheimer and his role in developing the atomic bomb.",
      image: "/src/assets/oppenheimer.jpg",
      status: "now-playing",
      director: "Christopher Nolan",
      cast: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr."],
      language: "English",
      ageRating: "R"
    },
    {
      id: 10,
      title: "Barbie",
      genre: "Comedy",
      rating: 7.6,
      duration: "1h 54m",
      releaseDate: "2024-01-25",
      description: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.",
      image: "/src/assets/barbie.jpg",
      status: "now-playing",
      director: "Greta Gerwig",
      cast: ["Margot Robbie", "Ryan Gosling", "America Ferrera"],
      language: "English",
      ageRating: "PG-13"
    }
  ];

  const genres = ['All', 'Action', 'Adventure', 'Animation', 'Comedy', 'Drama', 'Sci-Fi'];
  const ratings = ['All', '7.0+', '8.0+', '8.5+'];

  useEffect(() => {
    const filtered = allMovies.filter(movie => movie.status === currentView);
    setMovies(filtered);
    setFilteredMovies(filtered);
  }, [currentView]);

  useEffect(() => {
    let filtered = movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.director.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
      
      const matchesRating = selectedRating === 'All' || 
                           (selectedRating === '7.0+' && movie.rating >= 7.0) ||
                           (selectedRating === '8.0+' && movie.rating >= 8.0) ||
                           (selectedRating === '8.5+' && movie.rating >= 8.5);
      
      return matchesSearch && matchesGenre && matchesRating;
    });

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'release':
          return new Date(b.releaseDate) - new Date(a.releaseDate);
        case 'duration':
          return parseInt(b.duration) - parseInt(a.duration);
        default:
          return 0;
      }
    });

    setFilteredMovies(filtered);
  }, [movies, searchTerm, selectedGenre, selectedRating, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('All');
    setSelectedRating('All');
    setSortBy('title');
  };

  const MovieCard = ({ movie }) => (
    <div className="group relative overflow-hidden rounded-xl bg-gray-900 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
      <div className="aspect-[2/3] overflow-hidden relative">
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Age Rating Badge */}
        <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
          {movie.ageRating}
        </div>
        
        {/* Play Button */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-red-600/90 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm">
            <Play className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Movie Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">{movie.title}</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">{movie.genre}</span>
            <div className="flex items-center text-yellow-400 text-sm">
              <Star className="w-3 h-3 mr-1 fill-current" />
              <span className="font-semibold">{movie.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-400 text-xs mb-3">
            <Clock className="w-3 h-3 mr-1" />
            <span className="mr-3">{movie.duration}</span>
            <span>{movie.language}</span>
          </div>
          
          <p className="text-gray-300 text-sm mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {movie.description}
          </p>
          
          {currentView === 'now-playing' ? (
            <button 
              onClick={() => navigate(`/booking/${movie.id}`, { state: { movie } })}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              <Ticket className="w-4 h-4 mr-2" />
              Book Now
            </button>
          ) : (
            <div className="text-center">
              <div className="flex items-center justify-center text-blue-400 text-sm mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Releases {new Date(movie.releaseDate).toLocaleDateString()}</span>
              </div>
              <button className="w-full border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200">
                Notify Me
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      

      {/* Page Header */}
      <div className="pt-24 pb-8 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            All Movies
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Discover and book tickets for the latest blockbusters and upcoming releases
          </p>
          
          {/* View Toggle */}
          <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 w-fit">
            <button
              onClick={() => setCurrentView('now-playing')}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
                currentView === 'now-playing' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Now Playing
            </button>
            <button
              onClick={() => setCurrentView('coming-soon')}
              className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
                currentView === 'coming-soon' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Coming Soon
            </button>
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
                placeholder="Search movies, genres, directors..."
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
                <option value="title">Sort by Title</option>
                <option value="rating">Sort by Rating</option>
                <option value="release">Sort by Release Date</option>
                <option value="duration">Sort by Duration</option>
              </select>

              {/* Results Count */}
              <div className="text-gray-400 text-sm">
                {filteredMovies.length} movies found
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-800 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Genre Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Rating</label>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    {ratings.map(rating => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear Filters</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Movies Grid */}
      <div className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Movies Found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search criteria or filters to find what you're looking for.
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

      {/* Newsletter Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Never Miss a Movie</h2>
          <p className="text-red-100 text-lg mb-8">
            Subscribe to our newsletter and be the first to know about new releases, exclusive offers, and special events
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

export default Movies;