import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Star, 
  ShieldCheck, 
  User, 
  Briefcase, 
  CheckCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone,
  CreditCard,
  X
} from 'lucide-react'

// Mock data (matching HomePage)
const vehicles = [
  {
    id: 'sedan',
    name: 'Executive Sedan',
    type: 'Car',
    price: '₹12/km',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
    features: ['Air Conditioned', 'Professional Driver', 'Clean Interior', 'Leather Seats', 'Music System'],
    rating: 4.9,
    trips: 125,
    specs: { seats: '4 Seats', luggage: '2 Large Bags', fuel: 'Petrol/EV' }
  },
  {
    id: 'suv',
    name: 'Luxury SUV',
    type: 'Car',
    price: '₹18/km',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&auto=format&fit=crop',
    features: ['7-Seater', 'All Terrain', 'Extra Luggage Space', 'Sunroof', 'Premium Audio'],
    rating: 4.8,
    trips: 89,
    specs: { seats: '7 Seats', luggage: '4 Large Bags', fuel: 'Diesel/Hybrid' }
  },
  {
    id: 'hatchback',
    name: 'Compact Hatchback',
    type: 'Car',
    price: '₹10/km',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
    features: ['Fuel Efficient', 'Easy City Parking', 'Budget Friendly', 'Compact Size'],
    rating: 4.7,
    trips: 210,
    specs: { seats: '4 Seats', luggage: '1 Small Bag', fuel: 'Petrol' }
  },
  {
    id: 'sports-bike',
    name: 'Sports Bike',
    type: 'Bike',
    price: '₹5/km',
    image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=800&auto=format&fit=crop',
    features: ['Helmet Included', 'Quick City Commute', 'Well Maintained', 'High Performance'],
    rating: 4.9,
    trips: 156,
    specs: { seats: '1 Seat', luggage: 'No Bags', fuel: 'Petrol' }
  },
  {
    id: 'cruiser-bike',
    name: 'Classic Cruiser',
    type: 'Bike',
    price: '₹8/km',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop',
    features: ['Long Distance Comfort', 'Vintage Style', 'Strong Engine', 'Thump Sound'],
    rating: 4.8,
    trips: 74,
    specs: { seats: '1 Seat', luggage: 'Side Bags', fuel: 'Petrol' }
  },
  {
    id: 'electric-scooter',
    name: 'Electric Scooter',
    type: 'Bike',
    price: '₹3/km',
    image: 'https://images.unsplash.com/photo-1605030270031-6e8499279282?q=80&w=800&auto=format&fit=crop',
    features: ['Eco Friendly', 'No Fuel Cost', 'Silent Ride', 'App Connectivity'],
    rating: 4.6,
    trips: 340,
    specs: { seats: '1 Seat', luggage: 'Under-seat Storage', fuel: 'Electric' }
  },
]

function VehicleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [vehicle, setVehicle] = useState(null)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [showPayment, setShowPayment] = useState(false)
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const found = vehicles.find(v => v.id === id)
    if (found) setVehicle(found)
    window.scrollTo(0, 0)
  }, [id])

  if (!vehicle) return <div className="loading-state">Loading vehicle details...</div>

  const handleBooking = (e) => {
    e.preventDefault()
    setShowPayment(true)
  }

  const completePayment = () => {
    const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`
    const bookingInfo = {
      id: bookingId,
      vehicle: vehicle.name,
      vehicleFull: `${vehicle.name} (${vehicle.type === 'Car' ? 'KL 07 BZ 1234' : 'KL 07 AW 5678'})`,
      date: bookingDate,
      time: bookingTime,
      address,
      phone,
      total: '₹175.00'
    }
    localStorage.setItem('latestBooking', JSON.stringify(bookingInfo))
    navigate(`/track?id=${bookingId}`)
  }

  return (
    <main className="vehicle-detail-page animate-fade-in">
      <div className="detail-header-bar">
        <button className="back-link-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          <span>Back to Search</span>
        </button>
      </div>

      <div className="detail-container">
        <div className="detail-main-content">
          <div className="detail-hero-card">
            <div className="detail-img-wrap">
              <img src={vehicle.image} alt={vehicle.name} />
              <div className="detail-type-badge">{vehicle.type}</div>
            </div>
            
            <div className="detail-prime-info">
              <div className="detail-title-row">
                <h1>{vehicle.name}</h1>
                <div className="detail-rating">
                  <Star size={16} fill="#fbbf24" color="#fbbf24" />
                  <span>{vehicle.rating} ({vehicle.trips} trips)</span>
                </div>
              </div>
              
              <div className="detail-specs-row">
                <div className="d-spec">
                  <User size={16} />
                  <span>{vehicle.specs.seats}</span>
                </div>
                <div className="d-spec">
                  <Briefcase size={16} />
                  <span>{vehicle.specs.luggage}</span>
                </div>
                <div className="d-spec">
                  <CheckCircle size={16} color="var(--green)" />
                  <span>{vehicle.specs.fuel}</span>
                </div>
                <div className="d-spec">
                  <ShieldCheck size={16} color="var(--green)" />
                  <span>Verified Ride</span>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-features-section">
            <h2 className="detail-sub-title">Key Features</h2>
            <div className="detail-features-grid">
              {vehicle.features.map((f, i) => (
                <div key={i} className="f-item">
                  <CheckCircle size={14} color="var(--green-dark)" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-reviews-preview">
            <h2 className="detail-sub-title">Customer Experience</h2>
            <div className="review-snippet">
              <div className="review-meta">
                <div className="review-avatar">A</div>
                <div>
                  <div className="review-author">Anand K.</div>
                  <div className="review-date">March 2026</div>
                </div>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#fbbf24" color="#fbbf24" />)}
                </div>
              </div>
              <p className="review-text">
                "The {vehicle.name} was exceptionally clean and the driver was very professional. 
                Perfect for my business trip to Kochi."
              </p>
            </div>
          </div>
        </div>

        <aside className="detail-booking-sidebar">
          <div className="booking-sticky-card">
            <div className="booking-price-header">
              <span className="b-label">Base Rate</span>
              <div className="b-price">{vehicle.price}</div>
            </div>

            <form className="booking-form" onSubmit={handleBooking}>
              <div className="b-input-group">
                <label><Calendar size={14} /> Pickup Date</label>
                <input 
                  type="date" 
                  required 
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>

              <div className="b-input-group">
                <label><Clock size={14} /> Pickup Time</label>
                <input 
                  type="time" 
                  required 
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                />
              </div>

              <div className="b-input-group">
                <label><MapPin size={14} /> Pickup Address</label>
                <textarea 
                  placeholder="Enter detailed pickup point" 
                  rows="2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="b-input-group">
                <label><Phone size={14} /> Contact Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 00000 00000" 
                  required 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="booking-summary">
                <div className="summary-row">
                  <span>Base Fare</span>
                  <span>₹150.00</span>
                </div>
                <div className="summary-row">
                  <span>Booking Fee</span>
                  <span>₹25.00</span>
                </div>
                <div className="summary-total">
                  <span>Total Due</span>
                  <span>₹175.00</span>
                </div>
              </div>

              <button type="submit" className="nav-btn full-btn">
                Confirm Booking
              </button>
            </form>
            
            <p className="booking-note">
              * Payment will be collected after the ride is completed.
            </p>
          </div>
        </aside>
      </div>

      {showPayment && (
        <div className="modal-overlay">
          <div className="payment-modal animate-scale-up">
            <button className="modal-close" onClick={() => setShowPayment(false)}>
              <X size={20} />
            </button>
            <div className="payment-header">
              <div className="pay-icon-circle">
                <CreditCard size={24} color="var(--green-dark)" />
              </div>
              <h2>Secure Payment</h2>
              <p>Complete your payment to confirm the booking for {vehicle.name}.</p>
            </div>

            <div className="payment-amount-box">
              <span className="pay-label">Amount to Pay</span>
              <span className="pay-value">₹175.00</span>
            </div>

            <div className="payment-methods">
              <label className="pay-method-opt">
                <input type="radio" name="pay-method" defaultChecked />
                <div className="method-info">
                  <span className="method-name">UPI / Google Pay</span>
                  <span className="method-sub">Instant and Secure</span>
                </div>
              </label>
              <label className="pay-method-opt">
                <input type="radio" name="pay-method" />
                <div className="method-info">
                  <span className="method-name">Credit / Debit Card</span>
                  <span className="method-sub">All major cards supported</span>
                </div>
              </label>
            </div>

            <button className="nav-btn full-btn pay-btn" onClick={completePayment}>
              Pay Now
            </button>
            <p className="payment-footer-note">
              Your payment information is encrypted and secure.
            </p>
          </div>
        </div>
      )}
    </main>
  )
}

export default VehicleDetailPage
