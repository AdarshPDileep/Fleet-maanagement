import { useEffect, useState } from 'react'
import {
  CalendarRange,
  ChevronRight,
  ClipboardList,
  Filter,
  IndianRupee,
  Search,
  Truck,
  User,
} from 'lucide-react'

const defaultTrips = [
  {
    id: 'T-9842',
    vehicleNumber: 'KL-01-AB-1234',
    driverName: 'Rahul Krishnan',
    companyClientName: 'Technopark Corp',
    fromLocation: 'TVM',
    toLocation: 'Kochi',
    totalKm: '210',
    date: '2026-04-24',
    tripStatus: 'Completed',
    profitAmount: '5660',
  },
  {
    id: 'T-9841',
    vehicleNumber: 'KL-07-CD-5678',
    driverName: 'Suresh Mani',
    companyClientName: 'Lulu Mall Logistics',
    fromLocation: 'Kochi',
    toLocation: 'Munnar',
    totalKm: '145',
    date: '2026-04-23',
    tripStatus: 'Completed',
    profitAmount: '3850',
  },
  {
    id: 'T-2234',
    vehicleNumber: 'KL-13-GH-3456',
    driverName: 'Mohammed Fasil',
    companyClientName: 'Bismi Appliances',
    fromLocation: 'Palakkad',
    toLocation: 'Coimbatore',
    totalKm: '60',
    date: '2026-04-25',
    tripStatus: 'Active',
    profitAmount: '1720',
  },
  {
    id: 'T-3318',
    vehicleNumber: 'KL-01-AB-1234',
    driverName: 'Rahul Krishnan',
    companyClientName: 'Green Valley Traders',
    fromLocation: 'Trivandrum',
    toLocation: 'Kollam',
    totalKm: '95',
    date: '2026-01-12',
    tripStatus: 'Completed',
    profitAmount: '2550',
  },
  {
    id: 'T-4412',
    vehicleNumber: 'KL-11-EF-9012',
    driverName: 'Abhijith P.S.',
    companyClientName: 'Metro Foods',
    fromLocation: 'Kozhikode',
    toLocation: 'Kannur',
    totalKm: '125',
    date: '2026-02-08',
    tripStatus: 'Completed',
    profitAmount: '3000',
  },
  {
    id: 'T-7755',
    vehicleNumber: 'KL-07-CD-5678',
    driverName: 'Suresh Mani',
    companyClientName: 'Blue Star Agencies',
    fromLocation: 'Ernakulam',
    toLocation: 'Thrissur',
    totalKm: '95',
    date: '2026-03-17',
    tripStatus: 'Completed',
    profitAmount: '2870',
  },
  {
    id: 'T-9904',
    vehicleNumber: 'KL-05-IJ-7890',
    driverName: 'Vineeth Kumar',
    companyClientName: 'Sunrise Family Tour',
    fromLocation: 'Kottayam',
    toLocation: 'Munnar',
    totalKm: '155',
    date: '2026-05-18',
    tripStatus: 'Completed',
    profitAmount: '4030',
  },
]

const defaultFleet = [
  { id: 'V-001', name: 'Innova Crysta', plate: 'KL-01-AB-1234', status: 'Active', brand: 'Toyota', type: 'SUV', assignedDriver: 'Rahul Krishnan' },
  { id: 'V-002', name: 'Winger', plate: 'KL-07-CD-5678', status: 'On Trip', brand: 'Tata', type: 'Van', assignedDriver: 'Suresh Mani' },
  { id: 'V-003', name: 'Ertiga', plate: 'KL-13-GH-3456', status: 'Maintenance', brand: 'Maruti Suzuki', type: 'SUV', assignedDriver: 'Mohammed Fasil' },
  { id: 'V-004', name: 'Traveller', plate: 'KL-11-EF-9012', status: 'Active', brand: 'Force', type: 'Van', assignedDriver: 'Abhijith P.S.' },
  { id: 'V-005', name: 'Dzire', plate: 'KL-05-IJ-7890', status: 'Active', brand: 'Maruti Suzuki', type: 'Sedan', assignedDriver: 'Vineeth Kumar' },
]

