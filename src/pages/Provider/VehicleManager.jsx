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
import { downloadCsv, exportRowsToPdf } from '../../utils/exportUtils'

const createVehicleFilters = () => ({
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

function VehicleManager() {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fleet, setFleet] = useState([])
  const [trips, setTrips] = useState([])
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [viewingVehicle, setViewingVehicle] = useState(null)

  // Filter States
  const [filters, setFilters] = useState(createVehicleFilters)
  const [selectedVehicles, setSelectedVehicles] = useState([])

  useEffect(() => {
    const savedFleet = JSON.parse(localStorage.getItem('myVehicles') || '[]')
    const savedTrips = JSON.parse(localStorage.getItem('myTrips') || '[]')
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
        insuranceExpiryDate: '2026-12-15',
        pollutionExpiryDate: '2026-08-20',
        permitExpiryDate: '2026-05-10',
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
        insuranceExpiryDate: '2026-06-10',
        pollutionExpiryDate: '2026-06-10',
        permitExpiryDate: '2026-11-20',
        fitnessExpiryDate: '2026-01-15',
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
        insuranceExpiryDate: '2026-01-20',
        pollutionExpiryDate: '2026-01-20',
        permitExpiryDate: '2026-04-15',
        fitnessExpiryDate: '2026-10-30',
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
        insuranceExpiryDate: '2026-11-05',
        pollutionExpiryDate: '2026-05-05',
        permitExpiryDate: '2026-02-12',
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
        insuranceExpiryDate: '2026-09-15',
        pollutionExpiryDate: '2026-09-15',
        permitExpiryDate: '2026-08-10',
        fitnessExpiryDate: '2026-12-25',
        assignedDriver: 'Vineeth Kumar',
        status: 'Active',
        notes: ''
      }
    ]
    const demoTrips = [
      { id: 'T-3318', date: '2026-01-12', driverName: 'Rahul Krishnan', vehicleNumber: 'KL-01-AB-1234', companyClientName: 'Green Valley Traders', vehicleName: 'Innova Crysta' },
      { id: 'T-4412', date: '2026-02-08', driverName: 'Abhijith P.S.', vehicleNumber: 'KL-11-EF-9012', companyClientName: 'Metro Foods', vehicleName: 'Traveller' },
      { id: 'T-7755', date: '2026-03-17', driverName: 'Suresh Mani', vehicleNumber: 'KL-07-CD-5678', companyClientName: 'Blue Star Agencies', vehicleName: 'Winger' },
      { id: 'T-8871', date: '2026-04-21', driverName: 'Vineeth Kumar', vehicleNumber: 'KL-05-IJ-7890', companyClientName: 'Private Party', vehicleName: 'Dzire' },
      { id: 'T-2234', date: '2026-04-25', driverName: 'Mohammed Fasil', vehicleNumber: 'KL-13-GH-3456', companyClientName: 'Bismi Appliances', vehicleName: 'Ertiga' },
      { id: 'T-6620', date: '2026-05-02', driverName: 'Mohammed Fasil', vehicleNumber: 'KL-13-GH-3456', companyClientName: 'Classic Home Needs', vehicleName: 'Ertiga' },
      { id: 'T-9904', date: '2026-05-18', driverName: 'Vineeth Kumar', vehicleNumber: 'KL-05-IJ-7890', companyClientName: 'Sunrise Family Tour', vehicleName: 'Dzire' },
    ]
    const mergedFleet = syncSeedRecords(savedFleet, defaults)
    const mergedTrips = syncSeedRecords(savedTrips, demoTrips, ['date'])
    localStorage.setItem('myVehicles', JSON.stringify(mergedFleet))
    localStorage.setItem('myTrips', JSON.stringify(mergedTrips))
    setFleet(mergedFleet)
    setTrips(mergedTrips)
  }, [])

  const vehicleTripFilteringActive = Boolean(
    filters.startDate || filters.endDate || filters.driverName || filters.vehicleName || filters.vehicleNumber || filters.clientName
  )

  const startDate =
    filters.startDate && filters.endDate && filters.startDate > filters.endDate
      ? filters.endDate
      : filters.startDate
  const endDate =
    filters.startDate && filters.endDate && filters.startDate > filters.endDate
      ? filters.startDate
      : filters.endDate

  const matchingVehicleNumbers = new Set(
    trips
      .filter((trip) => {
        const tripDate = trip.date || ''
        const vehicleRecord = fleet.find((vehicle) => normalizeValue(vehicle.plate) === normalizeValue(trip.vehicleNumber))
        const tripVehicleName = trip.vehicleName || vehicleRecord?.name || ''
        const matchesDateRange = (!startDate || tripDate >= startDate) && (!endDate || tripDate <= endDate)
        const matchesDriver = !filters.driverName || includesValue(trip.driverName, filters.driverName) || includesValue(trip.secondaryDriverName, filters.driverName)
        const matchesVehicleName = !filters.vehicleName || includesValue(tripVehicleName, filters.vehicleName)
        const matchesVehicleNumber = !filters.vehicleNumber || includesValue(trip.vehicleNumber, filters.vehicleNumber)
        const matchesClient = !filters.clientName || includesValue(trip.companyClientName, filters.clientName)

        return matchesDateRange && matchesDriver && matchesVehicleName && matchesVehicleNumber && matchesClient
      })
      .map((trip) => normalizeValue(trip.vehicleNumber))
  )

  const filteredFleet = fleet.filter((vehicle) => {
    const matchesStatus = !filters.status || vehicle.status === filters.status
    const matchesVehicleFields =
      (!filters.vehicleName || includesValue(vehicle.name, filters.vehicleName)) &&
      (!filters.vehicleNumber || includesValue(vehicle.plate, filters.vehicleNumber)) &&
      (!filters.driverName || includesValue(vehicle.assignedDriver, filters.driverName))
    const matchesTripScope = !vehicleTripFilteringActive || matchingVehicleNumbers.has(normalizeValue(vehicle.plate))

    return matchesStatus && matchesVehicleFields && matchesTripScope
  })

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setFilters(createVehicleFilters())
  }

  const getExportableVehicles = () =>
    selectedVehicles.length > 0
      ? filteredFleet.filter((vehicle) => selectedVehicles.includes(vehicle.id))
      : filteredFleet

  const toggleSelectAll = () => {
    if (selectedVehicles.length === filteredFleet.length) {
      setSelectedVehicles([]);
    } else {
      setSelectedVehicles(filteredFleet.map(v => v.id));
    }
  };

  const toggleSelectVehicle = (id) => {
    setSelectedVehicles(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

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
    const dataToExport = getExportableVehicles()

    const rows = dataToExport.map(v => [
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

    downloadCsv({
      headers,
      rows,
      fileName: `Fleet_Report_${new Date().toISOString().slice(0,10)}.csv`,
    })
  }

  const handleExportPdf = () => {
    const headers = ['Plate', 'Name', 'Brand', 'Type', 'Fuel', 'Capacity', 'Current KM', 'Assigned Driver', 'Status']
    const rows = getExportableVehicles().map((vehicle) => [
      vehicle.plate,
      vehicle.name,
      vehicle.brand,
      vehicle.type,
      vehicle.fuelType,
      vehicle.capacity,
      vehicle.currentKm,
      vehicle.assignedDriver || '-',
      vehicle.status,
    ])

    exportRowsToPdf({
      title: 'Vehicle Report',
      headers,
      rows,
      fileName: `Fleet_Report_${new Date().toISOString().slice(0,10)}.pdf`,
    })
  }

  const handleExportSingle = (v) => {
    const headers = ['Field', 'Value'];
    const data = [
      ['Plate Number', v.plate],
      ['Vehicle Name', v.name],
      ['Brand', v.brand],
      ['Vehicle Type', v.type],
      ['Model Year', v.model],
      ['Fuel Type', v.fuelType],
      ['Seating Capacity', v.capacity],
      ['Insurance Expiry', v.insuranceExpiryDate],
      ['Pollution Expiry', v.pollutionExpiryDate],
      ['Permit Expiry', v.permitExpiryDate],
      ['Fitness Expiry', v.fitnessExpiryDate],
      ['Current KM', v.currentKm],
      ['Assigned Driver', v.assignedDriver],
      ['Status', v.status],
      ['Notes', v.notes]
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...data.map(r => r.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Vehicle_${v.plate}_Details.csv`);
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
        .m-table tbody tr:hover { background: #f0fdf4; }
        .m-table tbody tr.selected-row { background: #f0fdf4; }
        .m-table td { padding: 1rem 1rem; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #1e293b; font-size: 0.85rem; }
        .m-table td:first-child { padding-left: 1.5rem; }
        .m-table td:last-child { padding-right: 1.5rem; }
        .m-table tbody tr:last-child td { border-bottom: none; }

        .action-btns { display: flex; gap: 0.4rem; }
        .action-btns { display: flex; gap: 0.4rem; }
        .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; display: grid; place-items: center; cursor: pointer; transition: all 0.15s; background: #fff; color: #94a3b8; }
        .icon-btn:hover { border-color: #22c55e; color: #22c55e; background: #f0fdf4; }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
        .icon-btn.view:hover { border-color: #6366f1; color: #6366f1; background: #eef2ff; }

        .animate-fade-in { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

        .form-overlay, .detail-overlay { position: fixed; inset: 0; background: rgba(2, 8, 23, 0.7); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem; }
        .form-card, .detail-card { background: #fff; border-radius: 28px; width: 100%; max-width: 1000px; position: relative; max-height: 93vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 40px 80px -20px rgba(0,0,0,0.5); }

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

        .form-grid, .detail-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .form-section-title, .detail-section-title { grid-column: span 3; font-size: 0.75rem; font-weight: 800; color: #22c55e; text-transform: uppercase; letter-spacing: 0.08em; margin: 1.5rem 0 0.25rem; padding: 0 0 0.6rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 0.6rem; }

        .detail-item { background: #f8fafc; padding: 1rem 1.1rem; border-radius: 12px; border: 1px solid #f1f5f9; transition: all 0.15s; }
        .detail-item:hover { border-color: #dcfce7; background: #f0fdf4; }
        .detail-label { font-size: 0.68rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.3rem; }
        .detail-value { font-size: 1rem; font-weight: 800; color: #0f172a; }
        .detail-item.full { grid-column: span 3; }

        .form-group { display: flex; flex-direction: column; gap: 0.45rem; }
        .form-group.full { grid-column: span 3; }
        .form-group.span-2 { grid-column: span 2; }
        .form-group label { font-size: 0.78rem; font-weight: 700; color: #64748b; display: flex; align-items: center; gap: 0.35rem; }
        .form-group input, .form-group select, .form-group textarea { padding: 0.8rem 1rem; border-radius: 10px; border: 1.5px solid #e2e8f0; font-weight: 600; outline: none; transition: all 0.18s; font-family: inherit; color: #0f172a; background: #fff; font-size: 0.9rem; }
        .form-group input::placeholder { color: #cbd5e1; font-weight: 500; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.12); background: #fff; }

        .status-badge { padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.02em; }
        .st-active { background: #dcfce7; color: #166534; }
        .st-ontrip { background: #e0f2fe; color: #0369a1; }
        .st-maintenance { background: #fef3c7; color: #92400e; }

        /* Checkbox Style */
        .m-checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #22c55e;
          border-radius: 4px;
        }

        .modal-footer { padding: 1.25rem 2.5rem 1.75rem; border-top: 1px solid #f1f5f9; display: flex; gap: 0.75rem; flex-shrink: 0; }
        .btn-save { background: #0f172a; color: #fff; padding: 0.85rem 1.8rem; border-radius: 12px; font-weight: 700; cursor: pointer; border: none; font-size: 0.9rem; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; flex: 1; justify-content: center; }
        .btn-save:hover { background: #1e293b; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(15,23,42,0.2); }
        .btn-save:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .btn-save.green { background: linear-gradient(135deg, #22c55e, #16a34a); }
        .btn-save.green:hover { box-shadow: 0 8px 20px rgba(34,197,94,0.25); }
        .btn-save.secondary { background: #f1f5f9; color: #475569; box-shadow: none; }
        .btn-save.secondary:hover { background: #e2e8f0; color: #0f172a; transform: none; box-shadow: none; }

        /* ── Filter Panel ── */
        .filter-panel { background: #fff; border-radius: 20px; border: 1px solid #e2e8f0; margin-bottom: 2rem; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.04); }
        .filter-panel-header { display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.5rem; border-bottom: 1px solid #f1f5f9; background: linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%); }
        .filter-panel-title { display: flex; align-items: center; gap: 0.65rem; font-size: 0.82rem; font-weight: 800; color: #334155; text-transform: uppercase; letter-spacing: 0.06em; }
        .filter-panel-title svg { color: #22c55e; }
        .filter-active-badge { background: #22c55e; color: #fff; font-size: 0.65rem; font-weight: 900; padding: 0.2rem 0.55rem; border-radius: 99px; letter-spacing: 0.02em; }
        .filter-panel-actions { display: flex; align-items: center; gap: 0.6rem; }
        .filter-results-count { font-size: 0.8rem; font-weight: 700; color: #64748b; padding: 0.35rem 0.9rem; background: #f1f5f9; border-radius: 8px; }
        .filter-results-count span { color: #0f172a; font-weight: 900; }
        .btn-clear-all { display: flex; align-items: center; gap: 0.4rem; background: transparent; color: #94a3b8; border: 1.5px solid #e2e8f0; padding: 0.38rem 0.9rem; border-radius: 8px; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: all 0.18s; font-family: inherit; }
        .btn-clear-all:hover { background: #fef2f2; color: #ef4444; border-color: #fecaca; }
        .filter-panel-body { padding: 1.4rem 1.5rem 1.25rem; }
        .filter-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; gap: 1rem; }
        @media (max-width: 1200px) { .filter-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .filter-grid { grid-template-columns: repeat(2, 1fr); } }
        .filter-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .filter-field label { font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.07em; display: flex; align-items: center; gap: 0.35rem; }
        .filter-field label svg { color: #22c55e; opacity: 0.8; }
        .filter-input-wrap { position: relative; }
        .filter-input-wrap .f-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: #c4cdd8; pointer-events: none; display: flex; }
        .filter-input-wrap input, .filter-input-wrap select { width: 100%; padding: 0.65rem 0.9rem 0.65rem 2.5rem; border-radius: 10px; border: 1.5px solid #e9eef5; background: #f8fafc; font-weight: 600; color: #1e293b; outline: none; transition: all 0.18s; font-family: inherit; font-size: 0.85rem; box-sizing: border-box; }
        .filter-input-wrap input::placeholder { color: #b8c4d0; font-weight: 500; }
        .filter-input-wrap input:hover, .filter-input-wrap select:hover { border-color: #c7d4e4; background: #f4f7fb; }
        .filter-input-wrap input:focus, .filter-input-wrap select:focus { border-color: #22c55e; background: #fff; box-shadow: 0 0 0 3px rgba(34,197,94,0.1); }
        .filter-input-wrap input[type=date]::-webkit-calendar-picker-indicator { opacity: 0.5; cursor: pointer; }
        .filter-chips-row { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; padding: 0.75rem 1.5rem 1rem; border-top: 1px dashed #f0f3f8; }
        .filter-chip { display: inline-flex; align-items: center; gap: 0.4rem; background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d; padding: 0.3rem 0.55rem 0.3rem 0.75rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; }
        .filter-chip-remove { display: flex; align-items: center; background: none; border: none; cursor: pointer; color: #86efac; padding: 0; line-height: 1; transition: color 0.15s; }
        .filter-chip-remove:hover { color: #15803d; }
        .filter-chips-label { font-size: 0.72rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; }

        .btn-download { background: #0f172a; color: #fff; padding: 0.8rem 1.2rem; border-radius: 12px; font-weight: 800; border: none; cursor: pointer; transition: 0.2s; height: 48px; display: flex; align-items: center; gap: 0.6rem; }
        .btn-download:hover { background: #1e293b; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2); }
      `}</style>

      <div className="manager-container">
        <header className="m-header">
          <div>
            <h1>Fleet Inventory</h1>
            <p style={{color:'#64748b', fontWeight:600, marginTop:'0.4rem'}}>Manage and monitor your vehicle assets</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-end'}}>
            <button className="btn-add" onClick={() => { setEditingVehicle(null); setShowForm(true); }}>
              <Plus size={22} /> Add New Vehicle
            </button>
            <div style={{display:'flex', gap:'0.6rem', flexWrap:'wrap', justifyContent:'flex-end'}}>
              <button className="btn-download" onClick={handleExport} style={{height: '40px', padding: '0.6rem 1.2rem', fontSize: '0.85rem'}}>
                <Download size={16} /> {selectedVehicles.length > 0 ? `Export CSV (${getExportableVehicles().length})` : 'Export CSV'}
              </button>
              <button className="btn-download" onClick={handleExportPdf} style={{height: '40px', padding: '0.6rem 1.2rem', fontSize: '0.85rem'}}>
                <Download size={16} /> {selectedVehicles.length > 0 ? `Export PDF (${getExportableVehicles().length})` : 'Export PDF'}
              </button>
            </div>
          </div>
        </header>

        {/* ── Redesigned Filter Panel ── */}
        {(() => {
          const activeFilters = Object.entries(filters).filter(([, v]) => v !== '')
          const filterLabels = { startDate: 'From', endDate: 'To', driverName: 'Driver', vehicleName: 'Vehicle', vehicleNumber: 'Plate', clientName: 'Client', status: 'Status' }
          return (
            <div className="filter-panel">
              <div className="filter-panel-header">
                <div className="filter-panel-title">
                  <Filter size={15} />
                  Filters
                  {activeFilters.length > 0 && (
                    <span className="filter-active-badge">{activeFilters.length} active</span>
                  )}
                </div>
                <div className="filter-panel-actions">
                  <span className="filter-results-count">
                    <span>{filteredFleet.length}</span> of {fleet.length} vehicles
                  </span>
                  {activeFilters.length > 0 && (
                    <button className="btn-clear-all" onClick={clearFilters}>
                      <X size={13} /> Clear all
                    </button>
                  )}
                </div>
              </div>

              <div className="filter-panel-body">
                <div className="filter-grid">
                  <div className="filter-field">
                    <label><Calendar size={11} /> Start Date</label>
                    <div className="filter-input-wrap">
                      <span className="f-icon"><Calendar size={14} /></span>
                      <input type="date" value={filters.startDate} onChange={(e) => handleFilterChange('startDate', e.target.value)} />
                    </div>
                  </div>

                  <div className="filter-field">
                    <label><Calendar size={11} /> End Date</label>
                    <div className="filter-input-wrap">
                      <span className="f-icon"><Calendar size={14} /></span>
                      <input type="date" value={filters.endDate} onChange={(e) => handleFilterChange('endDate', e.target.value)} />
                    </div>
                  </div>

                  <div className="filter-field">
                    <label><Users size={11} /> Driver</label>
                    <div className="filter-input-wrap">
                      <span className="f-icon"><Users size={14} /></span>
                      <input type="text" placeholder="Assigned driver…" value={filters.driverName} onChange={(e) => handleFilterChange('driverName', e.target.value)} />
                    </div>
                  </div>

                  <div className="filter-field">
                    <label><Car size={11} /> Vehicle</label>
                    <div className="filter-input-wrap">
                      <span className="f-icon"><Car size={14} /></span>
                      <input type="text" placeholder="Search vehicle name…" value={filters.vehicleName} onChange={(e) => handleFilterChange('vehicleName', e.target.value)} />
                    </div>
                  </div>

                  <div className="filter-field">
                    <label><Tag size={11} /> Plate No.</label>
                    <div className="filter-input-wrap">
                      <span className="f-icon"><Tag size={14} /></span>
                      <input type="text" placeholder="e.g. KL-01…" value={filters.vehicleNumber} onChange={(e) => handleFilterChange('vehicleNumber', e.target.value)} />
                    </div>
                  </div>

                  <div className="filter-field">
                    <label><Search size={11} /> Client</label>
                    <div className="filter-input-wrap">
                      <span className="f-icon"><Search size={14} /></span>
                      <input type="text" placeholder="Filter by trip client…" value={filters.clientName} onChange={(e) => handleFilterChange('clientName', e.target.value)} />
                    </div>
                  </div>

                  <div className="filter-field" style={{ gridColumn: 'span 6' }}>
                    <label><Activity size={11} /> Vehicle Status</label>
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.15rem' }}>
                      {['', 'Active', 'On Trip', 'Maintenance', 'Inactive'].map((s) => (
                        <button
                          key={s}
                          onClick={() => handleFilterChange('status', s)}
                          style={{
                            padding: '0.42rem 1.05rem', borderRadius: '8px', border: '1.5px solid',
                            fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.18s', fontFamily: 'inherit',
                            borderColor: filters.status === s ? '#22c55e' : '#e2e8f0',
                            background: filters.status === s
                              ? (s === 'Active' ? '#dcfce7' : s === 'On Trip' ? '#e0f2fe' : s === 'Maintenance' ? '#fef3c7' : s === 'Inactive' ? '#fee2e2' : '#22c55e')
                              : '#f8fafc',
                            color: filters.status === s
                              ? (s === 'Active' ? '#166534' : s === 'On Trip' ? '#0369a1' : s === 'Maintenance' ? '#92400e' : s === 'Inactive' ? '#b91c1c' : '#fff')
                              : '#64748b',
                          }}
                        >
                          {s === '' ? 'All Vehicles' : s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {activeFilters.filter(([k]) => k !== 'status').length > 0 && (
                <div className="filter-chips-row">
                  <span className="filter-chips-label">Active:</span>
                  {activeFilters.filter(([k]) => k !== 'status').map(([key, val]) => (
                    <span key={key} className="filter-chip">
                      <span style={{ color: '#64748b', fontWeight: 600 }}>{filterLabels[key]}:</span>&nbsp;{val}
                      <button className="filter-chip-remove" onClick={() => handleFilterChange(key, '')}><X size={12} /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        })()}

        <div className="table-card">
          <table className="m-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    className="m-checkbox" 
                    checked={filteredFleet.length > 0 && selectedVehicles.length === filteredFleet.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Vehicle Info</th>
                <th>Plate Number</th>
                <th>Type / Fuel</th>
                <th>Capacity</th>
                <th>Expiry Dates</th>
                <th>Odometer</th>
                <th>Assigned Driver</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFleet.map(v => (
                <tr key={v.id} className={selectedVehicles.includes(v.id) ? 'selected-row' : ''}>
                  <td>
                    <input 
                      type="checkbox" 
                      className="m-checkbox" 
                      checked={selectedVehicles.includes(v.id)}
                      onChange={() => toggleSelectVehicle(v.id)}
                    />
                  </td>
                  <td>
                    <div style={{fontWeight:800, color:'#0f172a'}}>{v.name}</div>
                    <div style={{fontSize:'0.72rem', color:'#94a3b8', fontWeight:600}}>{v.brand}</div>
                  </td>
                  <td>
                    <span style={{background:'#f1f5f9', padding:'0.3rem 0.6rem', borderRadius:'6px', border:'1px solid #e2e8f0', fontFamily:'monospace', fontWeight:800, color:'#0f172a', fontSize:'0.8rem'}}>
                      {v.plate}
                    </span>
                  </td>
                  <td>
                    <div style={{fontSize:'0.82rem', fontWeight:600}}>{v.type}</div>
                    <div style={{fontSize:'0.72rem', color:'#94a3b8'}}>{v.fuelType}</div>
                  </td>
                  <td>
                    <div style={{fontSize:'0.82rem', fontWeight:700}}>{v.capacity} Seater</div>
                  </td>
                  <td>
                    <div style={{fontSize:'0.72rem', display:'flex', flexDirection:'column', gap:'1px'}}>
                      <span style={{color: new Date(v.insuranceExpiryDate) < new Date() ? '#ef4444' : '#64748b'}}>INS: {v.insuranceExpiryDate}</span>
                      <span style={{color: new Date(v.fitnessExpiryDate) < new Date() ? '#ef4444' : '#64748b'}}>FIT: {v.fitnessExpiryDate}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{fontWeight:800, color:'#0f172a'}}>{v.currentKm}</div>
                    <div style={{fontSize:'0.72rem', color:'#94a3b8'}}>KM</div>
                  </td>
                  <td style={{fontSize:'0.82rem', fontWeight:600}}>{v.assignedDriver || '-'}</td>
                  <td>
                    <span className={`status-badge ${v.status === 'Active' ? 'st-active' : v.status === 'On Trip' ? 'st-ontrip' : 'st-maintenance'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn view" onClick={() => setViewingVehicle(v)} title="View Details"><Eye size={15} /></button>
                      <button className="icon-btn" onClick={() => openEdit(v)} title="Edit"><Edit size={15} /></button>
                      <button className="icon-btn delete" onClick={() => handleDelete(v.id)} title="Delete"><Trash2 size={15} /></button>
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
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-header-eyebrow">
                  <div className="modal-icon modal-icon-green"><Car size={18}/></div>
                  <span className={`status-badge ${viewingVehicle.status === 'Active' ? 'st-active' : viewingVehicle.status === 'On Trip' ? 'st-ontrip' : 'st-maintenance'}`}>{viewingVehicle.status}</span>
                  <span style={{fontSize:'0.8rem', color:'#94a3b8', fontWeight:700, letterSpacing:'0.05em'}}>{viewingVehicle.plate}</span>
                </div>
                <div className="modal-title">{viewingVehicle.name}</div>
                <div className="modal-subtitle">{viewingVehicle.brand} · {viewingVehicle.type}</div>
              </div>
              <button className="close-btn" onClick={() => setViewingVehicle(null)}><X size={18}/></button>
            </div>
            <div className="modal-body">
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
            </div>{/* end modal-body */}
            <div className="modal-footer">
              <button className="btn-save" style={{flex:2}} onClick={() => { setViewingVehicle(null); openEdit(viewingVehicle); }}><Edit size={16}/> Edit Details</button>
              <button className="btn-save green" style={{flex:1}} onClick={() => handleExportSingle(viewingVehicle)}><Download size={16}/> Export</button>
              <button className="btn-save secondary" style={{flex:1}} onClick={() => setViewingVehicle(null)}>Close</button>
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
                  <div className={`modal-icon ${editingVehicle ? 'modal-icon-green' : 'modal-icon-blue'}`}>
                    {editingVehicle ? <Edit size={18}/> : <Plus size={18}/>}
                  </div>
                  <span style={{fontSize:'0.8rem', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em'}}>{editingVehicle ? 'Edit Vehicle' : 'New Vehicle'}</span>
                </div>
                <div className="modal-title">{editingVehicle ? 'Update Vehicle' : 'Onboard Vehicle'}</div>
                <div className="modal-subtitle">Enter technical and document details</div>
              </div>
              <button type="button" className="close-btn" onClick={() => setShowForm(false)}><X size={18}/></button>
            </div>
            <div className="modal-body">
            <form onSubmit={handleSubmit} className="form-grid" id="vehicle-form">
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

            </form>
            </div>{/* end modal-body */}
            <div className="modal-footer">
              <button type="submit" form="vehicle-form" className="btn-save" style={{flex:2}} disabled={loading}>
                {loading ? 'Processing...' : (editingVehicle ? 'Update Vehicle Record' : 'Add Vehicle to Fleet')}
              </button>
              <button type="button" className="btn-save secondary" style={{flex:1}} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default VehicleManager
