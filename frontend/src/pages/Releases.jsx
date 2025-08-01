import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Star, 
  Play, 
  Filter, 
  Search, 
  ArrowRight, 
  Film, 
  Users,
  MapPin,
  Heart,
  Share2,
  ChevronDown,
  X,
  Ticket
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Releases = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('release_date');
  const [viewMode, setViewMode] = useState('grid');
  const navigate = useNavigate();

  // Sample upcoming movies data
  const upcomingMovies = [
    {
      id: 1,
      title: "Spider-Man: Across the Spider-Verse",
      releaseDate: "2024-08-15",
      genre: ["Animation", "Action", "Adventure"],
      rating: 8.9,
      duration: "2h 20m",
      director: "Joaquim Dos Santos",
      cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
      description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
      image: "/public/assets/spiderman.jpg",
      trailer: "/trailer1.mp4",
      status: "coming_soon",
      preBooking: true,
      budget: "$100M",
      studio: "Sony Pictures"
    },
    {
      id: 2,
      title: "Guardians of the Galaxy Vol. 3",
      releaseDate: "2024-09-22",
      genre: ["Action", "Comedy", "Sci-Fi"],
      rating: 8.5,
      duration: "2h 30m",
      director: "James Gunn",
      cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista"],
      description: "Peter Quill must rally his team around him on a dangerous mission to save Rocket's life.",
      image: "/public/assets/avatar2.jpg",
      trailer: "/trailer2.mp4",
      status: "coming_soon",
      preBooking: true,
      budget: "$250M",
      studio: "Marvel Studios"
    },
    {
      id: 3,
      title: "The Flash",
      releaseDate: "2024-10-10",
      genre: ["Action", "Adventure", "Sci-Fi"],
      rating: 7.8,
      duration: "2h 24m",
      director: "Andy Muschietti",
      cast: ["Ezra Miller", "Michael Keaton", "Sasha Calle"],
      description: "Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world without superheroes.",
      image: "/public/assets/flash.jpg",
      trailer: "/trailer3.mp4",
      status: "coming_soon",
      preBooking: false,
      budget: "$220M",
      studio: "Warner Bros"
    },
    {
      id: 4,
      title: "Indiana Jones 5",
      releaseDate: "2024-11-05",
      genre: ["Action", "Adventure"],
      rating: 8.1,
      duration: "2h 22m",
      director: "James Mangold",
      cast: ["Harrison Ford", "Phoebe Waller-Bridge", "Mads Mikkelsen"],
      description: "Aging archaeologist Indiana Jones races against time to retrieve a legendary artifact that can change the course of history.",
      image: "/public/assets/indiana.jpg",
      trailer: "/trailer4.mp4",
      status: "coming_soon",
      preBooking: false,
      budget: "$300M",
      studio: "Lucasfilm"
    },
    {
      id: 5,
      title: "Dune: Part Two",
      releaseDate: "2024-12-15",
      genre: ["Sci-Fi", "Drama", "Adventure"],
      rating: 9.1,
      duration: "2h 46m",
      director: "Denis Villeneuve",
      cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
      description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      image: "/public/assets/barbie.jpg",
      trailer: "/trailer5.mp4",
      status: "coming_soon",
      preBooking: false,
      budget: "$190M",
      studio: "Warner Bros"
    },
    {
      id: 6,
      title: "Transformers: Rise of the Beasts",
      releaseDate: "2025-01-20",
      genre: ["Action", "Sci-Fi", "Adventure"],
      rating: 7.6,
      duration: "2h 7m",
      director: "Steven Caple Jr.",
      cast: ["Anthony Ramos", "Dominique Fishback", "Peter Cullen"],
      description: "During the '90s, a new faction of Transformers - the Maximals - join the Autobots as allies in the battle for Earth.",
      image: "/public/assets/hero.png",
      trailer: "/trailer6.mp4",
      status: "upcoming",
      preBooking: false,
      budget: "$200M",
      studio: "Paramount"
    }
  ];
  const genres = ['All', 'Action', 'Adventure', 'Animation', 'Comedy', 'Drama', 'Sci-Fi'];
  const filterOptions = [
    { value: 'all', label: 'All Releases' },
    { value: 'this_month', label: 'This Month' },
    { value: 'next_month', label: 'Next Month' },
    { value: 'coming_soon', label: 'Coming Soon' },
    { value: 'pre_booking', label: 'Pre-booking Available' }
  ];

  const sortOptions = [
    { value: 'release_date', label: 'Release Date' },
    { value: 'rating', label: 'Rating' },
    { value: 'title', label: 'Title' },
    { value: 'popularity', label: 'Popularity' }
  ];

  // Filter and search logic
  const filteredMovies = upcomingMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesGenre = selectedGenre === 'all' || 
                        movie.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase());
    
    const now = new Date();
    const releaseDate = new Date(movie.releaseDate);
    const thisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    
    let matchesFilter = true;
    switch (selectedFilter) {
      case 'this_month':
        matchesFilter = releaseDate <= thisMonth;
        break;
      case 'next_month':
        matchesFilter = releaseDate > thisMonth && releaseDate <= nextMonth;
        break;
      case 'pre_booking':
        matchesFilter = movie.preBooking;
        break;
    }
    
    return matchesSearch && matchesGenre && matchesFilter;
  });

  // Sort movies
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case 'release_date':
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      case 'rating':
        return b.rating - a.rating;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const MovieCard = ({ movie, index }) => (
    <div className="group relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
      <div className="aspect-[2/3] overflow-hidden relative">
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            movie.preBooking 
              ? 'bg-green-600 text-white' 
              : 'bg-blue-600 text-white'
          }`}>
            {movie.preBooking ? 'Pre-booking' : 'Coming Soon'}
          </span>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
          <button className="bg-red-600/90 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm transform hover:scale-110 transition-all duration-200">
            <Heart className="w-4 h-4" />
          </button>
          <button className="bg-gray-800/90 hover:bg-gray-700 text-white p-2 rounded-full backdrop-blur-sm transform hover:scale-110 transition-all duration-200">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        
        {/* Play Button - Center */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-red-600/90 hover:bg-red-600 text-white p-4 rounded-full backdrop-blur-sm transform hover:scale-110 transition-all duration-200 shadow-2xl">
            <Play className="w-6 h-6 fill-current" />
          </button>
        </div>
      </div>
      
      {/* Movie Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
            {movie.title}
          </h3>
          <div className="flex items-center text-yellow-400 ml-2">
            <Star className="w-4 h-4 fill-current mr-1" />
            <span className="text-sm font-semibold">{movie.rating}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genre.slice(0, 2).map((genre, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-lg text-xs">
              {genre}
            </span>
          ))}
        </div>
        
        <div className="space-y-2 mb-4 text-sm text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Releases {new Date(movie.releaseDate).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{movie.duration}</span>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {movie.description}
        </p>
        
        <div className="flex gap-3">
          {movie.preBooking ? (
            <button 
              onClick={() => navigate(`/booking/${movie.id}`, { state: { movie } })}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center group/btn"
            >
              <Ticket className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
              Pre-book Now
            </button>
          ) : (
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              Notify Me
            </button>
          )}
          
          <button 
            onClick={() => navigate(`/movie/${movie.id}`, { state: { movie } })}
            className="px-4 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg text-sm font-semibold transition-all duration-200"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );

  const ListMovieCard = ({ movie }) => (
    <div className="group bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-red-600/50">
      <div className="flex">
        <div className="w-32 h-48 flex-shrink-0 overflow-hidden">
          <img 
            src={movie.image} 
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                {movie.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  <span>{movie.rating}</span>
                </div>
              </div>
            </div>
            
            {movie.preBooking && (
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                Pre-booking
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {movie.genre.map((genre, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                {genre}
              </span>
            ))}
          </div>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {movie.description}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              <p>Director: {movie.director}</p>
              <p>Studio: {movie.studio}</p>
            </div>
            
            <div className="flex gap-2">
              {movie.preBooking ? (
                <button 
                  onClick={() => navigate(`/booking/${movie.id}`)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                >
                  Pre-book
                </button>
              ) : (
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200">
                  Notify Me
                </button>
              )}
              
              <button 
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      

      {/* Hero Section */}
      <section className="pt-16 pb-8 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Upcoming Releases
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover the most anticipated movies coming to theaters. Be the first to book your tickets and experience cinema magic.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-900 sticky top-16 z-40 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            
            {/* Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-xl transition-colors duration-200 border border-gray-700"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isFilterOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 min-w-48">
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-3">Filter by</h3>
                      {filterOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSelectedFilter(option.value);
                            setIsFilterOpen(false);
                          }}
                          className={`block w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                            selectedFilter === option.value 
                              ? 'bg-red-600 text-white' 
                              : 'text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Genre Filter */}
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre.toLowerCase()}>
                    {genre}
                  </option>
                ))}
              </select>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    Sort by {option.label}
                  </option>
                ))}
              </select>
              
              {/* View Mode */}
              <div className="flex bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-3 transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-3 transition-colors duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Header */}
      <section className="py-6 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {sortedMovies.length} Movies Found
              </h2>
              <p className="text-gray-400">
                {selectedFilter !== 'all' && `Filtered by ${filterOptions.find(f => f.value === selectedFilter)?.label}`}
                {selectedGenre !== 'all' && ` • Genre: ${selectedGenre}`}
              </p>
            </div>
            
            {/* Active Filters */}
            <div className="flex items-center gap-2">
              {selectedFilter !== 'all' && (
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  {filterOptions.find(f => f.value === selectedFilter)?.label}
                  <button 
                    onClick={() => setSelectedFilter('all')}
                    className="ml-2 hover:bg-red-700 rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedGenre !== 'all' && (
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  {selectedGenre}
                  <button 
                    onClick={() => setSelectedGenre('all')}
                    className="ml-2 hover:bg-red-700 rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid/List */}
      <section className="py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedMovies.length === 0 ? (
            <div className="text-center py-16">
              <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No movies found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('all');
                  setSelectedGenre('all');
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedMovies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {sortedMovies.map((movie) => (
                <ListMovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Stay Updated</h2>
          <p className="text-red-100 text-lg mb-8">
            Get notified about new releases, exclusive previews, and special offers
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
                <li><a href="/" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Home</a></li>
                <li><a href="/movies" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Now Playing</a></li>
                <li><a href="/releases" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Upcoming Releases</a></li>
                <li><a href="/theaters" className="text-gray-400 hover:text-red-400 transition-colors duration-200">Theaters</a></li>
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

export default Releases;