import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  CalendarCheck,
  Car,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Package,
  Phone,
  Plane,
  ShieldCheck,
  Star,
  Truck,
  User,
  Bike,
  Map,
  Clock,
} from 'lucide-react'

const slides = [
  {
    tag: 'Reliable Car Transport & Fleet Services',
    title: 'Safe and Comfortable Travel for Every Booking.',
    desc: 'Book airport pickup, rental vehicles, and customer travel services from one clean and professional transport platform.',
    cta: 'Book Now',
    ctaSecondary: 'View Services',
    Icon: Truck,
    image: '/slide_tracking.png',
    imageAlt: 'Transport vehicle on road',
  },
  {
    tag: 'Customer-Friendly Booking',
    title: 'Choose the Right Vehicle for Every Journey.',
    desc: 'From family trips to corporate travel, customers can quickly check services and book the right ride.',
    cta: 'Book a Ride',
    ctaSecondary: 'About Us',
    Icon: Car,
    image: '/slide_booking.png',
    imageAlt: 'Customer transport vehicle',
  },
  {
    tag: 'Trusted Fleet Support',
    title: 'Verified Drivers and Well-Maintained Vehicles.',
    desc: 'We deliver on-time travel with clean vehicles, helpful support, and trusted drivers for every trip.',
    cta: 'Contact Us',
    ctaSecondary: 'Book Today',
    Icon: ShieldCheck,
    image: '/slide_maintenance.png',
    imageAlt: 'Vehicle prepared for trip',
  },
]

const bookingOptions = [
  {
    title: 'Airport Pickup',
    desc: 'Instant booking support for airport arrivals and departures.',
    Icon: Plane,
  },
  {
    title: 'Vehicle Rental',
    desc: 'Flexible booking for daily, weekly, and outstation travel.',
    Icon: Car,
  },
  {
    title: 'Corporate Travel',
    desc: 'Professional transport for office staff and business clients.',
    Icon: Briefcase,
  },
]

const vehicles = [
  {
    id: 'sedan',
    name: 'Executive Sedan',
    type: 'Car',
    price: '₹12/km',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
    features: ['Air Conditioned', 'Professional Driver', 'Clean Interior'],
    Icon: Car,
  },
  {
    id: 'suv',
    name: 'Luxury SUV',
    type: 'Car',
    price: '₹18/km',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&auto=format&fit=crop',
    features: ['7-Seater', 'All Terrain', 'Extra Luggage Space'],
    Icon: Truck,
  },
  {
    id: 'hatchback',
    name: 'Compact Hatchback',
    type: 'Car',
    price: '₹10/km',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
    features: ['Fuel Efficient', 'Easy City Parking', 'Budget Friendly'],
    Icon: Car,
  },
  {
    id: 'sports-bike',
    name: 'Sports Bike',
    type: 'Bike',
    price: '₹5/km',
    image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=800&auto=format&fit=crop',
    features: ['Helmet Included', 'Quick City Commute', 'Well Maintained'],
    Icon: Bike,
  },
  {
    id: 'cruiser-bike',
    name: 'Classic Cruiser',
    type: 'Bike',
    price: '₹8/km',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop',
    features: ['Long Distance Comfort', 'Vintage Style', 'Strong Engine'],
    Icon: Bike,
  },
  {
    id: 'electric-scooter',
    name: 'Electric Scooter',
    type: 'Bike',
    price: '₹3/km',
    image: 'https://images.unsplash.com/photo-1605030270031-6e8499279282?q=80&w=800&auto=format&fit=crop',
    features: ['Eco Friendly', 'No Fuel Cost', 'Silent Ride'],
    Icon: Bike,
  },
]

const indianCities = [
  'Mumbai, Maharashtra', 'Delhi, NCR', 'Bangalore, Karnataka', 'Hyderabad, Telangana', 
  'Ahmedabad, Gujarat', 'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Surat, Gujarat', 
  'Pune, Maharashtra', 'Jaipur, Rajasthan', 'Lucknow, Uttar Pradesh', 'Kanpur, Uttar Pradesh', 
  'Nagpur, Maharashtra', 'Indore, Madhya Pradesh', 'Thane, Maharashtra', 'Bhopal, Madhya Pradesh', 
  'Visakhapatnam, Andhra Pradesh', 'Pimpri-Chinchwad, Maharashtra', 'Patna, Bihar', 'Vadodara, Gujarat',
  'Kochi, Kerala', 'Thiruvananthapuram, Kerala', 'Kozhikode, Kerala', 'Thrissur, Kerala',
  'Malappuram, Kerala', 'Kannur, Kerala', 'Kollam, Kerala', 'Alappuzha, Kerala',
  'Palakkad, Kerala', 'Kottayam, Kerala', 'Coimbatore, Tamil Nadu', 'Madurai, Tamil Nadu',
  'Mangalore, Karnataka', 'Mysore, Karnataka', 'Hubli, Karnataka', 'Shimoga, Karnataka'
]

const tourPackages = [
  {
    id: 'munnar',
    title: 'Munnar Hill Station',
    duration: '3 Days / 2 Nights',
    price: '₹4,500',
    image: '/tour_munnar.png',
    desc: 'Explore the lush green tea gardens and misty hills of Munnar.',
    tag: 'Popular',
  },
  {
    id: 'alleppey',
    title: 'Alleppey Backwaters',
    duration: '2 Days / 1 Night',
    price: '₹3,200',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800&auto=format&fit=crop',
    desc: 'Experience the serene beauty of houseboats and palm-fringed canals.',
    tag: 'Trending',
  },
  {
    id: 'wayanad',
    title: 'Wayanad Wilderness',
    duration: '4 Days / 3 Nights',
    price: '₹5,800',
    image: 'https://images.unsplash.com/photo-1626084042299-80517596068e?q=80&w=800&auto=format&fit=crop',
    desc: 'Discover the wildlife, waterfalls, and spice plantations of Wayanad.',
    tag: 'Adventure',
  },
]

const services = [
  { Icon: Plane, title: 'Airport Pickup', desc: 'Pre-scheduled pickup and drop service for customers and families.' },
  { Icon: Package, title: 'Tour Packages', desc: 'Convenient travel packages for local sightseeing and outstation trips.' },
  { Icon: Briefcase, title: 'Corporate Travel', desc: 'Reliable transport services for meetings, staff trips, and guest pickup.' },
  { Icon: Truck, title: 'Long-Distance Travel', desc: 'Safe and on-time intercity transport with experienced drivers.' },
  { Icon: User, title: 'Driver Service', desc: 'Verified drivers available for one-way, round trip, and full-day use.' },
  { Icon: Phone, title: '24/7 Support', desc: 'Quick customer support for bookings, updates, and ride assistance.' },
]

const aboutStats = [
  { label: 'Years of Service', value: '12+', Icon: CalendarCheck },
  { label: 'Vehicles Available', value: '48', Icon: Car },
  { label: 'Completed Trips', value: '18,500+', Icon: CheckCircle },
  { label: 'Customer Rating', value: '4.9 / 5', Icon: Star },
]

const aboutPoints = [
  'Verified drivers for safe and trusted customer travel.',
  'Clean and well-maintained vehicles for comfortable rides.',
  'Simple booking flow designed for customer-side use.',
]

