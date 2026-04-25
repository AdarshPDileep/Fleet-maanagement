import { Bell, User, LogOut, Search, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function ProviderNavbar() {
  const navigate = useNavigate()

  return (
    <header className="p-navbar">
      <style>{`
        .p-navbar {
          height: 80px;
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2.5rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .p-nav-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .p-nav-search {
          position: relative;
          width: 300px;
        }

        .p-nav-search svg {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .p-nav-search input {
          width: 100%;
          padding: 0.7rem 1rem 0.7rem 2.8rem;
          border-radius: 12px;
          border: 1.5px solid #f1f5f9;
          background: #f8fafc;
          font-weight: 600;
          outline: none;
          transition: 0.2s;
        }

        .p-nav-search input:focus {
          border-color: #3b82f6;
          background: #fff;
        }

        .p-nav-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .p-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: #64748b;
          cursor: pointer;
          transition: 0.2s;
          position: relative;
        }

        .p-nav-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .p-nav-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 10px;
          height: 10px;
          background: #ef4444;
          border: 2px solid #fff;
          border-radius: 50%;
        }

        .p-profile-btn {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.4rem 0.6rem;
          padding-right: 1rem;
          border-radius: 14px;
          cursor: pointer;
          transition: 0.2s;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
        }

        .p-profile-btn:hover {
          background: #f1f5f9;
        }

        .p-profile-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #0f172a;
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 800;
          font-size: 0.9rem;
        }

        .p-profile-info {
          display: flex;
          flex-direction: column;
        }

        .p-profile-name {
          font-size: 0.9rem;
          font-weight: 800;
          color: #1e293b;
        }

        .p-profile-role {
          font-size: 0.7rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
      `}</style>

      <div className="p-nav-left">
        <div className="p-nav-search">
          <Search size={18} />
          <input type="text" placeholder="Quick find..." />
        </div>
      </div>

      <div className="p-nav-right">
        <div className="p-nav-btn">
          <Bell size={22} />
          <span className="p-nav-badge" />
        </div>
        
        <div className="p-nav-btn">
          <Settings size={22} />
        </div>

        <div className="p-profile-btn" onClick={() => navigate('/login')}>
          <div className="p-profile-avatar">S</div>
          <div className="p-profile-info">
            <span className="p-profile-name">Saresh Mani</span>
            <span className="p-profile-role">Fleet Owner</span>
          </div>
          <LogOut size={16} style={{marginLeft: '0.5rem', color: '#94a3b8'}} />
        </div>
      </div>
    </header>
  )
}

export default ProviderNavbar
