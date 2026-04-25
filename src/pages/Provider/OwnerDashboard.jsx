import { 
  Briefcase, 
  Car, 
  Shield, 
  DollarSign, 
  MapPin, 
  Calendar,
  Settings,
  LogOut,
  Bell,
  ArrowRight,
  Truck
} from 'lucide-react'

function OwnerDashboard() {
  const dummyVehicles = [
    { name: 'Toyota Innova', plate: 'KL-01-AB-1234', seats: '7 Seats', status: 'Available', expiry: '12 Dec 2026' },
    { name: 'Tata Winger', plate: 'KL-07-CD-5678', seats: '12 Seats', status: 'On Trip', expiry: '05 Jan 2027' }
  ]

  return (
    <div className="provider-dashboard">
      <style>{`
        .provider-dashboard { display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; background: #fdfdfd; }
        .p-sidebar { background: #0f172a; color: #fff; padding: 2rem; }
        .p-brand { font-size: 1.5rem; font-weight: 800; margin-bottom: 3rem; display: flex; align-items: center; gap: 0.75rem; }
        .p-nav { display: flex; flex-direction: column; gap: 0.5rem; }
        .p-nav-item { display: flex; align-items: center; gap: 1rem; padding: 1rem; border-radius: 12px; color: #94a3b8; transition: all 0.2s; cursor: pointer; }
        .p-nav-item:hover, .p-nav-item.active { background: #1e293b; color: #fff; }
        
        .p-content { padding: 3rem; }
        .p-top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        
        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
        .stat-card { background: #fff; padding: 1.5rem; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .stat-card .label { color: #64748b; font-size: 0.85rem; font-weight: 700; }
        .stat-card .value { font-size: 1.8rem; font-weight: 800; margin-top: 0.5rem; display: block; }

        .v-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .v-card { background: #fff; padding: 2rem; border-radius: 24px; border: 1px solid #f1f5f9; }
        .v-status { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.8rem; border-radius: 99px; font-size: 0.75rem; font-weight: 800; margin-bottom: 1.5rem; }
        .status-available { background: #dcfce7; color: #166534; }
        .status-trip { background: #fee2e2; color: #991b1b; }
      `}</style>

      <aside className="p-sidebar">
        <div className="p-brand"><Car color="#22c55e" /> Owner Hub</div>
        <nav className="p-nav">
          <div className="p-nav-item active"><Truck size={20} /> Dashboard</div>
          <div className="p-nav-item"><Car size={20} /> My Vehicles</div>
          <div className="p-nav-item"><Calendar size={20} /> Assigned Trips</div>
          <div className="p-nav-item"><DollarSign size={20} /> Earnings</div>
          <div className="p-nav-item"><Shield size={20} /> Documents</div>
          <div className="p-nav-item" style={{ marginTop: 'auto' }}><LogOut size={20} /> Logout</div>
        </nav>
      </aside>

      <main className="p-content">
        <header className="p-top-bar">
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Vehicle Owner Dashboard</h2>
            <p style={{ color: '#64748b' }}>Manage your fleet and track earnings.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '12px', fontWeight: 700 }}>+ Add Vehicle</button>
          </div>
        </header>

        <div className="stat-grid">
          <div className="stat-card">
            <span className="label">Total Vehicles</span>
            <span className="value">05</span>
          </div>
          <div className="stat-card">
            <span className="label">Available</span>
            <span className="value">03</span>
          </div>
          <div className="stat-card">
            <span className="label">Booked</span>
            <span className="value">02</span>
          </div>
          <div className="stat-card">
            <span className="label">Monthly Revenue</span>
            <span className="value">₹45,200</span>
          </div>
        </div>

        <h3 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>Your Fleet</h3>
        <div className="v-grid">
          {dummyVehicles.map((v, i) => (
            <div className="v-card" key={i}>
              <div className={`v-status ${v.status === 'Available' ? 'status-available' : 'status-trip'}`}>
                {v.status}
              </div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{v.name}</h4>
              <p style={{ color: '#64748b', fontWeight: 600, marginTop: '0.25rem' }}>{v.plate}</p>
              
              <div style={{ margin: '1.5rem 0', display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#475569' }}>
                <span>{v.seats}</span>
                <span>•</span>
                <span>Insurance: {v.expiry}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{ flex: 1, padding: '0.75rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', background: 'none', fontWeight: 700 }}>Edit</button>
                <button style={{ flex: 1, padding: '0.75rem', borderRadius: '12px', background: '#0f172a', color: '#fff', border: 'none', fontWeight: 700 }}>Details</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default OwnerDashboard
