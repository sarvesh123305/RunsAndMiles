import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, Users, Award, Heart, 
  Route, ChevronRight, AlertCircle, Check 
} from 'lucide-react';
import { API_URL } from '../config';

const EventDetails = () => {
  const { id } = useParams();
  const [selectedDistance, setSelectedDistance] = useState(null);

  // Hardcoded event data
  const event = {
    id: '1',
    title: 'Runs & Miles Half Marathon 1st Edition',
    description: 'Run for Health & Wellness - Edition 1 marks the beginning of a powerful endurance movement. This event is not just about finishing a race — it is about embracing a lifestyle of discipline, strength, and preventive healthcare awareness.',
    date: '2026-05-17',
    time: '5:00 AM',
    venue: 'Wadia College Ground, Sangamvadi',
    city: 'Pune',
    state: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800',
    distance: ['21K', '10K', '5K', '3K'],
    categoryNames: {
      '21K': 'Half Marathon',
      '10K': 'Timed Run',
      '5K': 'Challenge Run',
      '3K': 'Fun Run'
    },
    registrationFee: {
      '21K': 799,
      '10K': 599,
      '5K': 399,
      '3K': 299
    },
    totalSlots: 5000,
    registeredCount: 1250,
    route: 'Starting from Wadia College Ground, the route takes you through scenic parts of Pune including Bund Garden Road and surrounding areas. The course is designed for optimal running experience with proper hydration stations and medical support throughout.',
    categoryPerks: {
      '21K': ['Premium Event T-Shirt', 'Finisher Medal', 'Timing Chip', 'Hot Breakfast', 'Free Professional Photos', 'Official Event Cap', 'E-Certificate', 'Hydration Support'],
      '10K': ['Premium Event T-Shirt', 'Finisher Medal', 'Timing Chip', 'Hot Breakfast', 'Free Professional Photos', 'Official Event Cap', 'E-Certificate', 'Hydration Support'],
      '5K': ['Event T-Shirt', 'Finisher Medal', 'Hot Breakfast', 'Free Professional Photos', 'Official Event Cap', 'E-Certificate', 'Hydration Support'],
      '3K': ['Event T-Shirt', 'Finisher Medal', 'Refreshments', 'Free Professional Photos', 'E-Certificate', 'Hydration Support']
    },
    highlights: [
      'Premium Event T-Shirt',
      'Finisher Medal',
      'Hot Breakfast',
      'Free Professional Photos',
      'Hydration & Water Support',
      'Official Event Cap',
      'E-Certificate',
      'Timing Chip (10K & 21K)'
    ]
  };

  const loading = false;

  useEffect(() => {
    if (event.distance && event.distance.length > 0) {
      setSelectedDistance(event.distance[0]);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark mb-2">Event Not Found</h2>
          <Link to="/events" className="text-primary hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Coming Soon';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const slotsLeft = event.totalSlots - event.registeredCount;
  const slotsPercentage = (event.registeredCount / event.totalSlots) * 100;

  return (
    <div className="min-h-screen bg-light">
      {/* Hero Image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {event.distance.map((d) => (
                <span
                  key={d}
                  className="bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full"
                >
                  {d} {event.categoryNames?.[d] || ''}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                {formatDate(event.date)}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                {event.time}
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                {event.venue}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold text-dark mb-4">About This Event</h2>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            {/* Route */}
            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold text-dark mb-4 flex items-center">
                <Route className="w-6 h-6 mr-2 text-primary" />
                Route Information
              </h2>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6">
                <p className="text-gray-700">{event.route}</p>
              </div>
            </div>

            {/* Per-Category Perks */}
            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold text-dark mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 text-primary" />
                What's Included
              </h2>
              {event.categoryPerks ? (
                <div className="space-y-6">
                  {event.distance.map((d) => (
                    <div key={d}>
                      <h3 className="font-semibold text-dark mb-3">
                        {d} {event.categoryNames?.[d] || ''}
                        <span className="text-primary ml-2">— ₹{event.registrationFee[d].toLocaleString()}</span>
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {event.categoryPerks[d].map((perk, index) => (
                          <div key={index} className="flex items-center bg-gray-50 rounded-xl p-3">
                            <div className="bg-primary/10 p-2 rounded-lg mr-3">
                              <Check className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-gray-700 text-sm font-medium">{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center bg-gray-50 rounded-xl p-4">
                      <div className="bg-primary/10 p-2 rounded-lg mr-3">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-gray-700 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Distance Categories */}
            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold text-dark mb-4">Categories & Fees</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {event.distance.map((distance) => (
                  <button
                    key={distance}
                    onClick={() => setSelectedDistance(distance)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      selectedDistance === distance
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-display text-3xl font-bold text-dark">{distance}</span>
                      {selectedDistance === distance && (
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {event.categoryNames?.[distance] || ''}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      ₹{event.registrationFee[distance].toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Registration Fee</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Registration Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-28">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">Registration Fee</p>
                <p className="font-display text-4xl font-bold text-dark">
                  ₹{selectedDistance ? event.registrationFee[selectedDistance].toLocaleString() : '---'}
                </p>
                <p className="text-sm text-primary font-medium">{selectedDistance || 'Select category'}</p>
              </div>

              {/* Slots Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {event.registeredCount.toLocaleString()} registered
                  </span>
                  <span className="text-primary font-semibold">{slotsLeft.toLocaleString()} left</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                    style={{ width: `${slotsPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {Math.round(slotsPercentage)}% slots filled
                </p>
              </div>

              <a
                href="https://www.townscript.com/e/runs-miles-half-marathon-1st-edition-run-for-health-wellness-201310"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center mb-4"
              >
                Register Now
                <ChevronRight className="w-5 h-5 ml-2" />
              </a>

              <button className="w-full flex items-center justify-center text-gray-600 hover:text-primary transition-colors py-2">
                <Heart className="w-5 h-5 mr-2" />
                Save to Wishlist
              </button>

              {/* Event Details Summary */}
              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-dark">{formatDate(event.date)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Start Time</p>
                    <p className="font-medium text-dark">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="font-medium text-dark">{event.venue}</p>
                  </div>
                </div>
              </div>

              {/* Notice */}
              <div className="mt-6 bg-yellow-50 rounded-xl p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  Registration closes 48 hours before the event. Book early to secure your spot!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
