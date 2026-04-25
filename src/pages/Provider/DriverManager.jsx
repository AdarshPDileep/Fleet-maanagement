import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  User, 
  Plus, 
  ArrowLeft,
  Upload,
  MoreVertical,
  Edit,
  Trash2,
  X,
  Phone,
  Calendar,
  MapPin,
  FileText,
  Clock,
  DollarSign,
  Eye,
  CheckCircle
} from 'lucide-react'

function DriverManager() {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [drivers, setDrivers] = useState([])
  const [editingDriver, setEditingDriver] = useState(null)
  const [viewingDriver, setViewingDriver] = useState(null)

  useEffect(() => {
    const savedDrivers = JSON.parse(localStorage.getItem('myDrivers') || '[]')
    const defaults = [
      { 
        id: 'D-001', 
        name: 'Rahul Krishnan', 
        phone: '+91 98450 12345', 
        alternateNumber: '+91 98450 55555',
        license: 'KL01 20200012', 
        licenseExpiryDate: '2028-12-31',
        address: '123, Green Villa, Trivandrum',
        driverType: 'Full-time',
        dailyBatta: '500',
        joiningDate: '2023-01-15',
        status: 'Approved',
        notes: 'Experienced in long routes'
      },
      { 
        id: 'D-002', 
        name: 'Suresh Mani', 
        phone: '+91 98450 54321', 
        alternateNumber: '',
        license: 'KL07 20180045', 
        licenseExpiryDate: '2025-05-20',
        address: '45, Sea Side, Kochi',
        driverType: 'Contract',
        dailyBatta: '600',
        joiningDate: '2023-06-10',
        status: 'Approved',
        notes: ''
      },
      { 
        id: 'D-003', 
        name: 'Abhijith P.S.', 
        phone: '+91 90480 88776', 
        alternateNumber: '+91 90480 11223',
        license: 'KL11 20210098', 
        licenseExpiryDate: '2030-01-10',
        address: 'Near Temple, Kozhikode',
        driverType: 'Full-time',
        dailyBatta: '550',
        joiningDate: '2024-02-01',
        status: 'Approved',
        notes: 'Very punctual'
      },
      { 
        id: 'D-004', 
        name: 'Mohammed Fasil', 
        phone: '+91 88990 44332', 
        alternateNumber: '',
        license: 'KL13 20190023', 
        licenseExpiryDate: '2027-08-15',
        address: 'Fasil Manzil, Malappuram',
        driverType: 'Full-time',
        dailyBatta: '500',
        joiningDate: '2022-11-20',
        status: 'Active',
        notes: 'Expert in heavy vehicles'
      },
      { 
        id: 'D-005', 
        name: 'Vineeth Kumar', 
        phone: '+91 77665 55443', 
        alternateNumber: '+91 77665 11111',
        license: 'KL05 20220056', 
        licenseExpiryDate: '2032-04-30',
        address: 'Vineeth Bhavan, Kottayam',
        driverType: 'Contract',
        dailyBatta: '650',
        joiningDate: '2024-03-15',
        status: 'Pending',
        notes: 'New joinee'
      }
    ]
    setDrivers(savedDrivers.length > 0 ? savedDrivers : defaults)
  }, [])

  const openEdit = (driver) => {
    setEditingDriver(driver)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this driver?')) {
      const existing = JSON.parse(localStorage.getItem('myDrivers') || '[]')
      const updated = existing.filter(d => d.id !== id)
      localStorage.setItem('myDrivers', JSON.stringify(updated))
      setDrivers(updated)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    const driverData = {
      id: editingDriver ? editingDriver.id : (formData.get('driverId') || 'D-' + Date.now().toString().slice(-4)),
      name: formData.get('driverName'),
      phone: formData.get('phoneNumber'),
      alternateNumber: formData.get('alternateNumber'),
      license: formData.get('licenseNumber'),
      licenseExpiryDate: formData.get('licenseExpiryDate'),
      address: formData.get('address'),
      driverType: formData.get('driverType'),
      dailyBatta: formData.get('dailyBatta'),
      joiningDate: formData.get('joiningDate'),
      status: formData.get('status') || (editingDriver ? editingDriver.status : 'Active'),
      notes: formData.get('notes')
    }

    const existing = JSON.parse(localStorage.getItem('myDrivers') || '[]')
    let updated
    if (editingDriver) {
      updated = existing.map(d => d.id === editingDriver.id ? driverData : d)
    } else {
      updated = [driverData, ...existing]
    }
    
    localStorage.setItem('myDrivers', JSON.stringify(updated))

    setTimeout(() => {
      setLoading(false)
      setShowForm(false)
      setEditingDriver(null)
      setDrivers(updated)
      alert(editingDriver ? 'Driver Profile Updated!' : 'Driver Registered!')
    }, 800)
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
        
        .status-pill { padding: 0.5rem 1rem; border-radius: 99px; font-size: 0.75rem; font-weight: 800; display: inline-flex; align-items: center; gap: 0.4rem; }
        .s-approved { background: #dcfce7; color: #166534; }
        .s-pending { background: #fef9c3; color: #854d0e; }
        .s-inactive { background: #fee2e2; color: #991b1b; }

        .action-btns { display: flex; gap: 0.75rem; }
        .icon-btn { width: 38px; height: 38px; border-radius: 12px; border: 1px solid #e2e8f0; display: grid; place-items: center; cursor: pointer; transition: all 0.2s; background: #fff; color: #64748b; }
        .icon-btn:hover { border-color: #0f172a; color: #0f172a; background: #f8fafc; transform: scale(1.05); }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
        .icon-btn.view:hover { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }

        .form-overlay, .detail-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(12px); display: grid; place-items: center; z-index: 1000; padding: 2rem; }
        .form-card, .detail-card { background: #fff; border-radius: 36px; width: 100%; max-width: 900px; padding: 4rem; position: relative; max-height: 92vh; overflow-y: auto; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
        .close-btn { position: absolute; top: 2.5rem; right: 2.5rem; background: #f1f5f9; border: none; width: 44px; height: 44px; border-radius: 50%; font-weight: 900; cursor: pointer; display: grid; place-items: center; transition: 0.2s; }
        .close-btn:hover { background: #e2e8f0; transform: rotate(90deg); }

        .form-grid, .detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.75rem; }
        .form-section-title, .detail-section-title { grid-column: span 2; font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 1rem 0 0.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid #f1f5f9; display: flex; align-items: center; gap: 0.5rem; }
        
        .detail-item { background: #f8fafc; padding: 1.2rem; border-radius: 16px; border: 1px solid #f1f5f9; }
        .detail-label { font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 0.4rem; display: block; }
        .detail-value { font-size: 1.05rem; font-weight: 800; color: #1e293b; }
        .detail-item.full { grid-column: span 2; }
        .form-group { display: flex; flex-direction: column; gap: 0.6rem; }
        .form-group.full { grid-column: span 2; }
        .form-group label { font-size: 0.85rem; font-weight: 800; color: #475569; display: flex; align-items: center; gap: 0.4rem; }
        .form-group input, .form-group select, .form-group textarea { padding: 1.1rem 1.4rem; border-radius: 14px; border: 2px solid #f1f5f9; font-weight: 700; outline: none; transition: 0.2s; font-family: inherit; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #22c55e; box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1); }
        .form-group textarea { min-height: 100px; resize: vertical; }

        .btn-save { grid-column: span 2; background: #0f172a; color: #fff; padding: 1.4rem; border-radius: 18px; font-weight: 900; margin-top: 2rem; cursor: pointer; border: none; font-size: 1.1rem; letter-spacing: 0.02em; transition: 0.3s; }
        .btn-save:hover { background: #1e293b; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(15, 23, 42, 0.2); }
        .btn-save:disabled { opacity: 0.7; cursor: not-allowed; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0, 0, 0.2, 1); }
      `}</style>

      <div className="manager-container">
        <header className="m-header">
          <div>
            <h1>Driver Network</h1>
            <p style={{color:'#64748b', fontWeight:600, marginTop:'0.4rem'}}>Manage your professional driving staff</p>
          </div>
          <button className="btn-add" onClick={() => { setEditingDriver(null); setShowForm(true); }}>
            <Plus size={22} /> Add New Driver
          </button>
        </header>

        <div className="table-card">
          <table className="m-table">
            <thead>
              <tr>
                <th>Driver Name</th>
                <th>Phone Number</th>
                <th>Alt. Phone</th>
                <th>License No</th>
                <th>License Exp.</th>
                <th>Joining Date</th>
                <th>Type</th>
                <th>Batta</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map(driver => (
                <tr key={driver.id}>
                  <td>
                    <div style={{display:'flex', alignItems:'center', gap:'0.8rem'}}>
                      <div style={{width:40, height:40, borderRadius:'12px', background:'#f1f5f9', display:'grid', placeItems:'center', color:'#64748b'}}>
                        <User size={20} />
                      </div>
                      <div style={{fontWeight:800, fontSize:'1.05rem'}}>{driver.name}</div>
                    </div>
                  </td>
                  <td>{driver.phone}</td>
                  <td>{driver.alternateNumber || '-'}</td>
                  <td>{driver.license}</td>
                  <td><span style={{color: new Date(driver.licenseExpiryDate) < new Date() ? '#ef4444' : 'inherit'}}>{driver.licenseExpiryDate}</span></td>
                  <td>{driver.joiningDate}</td>
                  <td><span style={{fontSize:'0.85rem', color:'#64748b'}}>{driver.driverType}</span></td>
                  <td>₹{driver.dailyBatta}</td>
                  <td>
                    <span className={`status-pill ${
                      driver.status === 'Approved' || driver.status === 'Active' ? 's-approved' : 
                      driver.status === 'Pending' ? 's-pending' : 's-inactive'
                    }`}>
                      {driver.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn view" onClick={() => setViewingDriver(driver)} title="View Profile"><Eye size={18} /></button>
                      <button className="icon-btn" onClick={() => openEdit(driver)} title="Edit"><Edit size={18} /></button>
                      <button className="icon-btn delete" onClick={() => handleDelete(driver.id)} title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {drivers.length === 0 && (
                <tr>
                  <td colSpan="10" style={{textAlign:'center', padding:'4rem', color:'#64748b'}}>
                    No drivers found. Register your first driver to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Detail Modal */}
      {viewingDriver && (
        <div className="detail-overlay" onClick={() => setViewingDriver(null)}>
          <div className="detail-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setViewingDriver(null)}><X size={24} /></button>
            <div style={{marginBottom:'3rem'}}>
              <div style={{display:'flex', alignItems:'center', gap:'1rem', marginBottom:'0.5rem'}}>
                <span className={`status-pill ${viewingDriver.status === 'Approved' || viewingDriver.status === 'Active' ? 's-approved' : 's-pending'}`}>{viewingDriver.status}</span>
                <span style={{fontSize:'0.9rem', color:'#94a3b8', fontWeight:800}}>DRIVER ID: {viewingDriver.id}</span>
              </div>
              <h2 style={{fontSize:'2.4rem', fontWeight:900, color:'#0f172a'}}>{viewingDriver.name}</h2>
              <p style={{color:'#64748b', fontWeight:600}}>Professional Driver Profile</p>
            </div>

            <div className="detail-grid">
              <div className="detail-section-title"><User size={18}/> Personal & Contact</div>
              <div className="detail-item">
                <span className="detail-label">Full Name</span>
                <div className="detail-value">{viewingDriver.name}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone Number</span>
                <div className="detail-value">{viewingDriver.phone}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Alternate Number</span>
                <div className="detail-value">{viewingDriver.alternateNumber || 'N/A'}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Joining Date</span>
                <div className="detail-value">{viewingDriver.joiningDate}</div>
              </div>
              <div className="detail-item full">
                <span className="detail-label">Residential Address</span>
                <div className="detail-value">{viewingDriver.address || 'No address provided.'}</div>
              </div>

              <div className="detail-section-title"><FileText size={18}/> License & Employment</div>
              <div className="detail-item">
                <span className="detail-label">License Number</span>
                <div className="detail-value" style={{color:'#3b82f6'}}>{viewingDriver.license}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">License Expiry</span>
                <div className="detail-value" style={{color: new Date(viewingDriver.licenseExpiryDate) < new Date() ? '#ef4444' : '#1e293b'}}>
                  {viewingDriver.licenseExpiryDate}
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Driver Type</span>
                <div className="detail-value">{viewingDriver.driverType}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Daily Batta</span>
                <div className="detail-value">₹{viewingDriver.dailyBatta}</div>
              </div>
              
              <div className="detail-section-title"><CheckCircle size={18}/> Additional Notes</div>
              <div className="detail-item full">
                <span className="detail-label">Notes</span>
                <div className="detail-value">{viewingDriver.notes || 'No special notes.'}</div>
              </div>
            </div>
            
            <div style={{marginTop:'3rem', display:'flex', gap:'1rem'}}>
              <button className="btn-save" onClick={() => { setViewingDriver(null); openEdit(viewingDriver); }}>Edit Profile</button>
              <button className="btn-save" style={{background:'#f1f5f9', color:'#64748b'}} onClick={() => setViewingDriver(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="form-overlay">
          <div className="form-card animate-fade-in">
            <button className="close-btn" onClick={() => setShowForm(false)}><X size={24} /></button>
            <div style={{marginBottom:'2.5rem'}}>
              <h2 style={{fontSize:'2rem', fontWeight:900, color:'#0f172a'}}>{editingDriver ? 'Update Profile' : 'Register Driver'}</h2>
              <p style={{color:'#64748b', fontWeight:600, marginTop:'0.3rem'}}>Complete the driver profile information below</p>
            </div>
            
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-section-title"><User size={18}/> Basic Information</div>
              <div className="form-group">
                <label>Driver ID</label>
                <input type="text" name="driverId" defaultValue={editingDriver?.id} placeholder="Auto-generated if blank" />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="driverName" defaultValue={editingDriver?.name} required placeholder="Enter full name" />
              </div>
              
              <div className="form-section-title"><Phone size={18}/> Contact Details</div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phoneNumber" defaultValue={editingDriver?.phone} required placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="form-group">
                <label>Alternate Number</label>
                <input type="tel" name="alternateNumber" defaultValue={editingDriver?.alternateNumber} placeholder="Secondary contact" />
              </div>
              <div className="form-group full">
                <label><MapPin size={16}/> Residential Address</label>
                <textarea name="address" defaultValue={editingDriver?.address} placeholder="Enter full permanent address"></textarea>
              </div>

              <div className="form-section-title"><FileText size={18}/> License & Employment</div>
              <div className="form-group">
                <label>License Number</label>
                <input type="text" name="licenseNumber" defaultValue={editingDriver?.license} required placeholder="DL-XX-XXXXXXXX" />
              </div>
              <div className="form-group">
                <label>License Expiry</label>
                <input type="date" name="licenseExpiryDate" defaultValue={editingDriver?.licenseExpiryDate} required />
              </div>
              <div className="form-group">
                <label>Driver Type</label>
                <select name="driverType" defaultValue={editingDriver?.driverType || 'Full-time'}>
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract / Temporary</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              <div className="form-group">
                <label>Joining Date</label>
                <input type="date" name="joiningDate" defaultValue={editingDriver?.joiningDate || new Date().toISOString().split('T')[0]} />
              </div>
              <div className="form-group">
                <label><DollarSign size={16}/> Daily Batta (₹)</label>
                <input type="number" name="dailyBatta" defaultValue={editingDriver?.dailyBatta || '500'} required />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" defaultValue={editingDriver?.status || 'Active'}>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending Verification</option>
                  <option value="Inactive">Inactive / On Leave</option>
                </select>
              </div>

              <div className="form-section-title"><FileText size={18}/> Additional Notes</div>
              <div className="form-group full">
                <textarea name="notes" defaultValue={editingDriver?.notes} placeholder="Any specific skills, medical info, or behavioral notes..."></textarea>
              </div>

              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Processing...' : (editingDriver ? 'Save Profile Changes' : 'Register New Driver')}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default DriverManager
