import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  MapPin, 
  Calendar,
  User,
  Settings,
  LogOut,
  Bell
} from 'lucide-react'

function DriverDashboard() {
  const dummyTrips = [
    { id: 'TRP-001', pickup: 'Trivandrum Airport', drop: 'Varkala', date: '28 Apr 2026', time: '10:00 AM', vehicle: 'Toyota Innova', status: 'Assigned' },
    { id: 'TRP-002', pickup: 'Kochi Marine Drive', drop: 'Munnar', date: '29 Apr 2026', time: '09:30 AM', vehicle: 'Ertiga', status: 'Upcoming' }
  ]

  return (
    <div className="provider-dashboard">
      <style>{`
        .provider-dashboard { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; background: #f8fafc; }
        .p-sidebar { background: #0f172a; color: #fff; padding: 2rem; }
        .p-brand { font-size: 1.5rem; font-weight: 800; margin-bottom: 3rem; display: flex; align-items: center; gap: 0.75rem; }
        .p-nav { display: flex; flex-direction: column; gap: 0.5rem; }
        .p-nav-item { display: flex; align-items: center; gap: 1rem; padding: 1rem; border-radius: 12px; color: #94a3b8; transition: all 0.2s; cursor: pointer; }
        .p-nav-item:hover, .p-nav-item.active { background: #1e293b; color: #fff; }
        
        .p-content { padding: 3rem; }
        .p-top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .p-user-pill { display: flex; align-items: center; gap: 1rem; background: #fff; padding: 0.5rem 1rem; border-radius: 99px; border: 1px solid #e2e8f0; }

        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
        .stat-card { background: #fff; padding: 1.5rem; border-radius: 20px; border: 1px solid #e2e8f0; }
        .stat-card .label { color: #64748b; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; }
        .stat-card .value { font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-top: 0.5rem; display: block; }

        .trip-list { display: flex; flex-direction: column; gap: 1.25rem; }
        .trip-card { background: #fff; padding: 1.5rem; border-radius: 20px; border: 1px solid #e2e8f0; display: grid; grid-template-columns: 1fr 2fr 1fr; align-items: center; }
        .trip-id { font-weight: 800; color: #22c55e; }
        .trip-route { display: flex; items-center: center; gap: 1rem; font-weight: 700; }
        .trip-status { padding: 0.5rem 1rem; border-radius: 99px; font-size: 0.8rem; font-weight: 800; text-align: center; }
        .status-assigned { background: #dcfce7; color: #166534; }
        
        .action-btns { display: flex; gap: 1rem; }
        .btn-sm { padding: 0.6rem 1.25rem; border-radius: 10px; font-weight: 800; font-size: 0.85rem; border: none; cursor: pointer; }
      `}</style>

      <aside className="p-sidebar">
        <div className="p-brand"><Briefcase color="#22c55e" /> Driver Portal</div>
        <nav className="p-nav">
          <div className="p-nav-item active"><Briefcase size={20} /> Dashboard</div>
          <div className="p-nav-item"><MapPin size={20} /> Assigned Trips</div>
          <div className="p-nav-item"><Clock size={20} /> Trip History</div>
          <div className="p-nav-item"><DollarSign size={20} /> Earnings</div>
          <div className="p-nav-item"><User size={20} /> Profile</div>
          <div style={{ marginTop: 'auto' }} className="p-nav-item"><LogOut size={20} /> Logout</div>
        </nav>
      </aside>

      <main className="p-content">
        <header className="p-top-bar">
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Driver Dashboard</h2>
            <p style={{ color: '#64748b' }}>Welcome back, Rahul! You have 1 trip today.</p>
          </div>
          <div className="p-user-pill">
            <Bell size={20} color="#64748b" />
            <div style={{ width: '1px', height: '20px', background: '#e2e8f0' }}></div>
            <span style={{ fontWeight: 700 }}>Rahul K.</span>
            <div style={{ width: '32px', height: '32px', background: '#22c55e', borderRadius: '50%' }}></div>
          </div>
        </header>

        <div className="stat-grid">
          <div className="stat-card">
            <span className="label">Today Trips</span>
            <span className="value">01</span>
          </div>
          <div className="stat-card">
            <span className="label">Upcoming</span>
            <span className="value">04</span>
          </div>
          <div className="stat-card">
            <span className="label">Completed</span>
            <span className="value">128</span>
          </div>
          <div className="stat-card">
            <span className="label">Earnings (MTD)</span>
            <span className="value">₹12,450</span>
          </div>
        </div>

        <section>
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>Current Assignments</h3>
          <div className="trip-list">
            {dummyTrips.map(trip => (
              <div className="trip-card" key={trip.id}>
                <div>
                  <div className="trip-id">{trip.id}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>{trip.date} • {trip.time}</div>
                </div>
                <div className="trip-route">
                  <span>{trip.pickup}</span>
                  <ArrowRight size={16} color="#94a3b8" />
                  <span>{trip.drop}</span>
                </div>
                <div className="action-btns">
                  <div className="trip-status status-assigned">Assigned</div>
                  <button className="btn-sm" style={{ background: '#0f172a', color: '#fff' }}>Start Trip</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default DriverDashboard
