import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Search, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle, 
  Navigation, 
  Phone, 
  User, 
  ArrowLeft 
} from 'lucide-react'

function TrackingPage() {
  const [bookingId, setBookingId] = useState('')
  const [trackingData, setTrackingData] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    const saved = localStorage.getItem('latestBooking')
    
    if (id || saved) {
      const data = saved ? JSON.parse(saved) : { id }
      if (id && saved && JSON.parse(saved).id !== id) {
        // Different ID in URL, just show search or fetch if we had a real API
      } else {
        autoTrack(data)
      }
    }
  }, [location.search])

  const autoTrack = (data) => {
    setTrackingData({
      id: data.id || 'BK-8829-XP',
      status: 'On the way',
      driver: 'Rajesh Kumar',
      vehicle: data.vehicleFull || 'Executive Sedan (KL 07 BZ 1234)',
      eta: '12 mins',
      pickup: data.address || 'Kochi Airport (COK)',
      drop: 'Marine Drive, Kochi',
      timeline: [
        { time: '10:30 AM', status: 'Booking Confirmed', completed: true },
        { time: '10:45 AM', status: 'Driver Assigned', completed: true },
        { time: '11:00 AM', status: 'Vehicle Dispatched', completed: true },
        { time: 'In Progress', status: 'On the way to pickup', completed: false }
      ]
    })
  }

  const handleTrack = (e) => {
    e.preventDefault()
    // Dummy tracking data
    setTrackingData({
      id: bookingId || 'BK-8829-XP',
      status: 'On the way',
      driver: 'Rajesh Kumar',
      vehicle: 'Executive Sedan (KL 07 BZ 1234)',
      eta: '12 mins',
      pickup: 'Kochi Airport (COK)',
      drop: 'Marine Drive, Kochi',
      timeline: [
        { time: '10:30 AM', status: 'Booking Confirmed', completed: true },
        { time: '10:45 AM', status: 'Driver Assigned', completed: true },
        { time: '11:00 AM', status: 'Vehicle Dispatched', completed: true },
        { time: 'In Progress', status: 'On the way to pickup', completed: false }
      ]
    })
  }

  return (
    <main className="tracking-page animate-fade-in">
      <div className="tracking-container">
        <div className="tracking-search-section">
          <button className="back-link-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          
          <h1 className="hp-section-title">Track Your Ride</h1>
          <p className="hp-section-sub">Enter your Booking ID to see real-time status of your vehicle.</p>
          
          <form className="track-search-form" onSubmit={handleTrack}>
            <div className="track-input-wrap">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Enter Booking ID (e.g. BK-8829)" 
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="nav-btn track-btn">Track Ride</button>
          </form>
        </div>

        {trackingData && (
          <div className="tracking-results-pro animate-slide-up">
            <div className="tracking-map-placeholder">
              <div className="map-overlay">
                <div className="driver-mini-card">
                  <div className="driver-avatar">
                    <User size={20} />
                  </div>
                  <div className="driver-mini-info">
                    <strong>{trackingData.driver}</strong>
                    <span>{trackingData.vehicle}</span>
                  </div>
                  <button className="call-btn">
                    <Phone size={16} />
                  </button>
                </div>
                
                <div className="route-pulse-container">
                  <div className="pulse-dot"></div>
                  <div className="pulse-line"></div>
                  <Navigation className="car-icon" size={24} />
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
                alt="Map Background" 
                className="dummy-map"
              />
            </div>

            <div className="tracking-details-grid">
              <div className="tracking-card-pro status-card">
                <div className="status-header">
                  <div className="status-main">
                    <span className="status-label">Current Status</span>
                    <h2 className="status-val">{trackingData.status}</h2>
                  </div>
                  <div className="eta-badge">
                    <Clock size={16} />
                    <span>ETA: {trackingData.eta}</span>
                  </div>
                </div>

                <div className="tracking-timeline">
                  {trackingData.timeline.map((step, i) => (
                    <div key={i} className={`timeline-item ${step.completed ? 'completed' : 'active'}`}>
                      <div className="timeline-point">
                        {step.completed ? <CheckCircle size={16} /> : <Truck size={16} />}
                      </div>
                      <div className="timeline-content">
                        <span className="timeline-status">{step.status}</span>
                        <span className="timeline-time">{step.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tracking-card-pro trip-info-card">
                <h3 className="card-title-pro">Trip Information</h3>
                <div className="trip-points">
                  <div className="trip-point">
                    <MapPin size={18} color="var(--green)" />
                    <div className="point-details">
                      <span className="p-label">Pickup Location</span>
                      <span className="p-val">{trackingData.pickup}</span>
                    </div>
                  </div>
                  <div className="trip-divider"></div>
                  <div className="trip-point">
                    <MapPin size={18} color="var(--black)" />
                    <div className="point-details">
                      <span className="p-label">Drop Location</span>
                      <span className="p-val">{trackingData.drop}</span>
                    </div>
                  </div>
                </div>
                
                <div className="booking-id-tag">
                  Booking ID: <strong>{trackingData.id}</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default TrackingPage
