import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, Users, Award, Heart, 
  Route, ChevronRight, AlertCircle, Check, Shirt, Medal,
  Timer, Coffee, Camera, Crown, FileCheck, Droplets
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
      '21K': 749.5,
      '10K': 719.4,
      '5K': 399.5,
      '3K': 299.4
    },
    originalPrice: {
      '21K': 1499,
      '10K': 1199,
      '5K': 799,
      '3K': 499
    },
    discount: {
      '21K': 50,
      '10K': 40,
      '5K': 50,
      '3K': 40
    },
    totalSlots: 5000,
    registeredCount: 259,
    route: 'Starting from Wadia College Ground, the route takes you through scenic parts of Pune including Bund Garden Road and surrounding areas. The course is designed for optimal running experience with proper hydration stations and medical support throughout.',
    categoryPerks: {
      '21K': [
        { icon: 'Shirt', text: 'Premium Event T-Shirt', color: 'blue' },
        { icon: 'Medal', text: 'Finisher Medal', color: 'yellow' },
        { icon: 'Timer', text: 'Timing Chip Enabled', color: 'green' },
        { icon: 'Coffee', text: 'Hot Breakfast', color: 'orange' },
        { icon: 'Camera', text: 'Professional Photos', color: 'purple' },
        { icon: 'Crown', text: 'Official Event Cap', color: 'red' },
        { icon: 'FileCheck', text: 'E-Certificate', color: 'teal' },
        { icon: 'Droplets', text: 'Hydration Support', color: 'cyan' }
      ],
      '10K': [
        { icon: 'Shirt', text: 'Premium Event T-Shirt', color: 'blue' },
        { icon: 'Medal', text: 'Finisher Medal', color: 'yellow' },
        { icon: 'Timer', text: 'Timing Chip Enabled', color: 'green' },
        { icon: 'Coffee', text: 'Hot Breakfast', color: 'orange' },
        { icon: 'Camera', text: 'Professional Photos', color: 'purple' },
        { icon: 'Crown', text: 'Official Event Cap', color: 'red' },
        { icon: 'FileCheck', text: 'E-Certificate', color: 'teal' },
        { icon: 'Droplets', text: 'Hydration Support', color: 'cyan' }
      ],
      '5K': [
        { icon: 'Shirt', text: 'Event T-Shirt', color: 'blue' },
        { icon: 'Medal', text: 'Finisher Medal', color: 'yellow' },
        { icon: 'Coffee', text: 'Hot Breakfast', color: 'orange' },
        { icon: 'Camera', text: 'Professional Photos', color: 'purple' },
        { icon: 'Crown', text: 'Official Event Cap', color: 'red' },
        { icon: 'FileCheck', text: 'E-Certificate', color: 'teal' },
        { icon: 'Droplets', text: 'Hydration Support', color: 'cyan' }
      ],
      '3K': [
        { icon: 'Shirt', text: 'Event T-Shirt', color: 'blue' },
        { icon: 'Medal', text: 'Finisher Medal', color: 'yellow' },
        { icon: 'Coffee', text: 'Refreshments', color: 'orange' },
        { icon: 'Camera', text: 'Professional Photos', color: 'purple' },
        { icon: 'FileCheck', text: 'E-Certificate', color: 'teal' },
        { icon: 'Droplets', text: 'Hydration Support', color: 'cyan' }
      ]
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
            
            {/* Urgency Banner */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-4 shadow-lg animate-pulse">
              <div className="flex items-center justify-center text-white">
                <p className="font-bold text-lg text-center">
                  ⚡ Slots Filling Fast! Only {event.totalSlots - event.registeredCount} spots left - Hurry Up!
                </p>
              </div>
            </div>

            {/* Categories & Fees - MOVED TO TOP */}
            <div className="card p-8 bg-gradient-to-br from-primary/5 via-white to-accent/5">
              <h2 className="font-display text-3xl font-bold text-dark mb-2 flex items-center">
                <Award className="w-8 h-8 mr-3 text-primary" />
                Choose Your Challenge
              </h2>
              <p className="text-gray-600 mb-6">Limited Time Offer - Save up to 50%!</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {event.distance.map((distance) => (
                  <button
                    key={distance}
                    onClick={() => setSelectedDistance(distance)}
                    className={`group p-6 rounded-2xl border-2 transition-all text-left relative overflow-hidden ${
                      selectedDistance === distance
                        ? 'border-primary bg-gradient-to-br from-primary/10 to-accent/10 shadow-xl'
                        : 'border-gray-200 hover:border-primary/50 hover:shadow-lg bg-white'
                    }`}
                  >
                    {/* Discount Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-500 text-white font-bold px-3 py-1.5 rounded-full text-xs shadow-lg">
                        {event.discount[distance]}% OFF
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <span className="font-display text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {distance}
                      </span>
                      {selectedDistance === distance && (
                        <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                          Selected
                        </span>
                      )}
                    </div>
                    
                    <p className="text-base font-semibold text-gray-700 mb-4">
                      {event.categoryNames?.[distance] || ''}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-400 line-through text-lg">₹{event.originalPrice[distance]}</span>
                      </div>
                      <p className="text-3xl font-bold text-primary flex items-baseline">
                        ₹{Math.round(event.registrationFee[distance])}
                        <span className="text-sm font-normal text-gray-500 ml-2">per person</span>
                      </p>
                    </div>

                    {/* Quick Preview of unique features */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 font-medium">
                        {distance === '21K' && '✨ Premium Kit + Timing Chip + Hot Breakfast'}
                        {distance === '10K' && '✨ Premium Kit + Timing Chip + Hot Breakfast'}
                        {distance === '5K' && '⚡ Complete Kit + Medal + Breakfast'}
                        {distance === '3K' && '🎉 Fun Run Kit + Medal + Refreshments'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

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

            {/* Race Kit Details - MOVED TO BOTTOM with creative presentation */}
            <div className="card p-8 bg-gradient-to-br from-white to-gray-50">
              <h2 className="font-display text-3xl font-bold text-dark mb-2 flex items-center">
                <Award className="w-8 h-8 mr-3 text-primary" />
                Your Premium Race Kit
              </h2>
              <p className="text-gray-600 mb-8">Every participant receives an exclusive race kit packed with premium goodies!</p>
              
              {/* Common Items for All Categories */}
              <div className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6">
                <h3 className="font-display text-lg font-bold text-dark mb-4 flex items-center">
                  <Check className="w-5 h-5 mr-2 text-primary" />
                  Included in All Categories
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { icon: Shirt, text: 'Event T-Shirt', color: 'blue' },
                    { icon: Medal, text: 'Finisher Medal', color: 'yellow' },
                    { icon: Camera, text: 'Professional Photos', color: 'purple' },
                    { icon: FileCheck, text: 'E-Certificate', color: 'teal' },
                    { icon: Droplets, text: 'Hydration Support', color: 'cyan' }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    const getColorClasses = (color) => {
                      const colors = {
                        blue: 'from-blue-500 to-blue-600',
                        yellow: 'from-yellow-500 to-amber-600',
                        purple: 'from-purple-500 to-pink-600',
                        teal: 'from-teal-500 to-cyan-600',
                        cyan: 'from-cyan-500 to-blue-600'
                      };
                      return colors[color];
                    };
                    return (
                      <div key={index} className="flex flex-col items-center bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className={`bg-gradient-to-br ${getColorClasses(item.color)} p-3 rounded-xl mb-3 shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-gray-800 text-sm font-semibold text-center">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category-Specific Perks - Simplified */}
              <div className="space-y-6">
                <h3 className="font-display text-lg font-bold text-dark mb-4">Additional Perks by Category</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* 21K & 10K - Premium Tier */}
                  <div className="border-2 border-primary/30 rounded-2xl p-6 bg-white">
                    <div className="flex items-center gap-2 mb-4">
                      <Crown className="w-6 h-6 text-yellow-500" />
                      <h4 className="font-display text-xl font-bold text-dark">
                        Premium Runners
                      </h4>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">21K</span>
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">10K</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { icon: Timer, text: 'Timing Chip Enabled', color: 'green' },
                        { icon: Coffee, text: 'Hot Breakfast', color: 'orange' },
                        { icon: Crown, text: 'Official Event Cap', color: 'red' }
                      ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div key={index} className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-2 rounded-lg">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-gray-700 font-medium text-sm">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 5K - Challenge Tier */}
                  <div className="border-2 border-accent/30 rounded-2xl p-6 bg-white">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-6 h-6 text-green-500" />
                      <h4 className="font-display text-xl font-bold text-dark">
                        Challenge Runners
                      </h4>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">5K</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { icon: Coffee, text: 'Hot Breakfast', color: 'orange' },
                        { icon: Crown, text: 'Official Event Cap', color: 'red' }
                      ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div key={index} className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-accent/20 to-primary/20 p-2 rounded-lg">
                              <Icon className="w-4 h-4 text-accent" />
                            </div>
                            <span className="text-gray-700 font-medium text-sm">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3K - Fun Run Tier */}
                  <div className="border-2 border-gray-300 rounded-2xl p-6 bg-white md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                      <Heart className="w-6 h-6 text-pink-500" />
                      <h4 className="font-display text-xl font-bold text-dark">
                        Fun Runners
                      </h4>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold">3K</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { icon: Coffee, text: 'Refreshments', color: 'orange' }
                      ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div key={index} className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-gray-200 to-gray-300 p-2 rounded-lg">
                              <Icon className="w-4 h-4 text-gray-700" />
                            </div>
                            <span className="text-gray-700 font-medium text-sm">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Value Comparison */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mt-6">
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-dark mb-2">Unbeatable Value!</h4>
                      <p className="text-sm text-gray-700">
                        All kits worth ₹{event.originalPrice['21K']}+ now available at up to 50% off. 
                        Premium quality guaranteed for every runner, from beginners to marathon enthusiasts!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Registration Card */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-28">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">Registration Fee</p>
                {selectedDistance && (
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-gray-400 line-through text-lg">₹{event.originalPrice[selectedDistance]}</span>
                    <span className="bg-green-500 text-white font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                      {event.discount[selectedDistance]}% OFF
                    </span>
                  </div>
                )}
                <p className="font-display text-4xl font-bold text-dark">
                  ₹{selectedDistance ? Math.round(event.registrationFee[selectedDistance]) : '---'}
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
                  <span className="text-red-600 font-bold">{slotsLeft.toLocaleString()} left!</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                    style={{ width: `${slotsPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-red-600 mt-2 text-center font-semibold">
                  🔥 {Math.round(slotsPercentage)}% slots filled - Filling Fast!
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
