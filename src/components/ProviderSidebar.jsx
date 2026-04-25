import { useNavigate, useLocation } from 'react-router-dom'
import { 
  PieChart, 
  UserPlus, 
  Truck, 
  MapPin, 
  LogOut, 
  TrendingUp 
} from 'lucide-react'

function ProviderSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { name: 'Dashboard', icon: PieChart, path: '/provider/dashboard' },
    { name: 'Driver', icon: UserPlus, path: '/partner/driver-register' },
    { name: 'Vehicle', icon: Truck, path: '/partner/vehicle-register' },
    { name: 'Trip', icon: MapPin, path: '/partner/trip-register' },
  ]

  return (
    <aside className="p-sidebar">
      <style>{`
        .p-sidebar { 
          background: #0f172a; 
          color: #fff; 
          padding: 2rem; 
          position: sticky; 
          top: 0; 
          height: 100vh; 
          width: 280px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #1e293b;
        }
        .p-brand { font-size: 1.5rem; font-weight: 800; margin-bottom: 3rem; display: flex; align-items: center; gap: 0.75rem; color: #22c55e; cursor: pointer; }
        .p-nav { display: flex; flex-direction: column; gap: 0.5rem; }
        .p-nav-item { 
          display: flex; 
          align-items: center; 
          gap: 1rem; 
          padding: 1rem; 
          border-radius: 12px; 
          color: #94a3b8; 
          transition: all 0.2s; 
          cursor: pointer; 
          text-decoration: none; 
          font-weight: 700;
        }
        .p-nav-item:hover, .p-nav-item.active { background: #1e293b; color: #fff; }
        .p-nav-item.active { background: #1e293b; color: #22c55e; border-right: 3px solid #22c55e; border-radius: 12px 0 0 12px; }
      `}</style>
      
      <div className="p-brand" onClick={() => navigate('/')}>
        <TrendingUp size={28} />
        <span>FleetCare Pro</span>
      </div>

      <nav className="p-nav">
        {menuItems.map((item) => (
          <div 
            key={item.path}
            className={`p-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </div>
        ))}
        
        <div style={{ marginTop: 'auto' }} className="p-nav-item" onClick={() => navigate('/login')}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </nav>
    </aside>
  )
}

export default ProviderSidebar
