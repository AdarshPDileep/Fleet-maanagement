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
  CheckCircle,
  Search,
  Filter,
  Download
} from 'lucide-react'
import { downloadCsv, exportRowsToPdf } from '../../utils/exportUtils'

const createDriverFilters = () => ({
  startDate: '',
  endDate: '',
  driverName: '',
  vehicleName: '',
  vehicleNumber: '',
  clientName: '',
  status: '',
})

const normalizeValue = (value) => (value || '').toString().trim().toLowerCase()

const includesValue = (source, target) => normalizeValue(source).includes(normalizeValue(target))

const syncSeedRecords = (savedItems, seedItems, dateKeys = []) => {
  const seedIds = new Set(seedItems.map((item) => item.id))
  const preservedItems = savedItems.filter((item) => {
    if (seedIds.has(item.id)) return false
    return dateKeys.every((key) => !item[key] || String(item[key]).startsWith('2026-'))
  })

  return [...preservedItems, ...seedItems]
}

function DriverManager() {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [drivers, setDrivers] = useState([])
  const [trips, setTrips] = useState([])
  const [fleet, setFleet] = useState([])
  const [editingDriver, setEditingDriver] = useState(null)
  const [viewingDriver, setViewingDriver] = useState(null)

  // Filter States
  const [filters, setFilters] = useState(createDriverFilters)
  const [selectedDrivers, setSelectedDrivers] = useState([])

  useEffect(() => {
    const savedDrivers = JSON.parse(localStorage.getItem('myDrivers') || '[]')
    const savedTrips = JSON.parse(localStorage.getItem('myTrips') || '[]')
    const savedFleet = JSON.parse(localStorage.getItem('myVehicles') || '[]')
    const demoFleet = [
      { id: 'V-001', name: 'Innova Crysta', plate: 'KL-01-AB-1234' },
      { id: 'V-002', name: 'Winger', plate: 'KL-07-CD-5678' },
      { id: 'V-003', name: 'Traveller', plate: 'KL-11-EF-9012' },
      { id: 'V-004', name: 'Ertiga', plate: 'KL-13-GH-3456' },
      { id: 'V-005', name: 'Dzire', plate: 'KL-05-IJ-7890' },
    ]
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
        joiningDate: '2026-01-15',
        status: 'Approved',
        notes: 'Experienced in long routes'
      },
      { 
        id: 'D-002', 
        name: 'Suresh Mani', 
        phone: '+91 98450 54321', 
        alternateNumber: '',
        license: 'KL07 20180045', 
        licenseExpiryDate: '2026-05-20',
        address: '45, Sea Side, Kochi',
        driverType: 'Contract',
        dailyBatta: '600',
        joiningDate: '2026-06-10',
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
        joiningDate: '2026-02-01',
        status: 'Approved',
        notes: 'Very punctual'
      },
      { 
        id: 'D-004', 
        name: 'Mohammed Fasil', 
        phone: '+91 88990 44332', 
        alternateNumber: '',
        license: 'KL13 20190023', 
        licenseExpiryDate: '2026-08-15',
        address: 'Fasil Manzil, Malappuram',
        driverType: 'Full-time',
        dailyBatta: '500',
        joiningDate: '2026-04-20',
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
        joiningDate: '2026-03-15',
        status: 'Pending',
        notes: 'New joinee'
      }
    ]
    const demoTrips = [
      { id: 'T-3318', date: '2026-01-12', driverName: 'Rahul Krishnan', vehicleNumber: 'KL-01-AB-1234', companyClientName: 'Green Valley Traders' },
      { id: 'T-4412', date: '2026-02-08', driverName: 'Abhijith P.S.', vehicleNumber: 'KL-11-EF-9012', companyClientName: 'Metro Foods' },
      { id: 'T-7755', date: '2026-03-17', driverName: 'Suresh Mani', vehicleNumber: 'KL-07-CD-5678', companyClientName: 'Blue Star Agencies' },
      { id: 'T-8871', date: '2026-04-21', driverName: 'Vineeth Kumar', vehicleNumber: 'KL-05-IJ-7890', companyClientName: 'Private Party' },
      { id: 'T-2234', date: '2026-04-25', driverName: 'Mohammed Fasil', vehicleNumber: 'KL-13-GH-3456', companyClientName: 'Bismi Appliances' },
      { id: 'T-6620', date: '2026-05-02', driverName: 'Mohammed Fasil', vehicleNumber: 'KL-13-GH-3456', companyClientName: 'Classic Home Needs' },
      { id: 'T-9904', date: '2026-05-18', driverName: 'Vineeth Kumar', vehicleNumber: 'KL-05-IJ-7890', companyClientName: 'Sunrise Family Tour' },
    ]
    const mergedDrivers = syncSeedRecords(savedDrivers, defaults, ['joiningDate'])
    const mergedTrips = syncSeedRecords(savedTrips, demoTrips, ['date'])
    const mergedFleet = syncSeedRecords(savedFleet, demoFleet)
    localStorage.setItem('myDrivers', JSON.stringify(mergedDrivers))
    localStorage.setItem('myTrips', JSON.stringify(mergedTrips))
    localStorage.setItem('myVehicles', JSON.stringify(mergedFleet))
    setDrivers(mergedDrivers)
    setTrips(mergedTrips)
    setFleet(mergedFleet)
  }, [])

  const vehicleLookup = fleet.reduce((acc, vehicle) => {
    acc[normalizeValue(vehicle.plate)] = vehicle
    return acc
  }, {})

  const startDate =
    filters.startDate && filters.endDate && filters.startDate > filters.endDate
      ? filters.endDate
      : filters.startDate
  const endDate =
    filters.startDate && filters.endDate && filters.startDate > filters.endDate
      ? filters.startDate
      : filters.endDate

  const tripScopedFilteringActive = Boolean(
    startDate || endDate || filters.vehicleName || filters.vehicleNumber || filters.clientName || filters.driverName
  )

  const matchingDriverNames = new Set(
    trips
      .map((trip) => ({
        ...trip,
        vehicleName: trip.vehicleName || vehicleLookup[normalizeValue(trip.vehicleNumber)]?.name || '',
      }))
      .filter((trip) => {
        const tripDate = trip.date || ''
        const matchesDateRange = (!startDate || tripDate >= startDate) && (!endDate || tripDate <= endDate)
        const matchesDriver = !filters.driverName || includesValue(trip.driverName, filters.driverName) || includesValue(trip.secondaryDriverName, filters.driverName)
        const matchesVehicleName = !filters.vehicleName || includesValue(trip.vehicleName, filters.vehicleName)
        const matchesVehicleNumber = !filters.vehicleNumber || includesValue(trip.vehicleNumber, filters.vehicleNumber)
        const matchesClient = !filters.clientName || includesValue(trip.companyClientName, filters.clientName)

        return matchesDateRange && matchesDriver && matchesVehicleName && matchesVehicleNumber && matchesClient
      })
      .flatMap((trip) => [trip.driverName, trip.secondaryDriverName].filter(Boolean).map(normalizeValue))
  )

  const filteredDrivers = drivers.filter((driver) => {
    const matchesStatus = !filters.status || driver.status === filters.status
    const matchesDriverText =
      !filters.driverName ||
      includesValue(driver.name, filters.driverName) ||
      includesValue(driver.phone, filters.driverName) ||
      includesValue(driver.license, filters.driverName)
    const matchesTripScope = !tripScopedFilteringActive || matchingDriverNames.has(normalizeValue(driver.name))

    return matchesStatus && matchesDriverText && matchesTripScope
  })

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setFilters(createDriverFilters())
  }

  const getExportableDrivers = () =>
    selectedDrivers.length > 0
      ? filteredDrivers.filter((driver) => selectedDrivers.includes(driver.id))
      : filteredDrivers

  const toggleSelectAll = () => {
    if (selectedDrivers.length === filteredDrivers.length) {
      setSelectedDrivers([]);
    } else {
      setSelectedDrivers(filteredDrivers.map(d => d.id));
    }
  };

  const toggleSelectDriver = (id) => {
    setSelectedDrivers(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

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

  const handleExport = () => {
    const headers = ['Name', 'Phone', 'License', 'License Exp', 'Joining Date', 'Type', 'Batta', 'Status'];
    const dataToExport = getExportableDrivers()

    const rows = dataToExport.map(d => [
      d.name,
      d.phone,
      d.license,
      d.licenseExpiryDate,
      d.joiningDate,
      d.driverType,
      d.dailyBatta,
      d.status
    ]);

    downloadCsv({
      headers,
      rows,
      fileName: `Drivers_Report_${new Date().toISOString().slice(0,10)}.csv`,
    })
  }

  const handleExportPdf = () => {
    const headers = ['Name', 'Phone', 'License', 'License Expiry', 'Joining Date', 'Driver Type', 'Daily Batta', 'Status']
    const rows = getExportableDrivers().map((driver) => [
      driver.name,
      driver.phone,
      driver.license,
      driver.licenseExpiryDate,
      driver.joiningDate,
      driver.driverType,
      driver.dailyBatta,
      driver.status,
    ])

    exportRowsToPdf({
      title: 'Driver Report',
      headers,
      rows,
      fileName: `Drivers_Report_${new Date().toISOString().slice(0,10)}.pdf`,
    })
  }

  const handleExportSingle = (d) => {
    const headers = ['Field', 'Value'];
    const data = [
      ['Name', d.name],
      ['Phone', d.phone],
      ['Alt. Phone', d.alternateNumber],
      ['License Number', d.license],
      ['License Expiry', d.licenseExpiryDate],
      ['Address', d.address],
      ['Driver Type', d.driverType],
      ['Daily Batta', d.dailyBatta],
      ['Joining Date', d.joiningDate],
      ['Status', d.status],
      ['Notes', d.notes]
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...data.map(r => r.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Driver_${d.name.replace(/\s+/g, '_')}_Details.csv`);
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

        /* ── Table ── */
        .table-card { background: #fff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.05); }
        .m-table { width: 100%; border-collapse: collapse; text-align: left; }
        .m-table thead tr { background: linear-gradient(135deg, #0f172a, #1e293b); }
        .m-table th { padding: 1rem 1rem; font-size: 0.65rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; white-space: nowrap; border: none; }
        .m-table th:first-child { padding-left: 1.5rem; }
        .m-table th:last-child { padding-right: 1.5rem; }
        .m-table tbody tr { transition: background 0.15s; }
        .m-table tbody tr:nth-child(odd) { background: #fff; }
        .m-table tbody tr:nth-child(even) { background: #fafbfc; }
        .m-table tbody tr:nth-child(even) { background: #fafbfc; }
        .m-table tbody tr:hover { background: #f0fdf4; }
        .m-table tbody tr.selected-row { background: #f0fdf4; }
        .m-table td { padding: 1rem 1rem; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #1e293b; font-size: 0.85rem; }
        .m-table td:first-child { padding-left: 1.5rem; }
        .m-table td:last-child { padding-right: 1.5rem; }
        .m-table tbody tr:last-child td { border-bottom: none; }

        .status-pill { padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.68rem; font-weight: 800; display: inline-flex; align-items: center; gap: 0.4rem; text-transform: uppercase; letter-spacing: 0.04em; }
        .s-approved { background: #dcfce7; color: #15803d; }
        .s-pending { background: #fef9c3; color: #92400e; }
        .s-inactive { background: #fee2e2; color: #b91c1c; }

        /* Checkbox Style */
        .m-checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #22c55e;
          border-radius: 4px;
        }

        .action-btns { display: flex; gap: 0.4rem; }
        .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; display: grid; place-items: center; cursor: pointer; transition: all 0.15s; background: #fff; color: #94a3b8; }
        .icon-btn:hover { border-color: #22c55e; color: #22c55e; background: #f0fdf4; }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
        .icon-btn.view:hover { border-color: #6366f1; color: #6366f1; background: #eef2ff; }

        .animate-fade-in { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

        .form-overlay, .detail-overlay { position: fixed; inset: 0; background: rgba(2, 8, 23, 0.7); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem; }
        .form-card, .detail-card { background: #fff; border-radius: 28px; width: 100%; max-width: 900px; position: relative; max-height: 93vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 40px 80px -20px rgba(0,0,0,0.5); }

        .modal-header { padding: 2rem 2.5rem 1.5rem; border-bottom: 1px solid #f1f5f9; flex-shrink: 0; display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
        .modal-header-left { display: flex; flex-direction: column; gap: 0.3rem; }
        .modal-header-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
        .modal-header-eyebrow .modal-icon { width: 40px; height: 40px; border-radius: 12px; display: grid; place-items: center; }
        .modal-icon-blue { background: linear-gradient(135deg, #3b82f6, #2563eb); color: #fff; }
        .modal-icon-green { background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; }
        .modal-title { font-size: 1.7rem; font-weight: 900; color: #0f172a; letter-spacing: -0.03em; }
        .modal-subtitle { font-size: 0.9rem; color: #64748b; font-weight: 500; }
        .close-btn { flex-shrink: 0; background: #f8fafc; border: 1px solid #e2e8f0; width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; cursor: pointer; transition: all 0.2s; color: #64748b; }
        .close-btn:hover { background: #fee2e2; color: #ef4444; border-color: #fecaca; transform: rotate(90deg); }

        .modal-body { overflow-y: auto; padding: 2rem 2.5rem; flex: 1; }
        .modal-body::-webkit-scrollbar { width: 5px; }
        .modal-body::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }

        .form-grid, .detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        .form-section-title, .detail-section-title { grid-column: span 2; font-size: 0.75rem; font-weight: 800; color: #22c55e; text-transform: uppercase; letter-spacing: 0.08em; margin: 1.5rem 0 0.25rem; padding: 0 0 0.6rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 0.6rem; }

        .detail-item { background: #f8fafc; padding: 1rem 1.1rem; border-radius: 12px; border: 1px solid #f1f5f9; transition: all 0.15s; }
        .detail-item:hover { border-color: #dcfce7; background: #f0fdf4; }
        .detail-label { font-size: 0.68rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.3rem; }
        .detail-value { font-size: 1rem; font-weight: 800; color: #0f172a; }
        .detail-item.full { grid-column: span 2; }

        .form-group { display: flex; flex-direction: column; gap: 0.45rem; }
        .form-group.full { grid-column: span 2; }
        .form-group label { font-size: 0.78rem; font-weight: 700; color: #64748b; display: flex; align-items: center; gap: 0.35rem; }
        .form-group input, .form-group select, .form-group textarea { padding: 0.8rem 1rem; border-radius: 10px; border: 1.5px solid #e2e8f0; font-weight: 600; outline: none; transition: all 0.18s; font-family: inherit; color: #0f172a; background: #fff; font-size: 0.9rem; }
        .form-group input::placeholder { color: #cbd5e1; font-weight: 500; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.12); background: #fff; }
        .form-group textarea { min-height: 100px; resize: vertical; }

        .modal-footer { padding: 1.25rem 2.5rem 1.75rem; border-top: 1px solid #f1f5f9; display: flex; gap: 0.75rem; flex-shrink: 0; }
        .btn-save { background: #0f172a; color: #fff; padding: 0.85rem 1.8rem; border-radius: 12px; font-weight: 700; cursor: pointer; border: none; font-size: 0.9rem; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; flex: 1; justify-content: center; }
        .btn-save:hover { background: #1e293b; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(15,23,42,0.2); }
        .btn-save:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .btn-save.green { background: linear-gradient(135deg, #22c55e, #16a34a); }
        .btn-save.green:hover { box-shadow: 0 8px 20px rgba(34,197,94,0.25); }
        .btn-save.secondary { background: #f1f5f9; color: #475569; box-shadow: none; }
        .btn-save.secondary:hover { background: #e2e8f0; color: #0f172a; transform: none; box-shadow: none; }

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
            <h1>Driver Network</h1>
            <p style={{color:'#64748b', fontWeight:600, marginTop:'0.4rem'}}>Manage your professional driving staff</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-end'}}>
            <button className="btn-add" onClick={() => { setEditingDriver(null); setShowForm(true); }}>
              <Plus size={22} /> Add New Driver
            </button>
            <div style={{display:'flex', gap:'0.6rem', flexWrap:'wrap', justifyContent:'flex-end'}}>
              <button className="btn-download" onClick={handleExport} style={{height: '40px', padding: '0.6rem 1.2rem', fontSize: '0.85rem'}}>
                <Download size={16} /> {selectedDrivers.length > 0 ? `Export CSV (${getExportableDrivers().length})` : 'Export CSV'}
              </button>
              <button className="btn-download" onClick={handleExportPdf} style={{height: '40px', padding: '0.6rem 1.2rem', fontSize: '0.85rem'}}>
                <FileText size={16} /> {selectedDrivers.length > 0 ? `Export PDF (${getExportableDrivers().length})` : 'Export PDF'}
              </button>
            </div>
          </div>
        </header>

        <div className="filter-bar">
          <div className="filter-group">
            <label><Calendar size={14} /> Start Date</label>
            <div className="filter-input-wrap">
              <Calendar size={18} />
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
            </div>
          </div>
          <div className="filter-group">
            <label><Calendar size={14} /> End Date</label>
            <div className="filter-input-wrap">
              <Calendar size={18} />
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </div>
          </div>
          <div className="filter-group">
            <label><Search size={14} /> Driver Name</label>
            <div className="filter-input-wrap">
              <Search size={18} />
              <input
                type="text"
                placeholder="Name, phone, or license"
                value={filters.driverName}
                onChange={(e) => handleFilterChange('driverName', e.target.value)}
              />
            </div>
          </div>
          <div className="filter-group">
            <label><Search size={14} /> Vehicle Name</label>
            <div className="filter-input-wrap">
              <Search size={18} />
              <input
                type="text"
                placeholder="Filter by linked vehicle name"
                value={filters.vehicleName}
                onChange={(e) => handleFilterChange('vehicleName', e.target.value)}
              />
            </div>
          </div>
          <div className="filter-group">
            <label><Search size={14} /> Vehicle Number</label>
            <div className="filter-input-wrap">
              <Search size={18} />
              <input
                type="text"
                placeholder="Filter by linked vehicle number"
                value={filters.vehicleNumber}
                onChange={(e) => handleFilterChange('vehicleNumber', e.target.value)}
              />
            </div>
          </div>
          <div className="filter-group">
            <label><Search size={14} /> Client Name</label>
            <div className="filter-input-wrap">
              <Search size={18} />
              <input
                type="text"
                placeholder="Filter by linked client"
                value={filters.clientName}
                onChange={(e) => handleFilterChange('clientName', e.target.value)}
              />
            </div>
          </div>
          <div className="filter-group">
            <label><Filter size={14} /> Status</label>
            <div className="filter-input-wrap">
              <Filter size={18} />
              <select value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
                <option value="">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <button className="btn-clear" onClick={clearFilters}>Clear</button>
        </div>

        <div className="table-card">
          <table className="m-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    className="m-checkbox" 
                    checked={filteredDrivers.length > 0 && selectedDrivers.length === filteredDrivers.length}
                    onChange={toggleSelectAll}
                  />
                </th>
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
              {filteredDrivers.map(driver => (
                <tr key={driver.id} className={selectedDrivers.includes(driver.id) ? 'selected-row' : ''}>
                  <td>
                    <input 
                      type="checkbox" 
                      className="m-checkbox" 
                      checked={selectedDrivers.includes(driver.id)}
                      onChange={() => toggleSelectDriver(driver.id)}
                    />
                  </td>
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
              {filteredDrivers.length === 0 && (
                <tr>
                  <td colSpan="10" style={{textAlign:'center', padding:'4rem', color:'#64748b'}}>
                    No matching drivers found. Try adjusting your filters.
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
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-header-eyebrow">
                  <div className="modal-icon modal-icon-green"><User size={18}/></div>
                  <span className={`status-pill ${viewingDriver.status === 'Approved' || viewingDriver.status === 'Active' ? 's-approved' : 's-pending'}`}>{viewingDriver.status}</span>
                  <span style={{fontSize:'0.8rem', color:'#94a3b8', fontWeight:700, letterSpacing:'0.05em'}}>ID: {viewingDriver.id}</span>
                </div>
                <div className="modal-title">{viewingDriver.name}</div>
                <div className="modal-subtitle">Professional Driver Profile</div>
              </div>
              <button className="close-btn" onClick={() => setViewingDriver(null)}><X size={18}/></button>
            </div>
            <div className="modal-body">
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
            </div>{/* end modal-body */}
            <div className="modal-footer">
              <button className="btn-save" style={{flex:2}} onClick={() => { setViewingDriver(null); openEdit(viewingDriver); }}><Edit size={16}/> Edit Profile</button>
              <button className="btn-save green" style={{flex:1}} onClick={() => handleExportSingle(viewingDriver)}><Download size={16}/> Export</button>
              <button className="btn-save secondary" style={{flex:1}} onClick={() => setViewingDriver(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="form-overlay">
          <div className="form-card animate-fade-in">
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-header-eyebrow">
                  <div className={`modal-icon ${editingDriver ? 'modal-icon-green' : 'modal-icon-blue'}`}>
                    {editingDriver ? <Edit size={18}/> : <Plus size={18}/>}
                  </div>
                  <span style={{fontSize:'0.8rem', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em'}}>{editingDriver ? 'Edit Driver' : 'New Driver'}</span>
                </div>
                <div className="modal-title">{editingDriver ? 'Update Driver Profile' : 'Register Driver'}</div>
                <div className="modal-subtitle">Complete the driver profile information below</div>
              </div>
              <button type="button" className="close-btn" onClick={() => setShowForm(false)}><X size={18}/></button>
            </div>
            <div className="modal-body">
            <form onSubmit={handleSubmit} className="form-grid" id="driver-form">
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

            </form>
            </div>{/* end modal-body */}
            <div className="modal-footer">
              <button type="submit" form="driver-form" className="btn-save" style={{flex:2}} disabled={loading}>
                {loading ? 'Processing...' : (editingDriver ? 'Save Profile Changes' : 'Register New Driver')}
              </button>
              <button type="button" className="btn-save secondary" style={{flex:1}} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default DriverManager