const defaultDrivers = [
  { id: 'D-001', name: 'Rahul Krishnan', phone: '+91 98450 12345', status: 'Approved', driverType: 'Full-time' },
  { id: 'D-002', name: 'Suresh Mani', phone: '+91 98450 54321', status: 'Approved', driverType: 'Contract' },
  { id: 'D-003', name: 'Mohammed Fasil', phone: '+91 88990 44332', status: 'Active', driverType: 'Full-time' },
  { id: 'D-004', name: 'Abhijith P.S.', phone: '+91 90480 88776', status: 'Approved', driverType: 'Full-time' },
  { id: 'D-005', name: 'Vineeth Kumar', phone: '+91 77665 55443', status: 'Pending', driverType: 'Contract' },
]

const createInitialFilters = () => ({
  startDate: '',
  endDate: '',
  driverName: '',
  vehicleName: '',
  vehicleNumber: '',
  clientName: '',
})

const normalize = (value) => (value || '').toString().trim().toLowerCase()

const includesValue = (source, target) => normalize(source).includes(normalize(target))

const formatCurrency = (value) => `Rs ${Number(value || 0).toLocaleString('en-IN')}`

const syncSeedRecords = (savedItems, seedItems, dateKeys = []) => {
  const seedIds = new Set(seedItems.map((item) => item.id))
  const preservedItems = savedItems.filter((item) => {
    if (seedIds.has(item.id)) return false
    return dateKeys.every((key) => !item[key] || String(item[key]).startsWith('2026-'))
  })

  return [...preservedItems, ...seedItems]
}

