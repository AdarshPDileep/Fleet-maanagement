import { Outlet } from 'react-router-dom'
import ProviderSidebar from '../components/ProviderSidebar'
import ProviderNavbar from '../components/ProviderNavbar'
import Footer from '../components/Footer'

function ProviderLayout() {
  return (
    <div className="p-layout-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        /* ── Provider Session — Global Font Override ── */
        .p-layout-wrapper,
        .p-layout-wrapper * {
          font-family: 'Plus Jakarta Sans', 'Inter', 'Segoe UI', sans-serif !important;
        }

        /* Remap aggressive bold weights to a refined scale */
        .p-layout-wrapper *[style*="font-weight: 900"],
        .p-layout-wrapper *[style*="fontWeight: 900"] {
          font-weight: 700 !important;
        }

        /* Page-level heading: comfortable bold, not ultra-heavy */
        .p-layout-wrapper .m-header h1,
        .p-layout-wrapper .top-copy h1,
        .p-layout-wrapper .manager-page-content h1 {
          font-weight: 700 !important;
          letter-spacing: -0.025em;
        }

        /* Sub-headings and section titles */
        .p-layout-wrapper .modal-title,
        .p-layout-wrapper .list-title,
        .p-layout-wrapper h2,
        .p-layout-wrapper h3 {
          font-weight: 600 !important;
        }

        /* Table headers */
        .p-layout-wrapper .m-table th {
          font-weight: 600 !important;
          font-size: 0.68rem;
          letter-spacing: 0.07em;
        }

        /* Table body — readable, not heavy */
        .p-layout-wrapper .m-table td {
          font-weight: 400 !important;
        }

        /* Labels across forms and filters */
        .p-layout-wrapper .filter-field label,
        .p-layout-wrapper .filter-panel-title,
        .p-layout-wrapper .form-group label,
        .p-layout-wrapper .detail-label {
          font-weight: 600 !important;
          letter-spacing: 0.04em;
        }

        /* Buttons — semi-bold is enough */
        .p-layout-wrapper button,
        .p-layout-wrapper .btn-add,
        .p-layout-wrapper .btn-save,
        .p-layout-wrapper .btn-download,
        .p-layout-wrapper .btn-clear-all,
        .p-layout-wrapper .ghost-btn {
          font-weight: 600 !important;
        }

        /* Status/trip badges */
        .p-layout-wrapper .trip-badge,
        .p-layout-wrapper .status-pill,
        .p-layout-wrapper .status-badge,
        .p-layout-wrapper .filter-active-badge,
        .p-layout-wrapper .filter-chip {
          font-weight: 600 !important;
        }

        /* Stat values — single bold accent */
        .p-layout-wrapper .stat-value,
        .p-layout-wrapper .detail-value {
          font-weight: 700 !important;
        }

        /* Inputs */
        .p-layout-wrapper input,
        .p-layout-wrapper select,
        .p-layout-wrapper textarea {
          font-weight: 400 !important;
        }

        /* Filter results count */
        .p-layout-wrapper .filter-results-count span {
          font-weight: 700 !important;
        }

        /* Sidebar */
        .p-layout-wrapper .p-brand { font-weight: 700 !important; }
        .p-layout-wrapper .p-nav-item { font-weight: 500 !important; }

        /* General body text across all manager pages */
        .p-layout-wrapper p,
        .p-layout-wrapper span,
        .p-layout-wrapper li {
          font-weight: 400;
        }

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

