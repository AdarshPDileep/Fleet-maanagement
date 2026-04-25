import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  MapPin, 
  CheckCircle, 
  ChevronRight,
  Info,
  CreditCard,
  X,
  Users,
  Calendar
} from 'lucide-react'

const tourPackages = [
  {
    id: 'munnar',
    title: 'Munnar Hill Station',
    duration: '3 Days / 2 Nights',
    price: '₹4,500',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop',
    tag: 'Popular',
    desc: 'Explore the lush green tea gardens and misty hills of Munnar. Perfect for honeymooners and nature lovers.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Tea Gardens', details: 'Check-in and visit the sprawling tea plantations and Tea Museum.' },
      { day: 'Day 2', title: 'Eravikulam & Lakes', details: 'Visit Eravikulam National Park, Mattupetty Dam, and Kundala Lake.' },
      { day: 'Day 3', title: 'Departure', details: 'Morning shopping at local spice markets and departure.' }
    ],
    inclusions: ['Resort Stay', 'Breakfast Included', 'Private Cab', 'Sightseeing']
  },
  {
    id: 'alleppey',
    title: 'Alleppey Backwaters',
    duration: '2 Days / 1 Night',
    price: '₹3,200',
    image: 'https://images.unsplash.com/photo-1593693397690-362ad9666ec2?q=80&w=800&auto=format&fit=crop',
    tag: 'Trending',
    desc: 'Experience the serene beauty of houseboats and palm-fringed canals in the Venice of the East.',
    itinerary: [
      { day: 'Day 1', title: 'Houseboat Check-in', details: 'Check-in at traditional houseboat, enjoy backwater cruise and lunch.' },
      { day: 'Day 2', title: 'Beach & Departure', details: 'Morning cruise, visit Alleppey Beach and departure.' }
    ],
    inclusions: ['Premium Houseboat', 'All Meals (Lunch, Dinner, BF)', 'Welcome Drink', 'Backwater Cruise']
  },
  {
    id: 'wayanad',
    title: 'Wayanad Wildlife',
    duration: '3 Days / 2 Nights',
    price: '₹5,800',
    image: 'https://images.unsplash.com/photo-1582236521360-e4c194602f3b?q=80&w=800&auto=format&fit=crop',
    tag: 'Adventure',
    desc: 'A perfect getaway for nature lovers, including jungle safaris and stays in eco-resorts.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Dam Visit', details: 'Check-in and visit Banasura Sagar Dam.' },
      { day: 'Day 2', title: 'Jungle Safari', details: 'Wildlife safari at Muthanga and visit Edakkal Caves.' },
      { day: 'Day 3', title: 'Departure', details: 'Visit Soochipara Falls and departure.' }
    ],
    inclusions: ['Eco-Stay', 'Safari Jeep', 'Professional Guide', 'Daily Breakfast']
  }
]

function PackageDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pkg, setPkg] = useState(null)
  const [showPayment, setShowPayment] = useState(false)
  const [travelers, setTravelers] = useState(2)

  useEffect(() => {
    const found = tourPackages.find(p => p.id === id)
    if (found) setPkg(found)
    window.scrollTo(0, 0)
  }, [id])

  if (!pkg) return <div className="loading">Loading package details...</div>

  const handleBooking = (e) => {
    e.preventDefault()
    setShowPayment(true)
  }

  const completePayment = () => {
    const bookingId = `TP-${Math.floor(1000 + Math.random() * 9000)}`
    const bookingInfo = {
      id: bookingId,
      package: pkg.title,
      image: pkg.image,
      duration: pkg.duration,
      date: new Date().toLocaleDateString(),
      total: pkg.price,
      status: 'Confirmed',
      type: 'Tour'
    }
    const existing = JSON.parse(localStorage.getItem('myPackages') || '[]')
    localStorage.setItem('myPackages', JSON.stringify([bookingInfo, ...existing]))
    navigate('/my-packages')
  }

  return (
    <main className="pkg-detail-page">
      <style>{`
        .pkg-detail-page { padding: 5rem 5vw; background: #fdfdfd; min-height: 100vh; }
        .pkg-container { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 360px; gap: 3rem; }
        .pkg-back-btn { display: flex; align-items: center; gap: 0.5rem; background: none; border: none; color: #64748b; font-weight: 600; cursor: pointer; margin-bottom: 2rem; transition: color 0.2s; }
        .pkg-back-btn:hover { color: #000; }
        
        .pkg-hero-section { background: #fff; border-radius: 32px; overflow: hidden; border: 1px solid #f1f5f9; box-shadow: 0 10px 40px rgba(0,0,0,0.03); }
        .pkg-img-wrap { width: 100%; height: 450px; position: relative; }
        .pkg-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .pkg-tag-badge { position: absolute; top: 1.5rem; left: 1.5rem; background: #22c55e; color: #fff; padding: 0.5rem 1rem; border-radius: 99px; font-weight: 700; font-size: 0.8rem; }
        
        .pkg-prime-info { padding: 2.5rem; }
        .pkg-title-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .pkg-title-row h1 { font-size: 2.4rem; font-weight: 800; color: #0f172a; flex: 1; }
        .pkg-rating { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; color: #0f172a; }
        
        .pkg-meta-strip { display: flex; gap: 2rem; margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid #f1f5f9; }
        .pkg-meta-item { display: flex; align-items: center; gap: 0.75rem; color: #64748b; font-weight: 600; }
        .pkg-meta-item svg { color: #22c55e; }
        
        .pkg-section { margin-bottom: 3rem; }
        .pkg-section h2 { font-size: 1.4rem; font-weight: 800; margin-bottom: 1.5rem; color: #0f172a; }
        .pkg-desc { line-height: 1.8; color: #475569; font-size: 1.05rem; }
        
        .itinerary-list { display: flex; flex-direction: column; gap: 1rem; }
        .itin-item { display: flex; gap: 1.5rem; padding: 1.5rem; background: #f8fafc; border-radius: 20px; border: 1px solid #f1f5f9; }
        .itin-day { background: #0f172a; color: #fff; padding: 0.5rem 1rem; border-radius: 12px; font-weight: 800; font-size: 0.8rem; height: fit-content; }
        .itin-content h4 { font-weight: 800; margin-bottom: 0.5rem; }
        .itin-content p { font-size: 0.95rem; color: #64748b; line-height: 1.5; }
        
        .pkg-inc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .inc-item { display: flex; align-items: center; gap: 0.75rem; color: #475569; font-weight: 600; }
        .inc-item svg { color: #22c55e; }
        
        .pkg-sidebar { }
        .booking-card { background: #fff; padding: 2rem; border-radius: 28px; border: 1px solid #f1f5f9; box-shadow: 0 10px 40px rgba(0,0,0,0.05); position: sticky; top: 6rem; }
        .price-display { margin-bottom: 2rem; }
        .price-display .p-label { color: #64748b; font-weight: 700; text-transform: uppercase; font-size: 0.7rem; }
        .price-display .p-val { font-size: 2rem; font-weight: 800; color: #22c55e; }
        
        .booking-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .form-group label { display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; color: #475569; }
        .form-group input, .form-group select { width: 100%; padding: 0.9rem 1.25rem; border-radius: 12px; border: 1.5px solid #f1f5f9; font-weight: 600; outline: none; }
        .form-group input:focus { border-color: #22c55e; }
        
        .book-btn { background: #0f172a; color: #fff; border: none; padding: 1.1rem; border-radius: 16px; font-weight: 800; cursor: pointer; transition: transform 0.2s; }
        .book-btn:hover { transform: scale(1.02); background: #22c55e; }
        
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); display: grid; place-items: center; z-index: 1000; }
        .pay-modal { background: #fff; padding: 2.5rem; border-radius: 32px; width: 450px; text-align: center; position: relative; }
        .pay-modal h2 { font-weight: 800; margin: 1rem 0; }
        .pay-amount { font-size: 1.8rem; font-weight: 800; margin-bottom: 2rem; }
        .pay-btn { background: #22c55e; color: #fff; border: none; padding: 1rem 2rem; border-radius: 16px; font-weight: 800; cursor: pointer; width: 100%; }
        
        @media (max-width: 900px) { .pkg-container { grid-template-columns: 1fr; } }
      `}</style>

      <button className="pkg-back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        <span>Back to Tours</span>
      </button>

      <div className="pkg-container">
        <div className="pkg-main">
          <div className="pkg-hero-section">
            <div className="pkg-img-wrap">
              <img src={pkg.image} alt={pkg.title} />
              <div className="pkg-tag-badge">{pkg.tag}</div>
            </div>
            <div className="pkg-prime-info">
              <div className="pkg-title-row">
                <h1>{pkg.title}</h1>
                <div className="pkg-rating">
                  <Star size={18} fill="#fbbf24" color="#fbbf24" />
                  <span>4.9 (240+ Reviews)</span>
                </div>
              </div>
              
              <div className="pkg-meta-strip">
                <div className="pkg-meta-item">
                  <Clock size={18} />
                  <span>{pkg.duration}</span>
                </div>
                <div className="pkg-meta-item">
                  <MapPin size={18} />
                  <span>Kerala, India</span>
                </div>
                <div className="pkg-meta-item">
                  <Users size={18} />
                  <span>Group Tour</span>
                </div>
              </div>

              <div className="pkg-section">
                <h2>Overview</h2>
                <p className="pkg-desc">{pkg.desc}</p>
              </div>

              <div className="pkg-section">
                <h2>Itinerary</h2>
                <div className="itinerary-list">
                  {pkg.itinerary.map((item, i) => (
                    <div className="itin-item" key={i}>
                      <div className="itin-day">{item.day}</div>
                      <div className="itin-content">
                        <h4>{item.title}</h4>
                        <p>{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pkg-section">
                <h2>Inclusions</h2>
                <div className="pkg-inc-grid">
                  {pkg.inclusions.map((item, i) => (
                    <div className="inc-item" key={i}>
                      <CheckCircle size={16} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="pkg-sidebar">
          <div className="booking-card">
            <div className="price-display">
              <span className="p-label">Package Price</span>
              <div className="p-val">{pkg.price}</div>
              <span style={{fontSize: '0.8rem', color: '#64748b'}}>* Price per person</span>
            </div>

            <form className="booking-form" onSubmit={handleBooking}>
              <div className="form-group">
                <label>Travel Date</label>
                <input type="date" required />
              </div>
              <div className="form-group">
                <label>Number of Travelers</label>
                <select value={travelers} onChange={(e) => setTravelers(e.target.value)}>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Persons</option>)}
                </select>
              </div>
              <button type="submit" className="book-btn">Confirm Package</button>
            </form>
          </div>
        </aside>
      </div>

      {showPayment && (
        <div className="modal-overlay">
          <div className="pay-modal">
            <button className="pkg-back-btn" onClick={() => setShowPayment(false)} style={{position: 'absolute', right: '1.5rem', top: '1.5rem'}}>
              <X size={20} />
            </button>
            <CreditCard size={40} color="#22c55e" style={{margin: '0 auto'}} />
            <h2>Secure Payment</h2>
            <p>Total amount for {travelers} travelers</p>
            <div className="pay-amount">{pkg.price}</div>
            <button className="pay-btn" onClick={completePayment}>Pay & Confirm</button>
          </div>
        </div>
      )}
    </main>
  )
}

export default PackageDetailPage