function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef(null)

  const go = (idx) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(idx)
      setAnimating(false)
    }, 350)
  }

  const next = () => go((current + 1) % slides.length)
  const prev = () => go((current - 1 + slides.length) % slides.length)

  useEffect(() => {
    timerRef.current = setInterval(() => next(), 5000)
    return () => clearInterval(timerRef.current)
  }, [current])

  const slide = slides[current]
  const SlideIcon = slide.Icon

  return (
    <section className="carousel-section" id="home">
      <div className={`carousel-slide ${animating ? 'carousel-fade-out' : 'carousel-fade-in'}`}>
        <div className="carousel-copy">
          <span className="carousel-tag">{slide.tag}</span>
          <h1 className="carousel-title">{slide.title}</h1>
          <p className="carousel-desc">{slide.desc}</p>
          <div className="carousel-actions">
            <a className="nav-btn" href="#booking">
              {slide.cta}
              <ArrowRight size={15} />
            </a>
            <a className="secondary-btn" href="#services">{slide.ctaSecondary}</a>
          </div>
          <div className="carousel-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === current ? 'carousel-dot-active' : ''}`}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="carousel-visual">
          <div className="carousel-img-wrap">
            <img src={slide.image} alt={slide.imageAlt} className="carousel-img" />
            <div className="carousel-img-badge">
              <SlideIcon size={14} strokeWidth={2} />
              <span>{slide.tag}</span>
            </div>
          </div>

          <div className="carousel-mini-stats">
            <div className="mini-stat">
              <span className="mini-stat-value">48</span>
              <span className="mini-stat-label">Vehicles</span>
            </div>
            <div className="mini-stat-divider" />
            <div className="mini-stat">
              <span className="mini-stat-value">24/7</span>
              <span className="mini-stat-label">Support</span>
            </div>
            <div className="mini-stat-divider" />
            <div className="mini-stat">
              <span className="mini-stat-value">Easy</span>
              <span className="mini-stat-label">Booking</span>
            </div>
          </div>
        </div>
      </div>

      <button className="carousel-arrow carousel-arrow-left" onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={20} />
      </button>
      <button className="carousel-arrow carousel-arrow-right" onClick={next} aria-label="Next slide">
        <ChevronRight size={20} />
      </button>

      <div className="carousel-progress-bar">
        <div key={current} className="carousel-progress-fill" style={{ animationDuration: '5s' }} />
      </div>
    </section>
  )
}

