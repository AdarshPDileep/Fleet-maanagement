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
  Download,
  Tag
} from 'lucide-react'
import { downloadCsv, exportRowsToPdf } from '../../utils/exportUtils'

const createTripFilters = () => ({
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

function TripManager() {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [trips, setTrips] = useState([])
  const [fleet, setFleet] = useState([])
  const [editingTrip, setEditingTrip] = useState(null)
  const [viewingTrip, setViewingTrip] = useState(null)
  
  // Filter States
  const [filters, setFilters] = useState(createTripFilters)
  const [selectedTrips, setSelectedTrips] = useState([])

  useEffect(() => {
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
        id: 'T-9842', 
        date: '2026-04-24',
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
        date: '2026-04-23',
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
        date: '2026-04-22',
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
        date: '2026-04-25',
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
        date: '2026-04-21',
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
      },
      {
        id: 'T-3318',
        date: '2026-01-12',
        driverName: 'Rahul Krishnan',
        vehicleNumber: 'KL-01-AB-1234',
        companyClientName: 'Green Valley Traders',
        fromLocation: 'Trivandrum',
        toLocation: 'Kollam',
        startKm: '120210',
        endKm: '120305',
        totalKm: '95',
        advanceFromSuresh: '400',
        advanceFromCompany: '900',
        totalAdvance: '1300',
        dieselExpense: '900',
        maintenanceExpense: '0',
        otherExpense: '120',
        parkingExpense: '20',
        tollExpense: '60',
        foodExpense: '150',
        driverBatta: '500',
        totalExpense: '1750',
        goodsRent: '4300',
        balanceAmount: '3000',
        profitAmount: '2550',
        paymentStatus: 'Paid',
        paymentMode: 'UPI',
        tripStatus: 'Completed',
        note: 'Early morning supply trip'
      },
      {
        id: 'T-4412',
        date: '2026-02-08',
        driverName: 'Abhijith P.S.',
        vehicleNumber: 'KL-11-EF-9012',
        companyClientName: 'Metro Foods',
        fromLocation: 'Kozhikode',
        toLocation: 'Kannur',
        startKm: '24110',
        endKm: '24235',
        totalKm: '125',
        advanceFromSuresh: '500',
        advanceFromCompany: '1200',
        totalAdvance: '1700',
        dieselExpense: '1250',
        maintenanceExpense: '100',
        otherExpense: '80',
        parkingExpense: '40',
        tollExpense: '0',
        foodExpense: '180',
        driverBatta: '550',
        totalExpense: '2200',
        goodsRent: '5200',
        balanceAmount: '3500',
        profitAmount: '3000',
        paymentStatus: 'Partial',
        paymentMode: 'Bank Transfer',
        tripStatus: 'Completed',
        note: 'Food distribution route'
      },
      {
        id: 'T-7755',
        date: '2026-03-17',
        driverName: 'Suresh Mani',
        vehicleNumber: 'KL-07-CD-5678',
        companyClientName: 'Blue Star Agencies',
        fromLocation: 'Ernakulam',
        toLocation: 'Thrissur',
        startKm: '80310',
        endKm: '80405',
        totalKm: '95',
        advanceFromSuresh: '600',
        advanceFromCompany: '1000',
        totalAdvance: '1600',
        dieselExpense: '980',
        maintenanceExpense: '50',
        otherExpense: '100',
        parkingExpense: '30',
        tollExpense: '70',
        foodExpense: '200',
        driverBatta: '600',
        totalExpense: '2030',
        goodsRent: '4900',
        balanceAmount: '3300',
        profitAmount: '2870',
        paymentStatus: 'Paid',
        paymentMode: 'Cash',
        tripStatus: 'Completed',
        note: 'Festival season delivery'
      },
      {
        id: 'T-6620',
        date: '2026-05-02',
        driverName: 'Mohammed Fasil',
        vehicleNumber: 'KL-13-GH-3456',
        companyClientName: 'Classic Home Needs',
        fromLocation: 'Palakkad',
        toLocation: 'Thrissur',
        startKm: '38940',
        endKm: '39055',
        totalKm: '115',
        advanceFromSuresh: '700',
        advanceFromCompany: '900',
        totalAdvance: '1600',
        dieselExpense: '1100',
        maintenanceExpense: '0',
        otherExpense: '90',
        parkingExpense: '25',
        tollExpense: '80',
        foodExpense: '160',
        driverBatta: '500',
        totalExpense: '1955',
        goodsRent: '5100',
        balanceAmount: '3500',
        profitAmount: '3145',
        paymentStatus: 'Pending',
        paymentMode: 'UPI',
        tripStatus: 'Active',
        note: 'Ongoing store replenishment'
      },
      {
        id: 'T-9904',
        date: '2026-05-18',
        driverName: 'Vineeth Kumar',
        vehicleNumber: 'KL-05-IJ-7890',
        companyClientName: 'Sunrise Family Tour',
        fromLocation: 'Kottayam',
        toLocation: 'Munnar',
        startKm: '66020',
        endKm: '66175',
        totalKm: '155',
        advanceFromSuresh: '1200',
        advanceFromCompany: '0',
        totalAdvance: '1200',
        dieselExpense: '1350',
        maintenanceExpense: '0',
        otherExpense: '60',
        parkingExpense: '50',
        tollExpense: '0',
        foodExpense: '260',
        driverBatta: '650',
        totalExpense: '2370',
        goodsRent: '6400',
        balanceAmount: '5200',
        profitAmount: '4030',
        paymentStatus: 'Partial',
        paymentMode: 'Cash',
        tripStatus: 'Completed',
        note: 'Weekend hill station package'
      }
    ]
    const mergedTrips = syncSeedRecords(savedTrips, defaults, ['date'])
    const mergedFleet = syncSeedRecords(savedFleet, demoFleet)
    localStorage.setItem('myTrips', JSON.stringify(mergedTrips))
    localStorage.setItem('myVehicles', JSON.stringify(mergedFleet))
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

  const enrichedTrips = trips.map((trip) => ({
    ...trip,
    vehicleName: trip.vehicleName || vehicleLookup[normalizeValue(trip.vehicleNumber)]?.name || '',
  }))

  const filteredTrips = enrichedTrips.filter((trip) => {
    const tripDate = trip.date || ''
    const matchesDateRange = (!startDate || tripDate >= startDate) && (!endDate || tripDate <= endDate)
    const matchesDriver = !filters.driverName || includesValue(trip.driverName, filters.driverName) || includesValue(trip.secondaryDriverName, filters.driverName)
    const matchesVehicleName = !filters.vehicleName || includesValue(trip.vehicleName, filters.vehicleName)
    const matchesVehicleNumber = !filters.vehicleNumber || includesValue(trip.vehicleNumber, filters.vehicleNumber)
    const matchesClient = !filters.clientName || includesValue(trip.companyClientName, filters.clientName)
    const matchesStatus = !filters.status || trip.tripStatus === filters.status

    return matchesDateRange && matchesDriver && matchesVehicleName && matchesVehicleNumber && matchesClient && matchesStatus
  })

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setFilters(createTripFilters())
  }

  const getExportableTrips = () =>
    selectedTrips.length > 0
      ? filteredTrips.filter((trip) => selectedTrips.includes(trip.id))
      : filteredTrips

  const toggleSelectAll = () => {
    if (selectedTrips.length === filteredTrips.length) {
      setSelectedTrips([]);
    } else {
      setSelectedTrips(filteredTrips.map(t => t.id));
    }
  };

  const toggleSelectTrip = (id) => {
    setSelectedTrips(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

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
      secondaryDriverName: formData.get('secondaryDriverName'),
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
    const dataToExport = getExportableTrips()

    const rows = dataToExport.map(t => [
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

    downloadCsv({
      headers,
      rows,
      fileName: `Trips_Report_${new Date().toISOString().slice(0,10)}.csv`,
    })
  }

  const handleExportPdf = () => {
    const headers = ['Date', 'Driver', 'Vehicle', 'Client', 'From', 'To', 'Total KM', 'Diesel', 'Advance', 'Rent', 'Profit', 'Status']
    const rows = getExportableTrips().map((trip) => [
      trip.date,
      trip.secondaryDriverName ? `${trip.driverName} + ${trip.secondaryDriverName}` : trip.driverName,
      trip.vehicleNumber,
      trip.companyClientName,
      trip.fromLocation,
      trip.toLocation,
      trip.totalKm,
      trip.dieselExpense,
      trip.totalAdvance,
      trip.goodsRent,
      trip.profitAmount,
      trip.tripStatus,
    ])

    exportRowsToPdf({
      title: 'Trip Report',
      headers,
      rows,
      fileName: `Trips_Report_${new Date().toISOString().slice(0,10)}.pdf`,
    })
  }

  const handleExportSingle = (t) => {
    const headers = ['Field', 'Value'];
    const data = [
      ['Trip ID', t.id],
      ['Date', t.date],
      ['Driver 1', t.driverName],
      ['Driver 2', t.secondaryDriverName || 'N/A'],
      ['Vehicle', t.vehicleNumber],
      ['Client', t.companyClientName],
      ['From', t.fromLocation],
      ['To', t.toLocation],
      ['Total KM', t.totalKm],
      ['Diesel', t.dieselExpense],
      ['Maintenance', t.maintenanceExpense],
      ['Tolls', t.tollExpense],
      ['Parking', t.parkingExpense],
      ['Food', t.foodExpense],
      ['Driver Batta', t.driverBatta],
      ['Other Exp', t.otherExpense],
      ['Total Expense', t.totalExpense],
      ['Goods Rent', t.goodsRent],
      ['Total Advance', t.totalAdvance],
      ['Profit Amount', t.profitAmount],
      ['Payment Status', t.paymentStatus],
      ['Payment Mode', t.paymentMode],
      ['Balance', t.balanceAmount],
      ['Status', t.tripStatus],
      ['Notes', t.note]
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...data.map(r => r.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Trip_${t.id}_Details.csv`);
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

        /* ── Table ── */
        .table-card { background: #fff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.05); }
        .m-table { width: 100%; border-collapse: collapse; text-align: left; }
        .m-table thead tr { background: linear-gradient(135deg, #0f172a, #1e293b); }
        .m-table th { padding: 1rem 0.75rem; font-size: 0.65rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; white-space: nowrap; border: none; }
        .m-table th:first-child { padding-left: 1.5rem; border-radius: 0; }
        .m-table th:last-child { padding-right: 1.5rem; }
        .m-table tbody tr { transition: background 0.15s; }
        .m-table tbody tr:nth-child(odd) { background: #fff; }
        .m-table tbody tr:nth-child(even) { background: #fafbfc; }
        .m-table tbody tr:hover { background: #eff6ff; }
        .m-table tbody tr.selected-row { background: #eff6ff; }
        .m-table td { padding: 0.9rem 0.75rem; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #1e293b; font-size: 0.82rem; }
        .m-table td:first-child { padding-left: 1.5rem; }
        .m-table td:last-child { padding-right: 1.5rem; }
        .m-table tbody tr:last-child td { border-bottom: none; }

        /* Checkbox Style */
        .m-checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #3b82f6;
          border-radius: 4px;
        }

        .action-btns { display: flex; gap: 0.4rem; }
        .icon-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; display: grid; place-items: center; cursor: pointer; transition: all 0.15s; background: #fff; color: #94a3b8; }
        .icon-btn:hover { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
        .icon-btn.view:hover { border-color: #6366f1; color: #6366f1; background: #eef2ff; }

        .trip-badge { padding: 0.3rem 0.7rem; border-radius: 6px; font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap; }
        .tb-completed { background: #dcfce7; color: #15803d; }
        .tb-active { background: #dbeafe; color: #1d4ed8; }
        .tb-cancelled { background: #fee2e2; color: #b91c1c; }

        /* ── Modal System ── */
        .form-overlay, .detail-overlay { position: fixed; inset: 0; background: rgba(2, 8, 23, 0.7); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem; }
        .form-card, .detail-card { background: #fff; border-radius: 28px; width: 100%; max-width: 1120px; position: relative; max-height: 93vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 40px 80px -20px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.08); }

        /* ── Modal Header ── */
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

        /* ── Modal Body ── */
        .modal-body { overflow-y: auto; padding: 2rem 2.5rem; flex: 1; }
        .modal-body::-webkit-scrollbar { width: 5px; } 
        .modal-body::-webkit-scrollbar-track { background: #f8fafc; } 
        .modal-body::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 99px; }

        /* ── Form Grid ── */
        .form-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .form-section-title { grid-column: span 4; font-size: 0.75rem; font-weight: 800; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.08em; margin: 1.5rem 0 0.25rem; padding: 0 0 0.6rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 0.6rem; }
        .form-section-title svg { color: #3b82f6; }
        .form-group { display: flex; flex-direction: column; gap: 0.45rem; }
        .form-group label { font-size: 0.78rem; font-weight: 700; color: #64748b; display: flex; align-items: center; gap: 0.35rem; }
        .form-group input, .form-group select, .form-group textarea { padding: 0.8rem 1rem; border-radius: 10px; border: 1.5px solid #e2e8f0; font-weight: 600; outline: none; transition: all 0.18s; font-family: inherit; color: #0f172a; background: #fff; font-size: 0.9rem; }
        .form-group input::placeholder { color: #cbd5e1; font-weight: 500; }
        .form-group input:hover, .form-group select:hover { border-color: #cbd5e1; background: #fafafa; }
        .form-group input:focus, .form-group select:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.12); background: #fff; }
        .form-group.span-2 { grid-column: span 2; }
        .form-group.span-4 { grid-column: span 4; }

        /* ── Detail Grid ── */
        .detail-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
        .detail-section-title { grid-column: span 4; font-size: 0.75rem; font-weight: 800; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.08em; margin: 1.5rem 0 0.25rem; padding: 0 0 0.6rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 0.6rem; }
        .detail-item { background: #f8fafc; padding: 1rem 1.1rem; border-radius: 12px; border: 1px solid #f1f5f9; transition: all 0.15s; }
        .detail-item:hover { border-color: #dbeafe; background: #eff6ff; }
        .detail-label { font-size: 0.68rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.3rem; }
        .detail-value { font-size: 1rem; font-weight: 800; color: #0f172a; }
        .detail-value.highlight { color: #3b82f6; }
        .detail-item.span-2 { grid-column: span 2; }
        .detail-item.span-4 { grid-column: span 4; }
        .detail-item.accent-green { background: #f0fdf4; border-color: #bbf7d0; }
        .detail-item.accent-red { background: #fef2f2; border-color: #fecaca; }
        .detail-item.accent-amber { background: #fffbeb; border-color: #fed7aa; }

        /* ── Modal Footer ── */
        .modal-footer { padding: 1.25rem 2.5rem 1.75rem; border-top: 1px solid #f1f5f9; display: flex; gap: 0.75rem; flex-shrink: 0; }
        .btn-save { background: #0f172a; color: #fff; padding: 0.85rem 1.8rem; border-radius: 12px; font-weight: 700; cursor: pointer; border: none; font-size: 0.9rem; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; flex: 1; justify-content: center; }
        .btn-save:hover { background: #1e293b; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(15,23,42,0.2); }
        .btn-save:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .btn-save.green { background: linear-gradient(135deg, #22c55e, #16a34a); }
        .btn-save.green:hover { background: linear-gradient(135deg, #16a34a, #15803d); box-shadow: 0 8px 20px rgba(34,197,94,0.25); }
        .btn-save.secondary { background: #f1f5f9; color: #475569; box-shadow: none; }
        .btn-save.secondary:hover { background: #e2e8f0; color: #0f172a; transform: none; box-shadow: none; }

        .stat-preview { background: linear-gradient(135deg, #0f172a, #1e293b); padding: 1.5rem 2rem; border-radius: 16px; grid-column: span 4; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 0.5rem; }
        .stat-item { display: flex; flex-direction: column; gap: 0.15rem; }
        .stat-label { font-size: 0.7rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; }
        .stat-value { font-size: 1.3rem; font-weight: 900; color: #fff; }
        .stat-value.profit { color: #4ade80; }
        .stat-value.expense { color: #f87171; }

        @keyframes fadeIn { from { opacity: 0; transform: scale(0.96) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

        /* ── Filter Panel ── */
        .filter-panel { background: #fff; border-radius: 20px; border: 1px solid #e2e8f0; margin-bottom: 2rem; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.04); }
        .filter-panel-header { display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.5rem; border-bottom: 1px solid #f1f5f9; background: linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%); }
        .filter-panel-title { display: flex; align-items: center; gap: 0.65rem; font-size: 0.82rem; font-weight: 800; color: #334155; text-transform: uppercase; letter-spacing: 0.06em; }
        .filter-panel-title svg { color: #3b82f6; }
        .filter-active-badge { background: #3b82f6; color: #fff; font-size: 0.65rem; font-weight: 900; padding: 0.2rem 0.55rem; border-radius: 99px; letter-spacing: 0.02em; }
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
        .filter-field label svg { color: #3b82f6; opacity: 0.8; }
        .filter-input-wrap { position: relative; }
        .filter-input-wrap .f-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: #c4cdd8; pointer-events: none; display: flex; }
        .filter-input-wrap input, .filter-input-wrap select { width: 100%; padding: 0.65rem 0.9rem 0.65rem 2.5rem; border-radius: 10px; border: 1.5px solid #e9eef5; background: #f8fafc; font-weight: 600; color: #1e293b; outline: none; transition: all 0.18s; font-family: inherit; font-size: 0.85rem; box-sizing: border-box; }
        .filter-input-wrap input::placeholder { color: #b8c4d0; font-weight: 500; }
        .filter-input-wrap input:hover, .filter-input-wrap select:hover { border-color: #c7d4e4; background: #f4f7fb; }
        .filter-input-wrap input:focus, .filter-input-wrap select:focus { border-color: #3b82f6; background: #fff; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
        .filter-input-wrap input[type=date]::-webkit-calendar-picker-indicator { opacity: 0.5; cursor: pointer; }
        .filter-chips-row { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; padding: 0.75rem 1.5rem 1rem; border-top: 1px dashed #f0f3f8; }
        .filter-chip { display: inline-flex; align-items: center; gap: 0.4rem; background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 0.3rem 0.55rem 0.3rem 0.75rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700; }
        .filter-chip-remove { display: flex; align-items: center; background: none; border: none; cursor: pointer; color: #93c5fd; padding: 0; line-height: 1; transition: color 0.15s; }
        .filter-chip-remove:hover { color: #1d4ed8; }
        .filter-chips-label { font-size: 0.72rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; }

        .btn-download { background: #0f172a; color: #fff; padding: 0.8rem 1.2rem; border-radius: 12px; font-weight: 800; border: none; cursor: pointer; transition: 0.2s; height: 48px; display: flex; align-items: center; gap: 0.6rem; }
        .btn-download:hover { background: #1e293b; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2); }
      `}</style>

      <div className="manager-container">
        <header className="m-header">
          <div>
            <h1>Trip Operations Log</h1>
            <p style={{color:'#64748b', fontWeight:600, marginTop:'0.4rem'}}>Comprehensive tracking for every journey</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-end'}}>
            <button className="btn-add" onClick={() => { setEditingTrip(null); setShowForm(true); }}>
              <Plus size={22} /> Log New Trip
            </button>
            <div style={{display:'flex', gap:'0.6rem', flexWrap:'wrap', justifyContent:'flex-end'}}>
              <button className="btn-download" onClick={handleExport} style={{height: '40px', padding: '0.6rem 1.2rem', fontSize: '0.85rem'}}>
                <Download size={16} /> {selectedTrips.length > 0 ? `Export CSV (${getExportableTrips().length})` : 'Export CSV'}
              </button>
              <button className="btn-download" onClick={handleExportPdf} style={{height: '40px', padding: '0.6rem 1.2rem', fontSize: '0.85rem'}}>
                <FileText size={16} /> {selectedTrips.length > 0 ? `Export PDF (${getExportableTrips().length})` : 'Export PDF'}
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
              {/* Panel Header */}
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
                    <span>{filteredTrips.length}</span> of {trips.length} trips
                  </span>
                  {activeFilters.length > 0 && (
                    <button className="btn-clear-all" onClick={clearFilters}>
                      <X size={13} /> Clear all
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Inputs Grid */}
              <div className="filter-panel-body">
                <div className="filter-grid">
                  {/* Start Date */}
                  <div className="filter-field">
                    <label><Calendar size={11} /> Start Date</label>
                    <div className="filter-input-wrap">
                      <span className="f-icon"><Calendar size={14} /></span>
                      <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => handleFilterChange('startDate', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="filter-field">
                    <label><Calendar size={11} /> End Date</label>
                    <div className="filter-input-wrap">
                      <span className="f-icon"><Calendar size={14} /></span>
                      <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => handleFilterChange('endDate', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Driver */}
                  <div className="filter-field">
                    <label><User size={11} /> Driver</label>
                    <div className="filter-input-wrap">
                      <span className="f-icon"><User size={14} /></span>
                      <input
                        type="text"
                        placeholder="Search driver…"
                        value={filters.driverName}
                        onChange={(e) => handleFilterChange('driverName', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Vehicle Name */}
                  <div className="filter-field">
                    <label><Car size={11} /> Vehicle</label>
                    <div className="filter-input-wrap">
                      <span className="f-icon"><Car size={14} /></span>
                      <input
                        type="text"
                        placeholder="Search vehicle…"
                        value={filters.vehicleName}
                        onChange={(e) => handleFilterChange('vehicleName', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Vehicle Number */}
                  <div className="filter-field">
                    <label><Tag size={11} /> Plate No.</label>
                    <div className="filter-input-wrap">
                      <span className="f-icon"><Tag size={14} /></span>
                      <input
                        type="text"
                        placeholder="e.g. KL-01…"
                        value={filters.vehicleNumber}
                        onChange={(e) => handleFilterChange('vehicleNumber', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Client */}
                  <div className="filter-field">
                    <label><Search size={11} /> Client</label>
                    <div className="filter-input-wrap">
                      <span className="f-icon"><Search size={14} /></span>
                      <input
                        type="text"
                        placeholder="Search client…"
                        value={filters.clientName}
                        onChange={(e) => handleFilterChange('clientName', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="filter-field" style={{ gridColumn: 'span 6' }}>
                    <label><Activity size={11} /> Trip Status</label>
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.15rem' }}>
                      {['', 'Active', 'Completed', 'Cancelled'].map((s) => (
                        <button
                          key={s}
                          onClick={() => handleFilterChange('status', s)}
                          style={{
                            padding: '0.42rem 1.05rem',
                            borderRadius: '8px',
                            border: '1.5px solid',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.18s',
                            fontFamily: 'inherit',
                            borderColor: filters.status === s ? '#3b82f6' : '#e2e8f0',
                            background: filters.status === s
                              ? (s === 'Active' ? '#dbeafe' : s === 'Completed' ? '#dcfce7' : s === 'Cancelled' ? '#fee2e2' : '#3b82f6')
                              : '#f8fafc',
                            color: filters.status === s
                              ? (s === 'Active' ? '#1d4ed8' : s === 'Completed' ? '#15803d' : s === 'Cancelled' ? '#b91c1c' : '#fff')
                              : '#64748b',
                          }}
                        >
                          {s === '' ? 'All Trips' : s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Filter Chips Row */}
              {activeFilters.filter(([k]) => k !== 'status').length > 0 && (
                <div className="filter-chips-row">
                  <span className="filter-chips-label">Active:</span>
                  {activeFilters.filter(([k]) => k !== 'status').map(([key, val]) => (
                    <span key={key} className="filter-chip">
                      <span style={{ color: '#64748b', fontWeight: 600 }}>{filterLabels[key]}:</span>
                      &nbsp;{val}
                      <button className="filter-chip-remove" onClick={() => handleFilterChange(key, '')}>
                        <X size={12} />
                      </button>
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
                    checked={filteredTrips.length > 0 && selectedTrips.length === filteredTrips.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Date</th>
                <th>Driver(s)</th>
                <th>Vehicle</th>
                <th>Client / Company</th>
                <th>Route</th>
                <th>Advances</th>
                <th>KM</th>
                <th>Diesel</th>
                <th>Batta</th>
                <th>Rent</th>
                <th>Profit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.map(trip => (
                <tr key={trip.id} className={selectedTrips.includes(trip.id) ? 'selected-row' : ''}>
                  <td>
                    <input 
                      type="checkbox" 
                      className="m-checkbox" 
                      checked={selectedTrips.includes(trip.id)}
                      onChange={() => toggleSelectTrip(trip.id)}
                    />
                  </td>
                  <td style={{whiteSpace:'nowrap', color:'#64748b', fontSize:'0.78rem'}}>{trip.date}</td>
                  <td>
                    <div style={{display:'flex', flexDirection:'column', gap:'0.15rem'}}>
                      <span style={{fontWeight:800, color:'#0f172a'}}>{trip.driverName}</span>
                      {trip.secondaryDriverName && (
                        <span style={{fontSize:'0.72rem', color:'#94a3b8', fontWeight:600}}>
                          + {trip.secondaryDriverName}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span style={{background:'#f1f5f9', padding:'0.3rem 0.5rem', borderRadius:'4px', border:'1px solid #e2e8f0', fontFamily:'monospace', fontWeight:700, fontSize:'0.75rem', color:'#0f172a'}}>
                      {trip.vehicleNumber}
                    </span>
                  </td>
                  <td style={{fontWeight:700}}>{trip.companyClientName}</td>
                  <td style={{whiteSpace:'nowrap', color:'#64748b'}}>
                    <div style={{display:'flex', alignItems:'center', gap:'0.3rem', fontSize:'0.8rem'}}>
                      <span style={{fontWeight:700, color:'#0f172a'}}>{trip.fromLocation}</span>
                      <ArrowRight size={11} color="#3b82f6" />
                      <span style={{fontWeight:700, color:'#0f172a'}}>{trip.toLocation}</span>
                    </div>
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                    <div style={{fontSize:'0.78rem', color:'#475569'}}>S: ₹{trip.advanceFromSuresh}</div>
                    <div style={{fontSize:'0.78rem', color:'#475569'}}>C: ₹{trip.advanceFromCompany}</div>
                  </td>
                  <td><span style={{fontWeight:800, color:'#0f172a'}}>{trip.totalKm}</span><span style={{fontSize:'0.72rem', color:'#94a3b8', marginLeft:'2px'}}>km</span></td>
                  <td style={{color:'#475569'}}>₹{trip.dieselExpense}</td>
                  <td style={{color:'#475569'}}>₹{trip.driverBatta}</td>
                  <td style={{fontWeight:800, color:'#3b82f6'}}>₹{trip.goodsRent}</td>
                  <td style={{fontWeight:900, color: parseFloat(trip.profitAmount) >= 0 ? '#16a34a' : '#dc2626', fontSize:'0.9rem'}}>₹{trip.profitAmount}</td>
                  <td>
                    <span className={`trip-badge ${trip.tripStatus === 'Completed' ? 'tb-completed' : trip.tripStatus === 'Cancelled' ? 'tb-cancelled' : 'tb-active'}`}>
                      {trip.tripStatus}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn view" onClick={() => setViewingTrip(trip)} title="View Details"><Eye size={15} /></button>
                      <button className="icon-btn" onClick={() => openEdit(trip)} title="Edit"><Edit size={15} /></button>
                      <button className="icon-btn delete" onClick={() => handleDelete(trip.id)} title="Delete"><Trash2 size={15} /></button>
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
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-header-eyebrow">
                  <div className="modal-icon modal-icon-blue"><Navigation size={18} /></div>
                  <span className={`trip-badge ${viewingTrip.tripStatus === 'Completed' ? 'tb-completed' : viewingTrip.tripStatus === 'Cancelled' ? 'tb-cancelled' : 'tb-active'}`}>{viewingTrip.tripStatus}</span>
                  <span style={{fontSize:'0.8rem', color:'#94a3b8', fontWeight:700, letterSpacing:'0.05em'}}>ID: {viewingTrip.id}</span>
                </div>
                <div className="modal-title">Trip Details</div>
                <div className="modal-subtitle">Complete breakdown of journey, expenses and profit</div>
              </div>
              <button className="close-btn" onClick={() => setViewingTrip(null)}><X size={18} /></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
            <div className="detail-grid">
              <div className="detail-section-title"><Navigation size={18}/> Journey & Driver</div>
              <div className="detail-item">
                <span className="detail-label">Date</span>
                <div className="detail-value">{viewingTrip.date}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label"><User size={12}/> Primary Driver</span>
                <div className="detail-value">{viewingTrip.driverName}</div>
              </div>
              <div className="detail-item">
                <span className="detail-label"><User size={12}/> Secondary Driver</span>
                <div className="detail-value">{viewingTrip.secondaryDriverName || 'None'}</div>
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
            </div>{/* end modal-body */}

            <div className="modal-footer">
              <button className="btn-save" style={{flex:2}} onClick={() => { setViewingTrip(null); openEdit(viewingTrip); }}><Edit size={16}/> Edit Record</button>
              <button className="btn-save green" style={{flex:1}} onClick={() => handleExportSingle(viewingTrip)}><Download size={16}/> Export</button>
              <button className="btn-save secondary" style={{flex:1}} onClick={() => setViewingTrip(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="form-overlay">
          <div className="form-card animate-fade-in">
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-header-eyebrow">
                  <div className={`modal-icon ${editingTrip ? 'modal-icon-green' : 'modal-icon-blue'}`}>
                    {editingTrip ? <Edit size={18}/> : <Plus size={18}/>}
                  </div>
                  <span style={{fontSize:'0.8rem', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em'}}>{editingTrip ? 'Edit Record' : 'New Trip'}</span>
                </div>
                <div className="modal-title">{editingTrip ? 'Update Trip Log' : 'Log New Trip'}</div>
                <div className="modal-subtitle">Fill in all journey, expense and payment details</div>
              </div>
              <button type="button" className="close-btn" onClick={() => setShowForm(false)}><X size={18}/></button>
            </div>

            <div className="modal-body">
            <form onSubmit={handleSubmit} className="form-grid" id="trip-form">
              <div className="form-section-title"><Navigation size={18}/> Journey Details</div>
              <div className="form-group">
                <label><Tag size={14}/> Trip ID</label>
                <input type="text" name="tripId" defaultValue={editingTrip?.id} placeholder="T-XXXX" />
              </div>
              <div className="form-group">
                <label><Calendar size={14}/> Date</label>
                <input type="date" name="date" defaultValue={editingTrip?.date || new Date().toISOString().split('T')[0]} required />
              </div>
              <div className="form-group">
                <label><User size={14}/> Driver 1 (Primary)</label>
                <input type="text" name="driverName" defaultValue={editingTrip?.driverName} required />
              </div>
              <div className="form-group">
                <label><User size={14}/> Driver 2 (Optional)</label>
                <input type="text" name="secondaryDriverName" defaultValue={editingTrip?.secondaryDriverName} placeholder="Second driver name" />
              </div>
              <div className="form-group">
                <label><Car size={14}/> Vehicle Number</label>
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
            </form>
            </div>{/* end modal-body */}

            <div className="modal-footer">
              <button type="submit" form="trip-form" className="btn-save" style={{flex:2}} disabled={loading}>
                {loading ? 'Calculating & Saving...' : (editingTrip ? 'Update Trip Record' : 'Log Trip & Calculate Profit')}
              </button>
              <button type="button" className="btn-save secondary" style={{flex:1}} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}

export default TripManager
