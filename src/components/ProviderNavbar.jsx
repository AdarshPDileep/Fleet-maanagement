import { Bell, User, LogOut, Search, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function ProviderNavbar() {
  const navigate = useNavigate()

  return (
    <header className="p-navbar">
      <style>{`
        .p-navbar {
          height: 70px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }

        .p-nav-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .p-nav-search {
          position: relative;
          width: 320px;
        }

        .p-nav-search svg {
          position: absolute;
          left: 1.1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          transition: color 0.2s;
        }

        .p-nav-search input {
          width: 100%;
          padding: 0.65rem 1rem 0.65rem 2.8rem;
          border-radius: 14px;
          border: 1.5px solid #f1f5f9;
          background: #f8fafc;
          font-weight: 600;
          outline: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0.85rem;
          color: #0f172a;
        }

        .p-nav-search input::placeholder {
          color: #94a3b8;
          font-weight: 500;
        }

        .p-nav-search input:focus {
          border-color: #3b82f6;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          width: 380px;
        }

        .p-nav-search input:focus + svg {
          color: #3b82f6;
        }

        .p-nav-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .p-nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          border: 1px solid transparent;
        }

        .p-nav-btn:hover {
          background: #fff;
          color: #3b82f6;
          border-color: #e2e8f0;
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .p-nav-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border: 2px solid #fff;
          border-radius: 50%;
        }

        .p-profile-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.4rem 0.5rem;
          padding-right: 1rem;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.25s;
          background: #fff;
          border: 1px solid #f1f5f9;
          margin-left: 0.5rem;
        }

        .p-profile-btn:hover {
          border-color: #3b82f6;
          background: #f0f7ff;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);
        }

        .p-profile-avatar {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 800;
          font-size: 0.85rem;
          box-shadow: 0 4px 10px rgba(15, 23, 42, 0.2);
        }

        .p-profile-info {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .p-profile-name {
          font-size: 0.85rem;
          font-weight: 800;
          color: #0f172a;
        }

        .p-profile-role {
          font-size: 0.65rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
      `}</style>

      <div className="p-nav-left">
        <div className="p-nav-search">
          <input type="text" placeholder="Search trips, drivers, or vehicles..." />
          <Search size={16} />
        </div>
      </div>

      <div className="p-nav-right">
        <div className="p-nav-btn" title="Notifications">
          <Bell size={20} />
          <span className="p-nav-badge" />
        </div>
        
        <div className="p-nav-btn" title="Settings">
          <Settings size={20} />
        </div>

        <div className="p-profile-btn" onClick={() => navigate('/login')} title="Logout">
          <div className="p-profile-avatar">S</div>
          <div className="p-profile-info">
            <span className="p-profile-name">Saresh Mani</span>
            <span className="p-profile-role">Fleet Owner</span>
          </div>
          <LogOut size={14} style={{marginLeft: '0.4rem', color: '#94a3b8'}} />
        </div>
      </div>
    </header>
  )
}

export default ProviderNavbar
