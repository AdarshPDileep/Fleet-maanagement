import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Calendar, 
  MapPin, 
  Car, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight,
  Clock,
  Navigation,
  Download
} from 'lucide-react'

const dummyHistory = [
  {
    id: 'RN-5521',
    vehicle: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&auto=format&fit=crop',
    date: '2026-03-15',
    endDate: '2026-03-18',
    total: '₹12,000',
    status: 'Completed',
    hub: 'Kochi Hub'
  },
  {
    id: 'RN-3392',
    vehicle: 'Compact Hatchback',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
    date: '2026-02-10',
    endDate: '2026-02-11',
    total: '₹1,500',
    status: 'Completed',
    hub: 'Trivandrum Hub'
  }
]

function RentalDetailsPage() {
  const [rentals, setRentals] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('latestBooking')
    let history = [...dummyHistory]
    
    if (saved) {
      const data = JSON.parse(saved)
      if (data.id.startsWith('RN-')) {
        // Add current active rental to the top
        history = [{ ...data, status: 'Ongoing', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop' }, ...history]
      }
    }
    setRentals(history)
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="rental-history-page animate-fade-in">
      <div className="history-container">
        <header className="history-header">
          <h1 className="hp-section-title">Rental History</h1>
          <p className="hp-section-sub">Manage your active and past vehicle rentals</p>
        </header>

        <div className="history-list">
          {rentals.map((item, index) => (
            <div key={item.id} className={`history-card animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="h-card-top">
                <div className="h-vehicle-info">
                  <div className="h-img-wrap">
                    <img src={item.image} alt={item.vehicle} />
                  </div>
                  <div className="h-text">
                    <div className="h-status-row">
                      <span className={`h-status-badge ${item.status.toLowerCase()}`}>
                        {item.status === 'Ongoing' && <div className="pulse-dot-small"></div>}
                        {item.status}
                      </span>
                      <span className="h-id">ID: {item.id}</span>
                    </div>
                    <h3>{item.vehicle}</h3>
                    <p className="h-hub"><MapPin size={12} /> {item.hub || 'FleetCare Kochi Hub'}</p>
                  </div>
                </div>
                <div className="h-price-info">
                  <div className="h-price">{item.total}</div>
                  <div className="h-date">{item.date}</div>
                </div>
              </div>

              <div className="h-card-mid">
                <div className="h-period">
                  <Calendar size={14} />
                  <span>{item.date}</span>
                  <ArrowRight size={12} />
                  <span>{item.endDate || 'TBD'}</span>
                </div>
                {item.status === 'Ongoing' && (
                  <div className="h-action-line">
                    <span className="h-info-text"><Navigation size={12} /> Ready for Pickup at Kochi Hub</span>
                  </div>
                )}
              </div>

              <div className="h-card-bottom">
                <div className="h-buttons">
                  {item.status === 'Ongoing' ? (
                    <>
                      <button className="h-btn-primary">View Details</button>
                      <button className="h-btn-outline">Contact Support</button>
                    </>
                  ) : (
                    <>
                      <button className="h-btn-outline"><Download size={14} /> Invoice</button>
                      <button className="h-btn-outline">Rebook</button>
                    </>
                  )}
                </div>
                <button className="h-detail-arrow">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}

          {rentals.length === 0 && (
            <div className="empty-history">
              <Car size={48} color="var(--gray-200)" />
              <p>No rentals found in your history.</p>
              <button className="nav-btn" onClick={() => navigate('/#vehicles')}>Book Now</button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default RentalDetailsPage
