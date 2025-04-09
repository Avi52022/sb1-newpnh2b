import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  Building2,
  Plane,
  Car,
  MapPin,
  CarTaxiFront as Taxi,
  Globe,
  Moon,
  Bell,
  User,
  LogOut,
  Ticket,
  Compass,
  ChevronRight,
  Sun,
} from 'lucide-react';
import AuthForm from './components/AuthForm';
import Landing from './pages/Landing';
import MainPage from './pages/MainPage';
import UserPreferences from './pages/UserPreferences';
import BusRentalPage from './pages/BusRentalPage';
import FlightBooking from './pages/FlightBooking';
import PopularDestinationPage from './pages/PopularDestinationPage';
import { supabase } from './lib/supabase';
import { toast } from 'react-hot-toast';
import TicketView from './components/TicketView';

const NavItem: React.FC<{
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  active?: boolean;
}> = ({ icon, text, onClick, active = false }) => (
  <button
    onClick={onClick}
    className={`nav-link inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      active
        ? 'text-blue-400 bg-gray-800'
        : 'text-gray-400 hover:text-blue-400 hover:bg-gray-800'
    }`}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

interface NavigationProps {
  user: any;
}

const Navigation: React.FC<NavigationProps> = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [showTickets, setShowTickets] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [tickets, setTickets] = React.useState([]);

  React.useEffect(() => {
    if (user) {
      loadUserTickets();
    }
  }, [user]);

  const loadUserTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error loading tickets:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Successfully logged out');
      navigate('/');
    } catch (error: any) {
      toast.error('Error signing out');
      console.error('Sign out error:', error.message);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  if (showTickets) {
    return <TicketView tickets={tickets} onClose={() => setShowTickets(false)} />;
  }

  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span 
              onClick={() => navigate('/main')} 
              className="text-blue-400 text-2xl font-bold hover:text-blue-300 cursor-pointer"
            >
              ZippyTrip
            </span>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4 ml-8">
              <NavItem 
                icon={<Building2 className="w-5 h-5" />} 
                text="Stays" 
                onClick={() => navigate('/main')}
                active={isActive('/main')} 
              />
              <NavItem 
                icon={<Plane className="w-5 h-5" />} 
                text="Flights" 
                onClick={() => navigate('/flight-booking')}
                active={isActive('/flight-booking')} 
              />
              <NavItem 
                icon={<Car className="w-5 h-5" />} 
                text="Bus Rentals" 
                onClick={() => navigate('/bus-rentals')}
                active={isActive('/bus-rentals')} 
              />
              <NavItem 
                icon={<Compass className="w-5 h-5" />} 
                text="Attractions" 
                onClick={() => navigate('/attractions')}
                active={isActive('/attractions')} 
              />
              <NavItem 
                icon={<Taxi className="w-5 h-5" />} 
                text="Airport Taxi" 
                onClick={() => navigate('/airport-taxi')}
                active={isActive('/airport-taxi')} 
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Globe className="h-5 w-5 text-gray-300 hover:text-blue-400" />
            </button>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-300 hover:text-blue-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-300 hover:text-blue-400" />
              )}
            </button>
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Bell className="h-5 w-5 text-gray-300 hover:text-blue-400" />
            </button>
            
            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center space-x-2 border-2 border-blue-400 rounded-full px-4 py-1 hover:bg-gray-800 transition-colors"
              >
                <User className="h-5 w-5 text-blue-400" />
                <span className="text-blue-400 font-medium">Profile</span>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
                  <div className="px-4 py-2 text-sm text-gray-400">
                    {user?.email}
                  </div>
                  <button
                    onClick={() => setShowTickets(true)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    My Tickets
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2">
            <div className="flex flex-col space-y-2">
              <NavItem 
                icon={<Building2 className="w-5 h-5" />} 
                text="Stays" 
                onClick={() => {
                  navigate('/main');
                  setMobileMenuOpen(false);
                }}
                active={isActive('/main')} 
              />
              <NavItem 
                icon={<Plane className="w-5 h-5" />} 
                text="Flights" 
                onClick={() => {
                  navigate('/flight-booking');
                  setMobileMenuOpen(false);
                }}
                active={isActive('/flight-booking')} 
              />
              <NavItem 
                icon={<Car className="w-5 h-5" />} 
                text="Bus Rentals" 
                onClick={() => {
                  navigate('/bus-rentals');
                  setMobileMenuOpen(false);
                }}
                active={isActive('/bus-rentals')} 
              />
              <NavItem 
                icon={<Compass className="w-5 h-5" />} 
                text="Attractions" 
                onClick={() => {
                  navigate('/attractions');
                  setMobileMenuOpen(false);
                }}
                active={isActive('/attractions')} 
              />
              <NavItem 
                icon={<Taxi className="w-5 h-5" />} 
                text="Airport Taxi" 
                onClick={() => {
                  navigate('/airport-taxi');
                  setMobileMenuOpen(false);
                }}
                active={isActive('/airport-taxi')} 
              />
              <button
                onClick={() => {
                  setShowTickets(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center rounded-lg"
              >
                <Ticket className="h-4 w-4 mr-2" />
                My Tickets
              </button>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center rounded-lg"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

interface LayoutProps {
  user: any;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/auth';

  if (isLandingPage || isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation user={user} />
      {children}
    </div>
  );
};

function App() {
  const [user, setUser] = React.useState<any>(null);
  const [hasPreferences, setHasPreferences] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) {
        checkUserPreferences(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        checkUserPreferences(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserPreferences = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('user_preferences')
        .select('id')
        .eq('user_id', userId)
        .single();

      setHasPreferences(!!data);
    } catch (error) {
      setHasPreferences(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <Layout user={user}>
        <TransitionGroup className="transition-wrapper">
          <CSSTransition timeout={300} classNames="fade" unmountOnExit>
            <Routes>
              {/* Public routes */}
              <Route
                path="/"
                element={user ? <Navigate to="/main" /> : <Landing />}
              />
              <Route
                path="/auth"
                element={user ? <Navigate to="/main" /> : <AuthForm />}
              />

              {/* Protected routes */}
              <Route
                path="/UserPreferences"
                element={
                  user ? (
                    hasPreferences ? (
                      <Navigate to="/main" />
                    ) : (
                      <UserPreferences />
                    )
                  ) : (
                    <Navigate to="/auth" />
                  )
                }
              />
              <Route
                path="/main"
                element={
                  user ? (
                    hasPreferences ? (
                      <MainPage user={user} />
                    ) : (
                      <Navigate to="/UserPreferences" />
                    )
                  ) : (
                    <Navigate to="/auth" />
                  )
                }
              />

              {/* Popular Destination route */}
              <Route
                path="/destination/:destination"
                element={
                  user ? <PopularDestinationPage /> : <Navigate to="/auth" />
                }
              />

              {/* Bus Rental page route */}
              <Route 
                path="/bus-rentals" 
                element={
                  user ? <BusRentalPage /> : <Navigate to="/auth" />
                } 
              />

              {/* Flight Booking page route */}
              <Route 
                path="/flight-booking" 
                element={
                  user ? <FlightBooking /> : <Navigate to="/auth" />
                } 
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Layout>
    </Router>
  );
}

export default App;