function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState('all')
  const [showFilters, setShowFilters] = useState(true)
  const [filters, setFilters] = useState(createInitialFilters)
  const [trips, setTrips] = useState([])
  const [fleet, setFleet] = useState([])
  const [drivers, setDrivers] = useState([])

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem('myTrips') || '[]')
    const savedFleet = JSON.parse(localStorage.getItem('myVehicles') || '[]')
    const savedDrivers = JSON.parse(localStorage.getItem('myDrivers') || '[]')

    const mergedTrips = syncSeedRecords(savedTrips, defaultTrips, ['date'])
    const mergedFleet = syncSeedRecords(savedFleet, defaultFleet)
    const mergedDrivers = syncSeedRecords(savedDrivers, defaultDrivers, ['joiningDate'])

    localStorage.setItem('myTrips', JSON.stringify(mergedTrips))
    localStorage.setItem('myVehicles', JSON.stringify(mergedFleet))
    localStorage.setItem('myDrivers', JSON.stringify(mergedDrivers))

    setTrips(mergedTrips)
    setFleet(mergedFleet)
    setDrivers(mergedDrivers)
  }, [])

  const vehicleLookup = fleet.reduce((acc, vehicle) => {
    acc[normalize(vehicle.plate)] = vehicle
    return acc
  }, {})

  const driverLookup = drivers.reduce((acc, driver) => {
    acc[normalize(driver.name)] = driver
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

  const enrichedTrips = trips.map((trip) => {
    const vehicle = vehicleLookup[normalize(trip.vehicleNumber)] || {}
    const driver = driverLookup[normalize(trip.driverName)] || {}

    return {
      ...trip,
      companyClientName: trip.companyClientName || '',
      vehicleName: trip.vehicleName || vehicle.name || '',
      vehicleStatus: vehicle.status || 'Not Set',
      vehicleBrand: vehicle.brand || '',
      vehicleType: vehicle.type || '',
      assignedDriver: vehicle.assignedDriver || '',
      driverType: trip.driverType || driver.driverType || '',
      driverPhone: trip.driverPhone || driver.phone || '',
      driverStatus: driver.status || 'Not Set',
    }
  })

  const filteredTrips = enrichedTrips.filter((trip) => {
    const tripDate = trip.date || ''
    const matchesDateRange = (!startDate || tripDate >= startDate) && (!endDate || tripDate <= endDate)
    const matchesDriver = !filters.driverName || includesValue(trip.driverName, filters.driverName)
    const matchesVehicleName = !filters.vehicleName || includesValue(trip.vehicleName, filters.vehicleName)
    const matchesVehicleNumber = !filters.vehicleNumber || includesValue(trip.vehicleNumber, filters.vehicleNumber)
    const matchesClient = !filters.clientName || includesValue(trip.companyClientName, filters.clientName)

    return matchesDateRange && matchesDriver && matchesVehicleName && matchesVehicleNumber && matchesClient
  })

  const filteredVehicles = Object.values(
    filteredTrips.reduce((acc, trip) => {
      const key = normalize(trip.vehicleNumber) || normalize(trip.vehicleName) || trip.id
      const existing = acc[key]

      if (existing) {
        existing.tripCount += 1
        existing.totalProfit += parseFloat(trip.profitAmount) || 0
        existing.lastTripDate = existing.lastTripDate > trip.date ? existing.lastTripDate : trip.date
        if (trip.companyClientName && !existing.clients.includes(trip.companyClientName)) {
          existing.clients.push(trip.companyClientName)
        }
        if (trip.driverName && !existing.drivers.includes(trip.driverName)) {
          existing.drivers.push(trip.driverName)
        }
        return acc
      }

      acc[key] = {
        id: key,
        name: trip.vehicleName || 'Vehicle name not added',
        plate: trip.vehicleNumber || '-',
        brand: trip.vehicleBrand || '-',
        type: trip.vehicleType || '-',
        status: trip.vehicleStatus || 'Not Set',
        tripCount: 1,
        totalProfit: parseFloat(trip.profitAmount) || 0,
        lastTripDate: trip.date || '-',
        clients: trip.companyClientName ? [trip.companyClientName] : [],
        drivers: trip.driverName ? [trip.driverName] : [],
      }
      return acc
    }, {})
  )

  const filteredDrivers = Object.values(
    filteredTrips.reduce((acc, trip) => {
      const key = normalize(trip.driverName) || trip.id
      const existing = acc[key]

      if (existing) {
        existing.tripCount += 1
        existing.totalProfit += parseFloat(trip.profitAmount) || 0
        existing.lastTripDate = existing.lastTripDate > trip.date ? existing.lastTripDate : trip.date
        if (trip.vehicleName && !existing.vehicleNames.includes(trip.vehicleName)) {
          existing.vehicleNames.push(trip.vehicleName)
        }
        if (trip.vehicleNumber && !existing.vehicleNumbers.includes(trip.vehicleNumber)) {
          existing.vehicleNumbers.push(trip.vehicleNumber)
        }
        if (trip.companyClientName && !existing.clients.includes(trip.companyClientName)) {
          existing.clients.push(trip.companyClientName)
        }
        return acc
      }

      acc[key] = {
        id: key,
        name: trip.driverName || 'Driver name not added',
        phone: trip.driverPhone || '-',
        driverType: trip.driverType || '-',
        status: trip.driverStatus || 'Not Set',
        tripCount: 1,
        totalProfit: parseFloat(trip.profitAmount) || 0,
        lastTripDate: trip.date || '-',
        vehicleNames: trip.vehicleName ? [trip.vehicleName] : [],
        vehicleNumbers: trip.vehicleNumber ? [trip.vehicleNumber] : [],
        clients: trip.companyClientName ? [trip.companyClientName] : [],
      }
      return acc
    }, {})
  )

  const totalProfit = filteredTrips.reduce((acc, curr) => acc + (parseFloat(curr.profitAmount) || 0), 0)
  const hasActiveFilters = Object.values(filters).some(Boolean)

  const stats = [
    { label: 'Vehicles In Result', val: filteredVehicles.length, icon: Truck, color: '#166534', bg: '#dcfce7' },
    { label: 'Drivers In Result', val: filteredDrivers.length, icon: User, color: '#1d4ed8', bg: '#dbeafe' },
    { label: 'Trips In Result', val: filteredTrips.length, icon: ClipboardList, color: '#92400e', bg: '#fef3c7' },
    { label: 'Profit In Result', val: formatCurrency(totalProfit), icon: IndianRupee, color: '#7c3aed', bg: '#ede9fe' },
  ]

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setFilters(createInitialFilters())
  }

  return (
    <div className="dashboard-content">
      <style>{`
        .dashboard-content { padding: 2rem; background: #f8fafc; min-height: 100vh; }
        .top-bar { display: flex; justify-content: space-between; align-items: flex-start; gap: 1.5rem; margin-bottom: 1.5rem; }
        .top-copy h1 { margin: 0; font-size: 2.15rem; font-weight: 900; color: #0f172a; }
        .top-copy p { margin: 0.55rem 0 0; color: #64748b; font-weight: 600; max-width: 760px; }
        .filter-toggle { display: inline-flex; align-items: center; gap: 0.65rem; padding: 0.9rem 1.1rem; border: 1px solid #dbe3ef; border-radius: 16px; background: #fff; font-weight: 800; cursor: pointer; color: #0f172a; }
        .filter-panel { background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%); border: 1px solid #dbe3ef; border-radius: 24px; padding: 1.4rem; margin-bottom: 1.75rem; box-shadow: 0 18px 45px rgba(15, 23, 42, 0.05); }
        .filter-head { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1.15rem; }
        .filter-title { display: flex; align-items: center; gap: 0.7rem; font-weight: 900; color: #0f172a; }
        .filter-sub { color: #64748b; font-size: 0.92rem; font-weight: 600; margin-top: 0.25rem; }
        .filter-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .ghost-btn, .clear-btn { border: 1px solid #dbe3ef; background: #fff; color: #0f172a; font-weight: 800; border-radius: 12px; padding: 0.82rem 1rem; cursor: pointer; }
        .clear-btn { color: #dc2626; }
        .filter-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 1rem; }
        .filter-group { display: flex; flex-direction: column; gap: 0.45rem; }
        .filter-group label { font-size: 0.74rem; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; color: #64748b; }
        .filter-input-wrap { position: relative; }
        .filter-input-wrap svg { position: absolute; left: 0.95rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .filter-input-wrap input { width: 100%; border-radius: 14px; border: 1px solid #dbe3ef; background: #fff; padding: 0.95rem 1rem 0.95rem 2.9rem; font-weight: 700; color: #0f172a; outline: none; }
        .filter-input-wrap input:focus { border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08); }
        .filter-summary { display: flex; flex-wrap: wrap; gap: 0.6rem; margin: 1rem 0 1.6rem; }
        .filter-chip { display: inline-flex; align-items: center; gap: 0.45rem; background: #e0f2fe; color: #0f172a; padding: 0.55rem 0.85rem; border-radius: 999px; font-size: 0.82rem; font-weight: 800; }
        .stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; margin-bottom: 1.75rem; }
        .stat-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 24px; padding: 1.35rem; display: flex; align-items: center; gap: 1rem; }
        .stat-icon { width: 52px; height: 52px; border-radius: 16px; display: grid; place-items: center; }
        .stat-label { display: block; font-size: 0.8rem; font-weight: 900; text-transform: uppercase; color: #64748b; margin-bottom: 0.3rem; }
        .stat-value { display: block; font-size: 1.35rem; font-weight: 900; color: #0f172a; }
        .dashboard-tabs { display: flex; flex-wrap: wrap; gap: 0.85rem; margin-bottom: 1.5rem; }
        .tab-btn { padding: 0.78rem 1.25rem; border-radius: 999px; font-weight: 800; border: 1px solid #dbe3ef; cursor: pointer; background: #fff; color: #475569; }
        .tab-btn.active { background: #0f172a; color: #fff; border-color: #0f172a; }
        .list-section { background: #fff; border-radius: 28px; border: 1px solid #e2e8f0; padding: 1.5rem; }
        .list-header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .list-title { font-size: 1.2rem; font-weight: 900; color: #0f172a; }
        .list-note { color: #64748b; font-weight: 700; font-size: 0.92rem; }
        .segment-card { border: 1px solid #edf2f7; border-radius: 22px; padding: 1rem; background: #fbfdff; }
        .segment-card + .segment-card { margin-top: 1rem; }
        .segment-head { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 0.85rem; }
        .segment-head h3 { margin: 0; font-size: 1rem; font-weight: 900; color: #0f172a; }
        .segment-count { color: #64748b; font-size: 0.85rem; font-weight: 800; }
        .item-row { display: grid; grid-template-columns: 1.55fr 1.2fr 1.1fr 0.9fr 24px; gap: 0.9rem; align-items: center; padding: 1rem 0.2rem; border-bottom: 1px solid #eef2f7; }
        .item-row:last-child { border-bottom: none; }
        .item-title { color: #0f172a; font-size: 0.95rem; font-weight: 900; }
        .item-label { display: inline-flex; margin-bottom: 0.35rem; font-size: 0.7rem; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }
        .item-subtitle { color: #64748b; font-size: 0.84rem; font-weight: 700; }
        .item-meta { color: #475569; font-size: 0.84rem; font-weight: 700; }
        .status-badge { width: fit-content; padding: 0.42rem 0.78rem; border-radius: 999px; font-size: 0.75rem; font-weight: 900; }
        .status-active { background: #dcfce7; color: #166534; }
        .status-completed { background: #dbeafe; color: #1d4ed8; }
        .status-maintenance { background: #fee2e2; color: #b91c1c; }
        .status-default { background: #e2e8f0; color: #475569; }
        .empty-state { padding: 2.25rem 1rem; text-align: center; color: #64748b; font-weight: 700; }
        .mono { font-family: Consolas, monospace; font-weight: 800; color: #0f172a; }

        @media (max-width: 1380px) {
          .filter-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        @media (max-width: 1080px) {
          .dashboard-content { padding: 1.25rem; }
          .top-bar, .filter-head, .list-header { flex-direction: column; align-items: flex-start; }
          .stat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .item-row { grid-template-columns: 1fr; gap: 0.45rem; padding: 1rem 0; }
        }

        @media (max-width: 720px) {
          .filter-grid, .stat-grid { grid-template-columns: 1fr; }
          .filter-toggle, .ghost-btn, .clear-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <header className="top-bar">
        <div className="top-copy">
          <h1>Operations Dashboard</h1>
          <p>
            Filter trip records by start date and end date first, then narrow the results by driver name,
            vehicle name, vehicle number, and client name from one dashboard view.
          </p>
        </div>
        <button className="filter-toggle" onClick={() => setShowFilters((current) => !current)}>
          <Filter size={18} />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </header>

      {showFilters && (
        <section className="filter-panel">
          <div className="filter-head">
            <div>
              <div className="filter-title">
                <CalendarRange size={20} />
                <span>Comprehensive Filters</span>
              </div>
              <div className="filter-sub">
                Date range first, then driver name, vehicle name, vehicle number, and client name.
              </div>
            </div>
            <div className="filter-actions">
              <button className="ghost-btn" onClick={() => setActiveTab('trips')}>Focus Trip Logs</button>
              <button className="clear-btn" onClick={clearFilters}>Clear Filters</button>
            </div>
          </div>

          <div className="filter-grid">
            <div className="filter-group">
              <label>Start Date</label>
              <div className="filter-input-wrap">
                <CalendarRange size={16} />
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>End Date</label>
              <div className="filter-input-wrap">
                <CalendarRange size={16} />
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Driver Name</label>
              <div className="filter-input-wrap">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Filter by driver"
                  value={filters.driverName}
                  onChange={(e) => handleFilterChange('driverName', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Vehicle Name</label>
              <div className="filter-input-wrap">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Filter by vehicle name"
                  value={filters.vehicleName}
                  onChange={(e) => handleFilterChange('vehicleName', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Vehicle Number</label>
              <div className="filter-input-wrap">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Filter by plate number"
                  value={filters.vehicleNumber}
                  onChange={(e) => handleFilterChange('vehicleNumber', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Client Name</label>
              <div className="filter-input-wrap">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Filter by client/company"
                  value={filters.clientName}
                  onChange={(e) => handleFilterChange('clientName', e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {hasActiveFilters && (
        <div className="filter-summary">
          {(startDate || endDate) && (
            <div className="filter-chip">
              <CalendarRange size={14} />
              <span>{startDate || 'Any'} to {endDate || 'Any'}</span>
            </div>
          )}
          {filters.driverName && <div className="filter-chip">Driver: {filters.driverName}</div>}
          {filters.vehicleName && <div className="filter-chip">Vehicle: {filters.vehicleName}</div>}
          {filters.vehicleNumber && <div className="filter-chip">Number: {filters.vehicleNumber}</div>}
          {filters.clientName && <div className="filter-chip">Client: {filters.clientName}</div>}
        </div>
      )}

      <div className="stat-grid">
        {stats.map((item) => (
          <div className="stat-card" key={item.label}>
            <div className="stat-icon" style={{ background: item.bg, color: item.color }}>
              <item.icon size={24} />
            </div>
            <div>
              <span className="stat-label">{item.label}</span>
              <span className="stat-value">{item.val}</span>
            </div>
          </div>
        ))}
      </div>

      <nav className="dashboard-tabs">
        <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>Combined View</button>
        <button className={`tab-btn ${activeTab === 'vehicles' ? 'active' : ''}`} onClick={() => setActiveTab('vehicles')}>Vehicles</button>
        <button className={`tab-btn ${activeTab === 'drivers' ? 'active' : ''}`} onClick={() => setActiveTab('drivers')}>Drivers</button>
        <button className={`tab-btn ${activeTab === 'trips' ? 'active' : ''}`} onClick={() => setActiveTab('trips')}>Trip Logs</button>
      </nav>

      <section className="list-section">
        <div className="list-header">
          <div className="list-title">
            {activeTab === 'all' && 'Combined Result'}
            {activeTab === 'vehicles' && `Vehicles (${filteredVehicles.length})`}
            {activeTab === 'drivers' && `Drivers (${filteredDrivers.length})`}
            {activeTab === 'trips' && `Trips (${filteredTrips.length})`}
          </div>
          <div className="list-note">
            {filteredTrips.length > 0
              ? 'Matching records are shown using the selected date range and field filters.'
              : 'No trip data matched the current filters.'}
          </div>
        </div>

        {activeTab === 'all' && (
          <>
            <div className="segment-card">
              <div className="segment-head">
                <h3>Trip Matches</h3>
                <div className="segment-count">{filteredTrips.length} records</div>
              </div>
              {filteredTrips.slice(0, 5).map((trip) => (
                <div className="item-row" key={trip.id}>
                  <div>
                    <div className="item-label" style={{ color: '#2563eb' }}>Trip</div>
                    <div className="item-title">{trip.fromLocation} to {trip.toLocation}</div>
                  </div>
                  <div className="item-subtitle">{trip.driverName} • {trip.vehicleName || trip.vehicleNumber}</div>
                  <div className="item-meta">{trip.companyClientName || 'Client not added'}</div>
                  <div className={`status-badge ${trip.tripStatus === 'Completed' ? 'status-completed' : trip.tripStatus === 'Active' ? 'status-active' : 'status-default'}`}>
                    {trip.tripStatus}
                  </div>
                  <ChevronRight size={18} color="#94a3b8" />
                </div>
              ))}
              {filteredTrips.length === 0 && <div className="empty-state">No trip records matched. Try adjusting the date range or text filters.</div>}
            </div>

            <div className="segment-card">
              <div className="segment-head">
                <h3>Vehicle Matches</h3>
                <div className="segment-count">{filteredVehicles.length} vehicles</div>
              </div>
              {filteredVehicles.slice(0, 4).map((vehicle) => (
                <div className="item-row" key={vehicle.id}>
                  <div>
                    <div className="item-label" style={{ color: '#16a34a' }}>Vehicle</div>
                    <div className="item-title">{vehicle.name}</div>
                  </div>
                  <div className="item-subtitle mono">{vehicle.plate}</div>
                  <div className="item-meta">{vehicle.clients.join(', ') || 'Client not added'}</div>
                  <div className={`status-badge ${vehicle.status === 'Active' ? 'status-active' : vehicle.status === 'On Trip' ? 'status-completed' : vehicle.status === 'Maintenance' ? 'status-maintenance' : 'status-default'}`}>
                    {vehicle.status}
                  </div>
                  <ChevronRight size={18} color="#94a3b8" />
                </div>
              ))}
              {filteredVehicles.length === 0 && <div className="empty-state">No vehicles matched. Try changing the vehicle name or vehicle number filters.</div>}
            </div>

            <div className="segment-card">
              <div className="segment-head">
                <h3>Driver Matches</h3>
                <div className="segment-count">{filteredDrivers.length} drivers</div>
              </div>
              {filteredDrivers.slice(0, 4).map((driver) => (
                <div className="item-row" key={driver.id}>
                  <div>
                    <div className="item-label" style={{ color: '#f59e0b' }}>Driver</div>
                    <div className="item-title">{driver.name}</div>
                  </div>
                  <div className="item-subtitle">{driver.vehicleNames.join(', ') || 'Vehicle not linked'}</div>
                  <div className="item-meta">{driver.clients.join(', ') || 'Client not added'}</div>
                  <div className={`status-badge ${driver.status === 'Approved' || driver.status === 'Active' ? 'status-active' : 'status-default'}`}>
                    {driver.status}
                  </div>
                  <ChevronRight size={18} color="#94a3b8" />
                </div>
              ))}
              {filteredDrivers.length === 0 && <div className="empty-state">No drivers matched. Try changing the driver filter or the selected date range.</div>}
            </div>
          </>
        )}

        {activeTab === 'vehicles' && (
          <>
            {filteredVehicles.map((vehicle) => (
              <div className="item-row" key={vehicle.id}>
                <div>
                  <div className="item-title">{vehicle.name}</div>
                  <div className="item-subtitle">{vehicle.brand} • {vehicle.type}</div>
                </div>
                <div className="item-subtitle mono">{vehicle.plate}</div>
                <div className="item-meta">
                  {vehicle.tripCount} trips • {vehicle.drivers.join(', ') || 'Driver not linked'}
                </div>
                <div className={`status-badge ${vehicle.status === 'Active' ? 'status-active' : vehicle.status === 'On Trip' ? 'status-completed' : vehicle.status === 'Maintenance' ? 'status-maintenance' : 'status-default'}`}>
                  {vehicle.status}
                </div>
                <ChevronRight size={18} color="#94a3b8" />
              </div>
            ))}
            {filteredVehicles.length === 0 && <div className="empty-state">No vehicle records were found for the selected filters.</div>}
          </>
        )}

        {activeTab === 'drivers' && (
          <>
            {filteredDrivers.map((driver) => (
              <div className="item-row" key={driver.id}>
                <div>
                  <div className="item-title">{driver.name}</div>
                  <div className="item-subtitle">{driver.phone}</div>
                </div>
                <div className="item-subtitle">{driver.vehicleNames.join(', ') || 'Vehicle not linked'}</div>
                <div className="item-meta">
                  {driver.tripCount} trips • {driver.clients.join(', ') || 'Client not added'}
                </div>
                <div className={`status-badge ${driver.status === 'Approved' || driver.status === 'Active' ? 'status-active' : 'status-default'}`}>
                  {driver.status}
                </div>
                <ChevronRight size={18} color="#94a3b8" />
              </div>
            ))}
            {filteredDrivers.length === 0 && <div className="empty-state">No driver records were found for the selected filters.</div>}
          </>
        )}

        {activeTab === 'trips' && (
          <>
            {filteredTrips.map((trip) => (
              <div className="item-row" key={trip.id}>
                <div>
                  <div className="item-title">{trip.fromLocation} to {trip.toLocation}</div>
                  <div className="item-subtitle">{trip.date}</div>
                </div>
                <div className="item-subtitle">
                  {trip.driverName} • {trip.vehicleName || trip.vehicleNumber}
                </div>
                <div className="item-meta">
                  {trip.companyClientName || 'Client not added'} • {formatCurrency(trip.profitAmount)}
                </div>
                <div className={`status-badge ${trip.tripStatus === 'Completed' ? 'status-completed' : trip.tripStatus === 'Active' ? 'status-active' : 'status-default'}`}>
                  {trip.tripStatus}
                </div>
                <ChevronRight size={18} color="#94a3b8" />
              </div>
            ))}
            {filteredTrips.length === 0 && <div className="empty-state">No trips matched the selected date range and field filters.</div>}
          </>
        )}
      </section>
    </div>
  )
}

export default ProviderDashboard
