import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  PlusCircle, 
  Truck, 
  UserPlus, 
  MapPin, 
  TrendingUp, 
  PieChart, 
  LogOut, 
  Bell,
  Search,
  Filter,
  Car,
  User,
  Activity,
  ClipboardList,
  ChevronRight,
  ArrowRight,
  IndianRupee
} from 'lucide-react'

function ProviderDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [trips, setTrips] = useState([])
  const [fleet, setFleet] = useState([])
  const [drivers, setDrivers] = useState([])

  useEffect(() => {
    // Load data from localStorage
    const savedTrips = JSON.parse(localStorage.getItem('myTrips') || '[]')
    const savedFleet = JSON.parse(localStorage.getItem('myVehicles') || '[]')
    const savedDrivers = JSON.parse(localStorage.getItem('myDrivers') || '[]')
    
    // Default data if empty (using new structure)
    const defaultTrips = [
      { id: 'T-9842', vehicleNumber: 'KL-01-AB-1234', driverName: 'Rahul Krishnan', fromLocation: 'TVM', toLocation: 'Kochi', totalKm: '210', date: '2024-04-24', tripStatus: 'Completed', profitAmount: 5660 },
      { id: 'T-9841', vehicleNumber: 'KL-07-CD-5678', driverName: 'Suresh Mani', fromLocation: 'Kochi', toLocation: 'Munnar', totalKm: '145', date: '2024-04-23', tripStatus: 'Completed', profitAmount: 3850 }
    ]
    const defaultFleet = [
      { name: 'Innova Crysta', plate: 'KL-01-AB-1234', status: 'Active', brand: 'Toyota', type: 'SUV' },
      { name: 'Winger', plate: 'KL-07-CD-5678', status: 'On Trip', brand: 'Tata', type: 'Van' }
    ]
    const defaultDrivers = [
      { name: 'Rahul Krishnan', phone: '+91 98450 12345', status: 'Approved', driverType: 'Full-time' },
      { name: 'Suresh Mani', phone: '+91 98450 54321', status: 'Approved', driverType: 'Contract' }
    ]

    setTrips(savedTrips.length > 0 ? savedTrips : defaultTrips)
    setFleet(savedFleet.length > 0 ? savedFleet : defaultFleet)
    setDrivers(savedDrivers.length > 0 ? savedDrivers : defaultDrivers)
  }, [])

  // Calculate Total Profit
  const totalProfit = trips.reduce((acc, curr) => acc + (parseFloat(curr.profitAmount) || 0), 0)

  // Filter Logic
  const filteredFleet = fleet.filter(v => 
    v.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.plate?.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredDrivers = drivers.filter(d => 
    d.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.phone?.includes(searchQuery)
  )
  const filteredTrips = trips.filter(t => 
    t.vehicleNumber?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.driverName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.fromLocation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.toLocation?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = [
    { label: "Active Vehicles", val: fleet.length, icon: Truck, color: "#22c55e" },
    { label: "Total Drivers", val: drivers.length, icon: User, color: "#0f172a" },
    { label: "Trips Logged", val: trips.length, icon: ClipboardList, color: "#3b82f6" },
    { label: "Total Profit", val: `₹${totalProfit.toLocaleString()}`, icon: IndianRupee, color: "#8b5cf6" }
  ]

  return (
    <div className="dashboard-content">
      <style>{`
        .dashboard-content { padding: 3rem; background: #f8fafc; min-height: 100vh; }
        
        .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; gap: 2rem; }
        .search-wrap { flex: 1; position: relative; max-width: 600px; }
        .search-wrap svg { position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .search-wrap input { width: 100%; padding: 1.1rem 1.25rem 1.1rem 3.5rem; border-radius: 16px; border: 1.5px solid #e2e8f0; font-weight: 700; outline: none; background: #fff; transition: all 0.2s; }
        .search-wrap input:focus { border-color: #22c55e; box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.05); }

        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 3.5rem; }
        .stat-card { background: #fff; padding: 1.75rem; border-radius: 24px; border: 1px solid #e2e8f0; display: flex; gap: 1.25rem; align-items: center; }
        .stat-icon { width: 54px; height: 54px; border-radius: 16px; display: grid; place-items: center; color: #fff; }
        .stat-info .label { font-size: 0.8rem; font-weight: 800; color: #64748b; text-transform: uppercase; }
        .stat-info .val { font-size: 1.4rem; font-weight: 900; color: #0f172a; display: block; }

        .dashboard-tabs { display: flex; gap: 1rem; margin-bottom: 2.5rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; }
        .tab-btn { padding: 0.75rem 1.5rem; border-radius: 12px; font-weight: 800; border: none; cursor: pointer; background: none; color: #64748b; transition: 0.2s; }
        .tab-btn.active { background: #0f172a; color: #fff; }

        .list-section { background: #fff; border-radius: 28px; border: 1px solid #e2e8f0; padding: 2rem; }
        .list-header { font-size: 1.2rem; font-weight: 900; margin-bottom: 2rem; color: #0f172a; }
        
        .item-row { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr 0.5fr; padding: 1.25rem; border-bottom: 1px solid #f1f5f9; align-items: center; font-weight: 700; transition: 0.2s; }
        .item-row:hover { background: #f8fafc; }
        .item-row:last-child { border-bottom: none; }
        .item-title { color: #0f172a; font-size: 0.95rem; }
        .item-subtitle { color: #94a3b8; font-size: 0.75rem; }
        .item-meta { color: #64748b; font-size: 0.85rem; font-weight: 600; }
        .status-badge { padding: 0.4rem 0.8rem; border-radius: 99px; font-size: 0.75rem; font-weight: 900; text-align: center; width: fit-content; }

        @media (max-width: 1100px) { 
          .stat-grid { grid-template-columns: 1fr 1fr; } 
          .top-bar { flex-direction: column; align-items: flex-start; }
          .item-row { grid-template-columns: 1fr 1fr 0.5fr; gap: 1rem; }
          .item-meta { display: none; }
        }
      `}</style>

      <header className="top-bar">
        <div>
          <h1 style={{fontSize:'2.2rem', fontWeight:900}}>Master Overview</h1>
          <p style={{color:'#64748b', fontWeight:600}}>Manage your entire fleet operations from one place.</p>
        </div>
        <div className="search-wrap">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search vehicles, drivers or trip routes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="stat-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{background: s.color}}><s.icon size={24} /></div>
            <div className="stat-info">
              <span className="label">{s.label}</span>
              <span className="val">{s.val}</span>
            </div>
          </div>
        ))}
      </div>

      <nav className="dashboard-tabs">
        <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Activity</button>
        <button className={`tab-btn ${activeTab === 'vehicles' ? 'active' : ''}`} onClick={() => setActiveTab('vehicles')}>Vehicles</button>
        <button className={`tab-btn ${activeTab === 'drivers' ? 'active' : ''}`} onClick={() => setActiveTab('drivers')}>Drivers</button>
        <button className={`tab-btn ${activeTab === 'trips' ? 'active' : ''}`} onClick={() => setActiveTab('trips')}>Trip Logs</button>
      </nav>

      <div className="list-section">
        {activeTab === 'all' && (
          <div>
            <h3 className="list-header">Combined Fleet View</h3>
            {searchQuery && <p style={{marginBottom: '1rem', color: '#64748b', fontWeight: 600}}>Results for "{searchQuery}"</p>}
            <div className="results-container">
              {filteredFleet.slice(0, 2).map((v, i) => (
                <div className="item-row" key={i}>
                  <div className="item-title"><div style={{color: '#22c55e', fontSize: '0.7rem', fontWeight: 900}}>VEHICLE</div>{v.name}</div>
                  <div className="item-subtitle">{v.plate}</div>
                  <div className="item-meta">{v.brand} • {v.type}</div>
                  <div className={`status-badge`} style={{background:'#dcfce7', color:'#166534'}}>{v.status}</div>
                  <ChevronRight size={18} color="#94a3b8" />
                </div>
              ))}
              {filteredDrivers.slice(0, 2).map((d, i) => (
                <div className="item-row" key={i}>
                  <div className="item-title"><div style={{color: '#3b82f6', fontSize: '0.7rem', fontWeight: 900}}>DRIVER</div>{d.name}</div>
                  <div className="item-subtitle">{d.phone}</div>
                  <div className="item-meta">{d.driverType}</div>
                  <div className={`status-badge`} style={{background:'#f1f5f9', color:'#475569'}}>{d.status}</div>
                  <ChevronRight size={18} color="#94a3b8" />
                </div>
              ))}
              {filteredTrips.slice(0, 2).map((t, i) => (
                <div className="item-row" key={i}>
                  <div className="item-title">
                    <div style={{color: '#f59e0b', fontSize: '0.7rem', fontWeight: 900}}>TRIP</div>
                    {t.fromLocation} → {t.toLocation}
                  </div>
                  <div className="item-subtitle">{t.driverName} • {t.totalKm} KM</div>
                  <div className="item-meta">₹{t.profitAmount} Profit</div>
                  <div className={`status-badge`} style={{background:'#fdf2f8', color:'#9d174d'}}>{t.tripStatus}</div>
                  <ChevronRight size={18} color="#94a3b8" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'vehicles' && (
          <div>
            <h3 className="list-header">All Vehicles ({filteredFleet.length})</h3>
            <div className="item-row" style={{borderBottom:'2px solid #f1f5f9', color:'#64748b', fontSize:'0.75rem', textTransform:'uppercase'}}>
              <div>Name</div><div>Plate</div><div>Brand/Type</div><div>Status</div><div></div>
            </div>
            {filteredFleet.map((v, i) => (
              <div className="item-row" key={i}>
                <div className="item-title">{v.name}</div>
                <div className="item-subtitle" style={{fontFamily:'monospace', fontWeight:800}}>{v.plate}</div>
                <div className="item-meta">{v.brand} • {v.type}</div>
                <div className={`status-badge`} style={{background:'#dcfce7', color:'#166534'}}>{v.status}</div>
                <ChevronRight size={18} color="#94a3b8" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'drivers' && (
          <div>
            <h3 className="list-header">All Drivers ({filteredDrivers.length})</h3>
            <div className="item-row" style={{borderBottom:'2px solid #f1f5f9', color:'#64748b', fontSize:'0.75rem', textTransform:'uppercase'}}>
              <div>Name</div><div>Phone</div><div>Type</div><div>Status</div><div></div>
            </div>
            {filteredDrivers.map((d, i) => (
              <div className="item-row" key={i}>
                <div className="item-title">{d.name}</div>
                <div className="item-subtitle">{d.phone}</div>
                <div className="item-meta">{d.driverType}</div>
                <div className={`status-badge`} style={{background:'#f1f5f9', color:'#475569'}}>{d.status}</div>
                <ChevronRight size={18} color="#94a3b8" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'trips' && (
          <div>
            <h3 className="list-header">All Trip Records ({filteredTrips.length})</h3>
            <div className="item-row" style={{borderBottom:'2px solid #f1f5f9', color:'#64748b', fontSize:'0.75rem', textTransform:'uppercase'}}>
              <div>Route</div><div>Details</div><div>Finance/Date</div><div>Status</div><div></div>
            </div>
            {filteredTrips.map((t, i) => (
              <div className="item-row" key={i}>
                <div className="item-title">{t.fromLocation} → {t.toLocation}</div>
                <div className="item-subtitle">{t.driverName} • {t.vehicleNumber}</div>
                <div className="item-meta">
                  <div style={{color:'#22c55e'}}>₹{t.profitAmount} Profit</div>
                  <div style={{fontSize:'0.7rem', color:'#94a3b8'}}>{t.date}</div>
                </div>
                <div className={`status-badge`} style={{background:'#fdf2f8', color:'#9d174d'}}>{t.tripStatus}</div>
                <ChevronRight size={18} color="#94a3b8" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProviderDashboard
