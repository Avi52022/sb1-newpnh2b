import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  Plane,
  Car,
  MapPin,
  Search,
  Calendar,
  Users,
  Tag,
  Sparkles,
  Star,
  Compass,
  Map,
  Heart,
  Clock,
} from 'lucide-react';

const backgrounds = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
].map((url) => `${url}?auto=format&fit=crop&w=2000&q=80`);

interface MainPageProps {
  user: any;
}

const BackgroundCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? backgrounds.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
  };

  return (
    <div className="relative h-[600px] overflow-hidden group">
      {backgrounds.map((bg, index) => (
        <div
          key={bg}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentIndex ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-gray-900" />
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <h1 className="text-5xl font-bold mb-4">
          Discover Your Next Adventure
        </h1>
        <p className="text-xl">
          Explore the world's most beautiful destinations
        </p>
      </div>
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {backgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const MainPage: React.FC<MainPageProps> = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <BackgroundCarousel />
      <SearchBar />
      <Deals />
      <PopularDestinations />
      <TripPlanner />
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <Search className="h-6 w-6 text-gray-400" />
          <input
            type="text"
            placeholder="Search for destinations, hotels, or flights..."
            className="ml-2 p-2 w-full bg-transparent border-b-2 border-gray-700 focus:border-blue-400 focus:outline-none text-white placeholder-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

const Deals = () => {
  const deals = [
    {
      id: '1',
      title: 'Early Summer Sale',
      discount: '15% OFF',
      description: 'Book now and save on summer stays',
      validUntil: 'Valid until May 31, 2024',
    },
    {
      id: '2',
      title: 'Last Minute Deals',
      discount: '25% OFF',
      description: 'Spontaneous travel savings',
      validUntil: 'Limited time offer',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <Sparkles className="h-6 w-6 text-yellow-400 mr-2" />
        Deals & Promotions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {deal.title}
                </h3>
                <p className="text-gray-400 mt-1">{deal.description}</p>
                <p className="text-sm text-gray-500 mt-2">{deal.validUntil}</p>
              </div>
              <div className="flex items-center bg-red-900/50 text-red-400 px-3 py-1 rounded-full">
                <Tag className="h-4 w-4 mr-1" />
                {deal.discount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PopularDestinations = () => {
  const destinations = [
    {
      id: '1',
      name: 'Kathmandu',
      image:
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      description: 'Cultural heritage and mountain views',
      rating: 4.5,
      properties: 1234,
    },
    {
      id: '2',
      name: 'Pokhara',
      image:
        'https://www.andbeyond.com/wp-content/uploads/sites/5/pokhara-valley-nepal.jpg',
      description: 'Lakeside paradise with mountain backdrop',
      rating: 4.7,
      properties: 856,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Popular Destinations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <Link
            key={destination.id}
            to={`/destination/${destination.name.toLowerCase()}`}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-gray-800 bg-opacity-60 text-white px-4 py-2 text-sm rounded-full">
                {destination.rating} <Star className="inline h-4 w-4 ml-1" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{destination.name}</h3>
              <p className="text-gray-400 mt-1">{destination.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                {destination.properties} properties
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const TripPlanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div className="text-white">
            <h3 className="text-xl font-semibold">Plan Your Trip</h3>
            <p className="text-gray-400 mt-2">
              Get personalized travel plans with ease!
            </p>
          </div>
          <button className="bg-blue-600 px-4 py-2 text-white rounded-full hover:bg-blue-500 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;