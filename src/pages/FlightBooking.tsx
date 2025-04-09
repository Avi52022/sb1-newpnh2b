import React, { useState } from 'react';
import { Plane, Calendar, Users, Search, MapPin, ArrowRight, Moon, Sun, CreditCard, Luggage, Coffee, UtensilsCrossed, Wifi, ArrowLeft } from 'lucide-react';

interface Flight {
  id: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
  airline: string;
  duration: string;
  amenities: string[];
  seatsAvailable: number;
}

function FlightBooking() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1',
  });

  const [step, setStep] = useState<'search' | 'results' | 'booking'>('search');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock flight data
  const flights: Flight[] = [
    {
      id: '1',
      from: 'New York',
      to: 'London',
      departure: '08:00 AM',
      arrival: '9:30 PM',
      price: 549,
      airline: 'ZippyAir',
      duration: '7h 30m',
      amenities: ['wifi', 'meal', 'entertainment'],
      seatsAvailable: 45
    },
    {
      id: '2',
      from: 'New York',
      to: 'London',
      departure: '11:30 AM',
      arrival: '1:00 AM',
      price: 489,
      airline: 'SkyFleet',
      duration: '7h 30m',
      amenities: ['wifi', 'meal'],
      seatsAvailable: 12
    },
    {
      id: '3',
      from: 'New York',
      to: 'London',
      departure: '3:45 PM',
      arrival: '5:15 AM',
      price: 599,
      airline: 'AeroSwift',
      duration: '7h 30m',
      amenities: ['wifi', 'meal', 'entertainment', 'priority'],
      seatsAvailable: 28
    },
     {
    id: '4',
    from: 'Dubai',
    to: 'Kathmandu',
    departure: '09:15 AM',
    arrival: '07:45 PM',
    price: 499,
    airline: 'Himalayan Wings',
    duration: '4h 30m',
    amenities: ['wifi', 'meal', 'extra baggage'],
    seatsAvailable: 30
  },
  {
    id: '5',
    from: 'Delhi',
    to: 'Kathmandu',
    departure: '10:00 AM',
    arrival: '12:30 PM',
    price: 199,
    airline: 'Buddha Air',
    duration: '1h 30m',
    amenities: ['meal'],
    seatsAvailable: 50
  },
  {
    id: '6',
    from: 'Bangkok',
    to: 'Kathmandu',
    departure: '11:45 PM',
    arrival: '06:15 AM',
    price: 599,
    airline: 'Thai Sky',
    duration: '4h 30m',
    amenities: ['wifi', 'entertainment'],
    seatsAvailable: 25
  },
  {
    id: '7',
    from: 'Doha',
    to: 'Kathmandu',
    departure: '02:00 PM',
    arrival: '08:00 PM',
    price: 429,
    airline: 'Qatar Vista',
    duration: '5h',
    amenities: ['wifi', 'meal', 'entertainment'],
    seatsAvailable: 40
  },
  {
    id: '8',
    from: 'Singapore',
    to: 'Kathmandu',
    departure: '08:00 AM',
    arrival: '01:30 PM',
    price: 650,
    airline: 'Nepal Silk Air',
    duration: '5h 30m',
    amenities: ['wifi', 'meal', 'entertainment'],
    seatsAvailable: 15
  },
  {
    id: '9',
    from: 'Istanbul',
    to: 'Kathmandu',
    departure: '06:30 AM',
    arrival: '08:45 PM',
    price: 720,
    airline: 'Turkish Himalayan',
    duration: '10h 15m',
    amenities: ['wifi', 'extra baggage', 'meal', 'entertainment'],
    seatsAvailable: 35
  },
  {
    id: '10',
    from: 'Hong Kong',
    to: 'Kathmandu',
    departure: '03:45 PM',
    arrival: '08:30 PM',
    price: 560,
    airline: 'Dragon Nepal Airways',
    duration: '4h 45m',
    amenities: ['meal', 'extra baggage'],
    seatsAvailable: 28
  },
  {
    id: '11',
    from: 'Kuala Lumpur',
    to: 'Kathmandu',
    departure: '09:20 AM',
    arrival: '02:45 PM',
    price: 480,
    airline: 'Malindo Air Nepal',
    duration: '5h 25m',
    amenities: ['wifi', 'meal', 'entertainment'],
    seatsAvailable: 32
  },
  {
    id: '12',
    from: 'Tokyo',
    to: 'Kathmandu',
    departure: '07:00 PM',
    arrival: '07:30 AM',
    price: 899,
    airline: 'Japan Everest Air',
    duration: '13h 30m',
    amenities: ['wifi', 'meal', 'entertainment', 'extra baggage'],
    seatsAvailable: 18
  },
  {
    id: '13',
    from: 'Frankfurt',
    to: 'Kathmandu',
    departure: '06:00 AM',
    arrival: '09:15 PM',
    price: 830,
    airline: 'Lufthansa Nepal Express',
    duration: '12h 15m',
    amenities: ['wifi', 'extra baggage', 'meal', 'entertainment'],
    seatsAvailable: 22
  },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('results');
  };

  const handleBooking = (flight: Flight) => {
    setSelectedFlight(flight);
    setStep('booking');
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setStep('search');
      setSelectedFlight(null);
    }, 3000);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'meal': return <UtensilsCrossed className="h-4 w-4" />;
      case 'coffee': return <Coffee className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-blue-50 to-white'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm relative`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBackToHome}
                className={`mr-4 p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <Plane className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>ZippyTrip</h1>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-600'}`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {step === 'search' && (
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 md:p-8`}>
            <h2 className="text-2xl font-semibold mb-6">Find Your Flight</h2>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      required
                      className={`pl-10 w-full rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Departure City"
                      value={searchParams.from}
                      onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      required
                      className={`pl-10 w-full rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Destination City"
                      value={searchParams.to}
                      onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="date"
                      required
                      className={`pl-10 w-full rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      value={searchParams.date}
                      onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      className={`pl-10 w-full rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      value={searchParams.passengers}
                      onChange={(e) => setSearchParams({...searchParams, passengers: e.target.value})}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className={`w-full ${isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2`}
              >
                <Search className="h-5 w-5" />
                <span>Search Flights</span>
              </button>
            </form>
          </div>
        )}

        {step === 'results' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Available Flights</h2>
            <div className="space-y-4">
              {flights.map((flight) => (
                <div key={flight.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <Plane className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className="text-lg font-medium">{flight.airline}</span>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {flight.seatsAvailable} seats left
                        </span>
                      </div>
                      <div className="mt-4 flex items-center space-x-4">
                        <div>
                          <p className="text-lg font-semibold">{flight.departure}</p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{flight.from}</p>
                        </div>
                        <div className="flex-1 border-t-2 border-gray-300 relative">
                          <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} px-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {flight.duration}
                          </span>
                        </div>
                        <div>
                          <p className="text-lg font-semibold">{flight.arrival}</p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{flight.to}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center space-x-2">
                        {flight.amenities.map((amenity) => (
                          <div
                            key={amenity}
                            className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                          >
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>${flight.price}</p>
                      <button
                        onClick={() => handleBooking(flight)}
                        className={`mt-2 ${isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-2 rounded-lg transition-colors`}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep('search')}
              className={`${isDarkMode ? 'text-blue-400 hover:text-blue-500' : 'text-blue-600 hover:text-blue-700'} flex items-center space-x-2`}
            >
              <ArrowRight className="h-5 w-5" />
              <span>Modify Search</span>
            </button>
          </div>
        )}

        {step === 'booking' && selectedFlight && (
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 md:p-8`}>
            <h2 className="text-2xl font-semibold mb-6">Complete Your Booking</h2>
            <div className={`mb-6 p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg`}>
              <h3 className="font-medium text-lg mb-2">Flight Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>From</p>
                  <p className="font-medium">{selectedFlight.from}</p>
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>To</p>
                  <p className="font-medium">{selectedFlight.to}</p>
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Departure</p>
                  <p className="font-medium">{selectedFlight.departure}</p>
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Arrival</p>
                  <p className="font-medium">{selectedFlight.arrival}</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleConfirmBooking} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                  <input
                    type="text"
                    required
                    className={`mt-1 w-full rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                  <input
                    type="email"
                    required
                    className={`mt-1 w-full rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
                  <input
                    type="tel"
                    required
                    className={`mt-1 w-full rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
              </div>
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Total Price</span>
                  <span className={`text-2xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    ${selectedFlight.price * parseInt(searchParams.passengers)}
                  </span>
                </div>
                <button
                  type="submit"
                  className={`w-full ${isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 px-6 rounded-lg transition-colors`}
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Confirmation Popup */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-xl z-10 transform animate-bounce`}>
              <div className="text-center">
                <Plane className={`h-12 w-12 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mx-auto mb-4`} />
                <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Thank you for choosing ZippyTrip.
                  <br />
                  Check your email for details.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default FlightBooking;