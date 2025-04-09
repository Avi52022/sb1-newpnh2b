import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Ticket, Hotel, Bus, Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface HotelBooking {
  room_type: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  payment_method: string;
  status: string;
  hotels: {
    name: string;
    location: string;
  };
}

interface Ticket {
  id: string;
  booking_type: 'flight' | 'bus' | 'hotel';
  booking_number: string;
  qr_code: string;
  status: 'active' | 'used' | 'cancelled';
  created_at: string;
  hotel_bookings?: HotelBooking;
}

interface TicketViewProps {
  tickets: Ticket[];
  onClose?: () => void;
}

export default function TicketView({ tickets, onClose }: TicketViewProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const getBookingIcon = (type: string) => {
    switch (type) {
      case 'hotel':
        return <Hotel className="h-5 w-5" />;
      case 'bus':
        return <Bus className="h-5 w-5" />;
      case 'flight':
        return <Plane className="h-5 w-5" />;
      default:
        return <Ticket className="h-5 w-5" />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ne-NP', {
      style: 'currency',
      currency: 'NPR'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold">My Tickets</h1>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <Ticket className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No tickets found</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-full text-sm font-medium capitalize bg-blue-500/20 text-blue-400 flex items-center">
                        {getBookingIcon(ticket.booking_type)}
                        <span className="ml-2">{ticket.booking_type}</span>
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium capitalize
                          ${
                            ticket.status === 'active'
                              ? 'bg-green-500/20 text-green-400'
                              : ticket.status === 'used'
                              ? 'bg-gray-500/20 text-gray-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold mt-2">
                      Booking #{ticket.booking_number}
                    </h2>

                    {ticket.hotel_bookings && (
                      <div className="mt-4 space-y-2">
                        <p className="text-lg font-medium text-blue-400">
                          {ticket.hotel_bookings.hotels.name}
                        </p>
                        <p className="text-gray-400">
                          {ticket.hotel_bookings.hotels.location}
                        </p>
                        <p className="text-gray-400">
                          Room Type: {ticket.hotel_bookings.room_type}
                        </p>
                        <div className="flex space-x-4">
                          <p className="text-gray-400">
                            Check-in: {format(new Date(ticket.hotel_bookings.check_in_date), 'MMM dd, yyyy')}
                          </p>
                          <p className="text-gray-400">
                            Check-out: {format(new Date(ticket.hotel_bookings.check_out_date), 'MMM dd, yyyy')}
                          </p>
                        </div>
                        <p className="text-lg font-semibold text-green-400">
                          {formatPrice(ticket.hotel_bookings.total_price)}
                        </p>
                        <p className="text-gray-400 capitalize">
                          Payment: {ticket.hotel_bookings.payment_method}
                        </p>
                      </div>
                    )}

                    <p className="text-gray-400 text-sm mt-2">
                      Booked on: {format(new Date(ticket.created_at), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <QRCodeSVG value={ticket.qr_code} size={100} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}