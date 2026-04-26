import { Outlet } from 'react-router-dom'
import ProviderSidebar from '../components/ProviderSidebar'
import ProviderNavbar from '../components/ProviderNavbar'
import Footer from '../components/Footer'

function ProviderLayout() {
  return (
    <div className="p-layout-wrapper">
      <style>{`
        .p-layout-wrapper { display: flex; min-height: 100vh; background: #f8fafc; }
        .p-main-content { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .p-outlet-wrap { flex: 1; }
      `}</style>
      <ProviderSidebar />
      <main className="p-main-content">
        <ProviderNavbar />
        <div className="p-outlet-wrap">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  )
}

export default ProviderLayout
