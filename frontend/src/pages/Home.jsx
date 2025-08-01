import React, { useState, useEffect } from 'react';
import { Play, Calendar, Clock, Star, ArrowRight, ChevronLeft, ChevronRight, MapPin, Users, Ticket, Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const heroSlides = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      description: "Experience the epic return to Pandora with stunning visuals and groundbreaking technology.",
      rating: 8.2,
      genre: "Sci-Fi, Adventure",
      duration: "3h 12m",
      image: "/public/assets/hero.png",
      trailer: "/public/assets/trailer-1.mp4"
    },
    {
      id: 2,
      title: "Top Gun: Maverick",
      description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
      rating: 8.7,
      genre: "Action, Drama",
      duration: "2h 10m",
      image: "/public/assets/maverik.jpg",
      trailer: "/public/assets/trailer-1.mp4"
    },
    {
      id: 3,
      title: "Black Panther: Wakanda Forever",
      description: "The people of Wakanda fight to protect their home from intervening world powers.",
      rating: 7.9,
      genre: "Action, Adventure",
      duration: "2h 41m",
      image: "/public/assets/blackpanthor.png",
      trailer: "/public/assets/trailer-1.mp4"
    }
  ];

  const upcomingMovies = [
    {
      id: 4,
      title: "Spider-Man: Across the Spider-Verse",
      releaseDate: "2024-08-15",
      genre: "Animation, Action",
      image: "/public/assets/spiderman.jpg"
    },
    {
      id: 5,
      title: "Guardians of the Galaxy Vol. 3",
      releaseDate: "2024-09-22",
      genre: "Action, Comedy",
      image: "/public/assets/guardians.jpg"
    },
    {
      id: 6,
      title: "The Flash",
      releaseDate: "2024-10-10",
      genre: "Action, Adventure",
      image: "/public/assets/flash.jpg"
    },
    {
      id: 7,
      title: "Indiana Jones 5",
      releaseDate: "2024-11-05",
      genre: "Action, Adventure",
      image: "/public/assets/indiana.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const MovieCard = ({ movie, isUpcoming = false }) => (
    <div className="group relative overflow-hidden rounded-xl bg-gray-900 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
      <div className="aspect-[2/3] overflow-hidden">
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>
        <p className="text-gray-300 text-sm mb-3">{movie.genre}</p>
        
        {isUpcoming ? (
          <div className="flex items-center text-blue-400 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Releases {new Date(movie.releaseDate).toLocaleDateString()}</span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center text-yellow-400">
              <Star className="w-4 h-4 mr-1 fill-current" />
              <span className="text-sm font-semibold">{movie.rating}</span>
            </div>
            <button 
              onClick={() => navigate(`/booking/${movie.id}`, { state: { movie } })}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center group/btn"
            >
              <Ticket className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
              Book Now
            </button>
          </div>
        )}
      </div>
      
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="bg-red-600/90 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm">
          <Play className="w-4 h-4 fill-current" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pt-16"> {/* pt-16 to offset fixed navbar height */}
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroSlides[currentSlide].image} 
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-5 h-5 mr-1 fill-current" />
                  <span className="font-semibold">{heroSlides[currentSlide].rating}</span>
                </div>
                <span className="text-gray-300">{heroSlides[currentSlide].genre}</span>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{heroSlides[currentSlide].duration}</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {heroSlides[currentSlide].title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {heroSlides[currentSlide].description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate(`/booking/${heroSlides[currentSlide].id}`)}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center group shadow-lg"
                >
                  <Ticket className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                  Book Tickets
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                
                <button className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-5 h-5 mr-3 fill-current" />
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-red-600 w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-300">Movies Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
              <div className="text-gray-300">Cinema Locations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">1M+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-300">Booking Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Now Playing Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Now Playing</h2>
              <p className="text-gray-400 text-lg">Book your tickets for the latest blockbusters</p>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {heroSlides.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Releases */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Coming Soon</h2>
              <p className="text-gray-400 text-lg">Get ready for the most anticipated releases</p>
            </div>
            <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {upcomingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} isUpcoming={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose CinemaHub?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the future of movie booking with our premium features and unmatched convenience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-red-600/50 transition-all duration-300">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Multiple Locations</h3>
              <p className="text-gray-400 leading-relaxed">
                Choose from 50+ premium cinema locations across the country with state-of-the-art facilities
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-red-600/50 transition-all duration-300">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Easy Seat Selection</h3>
              <p className="text-gray-400 leading-relaxed">
                Interactive seat maps with real-time availability and the best seats highlighted for your convenience
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-red-600/50 transition-all duration-300">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Ticket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Booking</h3>
              <p className="text-gray-400 leading-relaxed">
                Book your tickets instantly with secure payment and receive digital tickets on your mobile device
              </p>
            </div>
          </div>
        </div>
      </section>

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
              <p className="text-gray-400">
                Your ultimate destination for movie booking and the latest cinema news.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400">123 Movie St, Hollywood, CA</p>
              <p className="text-gray-400">Email: support@cinemahub.com</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Add social icons if you want */}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="text-gray-400 space-y-2">
                <li>Home</li>
                <li>Movies</li>
                <li>Theaters</li>
                <li>Releases</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} CinemaHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