function DestinationPicker({ onSearch }) {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [suggestions, setSuggestions] = useState({ start: [], end: [] })
  const [showSug, setShowSug] = useState({ start: false, end: false })
  const pickerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowSug({ start: false, end: false })
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (val, field) => {
    if (field === 'start') setStart(val)
    else setEnd(val)

    if (val.length > 0) {
      const filtered = indianCities.filter(c => c.toLowerCase().includes(val.toLowerCase())).slice(0, 6)
      setSuggestions(prev => ({ ...prev, [field]: filtered }))
      setShowSug(prev => ({ ...prev, [field]: true }))
    } else {
      setShowSug(prev => ({ ...prev, [field]: false }))
    }
  }

  const selectSug = (val, field) => {
    if (field === 'start') setStart(val)
    else setEnd(val)
    setShowSug(prev => ({ ...prev, [field]: false }))
  }

  return (
    <div className="dest-picker-container" ref={pickerRef}>
      <div className="dest-picker-card">
        <div className="dest-picker-grid">
          <div className="dest-input-group">
            <div className="dest-icon-circle">
              <MapPin size={18} color="var(--green-dark)" />
            </div>
            <div className="dest-field">
              <label>Starting Point</label>
              <input 
                type="text" 
                placeholder="Enter pickup location" 
                value={start}
                onChange={(e) => handleInputChange(e.target.value, 'start')}
                onFocus={() => start.length > 0 && setShowSug(prev => ({ ...prev, start: true }))}
              />
              {showSug.start && suggestions.start.length > 0 && (
                <div className="suggestions-dropdown pro-dropdown">
                  {suggestions.start.map(s => (
                    <div key={s} className="sug-item pro-sug-item" onClick={() => selectSug(s, 'start')}>
                      <div className="sug-icon">
                        <MapPin size={14} />
                      </div>
                      <div className="sug-text">
                        <span className="sug-city">{s.split(',')[0]}</span>
                        <span className="sug-state">{s.split(',')[1]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="dest-divider">
            <div className="dest-line"></div>
            <div className="dest-arrow-circle">
              <ArrowRight size={14} />
            </div>
            <div className="dest-line"></div>
          </div>

          <div className="dest-input-group">
            <div className="dest-icon-circle">
              <MapPin size={18} color="var(--black)" />
            </div>
            <div className="dest-field">
              <label>Destination</label>
              <input 
                type="text" 
                placeholder="Enter drop location" 
                value={end}
                onChange={(e) => handleInputChange(e.target.value, 'end')}
                onFocus={() => end.length > 0 && setShowSug(prev => ({ ...prev, end: true }))}
              />
              {showSug.end && suggestions.end.length > 0 && (
                <div className="suggestions-dropdown pro-dropdown">
                  {suggestions.end.map(s => (
                    <div key={s} className="sug-item pro-sug-item" onClick={() => selectSug(s, 'end')}>
                      <div className="sug-icon">
                        <MapPin size={14} />
                      </div>
                      <div className="sug-text">
                        <span className="sug-city">{s.split(',')[0]}</span>
                        <span className="sug-state">{s.split(',')[1]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button 
            className="nav-btn dest-search-btn"
            onClick={() => onSearch(start, end)}
          >
            Find Rides
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

function SearchResults({ start, end }) {
  const navigate = useNavigate()
  const results = vehicles.map(v => ({
    ...v,
    basePrice: v.type === 'Car' ? 150 : 50,
    perKm: parseInt(v.price.replace(/[^0-9]/g, '')),
    estDistance: 24, // dummy
    available: true
  }))

  return (
    <section className="hp-section results-section-grid animate-slide-up" id="results">
      <div className="hp-section-header centered">
        <span className="hp-tag">Search Results</span>
        <h2 className="hp-section-title">Found {results.length} rides for your journey</h2>
        <div className="res-route-indicator-centered">
          <span>{start || 'Pickup'}</span>
          <ArrowRight size={14} />
          <span>{end || 'Destination'}</span>
        </div>
      </div>

      <div className="results-pro-grid">
        {results.map((v) => (
          <div className="pro-grid-card" key={v.id}>
            <div className="pro-grid-visual">
              <img src={v.image} alt={v.name} />
              <div className="pro-grid-badge">{v.type}</div>
              <div className="pro-grid-status">Available</div>
            </div>
            <div className="pro-grid-content">
              <div className="pro-grid-header">
                <h3>{v.name}</h3>
                <div className="pro-grid-rating">
                  <Star size={12} fill="#fbbf24" color="#fbbf24" />
                  <span>4.9</span>
                </div>
              </div>
              <div className="pro-grid-specs">
                <div className="p-spec">
                  <User size={14} />
                  <span>{v.type === 'Car' ? '4 Seats' : '1 Seat'}</span>
                </div>
                <div className="p-spec">
                  <ShieldCheck size={14} />
                  <span>Verified</span>
                </div>
              </div>
              <div className="pro-grid-footer">
                <div className="pro-grid-price">
                  <span className="p-label">Total Est.</span>
                  <span className="p-value">₹{v.basePrice + (v.perKm * v.estDistance)}</span>
                </div>
                <button 
                  className="pro-grid-btn"
                  onClick={() => navigate(`/vehicle/${v.id}`)}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function HomePage() {
  const navigate = useNavigate()
  const [searchData, setSearchData] = useState(null)
  const resultsRef = useRef(null)

  const handleSearch = (start, end) => {
    setSearchData({ start, end })
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <main className="page-home">
      <HeroCarousel />
      <DestinationPicker onSearch={handleSearch} />

      {searchData && (
        <div ref={resultsRef}>
          <SearchResults start={searchData.start} end={searchData.end} />
        </div>
      )}

      <section className="hp-section" id="vehicles">
        <div className="hp-section-header">
          <div>
            <span className="hp-tag">Choose Your Vehicle</span>
            <h2 className="hp-section-title">Rent by Car or Bike</h2>
            <p className="hp-section-sub">Select the perfect ride for your journey at affordable rates.</p>
          </div>
        </div>

        <div className="vehicle-selection-grid">
          {vehicles.map((v) => (
            <div className="vehicle-card" key={v.id}>
              <div className="vehicle-img-container">
                <img src={v.image} alt={v.name} className="vehicle-card-img" />
                <div className="vehicle-type-badge">
                  <v.Icon size={14} />
                  <span>{v.type}</span>
                </div>
              </div>
              <div className="vehicle-card-body">
                <div className="vehicle-card-header">
                  <h3 className="vehicle-card-title">{v.name}</h3>
                  <span className="vehicle-price">{v.price}</span>
                </div>
                <div className="vehicle-features">
                  {v.features.map((f, i) => (
                    <div className="v-feature" key={i}>
                      <CheckCircle size={14} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button 
                  className="nav-btn w-full"
                  onClick={() => navigate(`/rent/${v.id}`)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="hp-section hp-section-light" id="packages">
        <div className="hp-section-header centered">
          <span className="hp-tag hp-tag-green">Tour Packages</span>
          <h2 className="hp-section-title">Explore Beautiful Destinations</h2>
          <p className="hp-section-sub">Curated travel experiences designed for comfort and adventure.</p>
        </div>

        <div className="packages-grid">
          {tourPackages.map((pkg) => (
            <div className="package-card" key={pkg.id}>
              <div className="package-img-wrap">
                <img src={pkg.image} alt={pkg.title} className="package-img" />
                <div className="package-tag">{pkg.tag}</div>
              </div>
              <div className="package-content">
                <div className="package-meta">
                  <div className="p-meta-item">
                    <Clock size={14} />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="p-meta-item">
                    <MapPin size={14} />
                    <span>Kerala</span>
                  </div>
                </div>
                <h3 className="package-title">{pkg.title}</h3>
                <p className="package-desc">{pkg.desc}</p>
                <div className="package-footer">
                  <span className="package-price-label">Starts from</span>
                  <span className="package-price-val">{pkg.price}</span>
                </div>
                <button 
                  className="secondary-btn w-full"
                  onClick={() => navigate(`/package/${pkg.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="hp-section" id="booking">
        <div className="hp-section-header">
          <div>
            <span className="hp-tag">Book Your Ride</span>
            <h2 className="hp-section-title">Quick booking options for customers</h2>
            <p className="hp-section-sub">Choose the service you need and move forward with your booking quickly.</p>
          </div>
        </div>

        <div className="booking-options-grid">
          {bookingOptions.map(({ title, desc, Icon }) => (
            <div className="service-card" key={title}>
              <div className="svc-icon-wrap">
                <Icon size={24} strokeWidth={1.8} color="var(--green-dark)" />
              </div>
              <h3 className="svc-title">{title}</h3>
              <p className="svc-desc">{desc}</p>
              <a href="#contact" className="inline-link">Continue Booking</a>
            </div>
          ))}
        </div>
      </section>

      <section className="hp-section hp-section-dark" id="services">
        <div className="hp-section-header centered">
          <span className="hp-tag hp-tag-green">Services</span>
          <h2 className="hp-section-title">Transport services your customers can easily understand</h2>
          <p className="hp-section-sub">Simple service presentation for a customer-side fleet application.</p>
        </div>

        <div className="services-grid">
          {services.map(({ Icon, title, desc }) => (
            <div className="service-card" key={title}>
              <div className="svc-icon-wrap">
                <Icon size={24} strokeWidth={1.8} color="var(--green-dark)" />
              </div>
              <h3 className="svc-title">{title}</h3>
              <p className="svc-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="hp-section" id="about">
        <div className="hp-section-header">
          <div>
            <span className="hp-tag">About Us</span>
            <h2 className="hp-section-title">Reliable fleet service built for customer bookings</h2>
            <p className="hp-section-sub">
              This customer-side homepage is focused on making transport booking simple, trustworthy, and easy to explore.
            </p>
          </div>
        </div>

        <div className="about-grid">
          <div className="about-card about-copy-card">
            <h3 className="about-card-title">Why customers can trust this service</h3>
            <p className="about-card-text">
              FleetCare provides a simple public-facing experience where customers can learn about the company,
              understand available services, and move directly toward booking.
            </p>
            <div className="about-points">
              {aboutPoints.map((point) => (
                <div className="about-point" key={point}>
                  <CheckCircle size={16} color="var(--green-dark)" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-grid-mini">
            {aboutStats.map(({ label, value, Icon }) => (
              <div className="about-card" key={label}>
                <Icon size={22} color="var(--green-dark)" />
                <h4>{value}</h4>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
