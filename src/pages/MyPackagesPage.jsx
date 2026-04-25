import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Compass, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  Download,
  Phone,
  ArrowRight,
  Navigation,
  Star
} from 'lucide-react'

function MyPackagesPage() {
  const [packages, setPackages] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('myPackages')
    if (saved) {
      setPackages(JSON.parse(saved))
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="my-pkgs-page">
      <style>{`
        .my-pkgs-page { padding: 5rem 5vw; background: #f8fafc; min-height: 100vh; }
        .pkgs-container { max-width: 900px; margin: 0 auto; }
        .pkgs-header { margin-bottom: 3rem; }
        .pkgs-header h1 { font-size: 2.2rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; }
        .pkgs-header p { color: #64748b; font-weight: 600; }
        
        .pkg-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .pkg-item-card { background: #fff; border-radius: 28px; padding: 1.5rem; border: 1px solid #f1f5f9; box-shadow: 0 4px 20px rgba(0,0,0,0.02); display: flex; gap: 2rem; position: relative; }
        
        .pkg-img-side { width: 220px; height: 160px; border-radius: 20px; overflow: hidden; flex-shrink: 0; }
        .pkg-img-side img { width: 100%; height: 100%; object-fit: cover; }
        
        .pkg-info-side { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
        .pkg-status-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
        .pkg-status-badge { background: #dcfce7; color: #166534; padding: 0.4rem 0.8rem; border-radius: 99px; font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; gap: 0.4rem; }
        .pkg-id { font-size: 0.75rem; color: #94a3b8; font-weight: 700; }
        
        .pkg-info-side h2 { font-size: 1.4rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; }
        .pkg-meta-row { display: flex; gap: 1.5rem; margin-bottom: 1rem; }
        .pkg-meta-point { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #64748b; font-weight: 600; }
        
        .pkg-actions { display: flex; gap: 1rem; margin-top: 1rem; }
        .pkg-btn { padding: 0.6rem 1.25rem; border-radius: 12px; font-weight: 800; font-size: 0.85rem; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; transition: all 0.2s; }
        .pkg-btn-primary { background: #0f172a; color: #fff; border: none; }
        .pkg-btn-outline { background: transparent; border: 1.5px solid #f1f5f9; color: #0f172a; }
        .pkg-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        
        .empty-pkgs { text-align: center; padding: 6rem 0; }
        .empty-icon { width: 80px; height: 80px; background: #fff; border-radius: 50%; display: grid; place-items: center; margin: 0 auto 2rem; border: 1px solid #f1f5f9; }
        
        @media (max-width: 700px) {
          .pkg-item-card { flex-direction: column; padding: 1.25rem; }
          .pkg-img-side { width: 100%; height: 200px; }
        }
      `}</style>

      <div className="pkgs-container">
        <header className="pkgs-header">
          <h1>My Tour Packages</h1>
          <p>View and manage your booked travel experiences</p>
        </header>

        <div className="pkg-list">
          {packages.map((pkg) => (
            <div className="pkg-item-card" key={pkg.id}>
              <div className="pkg-img-side">
                <img src={pkg.image} alt={pkg.package} />
              </div>
              <div className="pkg-info-side">
                <div className="pkg-status-row">
                  <div className="pkg-status-badge">
                    <CheckCircle size={14} />
                    <span>Booking {pkg.status}</span>
                  </div>
                  <span className="pkg-id">ID: {pkg.id}</span>
                </div>
                
                <h2>{pkg.package}</h2>
                
                <div className="pkg-meta-row">
                  <div className="pkg-meta-point">
                    <Calendar size={14} />
                    <span>Travel Date: {pkg.date}</span>
                  </div>
                  <div className="pkg-meta-point">
                    <Navigation size={14} />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                <div className="pkg-actions">
                  <button className="pkg-btn pkg-btn-primary">View Itinerary</button>
                  <button className="pkg-btn pkg-btn-outline"><Download size={14} /> Ticket</button>
                  <button className="pkg-btn pkg-btn-outline"><Phone size={14} /> Guide</button>
                </div>
              </div>
            </div>
          ))}

          {packages.length === 0 && (
            <div className="empty-pkgs">
              <div className="empty-icon">
                <Compass size={32} color="#94a3b8" />
              </div>
              <h2>No Booked Packages</h2>
              <p>You haven't booked any tour packages yet.</p>
              <button className="nav-btn" style={{marginTop: '1.5rem'}} onClick={() => navigate('/#packages')}>
                Explore Packages
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default MyPackagesPage
