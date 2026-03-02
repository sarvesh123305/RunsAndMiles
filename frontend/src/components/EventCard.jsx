import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Coming Soon';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const slotsLeft = event.totalSlots - event.registeredCount;
  const slotsPercentage = (event.registeredCount / event.totalSlots) * 100;

  return (
    <div className="card overflow-hidden group hover:shadow-premium-lg">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Distance badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {event.distance.map((d) => (
            <span
              key={d}
              className="bg-white backdrop-blur-md text-dark-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-white/20"
            >
              {d}
            </span>
          ))}
        </div>

        {/* City badge */}
        <div className="absolute bottom-4 left-4 flex items-center text-white bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="font-semibold text-sm">{event.city}, {event.state}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-gradient-to-b from-white to-gray-50">
        <h3 className="font-display font-bold text-2xl text-dark-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
          {event.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-4 bg-primary-50 px-3 py-2 rounded-lg">
          <Calendar className="w-4 h-4 mr-2 text-primary-600" />
          <span className="text-sm font-medium">{event.date ? `${formatDate(event.date)} • ${event.time}` : '🗓️ Coming Soon'}</span>
        </div>

        <p className="text-gray-700 text-sm mb-5 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Slots Progress */}
        <div className="mb-5 bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-700 flex items-center font-medium">
              <Users className="w-4 h-4 mr-1.5 text-primary-600" />
              {event.registeredCount.toLocaleString()} registered
            </span>
            <span className="text-accent-600 font-bold">{slotsLeft.toLocaleString()} left</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${slotsPercentage}%` }}
            />
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-5 border-t-2 border-gray-100">
          <div>
            <span className="text-xs text-gray-500 font-medium block mb-1">Starting from</span>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-400 line-through text-sm font-medium">₹{event.originalPrice?.['3K'] || 499}</span>
              <span className="bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold px-2.5 py-1 rounded-lg text-xs shadow-lg">
                {event.discount?.['3K'] || 40}% OFF
              </span>
            </div>
            <p className="font-display font-extrabold text-3xl bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              ₹{event.registrationFee?.['3K'] || 299.4}
            </p>
          </div>
          <Link
            to={`/events/${event.id}`}
            className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold text-sm px-6 py-3.5 rounded-full flex items-center gap-2 hover:gap-3 transition-all shadow-premium hover:shadow-premium-lg group"
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
