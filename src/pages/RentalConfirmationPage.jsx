import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  CheckCircle, 
  MapPin, 
  Calendar, 
  FileText, 
  Phone, 
  ArrowRight,
  Download,
  ShieldCheck,
  Home
} from 'lucide-react'

function RentalConfirmationPage() {
  const [booking, setBooking] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('latestBooking')
    if (saved) {
      setBooking(JSON.parse(saved))
    }
    window.scrollTo(0, 0)
  }, [])

  if (!booking) return <div className="loading-state">Loading confirmation...</div>

  return (
    <main className="rent-conf-page animate-fade-in">
      <div className="conf-container">
        <div className="conf-card">
          <div className="conf-header">
            <div className="conf-icon-success">
              <CheckCircle size={40} color="var(--white)" />
            </div>
            <h1>Rental Confirmed!</h1>
            <p className="conf-id-text">Booking ID: <strong>{booking.id}</strong></p>
          </div>

          <div className="conf-status-banner">
            <ShieldCheck size={20} />
            <span>Your {booking.vehicle} is reserved and ready for pickup.</span>
          </div>

          <div className="conf-details-grid">
            <div className="conf-item">
              <label><Calendar size={16} /> Rental Period</label>
              <div className="conf-val">
                <span>{booking.date}</span>
                <ArrowRight size={14} />
                <span>{booking.endDate || 'TBD'}</span>
              </div>
            </div>

            <div className="conf-item">
              <label><MapPin size={16} /> Pickup Location</label>
              <div className="conf-val">
                <span>FleetCare Hub, Ernakulam North, Kochi</span>
              </div>
            </div>
          </div>

          <div className="conf-doc-section">
            <h3>Documents Required at Pickup</h3>
            <div className="doc-list">
              <div className="doc-item">
                <FileText size={18} />
                <span>Original Driving License</span>
              </div>
              <div className="doc-item">
                <FileText size={18} />
                <span>Aadhaar Card / Govt ID</span>
              </div>
            </div>
          </div>

          <div className="conf-actions">
            <button className="nav-btn w-full download-btn">
              <Download size={18} />
              Download Rental Agreement
            </button>
            <div className="conf-secondary-actions">
              <button className="secondary-btn" onClick={() => navigate('/')}>
                <Home size={18} />
                Go to Home
              </button>
              <button className="secondary-btn">
                <Phone size={18} />
                Contact Hub
              </button>
            </div>
          </div>
        </div>
        
        <p className="conf-footer-note">
          A confirmation email and SMS has been sent to your registered contact.
        </p>
      </div>
    </main>
  )
}

export default RentalConfirmationPage
