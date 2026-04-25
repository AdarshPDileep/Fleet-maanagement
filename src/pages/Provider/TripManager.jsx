import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  MapPin, 
  Plus, 
  Edit,
  Trash2,
  X,
  User,
  Car,
  Calendar,
  DollarSign,
  CreditCard,
  Save,
  MoreVertical,
  Navigation,
  ArrowRight,
  TrendingUp,
  Receipt,
  Wallet,
  CheckCircle,
  Clock,
  FileText,
  Eye,
  Activity,
  Search,
  Filter,
  Download
} from 'lucide-react'

function TripManager() {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [trips, setTrips] = useState([])
  const [editingTrip, setEditingTrip] = useState(null)
  const [viewingTrip, setViewingTrip] = useState(null)
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem('myTrips') || '[]')
    const defaults = [
      { 
        id: 'T-9842', 
        date: '2024-04-24',
        driverName: 'Rahul Krishnan',
        vehicleNumber: 'KL-01-AB-1234',
        companyClientName: 'Technopark Corp',
        fromLocation: 'TVM', 
        toLocation: 'Kochi', 
        startKm: '124500',
        endKm: '124710',
        totalKm: '210',
        advanceFromSuresh: '1000',
        advanceFromCompany: '2000',
        totalAdvance: '3000',
        dieselExpense: '1500',
        maintenanceExpense: '0',
        otherExpense: '200',
        parkingExpense: '100',
        tollExpense: '240',
        foodExpense: '300',
        driverBatta: '500',
        totalExpense: '2840',
        goodsRent: '8500',
        balanceAmount: '5500',
        profitAmount: '5660',
        paymentStatus: 'Pending',
        paymentMode: 'Bank Transfer',
        tripStatus: 'Completed',
        note: 'Smooth trip'
      },
      { 
        id: 'T-1025', 
        date: '2024-04-23',
        driverName: 'Suresh Mani',
        vehicleNumber: 'KL-07-CD-5678',
        companyClientName: 'Lulu Mall Logistics',
        fromLocation: 'Kochi', 
        toLocation: 'Calicut', 
        startKm: '82100',
        endKm: '82290',
        totalKm: '190',
        advanceFromSuresh: '500',
        advanceFromCompany: '1500',
        totalAdvance: '2000',
        dieselExpense: '1400',
        maintenanceExpense: '200',
        otherExpense: '150',
        parkingExpense: '50',
        tollExpense: '180',
        foodExpense: '250',
        driverBatta: '600',
        totalExpense: '2830',
        goodsRent: '7200',
        balanceAmount: '5200',
        profitAmount: '4370',
        paymentStatus: 'Paid',
        paymentMode: 'Cash',
        tripStatus: 'Completed',
        note: 'Heavy traffic at Thrissur'
      },
      { 
        id: 'T-5541', 
        date: '2024-04-22',
        driverName: 'Abhijith P.S.',
        vehicleNumber: 'KL-11-EF-9012',
        companyClientName: 'Amazon Sort Centre',
        fromLocation: 'Calicut', 
        toLocation: 'Wayand', 
        startKm: '25450',
        endKm: '25540',
        totalKm: '90',
        advanceFromSuresh: '200',
        advanceFromCompany: '800',
        totalAdvance: '1000',
        dieselExpense: '1100',
        maintenanceExpense: '0',
        otherExpense: '100',
        parkingExpense: '30',
        tollExpense: '0',
        foodExpense: '200',
        driverBatta: '550',
        totalExpense: '1980',
        goodsRent: '4500',
        balanceAmount: '3500',
        profitAmount: '2520',
        paymentStatus: 'Partial',
        paymentMode: 'UPI',
        tripStatus: 'Completed',
        note: 'Hilly terrain, high fuel consumption'
      },
      { 
        id: 'T-2234', 
        date: '2024-04-25',
        driverName: 'Mohammed Fasil',
        vehicleNumber: 'KL-13-GH-3456',
        companyClientName: 'Bismi Appliances',
        fromLocation: 'Palakkad', 
        toLocation: 'CBE', 
        startKm: '38150',
        endKm: '38210',
        totalKm: '60',
        advanceFromSuresh: '500',
        advanceFromCompany: '500',
        totalAdvance: '1000',
        dieselExpense: '600',
        maintenanceExpense: '0',
        otherExpense: '100',
        parkingExpense: '20',
        tollExpense: '110',
        foodExpense: '150',
        driverBatta: '500',
        totalExpense: '1480',
        goodsRent: '3200',
        balanceAmount: '2200',
        profitAmount: '1720',
        paymentStatus: 'Pending',
        paymentMode: 'Cash',
        tripStatus: 'Active',
        note: 'Interstate transport'
      },
      { 
        id: 'T-8871', 
        date: '2024-04-21',
        driverName: 'Vineeth Kumar',
        vehicleNumber: 'KL-05-IJ-7890',
        companyClientName: 'Private Party',
        fromLocation: 'Kottayam', 
        toLocation: 'Idukki', 
        startKm: '65200',
        endKm: '65310',
        totalKm: '110',
        advanceFromSuresh: '1000',
        advanceFromCompany: '0',
        totalAdvance: '1000',
        dieselExpense: '1200',
        maintenanceExpense: '100',
        otherExpense: '50',
        parkingExpense: '40',
        tollExpense: '0',
        foodExpense: '300',
        driverBatta: '650',
        totalExpense: '2340',
        goodsRent: '5800',
        balanceAmount: '4800',
        profitAmount: '3460',
        paymentStatus: 'Paid',
        paymentMode: 'Bank Transfer',
        tripStatus: 'Completed',
        note: 'Tourist trip'
      }
    ]
    setTrips(savedTrips.length > 0 ? savedTrips : defaults)
  }, [])

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = 
      trip.driverName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      trip.vehicleNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.companyClientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.fromLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.toLocation?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = dateFilter ? trip.date === dateFilter : true;
    const matchesStatus = statusFilter ? trip.tripStatus === statusFilter : true;
    
    return matchesSearch && matchesDate && matchesStatus;
  })

  const openEdit = (t) => {
    setEditingTrip(t)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this trip record?')) {
      const existing = JSON.parse(localStorage.getItem('myTrips') || '[]')
      const updated = existing.filter(t => t.id !== id)
      localStorage.setItem('myTrips', JSON.stringify(updated))
      setTrips(updated)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    
    // Numeric conversions
    const startKm = parseFloat(formData.get('startKm') || 0)
    const endKm = parseFloat(formData.get('endKm') || 0)
    const advSuresh = parseFloat(formData.get('advanceFromSuresh') || 0)
    const advComp = parseFloat(formData.get('advanceFromCompany') || 0)
    const diesel = parseFloat(formData.get('dieselExpense') || 0)
    const maint = parseFloat(formData.get('maintenanceExpense') || 0)
    const other = parseFloat(formData.get('otherExpense') || 0)
    const parking = parseFloat(formData.get('parkingExpense') || 0)
    const toll = parseFloat(formData.get('tollExpense') || 0)
    const food = parseFloat(formData.get('foodExpense') || 0)
    const batta = parseFloat(formData.get('driverBatta') || 0)
    const rent = parseFloat(formData.get('goodsRent') || 0)

    // Calculations
    const totalKm = endKm - startKm
    const totalAdvance = advSuresh + advComp
    const totalExpense = diesel + maint + other + parking + toll + food + batta
    const balanceAmount = rent - totalAdvance
    const profitAmount = rent - totalExpense
    
    const tripData = {
      id: editingTrip ? editingTrip.id : (formData.get('tripId') || 'T-' + Math.floor(Math.random() * 9000 + 1000)),
      date: formData.get('date'),
      driverName: formData.get('driverName'),
      vehicleNumber: formData.get('vehicleNumber'),
      companyClientName: formData.get('companyClientName'),
      fromLocation: formData.get('fromLocation'),
      toLocation: formData.get('toLocation'),
      startKm,
      endKm,
      totalKm,
      advanceFromSuresh: advSuresh,
      advanceFromCompany: advComp,
      totalAdvance,
      dieselExpense: diesel,
      maintenanceExpense: maint,
      otherExpense: other,
      parkingExpense: parking,
      tollExpense: toll,
      foodExpense: food,
      driverBatta: batta,
      totalExpense,
      goodsRent: rent,
      balanceAmount,
      profitAmount,
      paymentStatus: formData.get('paymentStatus'),
      paymentMode: formData.get('paymentMode'),
      tripStatus: formData.get('tripStatus'),
      note: formData.get('note')
    }

    const existing = JSON.parse(localStorage.getItem('myTrips') || '[]')
    let updated
    if (editingTrip) {
      updated = existing.map(t => t.id === editingTrip.id ? tripData : t)
    } else {
      updated = [tripData, ...existing]
    }
    
    localStorage.setItem('myTrips', JSON.stringify(updated))

    setTimeout(() => {
      setLoading(false)
      setShowForm(false)
      setEditingTrip(null)
      setTrips(updated)
      alert(editingTrip ? 'Trip Record Updated!' : 'Trip Logged Successfully!')
    }, 800)
  }

  const handleExport = () => {
    const headers = ['Date', 'Driver', 'Vehicle', 'Client', 'From', 'To', 'Total KM', 'Diesel', 'Maint.', 'Other', 'Total Advance', 'Rent', 'Profit', 'Status'];
    const rows = filteredTrips.map(t => [
      t.date,
      t.driverName,
      t.vehicleNumber,
      t.companyClientName,
      t.fromLocation,
      t.toLocation,
      t.totalKm,
      t.dieselExpense,
      t.maintenanceExpense,
      t.otherExpense,
      t.totalAdvance,
      t.goodsRent,
      t.profitAmount,
      t.tripStatus
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Trips_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <main className="manager-page-content">
      <style>{`
        .manager-page-content { padding: 2rem; background: #f8fafc; min-height: 100vh; }
        .manager-container { width: 100%; margin: 0 auto; }
        .m-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .m-header h1 { font-size: 2.2rem; font-weight: 900; color: #0f172a; letter-spacing: -0.02em; }
        
        .btn-add { background: #3b82f6; color: #fff; padding: 0.9rem 1.8rem; border-radius: 14px; font-weight: 800; display: flex; align-items: center; gap: 0.6rem; border: none; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2); }
        .btn-add:hover { background: #2563eb; transform: translateY(-2px); box-shadow: 0 12px 24px rgba(59, 130, 246, 0.3); }

        .table-card { background: #fff; border-radius: 28px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
        .m-table { width: 100%; border-collapse: collapse; text-align: left; }
        .m-table th { background: #f8fafc; padding: 1.2rem 0.6rem; font-size: 0.65rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #f1f5f9; }
        .m-table td { padding: 1.2rem 0.6rem; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #1e293b; font-size: 0.8rem; }
        
        .action-btns { display: flex; gap: 0.6rem; }
        .icon-btn { width: 36px; height: 36px; border-radius: 10px; border: 1px solid #e2e8f0; display: grid; place-items: center; cursor: pointer; transition: 0.2s; background: #fff; color: #64748b; }
        .icon-btn:hover { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
        .icon-btn.view:hover { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }

        .trip-badge { padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.7rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.02em; }
        .tb-completed { background: #dcfce7; color: #166534; }
        .tb-active { background: #e0f2fe; color: #0369a1; }
        .tb-cancelled { background: #fee2e2; color: #991b1b; }

        .form-overlay, .detail-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(12px); display: grid; place-items: center; z-index: 1000; padding: 2rem; }
        .form-card, .detail-card { background: #fff; border-radius: 36px; width: 100%; max-width: 1100px; padding: 4rem; position: relative; max-height: 92vh; overflow-y: auto; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
        .close-btn { position: absolute; top: 2.5rem; right: 2.5rem; background: #f1f5f9; border: none; width: 44px; height: 44px; border-radius: 50%; font-weight: 900; cursor: pointer; display: grid; place-items: center; transition: 0.2s; }
        .close-btn:hover { transform: rotate(90deg); }

        .form-grid, .detail-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .form-section-title, .detail-section-title { grid-column: span 4; font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 1.5rem 0 0.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid #f1f5f9; display: flex; align-items: center; gap: 0.6rem; }
        
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.8rem; font-weight: 800; color: #64748b; }
        .form-group input, .form-group select, .form-group textarea { padding: 1rem 1.2rem; border-radius: 12px; border: 2px solid #f1f5f9; font-weight: 700; outline: none; transition: 0.2s; font-family: inherit; }
        .form-group input:focus { border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
        .form-group.span-2 { grid-column: span 2; }
        
        .detail-item { background: #f8fafc; padding: 1.2rem; border-radius: 16px; border: 1px solid #f1f5f9; }
        .detail-label { font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 0.4rem; display: block; }
        .detail-value { font-size: 1.05rem; font-weight: 800; color: #1e293b; }
        .detail-value.highlight { color: #3b82f6; }
        .detail-item.span-2 { grid-column: span 2; }

        .btn-save { grid-column: span 4; background: #0f172a; color: #fff; padding: 1.4rem; border-radius: 18px; font-weight: 900; margin-top: 2rem; cursor: pointer; border: none; font-size: 1.1rem; letter-spacing: 0.02em; transition: 0.3s; }
        .btn-save:hover { background: #1e293b; transform: translateY(-2px); }

        .stat-preview { background: #f8fafc; padding: 1.5rem; border-radius: 20px; border: 1px solid #e2e8f0; grid-column: span 4; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; margin-top: 1rem; }
        .stat-item { display: flex; flex-direction: column; gap: 0.2rem; }
        .stat-label { font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; }
        .stat-value { font-size: 1.25rem; font-weight: 900; color: #0f172a; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0, 0, 0.2, 1); }

        .filter-bar { background: #fff; padding: 1.5rem; border-radius: 20px; border: 1px solid #e2e8f0; margin-bottom: 2rem; display: flex; gap: 1.5rem; align-items: flex-end; flex-wrap: wrap; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .filter-group { display: flex; flex-direction: column; gap: 0.5rem; flex: 1; min-width: 200px; }
        .filter-group label { font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.4rem; }
        .filter-input-wrap { position: relative; }
        .filter-input-wrap svg { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .filter-input-wrap input, .filter-input-wrap select { width: 100%; padding: 0.8rem 1rem 0.8rem 2.8rem; border-radius: 12px; border: 1.5px solid #f1f5f9; background: #f8fafc; font-weight: 700; outline: none; transition: 0.2s; font-family: inherit; }
        .filter-input-wrap input:focus, .filter-input-wrap select:focus { border-color: #3b82f6; background: #fff; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.05); }
        .btn-clear { background: #f1f5f9; color: #64748b; padding: 0.8rem 1.2rem; border-radius: 12px; font-weight: 800; border: none; cursor: pointer; transition: 0.2s; height: 48px; }
        .btn-clear:hover { background: #e2e8f0; color: #0f172a; }

        .btn-download { background: #0f172a; color: #fff; padding: 0.8rem 1.2rem; border-radius: 12px; font-weight: 800; border: none; cursor: pointer; transition: 0.2s; height: 48px; display: flex; align-items: center; gap: 0.6rem; }
        .btn-download:hover { background: #1e293b; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2); }
      `}</style>

      <div className="manager-container">
        <header className="m-header">
          <div>
            <h1>Trip Operations Log</h1>
            <p style={{color:'#64748b', fontWeight:600, marginTop:'0.4rem'}}>Comprehensive tracking for every journey</p>
          </div>
          <button className="btn-add" onClick={() => { setEditingTrip(null); setShowForm(true); }}>
            <Plus size={22} /> Log New Trip
          </button>
        </header>

        <div className="filter-bar">
          <div className="filter-group">
            <label><Search size={14} /> Search Records</label>
            <div className="filter-input-wrap">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Driver, vehicle or route..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="filter-group">
            <label><Calendar size={14} /> Trip Date</label>
            <div className="filter-input-wrap">
              <Calendar size={18} />
              <input 
                type="date" 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
          <div className="filter-group">
            <label><Filter size={14} /> Status</label>
            <div className="filter-input-wrap">
              <Filter size={18} />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Active">Active</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <button className="btn-clear" onClick={() => { setSearchTerm(''); setDateFilter(''); setStatusFilter(''); }}>Clear</button>
          <button className="btn-download" onClick={handleExport}><Download size={18} /> Export CSV</button>
        </div>

        <div className="table-card">
          <table className="m-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client / Company</th>
                <th>Route (From → To)</th>
                <th>Advances (S / C)</th>
                <th>Total KM</th>
                <th>Diesel</th>
                <th>Maint.</th>
                <th>Other Exp</th>
                <th>Driver Batta</th>
                <th>Goods Rent</th>
                <th>Profit</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.map(trip => (
                <tr key={trip.id}>
                  <td style={{whiteSpace:'nowrap'}}>{trip.date}</td>
                  <td style={{fontWeight:800}}>{trip.companyClientName}</td>
                  <td style={{whiteSpace:'nowrap'}}>
                    <div style={{display:'flex', alignItems:'center', gap:'0.4rem'}}>
                      {trip.fromLocation} <ArrowRight size={12} color="#3b82f6" /> {trip.toLocation}
                    </div>
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                    <div style={{fontSize:'0.85rem'}}>S: ₹{trip.advanceFromSuresh}</div>
                    <div style={{fontSize:'0.85rem'}}>C: ₹{trip.advanceFromCompany}</div>
                  </td>
                  <td><span style={{fontWeight:800}}>{trip.totalKm}</span></td>
                  <td>₹{trip.dieselExpense}</td>
                  <td>₹{trip.maintenanceExpense}</td>
                  <td>₹{trip.otherExpense}</td>
                  <td>₹{trip.driverBatta}</td>
                  <td style={{color:'#3b82f6', fontWeight:900}}>₹{trip.goodsRent}</td>
                  <td style={{color:'#22c55e', fontWeight:900}}>₹{trip.profitAmount}</td>
                  <td>
                    <div style={{fontSize:'0.75rem', color:'#64748b', maxWidth:'150px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}} title={trip.note}>
                      {trip.note || '-'}
                    </div>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn view" onClick={() => setViewingTrip(trip)} title="View Full Details"><Eye size={16} /></button>
                      <button className="icon-btn" onClick={() => openEdit(trip)} title="Edit"><Edit size={16} /></button>
                      <button className="icon-btn delete" onClick={() => handleDelete(trip.id)} title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTrips.length === 0 && (
                <tr>
                  <td colSpan="13" style={{textAlign:'center', padding:'4rem', color:'#64748b'}}>
                    No matching trip records found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Detail Modal */}
      {viewingTrip && (
        <div className="detail-overlay" onClick={() => setViewingTrip(null)}>
          <div className="detail-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setViewingTrip(null)}><X size={24} /></button>
            <div style={{marginBottom:'3rem'}}>
              <div style={{display:'flex', alignItems:'center', gap:'1rem', marginBottom:'0.5rem'}}>
                <span className={`trip-badge ${viewingTrip.tripStatus === 'Completed' ? 'tb-completed' : 'tb-active'}`}>{viewingTrip.tripStatus}</span>
                <span style={{fontSize:'0.9rem', color:'#94a3b8', fontWeight:800}}>TRIP ID: {viewingTrip.id}</span>
              </div>
              <h2 style={{fontSize:'2.4rem', fontWeight:900, color:'#0f172a'}}>Full Trip Details</h2>
              <p style={{color:'#64748b', fontWeight:600}}>Complete breakdown of journey, expenses and profit</p>
            </div>

            <div className="detail-grid">
              <div className="detail-section-title"><Navigation size={18}/> Journey & Driver</div>
              <div className="detail-item">
                <span className="detail-label">Date</span>
                <div className="detail-value">{viewingTrip.date}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Driver Name</span>
                <div className="detail-value">{viewingTrip.driverName}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Vehicle Number</span>
                <div className="detail-value">{viewingTrip.vehicleNumber}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Client / Company</span>
                <div className="detail-value">{viewingTrip.companyClientName}</div>
              </div>
              <div className="detail-item span-2">
                <span className="detail-label">Route</span>
                <div className="detail-value highlight">{viewingTrip.fromLocation} → {viewingTrip.toLocation}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Start KM</span>
                <div className="detail-value">{viewingTrip.startKm}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">End KM</span>
                <div className="detail-value">{viewingTrip.endKm}</div>
              </div>

              <div className="detail-section-title"><TrendingUp size={18}/> Performance & Rent</div>
              <div className="detail-item">
                <span className="detail-label">Total Distance</span>
                <div className="detail-value" style={{color:'#3b82f6'}}>{viewingTrip.totalKm} KM</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Goods Rent</span>
                <div className="detail-value" style={{color:'#0f172a'}}>₹{viewingTrip.goodsRent}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Total Advance</span>
                <div className="detail-value">₹{viewingTrip.totalAdvance}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Net Profit</span>
                <div className="detail-value" style={{color:'#22c55e', fontSize:'1.4rem'}}>₹{viewingTrip.profitAmount}</div>
              </div>

              <div className="detail-section-title"><Receipt size={18}/> Expense Breakdown</div>
              <div className="detail-item">
                <span className="detail-label">Diesel</span>
                <div className="detail-value">₹{viewingTrip.dieselExpense}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Maintenance</span>
                <div className="detail-value">₹{viewingTrip.maintenanceExpense}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tolls</span>
                <div className="detail-value">₹{viewingTrip.tollExpense}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Parking</span>
                <div className="detail-value">₹{viewingTrip.parkingExpense}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Food</span>
                <div className="detail-value">₹{viewingTrip.foodExpense}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Driver Batta</span>
                <div className="detail-value">₹{viewingTrip.driverBatta}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Other Exp.</span>
                <div className="detail-value">₹{viewingTrip.otherExpense}</div>
              </div>
              <div className="detail-item" style={{background:'#fef2f2'}}>
                <span className="detail-label" style={{color:'#991b1b'}}>Total Expense</span>
                <div className="detail-value" style={{color:'#991b1b'}}>₹{viewingTrip.totalExpense}</div>
              </div>

              <div className="detail-section-title"><CheckCircle size={18}/> Status & Payments</div>
              <div className="detail-item">
                <span className="detail-label">Payment Status</span>
                <div className="detail-value">{viewingTrip.paymentStatus}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Payment Mode</span>
                <div className="detail-value">{viewingTrip.paymentMode}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Balance Amount</span>
                <div className="detail-value" style={{color:'#f59e0b'}}>₹{viewingTrip.balanceAmount}</div>
              </div>
              <div className="detail-item span-4">
                <span className="detail-label">Notes</span>
                <div className="detail-value">{viewingTrip.note || 'No additional notes provided.'}</div>
              </div>
            </div>
            
            <div style={{marginTop:'3rem', display:'flex', gap:'1rem'}}>
              <button className="btn-save" onClick={() => { setViewingTrip(null); openEdit(viewingTrip); }}>Edit This Record</button>
              <button className="btn-save" style={{background:'#f1f5f9', color:'#64748b'}} onClick={() => setViewingTrip(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="form-overlay">
          <div className="form-card animate-fade-in">
            <button className="close-btn" onClick={() => setShowForm(false)}><X size={24} /></button>
            <div style={{marginBottom:'2.5rem'}}>
              <h2 style={{fontSize:'2rem', fontWeight:900, color:'#0f172a'}}>{editingTrip ? 'Update Trip Log' : 'Log New Trip'}</h2>
              <p style={{color:'#64748b', fontWeight:600, marginTop:'0.3rem'}}>Enter comprehensive trip, expense, and payment details</p>
            </div>
            
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-section-title"><Navigation size={18}/> Journey Details</div>
              <div className="form-group">
                <label>Trip ID</label>
                <input type="text" name="tripId" defaultValue={editingTrip?.id} placeholder="T-XXXX" />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" name="date" defaultValue={editingTrip?.date || new Date().toISOString().split('T')[0]} required />
              </div>
              <div className="form-group">
                <label>Driver Name</label>
                <input type="text" name="driverName" defaultValue={editingTrip?.driverName} required />
              </div>
              <div className="form-group">
                <label>Vehicle Number</label>
                <input type="text" name="vehicleNumber" defaultValue={editingTrip?.vehicleNumber} required />
              </div>
              <div className="form-group span-2">
                <label>Company / Client Name</label>
                <input type="text" name="companyClientName" defaultValue={editingTrip?.companyClientName} required />
              </div>
              <div className="form-group">
                <label>From Location</label>
                <input type="text" name="fromLocation" defaultValue={editingTrip?.fromLocation} required />
              </div>
              <div className="form-group">
                <label>To Location</label>
                <input type="text" name="toLocation" defaultValue={editingTrip?.toLocation} required />
              </div>

              <div className="form-section-title"><TrendingUp size={18}/> KM & Rent</div>
              <div className="form-group">
                <label>Start KM</label>
                <input type="number" name="startKm" defaultValue={editingTrip?.startKm} required />
              </div>
              <div className="form-group">
                <label>End KM</label>
                <input type="number" name="endKm" defaultValue={editingTrip?.endKm} required />
              </div>
              <div className="form-group span-2">
                <label><DollarSign size={16}/> Goods Rent (Total Bill)</label>
                <input type="number" name="goodsRent" defaultValue={editingTrip?.goodsRent} required />
              </div>

              <div className="form-section-title"><Wallet size={18}/> Advances Received</div>
              <div className="form-group span-2">
                <label>Advance from Suresh</label>
                <input type="number" name="advanceFromSuresh" defaultValue={editingTrip?.advanceFromSuresh || 0} />
              </div>
              <div className="form-group span-2">
                <label>Advance from Company</label>
                <input type="number" name="advanceFromCompany" defaultValue={editingTrip?.advanceFromCompany || 0} />
              </div>

              <div className="form-section-title"><Receipt size={18}/> Trip Expenses</div>
              <div className="form-group">
                <label>Diesel Expense</label>
                <input type="number" name="dieselExpense" defaultValue={editingTrip?.dieselExpense || 0} />
              </div>
              <div className="form-group">
                <label>Maintenance</label>
                <input type="number" name="maintenanceExpense" defaultValue={editingTrip?.maintenanceExpense || 0} />
              </div>
              <div className="form-group">
                <label>Toll Charges</label>
                <input type="number" name="tollExpense" defaultValue={editingTrip?.tollExpense || 0} />
              </div>
              <div className="form-group">
                <label>Parking Fees</label>
                <input type="number" name="parkingExpense" defaultValue={editingTrip?.parkingExpense || 0} />
              </div>
              <div className="form-group">
                <label>Food Expense</label>
                <input type="number" name="foodExpense" defaultValue={editingTrip?.foodExpense || 0} />
              </div>
              <div className="form-group">
                <label>Driver Batta</label>
                <input type="number" name="driverBatta" defaultValue={editingTrip?.driverBatta || 0} />
              </div>
              <div className="form-group span-2">
                <label>Other Expenses</label>
                <input type="number" name="otherExpense" defaultValue={editingTrip?.otherExpense || 0} />
              </div>

              <div className="form-section-title"><CheckCircle size={18}/> Status & Payments</div>
              <div className="form-group">
                <label>Payment Status</label>
                <select name="paymentStatus" defaultValue={editingTrip?.paymentStatus || 'Pending'}>
                  <option value="Paid">Fully Paid</option>
                  <option value="Partial">Partially Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="form-group">
                <label>Payment Mode</label>
                <select name="paymentMode" defaultValue={editingTrip?.paymentMode || 'Cash'}>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="UPI">UPI / Digital</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>
              <div className="form-group">
                <label>Trip Status</label>
                <select name="tripStatus" defaultValue={editingTrip?.tripStatus || 'Completed'}>
                  <option value="Completed">Completed</option>
                  <option value="Active">On Progress</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="form-group">
                <label>Note</label>
                <input type="text" name="note" defaultValue={editingTrip?.note} placeholder="Optional trip notes" />
              </div>

              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Calculating & Saving...' : (editingTrip ? 'Update Trip Record' : 'Log Trip & Calculate Profit')}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default TripManager
