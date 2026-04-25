import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Truck, 
  Plus, 
  Edit,
  Trash2,
  X,
  Car,
  Tag,
  Users,
  DollarSign,
  Fuel,
  Briefcase,
  Save,
  Calendar,
  AlertCircle,
  Activity,
  ClipboardList,
  Eye,
  CheckCircle,
  Search,
  Filter,
  Download
} from 'lucide-react'

function VehicleManager() {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fleet, setFleet] = useState([])
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [viewingVehicle, setViewingVehicle] = useState(null)

  // Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    const savedFleet = JSON.parse(localStorage.getItem('myVehicles') || '[]')
    const defaults = [
      { 
        id: 'V-001', 
        name: 'Innova Crysta', 
        plate: 'KL-01-AB-1234', 
        type: 'SUV', 
        brand: 'Toyota',
        model: '2022',
        fuelType: 'Diesel',
        capacity: '7', 
        currentKm: '45000',
        insuranceExpiryDate: '2024-12-15',
        pollutionExpiryDate: '2024-08-20',
        permitExpiryDate: '2025-05-10',
        fitnessExpiryDate: '2026-02-28',
        assignedDriver: 'Rahul Krishnan',
        status: 'Active',
        notes: 'Well maintained'
      },
      { 
        id: 'V-002', 
        name: 'Winger', 
        plate: 'KL-07-CD-5678', 
        type: 'Van', 
        brand: 'Tata',
        model: '2021',
        fuelType: 'Diesel',
        capacity: '12', 
        currentKm: '82000',
        insuranceExpiryDate: '2024-06-10',
        pollutionExpiryDate: '2024-06-10',
        permitExpiryDate: '2024-11-20',
        fitnessExpiryDate: '2025-01-15',
        assignedDriver: 'Suresh Mani',
        status: 'On Trip',
        notes: ''
      },
      { 
        id: 'V-003', 
        name: 'Traveller', 
        plate: 'KL-11-EF-9012', 
        type: 'Van', 
        brand: 'Force',
        model: '2023',
        fuelType: 'Diesel',
        capacity: '17', 
        currentKm: '25000',
        insuranceExpiryDate: '2025-01-20',
        pollutionExpiryDate: '2025-01-20',
        permitExpiryDate: '2026-04-15',
        fitnessExpiryDate: '2027-10-30',
        assignedDriver: 'Abhijith P.S.',
        status: 'Active',
        notes: 'New vehicle'
      },
      { 
        id: 'V-004', 
        name: 'Ertiga', 
        plate: 'KL-13-GH-3456', 
        type: 'SUV', 
        brand: 'Maruti Suzuki',
        model: '2022',
        fuelType: 'Petrol',
        capacity: '7', 
        currentKm: '38000',
        insuranceExpiryDate: '2024-11-05',
        pollutionExpiryDate: '2024-05-05',
        permitExpiryDate: '2025-02-12',
        fitnessExpiryDate: '2026-09-18',
        assignedDriver: 'Mohammed Fasil',
        status: 'Maintenance',
        notes: 'Oil change due'
      },
      { 
        id: 'V-005', 
        name: 'Dzire', 
        plate: 'KL-05-IJ-7890', 
        type: 'Sedan', 
        brand: 'Maruti Suzuki',
        model: '2020',
        fuelType: 'Petrol',
        capacity: '5', 
        currentKm: '65000',
        insuranceExpiryDate: '2024-09-15',
        pollutionExpiryDate: '2024-09-15',
        permitExpiryDate: '2025-08-10',
        fitnessExpiryDate: '2025-12-25',
        assignedDriver: 'Vineeth Kumar',
        status: 'Active',
        notes: ''
      }
    ]
    setFleet(savedFleet.length > 0 ? savedFleet : defaults)
  }, [])

  const filteredFleet = fleet.filter(vehicle => {
    const matchesSearch = 
      vehicle.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      vehicle.plate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.assignedDriver?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? vehicle.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  })

  const openEdit = (v) => {
    setEditingVehicle(v)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this vehicle?')) {
      const existing = JSON.parse(localStorage.getItem('myVehicles') || '[]')
      const updated = existing.filter(v => v.id !== id)
      localStorage.setItem('myVehicles', JSON.stringify(updated))
      setFleet(updated)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    const vehicleData = {
      id: editingVehicle ? editingVehicle.id : (formData.get('vehicleId') || 'V-' + Date.now().toString().slice(-4)),
      name: formData.get('vehicleName'),
      plate: formData.get('vehicleNumber'),
      type: formData.get('vehicleType'),
      brand: formData.get('brand'),
      model: formData.get('model'),
      fuelType: formData.get('fuelType'),
      capacity: formData.get('capacity'),
      currentKm: formData.get('currentKm'),
      insuranceExpiryDate: formData.get('insuranceExpiryDate'),
      pollutionExpiryDate: formData.get('pollutionExpiryDate'),
      permitExpiryDate: formData.get('permitExpiryDate'),
      fitnessExpiryDate: formData.get('fitnessExpiryDate'),
      assignedDriver: formData.get('assignedDriver'),
      status: formData.get('status') || (editingVehicle ? editingVehicle.status : 'Active'),
      notes: formData.get('notes')
    }

    const existing = JSON.parse(localStorage.getItem('myVehicles') || '[]')
    let updated
    if (editingVehicle) {
      updated = existing.map(v => v.id === editingVehicle.id ? vehicleData : v)
    } else {
      updated = [vehicleData, ...existing]
    }
    
    localStorage.setItem('myVehicles', JSON.stringify(updated))

    setTimeout(() => {
      setLoading(false)
      setShowForm(false)
      setEditingVehicle(null)
      setFleet(updated)
      alert(editingVehicle ? 'Vehicle Updated!' : 'Vehicle Added!')
    }, 800)
  }

  const handleExport = () => {
    const headers = ['Plate', 'Name', 'Brand', 'Type', 'Fuel', 'Capacity', 'Insurance Exp', 'Permit Exp', 'Pollution Exp', 'Current KM', 'Driver', 'Status'];
    const rows = filteredFleet.map(v => [
      v.plate,
      v.name,
      v.brand,
      v.type,
      v.fuelType,
      v.capacity,
      v.insuranceExpiryDate,
      v.permitExpiryDate,
      v.pollutionExpiryDate,
      v.currentKm,
      v.assignedDriver,
      v.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Fleet_Report_${new Date().toISOString().slice(0,10)}.csv`);
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
        
        .btn-add { background: #22c55e; color: #fff; padding: 0.9rem 1.8rem; border-radius: 14px; font-weight: 800; display: flex; align-items: center; gap: 0.6rem; border: none; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2); }
        .btn-add:hover { transform: translateY(-3px); box-shadow: 0 12px 24px rgba(34, 197, 94, 0.3); background: #16a34a; }

        .table-card { background: #fff; border-radius: 28px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
        .m-table { width: 100%; border-collapse: collapse; text-align: left; }
        .m-table th { background: #f8fafc; padding: 1.5rem; font-size: 0.8rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #f1f5f9; }
        .m-table td { padding: 1.5rem; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #1e293b; }
        .m-table tr:hover td { background: #fcfdfe; }
        
        .action-btns { display: flex; gap: 0.75rem; }
        .action-btns { display: flex; gap: 0.75rem; }
        .icon-btn { width: 38px; height: 38px; border-radius: 12px; border: 1px solid #e2e8f0; display: grid; place-items: center; cursor: pointer; transition: all 0.2s; background: #fff; color: #64748b; }
        .icon-btn:hover { border-color: #0f172a; color: #0f172a; background: #f8fafc; transform: scale(1.05); }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
        .icon-btn.view:hover { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }

        .form-overlay, .detail-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(12px); display: grid; place-items: center; z-index: 1000; padding: 2rem; }
        .form-card, .detail-card { background: #fff; border-radius: 36px; width: 100%; max-width: 1000px; padding: 4rem; position: relative; max-height: 92vh; overflow-y: auto; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
        .close-btn { position: absolute; top: 2.5rem; right: 2.5rem; background: #f1f5f9; border: none; width: 44px; height: 44px; border-radius: 50%; font-weight: 900; cursor: pointer; display: grid; place-items: center; transition: 0.2s; }
        .close-btn:hover { background: #e2e8f0; transform: rotate(90deg); }

        .form-grid, .detail-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .form-section-title, .detail-section-title { grid-column: span 3; font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 1.5rem 0 0.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid #f1f5f9; display: flex; align-items: center; gap: 0.5rem; }
        
        .detail-item { background: #f8fafc; padding: 1.2rem; border-radius: 16px; border: 1px solid #f1f5f9; }
        .detail-label { font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 0.4rem; display: block; }
        .detail-value { font-size: 1.05rem; font-weight: 800; color: #1e293b; }
        .detail-item.full { grid-column: span 3; }

        .status-badge { padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.02em; }
        .st-active { background: #dcfce7; color: #166534; }
        .st-ontrip { background: #e0f2fe; color: #0369a1; }
        .st-maintenance { background: #fef3c7; color: #92400e; }

        .form-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(12px); display: grid; place-items: center; z-index: 1000; padding: 2rem; }
        .form-card { background: #fff; border-radius: 36px; width: 100%; max-width: 950px; padding: 4rem; position: relative; max-height: 92vh; overflow-y: auto; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
        .close-btn { position: absolute; top: 2.5rem; right: 2.5rem; background: #f1f5f9; border: none; width: 44px; height: 44px; border-radius: 50%; font-weight: 900; cursor: pointer; display: grid; place-items: center; transition: 0.2s; }
        .close-btn:hover { background: #e2e8f0; transform: rotate(90deg); }

        .form-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .form-section-title { grid-column: span 3; font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 1.5rem 0 0.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid #f1f5f9; display: flex; align-items: center; gap: 0.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.6rem; }
        .form-group.full { grid-column: span 3; }
        .form-group.span-2 { grid-column: span 2; }
        .form-group label { font-size: 0.85rem; font-weight: 800; color: #475569; display: flex; align-items: center; gap: 0.4rem; }
        .form-group input, .form-group select, .form-group textarea { padding: 1.1rem 1.4rem; border-radius: 14px; border: 2px solid #f1f5f9; font-weight: 700; outline: none; transition: 0.2s; font-family: inherit; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #22c55e; box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1); }

        .btn-save { grid-column: span 3; background: #0f172a; color: #fff; padding: 1.4rem; border-radius: 18px; font-weight: 900; margin-top: 2rem; cursor: pointer; border: none; font-size: 1.1rem; letter-spacing: 0.02em; transition: 0.3s; }
        .btn-save:hover { background: #1e293b; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(15, 23, 42, 0.2); }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0, 0, 0.2, 1); }

        .filter-bar { background: #fff; padding: 1.5rem; border-radius: 20px; border: 1px solid #e2e8f0; margin-bottom: 2rem; display: flex; gap: 1.5rem; align-items: flex-end; flex-wrap: wrap; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .filter-group { display: flex; flex-direction: column; gap: 0.5rem; flex: 1; min-width: 250px; }
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
            <h1>Fleet Inventory</h1>
            <p style={{color:'#64748b', fontWeight:600, marginTop:'0.4rem'}}>Manage and monitor your vehicle assets</p>
          </div>
          <button className="btn-add" onClick={() => { setEditingVehicle(null); setShowForm(true); }}>
            <Plus size={22} /> Add New Vehicle
          </button>
        </header>

        <div className="filter-bar">
          <div className="filter-group">
            <label><Search size={14} /> Search Fleet</label>
            <div className="filter-input-wrap">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Name, plate or driver..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="filter-group">
            <label><Filter size={14} /> Vehicle Status</label>
            <div className="filter-input-wrap">
              <Filter size={18} />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="On Trip">On Trip</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          <button className="btn-clear" onClick={() => { setSearchTerm(''); setStatusFilter(''); }}>Clear</button>
          <button className="btn-download" onClick={handleExport}><Download size={18} /> Export CSV</button>
        </div>

        <div className="table-card">
          <table className="m-table">
            <thead>
              <tr>
                <th>Vehicle No (Plate)</th>
                <th>Model / Brand</th>
                <th>Fuel</th>
                <th>Cap.</th>
                <th>Insurance Exp.</th>
                <th>Permit Exp.</th>
                <th>Pollution Exp.</th>
                <th>STR. KM</th>
                <th>END. KM (Current)</th>
                <th>Assigned Driver</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFleet.map(v => (
                <tr key={v.id}>
                  <td><span style={{background:'#f8fafc', padding:'0.4rem 0.6rem', borderRadius:'6px', border:'1px solid #e2e8f0', fontFamily:'monospace', fontWeight:800}}>{v.plate}</span></td>
                  <td>
                    <div style={{fontWeight:800}}>{v.name}</div>
                    <div style={{fontSize:'0.75rem', color:'#64748b'}}>{v.brand}</div>
                  </td>
                  <td><span style={{fontSize:'0.85rem', color:'#64748b'}}>{v.fuelType}</span></td>
                  <td><span style={{fontSize:'0.85rem', fontWeight:700}}>{v.capacity}</span></td>
                  <td><span style={{fontSize:'0.85rem', color: new Date(v.insuranceExpiryDate) < new Date() ? '#ef4444' : 'inherit'}}>{v.insuranceExpiryDate}</span></td>
                  <td><span style={{fontSize:'0.85rem', color: new Date(v.permitExpiryDate) < new Date() ? '#ef4444' : 'inherit'}}>{v.permitExpiryDate}</span></td>
                  <td><span style={{fontSize:'0.85rem', color: new Date(v.pollutionExpiryDate) < new Date() ? '#ef4444' : 'inherit'}}>{v.pollutionExpiryDate}</span></td>
                  <td>{parseInt(v.currentKm) - 500}</td> {/* Sample Start KM */}
                  <td><span style={{fontWeight:800}}>{v.currentKm}</span></td>
                  <td>{v.assignedDriver || 'Unassigned'}</td>
                  <td>
                    <span className={`status-badge ${v.status === 'Active' ? 'st-active' : v.status === 'On Trip' ? 'st-ontrip' : 'st-maintenance'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn view" onClick={() => setViewingVehicle(v)} title="View Details"><Eye size={18} /></button>
                      <button className="icon-btn" onClick={() => openEdit(v)} title="Edit"><Edit size={18} /></button>
                      <button className="icon-btn delete" onClick={() => handleDelete(v.id)} title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredFleet.length === 0 && (
                <tr>
                  <td colSpan="14" style={{textAlign:'center', padding:'4rem', color:'#64748b'}}>
                    No matching vehicles found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Detail Modal */}
      {viewingVehicle && (
        <div className="detail-overlay" onClick={() => setViewingVehicle(null)}>
          <div className="detail-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setViewingVehicle(null)}><X size={24} /></button>
            <div style={{marginBottom:'3rem'}}>
              <div style={{display:'flex', alignItems:'center', gap:'1rem', marginBottom:'0.5rem'}}>
                <span className={`status-badge ${viewingVehicle.status === 'Active' ? 'st-active' : 'st-ontrip'}`}>{viewingVehicle.status}</span>
                <span style={{fontSize:'0.9rem', color:'#94a3b8', fontWeight:800}}>VEHICLE ID: {viewingVehicle.id}</span>
              </div>
              <h2 style={{fontSize:'2.4rem', fontWeight:900, color:'#0f172a'}}>{viewingVehicle.name}</h2>
              <p style={{color:'#64748b', fontWeight:600}}>{viewingVehicle.brand} • {viewingVehicle.type}</p>
            </div>

            <div className="detail-grid">
              <div className="detail-section-title"><Car size={18}/> Technical Specifications</div>
              <div className="detail-item">
                <span className="detail-label">Plate Number</span>
                <div className="detail-value">{viewingVehicle.plate}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Brand / Make</span>
                <div className="detail-value">{viewingVehicle.brand}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Model Year</span>
                <div className="detail-value">{viewingVehicle.model}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Vehicle Type</span>
                <div className="detail-value">{viewingVehicle.type}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Fuel Type</span>
                <div className="detail-value">{viewingVehicle.fuelType}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Seating Capacity</span>
                <div className="detail-value">{viewingVehicle.capacity} Persons</div>
              </div>

              <div className="detail-section-title"><Calendar size={18}/> Document Expiry Dates</div>
              <div className="detail-item">
                <span className="detail-label">Insurance Exp.</span>
                <div className="detail-value">{viewingVehicle.insuranceExpiryDate}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Pollution (PUC)</span>
                <div className="detail-value">{viewingVehicle.pollutionExpiryDate}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Permit Exp.</span>
                <div className="detail-value">{viewingVehicle.permitExpiryDate}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Fitness Exp.</span>
                <div className="detail-value">{viewingVehicle.fitnessExpiryDate}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Current Odometer</span>
                <div className="detail-value" style={{color:'#3b82f6'}}>{viewingVehicle.currentKm} KM</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Assigned Driver</span>
                <div className="detail-value">{viewingVehicle.assignedDriver || 'None'}</div>
              </div>

              <div className="detail-section-title"><ClipboardList size={18}/> Additional Information</div>
              <div className="detail-item full">
                <span className="detail-label">Internal Notes</span>
                <div className="detail-value">{viewingVehicle.notes || 'No maintenance notes available.'}</div>
              </div>
            </div>
            
            <div style={{marginTop:'3rem', display:'flex', gap:'1rem'}}>
              <button className="btn-save" onClick={() => { setViewingVehicle(null); openEdit(viewingVehicle); }}>Edit Vehicle</button>
              <button className="btn-save" style={{background:'#f1f5f9', color:'#64748b'}} onClick={() => setViewingVehicle(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="form-overlay">
          <div className="form-card animate-fade-in">
            <button className="close-btn" onClick={() => setShowForm(false)}><X size={24} /></button>
            <div style={{marginBottom:'2.5rem'}}>
              <h2 style={{fontSize:'2rem', fontWeight:900, color:'#0f172a'}}>{editingVehicle ? 'Update Vehicle' : 'Onboard Vehicle'}</h2>
              <p style={{color:'#64748b', fontWeight:600, marginTop:'0.3rem'}}>Enter technical and document details for the vehicle</p>
            </div>
            
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-section-title"><Car size={18}/> General Specifications</div>
              <div className="form-group">
                <label>Vehicle ID</label>
                <input type="text" name="vehicleId" defaultValue={editingVehicle?.id} placeholder="Auto-generated if blank" />
              </div>
              <div className="form-group">
                <label>Plate Number</label>
                <input type="text" name="vehicleNumber" defaultValue={editingVehicle?.plate} required placeholder="KL-XX-XXXX" />
              </div>
              <div className="form-group">
                <label>Vehicle Model Name</label>
                <input type="text" name="vehicleName" defaultValue={editingVehicle?.name} required placeholder="e.g. Innova Crysta" />
              </div>
              <div className="form-group">
                <label>Brand</label>
                <input type="text" name="brand" defaultValue={editingVehicle?.brand} placeholder="e.g. Toyota" />
              </div>
              <div className="form-group">
                <label>Year / Model</label>
                <input type="text" name="model" defaultValue={editingVehicle?.model} placeholder="e.g. 2022" />
              </div>
              <div className="form-group">
                <label>Vehicle Type</label>
                <select name="vehicleType" defaultValue={editingVehicle?.type || 'SUV'}>
                  <option value="SUV">SUV / MUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Van">Mini Van / Traveller</option>
                  <option value="Bus">Bus</option>
                </select>
              </div>
              <div className="form-group">
                <label><Fuel size={16}/> Fuel Type</label>
                <select name="fuelType" defaultValue={editingVehicle?.fuelType || 'Diesel'}>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric</option>
                  <option value="CNG">CNG</option>
                </select>
              </div>
              <div className="form-group">
                <label><Users size={16}/> Seating Capacity</label>
                <input type="number" name="capacity" defaultValue={editingVehicle?.capacity} required />
              </div>
              <div className="form-group">
                <label><Activity size={16}/> Current KM Reading</label>
                <input type="number" name="currentKm" defaultValue={editingVehicle?.currentKm} required />
              </div>

              <div className="form-section-title"><Calendar size={18}/> Document Expiry Dates</div>
              <div className="form-group">
                <label>Insurance Expiry</label>
                <input type="date" name="insuranceExpiryDate" defaultValue={editingVehicle?.insuranceExpiryDate} required />
              </div>
              <div className="form-group">
                <label>Pollution Expiry (PUC)</label>
                <input type="date" name="pollutionExpiryDate" defaultValue={editingVehicle?.pollutionExpiryDate} required />
              </div>
              <div className="form-group">
                <label>Permit Expiry</label>
                <input type="date" name="permitExpiryDate" defaultValue={editingVehicle?.permitExpiryDate} required />
              </div>
              <div className="form-group">
                <label>Fitness Expiry</label>
                <input type="date" name="fitnessExpiryDate" defaultValue={editingVehicle?.fitnessExpiryDate} required />
              </div>
              <div className="form-group">
                <label>Assigned Driver</label>
                <input type="text" name="assignedDriver" defaultValue={editingVehicle?.assignedDriver} placeholder="Name of primary driver" />
              </div>
              <div className="form-group">
                <label>Current Status</label>
                <select name="status" defaultValue={editingVehicle?.status || 'Active'}>
                  <option value="Active">Available / Active</option>
                  <option value="On Trip">On Active Trip</option>
                  <option value="Maintenance">Under Maintenance</option>
                  <option value="Inactive">Out of Service</option>
                </select>
              </div>

              <div className="form-section-title"><ClipboardList size={18}/> Additional Details</div>
              <div className="form-group full">
                <textarea name="notes" defaultValue={editingVehicle?.notes} placeholder="Notes on condition, service history, or special features..." style={{minHeight:'100px', padding:'1.1rem', borderRadius:'14px', border:'2px solid #f1f5f9', fontWeight:700, fontFamily:'inherit'}}></textarea>
              </div>

              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Processing...' : (editingVehicle ? 'Update Vehicle Record' : 'Add Vehicle to Fleet')}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default VehicleManager
