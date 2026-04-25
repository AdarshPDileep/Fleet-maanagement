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
  X,
  Info,
  Key,
  Shield
} from 'lucide-react'

// Mock data
const vehicles = [
  {
    id: 'sedan',
    name: 'Executive Sedan',
    type: 'Car',
    dailyRate: '₹2,500',
    deposit: '₹5,000',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
    features: ['Self Drive', 'Unlimited KMs', 'Insurance Included', 'Clean Interior', 'Leather Seats'],
    rating: 4.9,
    trips: 125,
    specs: { transmission: 'Automatic', fuel: 'Petrol', category: 'Luxury' }
  },
  {
    id: 'suv',
    name: 'Luxury SUV',
    type: 'Car',
    dailyRate: '₹4,000',
    deposit: '₹8,000',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&auto=format&fit=crop',
    features: ['7-Seater', '4x4 Drive', 'Extra Luggage Space', 'Sunroof', 'Premium Audio'],
    rating: 4.8,
    trips: 89,
    specs: { transmission: 'Manual', fuel: 'Diesel', category: 'SUV' }
  },
  {
    id: 'hatchback',
    name: 'Compact Hatchback',
    type: 'Car',
    dailyRate: '₹1,500',
    deposit: '₹3,000',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
    features: ['Fuel Efficient', 'Easy City Parking', 'Budget Friendly', 'Compact Size'],
    rating: 4.7,
    trips: 210,
    specs: { transmission: 'Manual', fuel: 'Petrol', category: 'Economy' }
  },
  {
    id: 'sports-bike',
    name: 'Sports Bike',
    type: 'Bike',
    dailyRate: '₹1,200',
    deposit: '₹2,500',
    image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=800&auto=format&fit=crop',
    features: ['Helmet Included', 'Quick City Commute', 'Well Maintained', 'High Performance'],
    rating: 4.9,
    trips: 156,
    specs: { transmission: '6-Speed', fuel: 'Petrol', category: 'Sports' }
  },
  {
    id: 'cruiser-bike',
    name: 'Classic Cruiser',
    type: 'Bike',
    dailyRate: '₹1,800',
    deposit: '₹3,500',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop',
    features: ['Long Distance Comfort', 'Vintage Style', 'Strong Engine', 'Thump Sound'],
    rating: 4.8,
    trips: 74,
    specs: { transmission: '5-Speed', fuel: 'Petrol', category: 'Cruiser' }
  },
  {
    id: 'electric-scooter',
    name: 'Electric Scooter',
    type: 'Bike',
    dailyRate: '₹600',
    deposit: '₹1,000',
    image: 'https://images.unsplash.com/photo-1605030270031-6e8499279282?q=80&w=800&auto=format&fit=crop',
    features: ['Eco Friendly', 'No Fuel Cost', 'Silent Ride', 'App Connectivity'],
    rating: 4.6,
    trips: 340,
    specs: { transmission: 'Automatic', fuel: 'Electric', category: 'EV' }
  },
]

function VehicleRentPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [vehicle, setVehicle] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showPayment, setShowPayment] = useState(false)

  useEffect(() => {
    const found = vehicles.find(v => v.id === id)
    if (found) setVehicle(found)
    window.scrollTo(0, 0)
  }, [id])

  if (!vehicle) return <div className="loading-state">Loading rental details...</div>

  const handleRent = (e) => {
    e.preventDefault()
    setShowPayment(true)
  }

  const completePayment = () => {
    const bookingId = `RN-${Math.floor(1000 + Math.random() * 9000)}`
    const bookingInfo = {
      id: bookingId,
      vehicle: vehicle.name,
      vehicleFull: `${vehicle.name} (Rent)`,
      date: startDate,
      endDate: endDate,
      status: 'Ready for Pickup',
      total: vehicle.dailyRate
    }
    localStorage.setItem('latestBooking', JSON.stringify(bookingInfo))
    navigate(`/rent-confirmation`)
  }

  return (
    <main className="vehicle-detail-page rent-page animate-fade-in">
      <div className="detail-header-bar">
        <button className="back-link-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          <span>Back to Fleet</span>
        </button>
      </div>

      <div className="detail-container">
        <div className="detail-main-content">
          <div className="detail-hero-card">
            <div className="detail-img-wrap">
              <img src={vehicle.image} alt={vehicle.name} />
              <div className="detail-type-badge">Self-Drive Rent</div>
            </div>
            
            <div className="detail-prime-info">
              <div className="detail-title-row">
                <h1>{vehicle.name}</h1>
                <div className="detail-rating">
                  <Star size={16} fill="#fbbf24" color="#fbbf24" />
                  <span>{vehicle.rating} ({vehicle.trips} rented)</span>
                </div>
              </div>
              
              <div className="rent-specs-row">
                <div className="r-spec">
                  <Key size={18} />
                  <div>
                    <span className="rs-label">Transmission</span>
                    <span className="rs-val">{vehicle.specs.transmission}</span>
                  </div>
                </div>
                <div className="r-spec">
                  <Shield size={18} />
                  <div>
                    <span className="rs-label">Insurance</span>
                    <span className="rs-val">Comprehensive</span>
                  </div>
                </div>
                <div className="r-spec">
                  <CheckCircle size={18} />
                  <div>
                    <span className="rs-label">Category</span>
                    <span className="rs-val">{vehicle.specs.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rent-info-section">
            <h2 className="detail-sub-title">Rental Terms</h2>
            <div className="rent-terms-grid">
              <div className="term-card">
                <Info size={20} color="var(--green-dark)" />
                <div>
                  <h4>Security Deposit</h4>
                  <p>{vehicle.deposit} (Refundable upon return)</p>
                </div>
              </div>
              <div className="term-card">
                <Shield size={20} color="var(--green-dark)" />
                <div>
                  <h4>Damage Protection</h4>
                  <p>Standard damage waiver included in the rate.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-features-section">
            <h2 className="detail-sub-title">Vehicle Highlights</h2>
            <div className="detail-features-grid">
              {vehicle.features.map((f, i) => (
                <div key={i} className="f-item">
                  <CheckCircle size={14} color="var(--green-dark)" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="detail-booking-sidebar">
          <div className="booking-sticky-card rent-sidebar">
            <div className="booking-price-header">
              <span className="b-label">Daily Rate</span>
              <div className="b-price">{vehicle.dailyRate}</div>
            </div>

            <form className="booking-form" onSubmit={handleRent}>
              <div className="b-input-group">
                <label><Calendar size={14} /> Start Date</label>
                <input 
                  type="date" 
                  required 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="b-input-group">
                <label><Calendar size={14} /> End Date</label>
                <input 
                  type="date" 
                  required 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="rent-summary-box">
                <div className="summary-row">
                  <span>Daily Rate</span>
                  <span>{vehicle.dailyRate}</span>
                </div>
                <div className="summary-row">
                  <span>Security Deposit</span>
                  <span>{vehicle.deposit}</span>
                </div>
                <div className="summary-total">
                  <span>Grand Total</span>
                  <span>{vehicle.dailyRate}</span>
                </div>
              </div>

              <button type="submit" className="nav-btn full-btn rent-btn">
                Rent This Vehicle
              </button>
            </form>
            
            <p className="booking-note">
              * Original Driving License and Aadhaar required for verification at pickup.
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
              <h2>Rental Payment</h2>
              <p>Complete your payment to reserve the {vehicle.name} for self-drive.</p>
            </div>

            <div className="payment-amount-box">
              <span className="pay-label">Total to Pay</span>
              <span className="pay-value">{vehicle.dailyRate}</span>
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
          </div>
        </div>
      )}
    </main>
  )
}

export default VehicleRentPage
