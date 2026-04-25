import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  Users, 
  Car, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign,
  UserCheck,
  CheckCircle2,
  Clock,
  Briefcase,
  HelpCircle,
  FileText,
  Smartphone,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

function PartnerLandingPage() {
  const navigate = useNavigate()
  const [activeFaq, setActiveFaq] = useState(null)

  const faqs = [
    {
      q: "Can I register only as a driver without owning a vehicle?",
      a: "Yes. You can join as a driver and receive assigned trips based on availability using company-partnered vehicles."
    },
    {
      q: "Can I register my vehicle without driving it myself?",
      a: "Yes. Vehicle owners can list their vehicles and assign a driver separately or let us provide a verified driver."
    },
    {
      q: "How do I get paid?",
      a: "Payments are processed based on completed trips and updated in the partner dashboard. We follow a weekly payout cycle."
    },
    {
      q: "Who verifies my documents?",
      a: "The FleetCare admin team verifies license, RC, insurance, and other submitted documents to ensure safety and compliance."
    }
  ]

  const toggleFaq = (i) => setActiveFaq(activeFaq === i ? null : i)

  return (
    <main className="partner-landing-page">
      <style>{`
        .partner-landing-page { padding-top: 5rem; background: #fff; }
        .p-section { padding: 6rem 5vw; }
        .p-section-dark { background: #0f172a; color: #fff; }
        .p-section-gray { background: #f8fafc; }
        .p-container { max-width: 1200px; margin: 0 auto; }
        
        /* Hero Section */
        .p-hero { text-align: center; padding: 6rem 5vw; background: radial-gradient(circle at top right, #dcfce7 0%, #ffffff 50%); }
        .p-tag { background: #dcfce7; color: #166534; padding: 0.5rem 1.25rem; border-radius: 99px; font-weight: 800; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 1.5rem; display: inline-block; }
        .p-hero h1 { font-size: 4rem; font-weight: 900; line-height: 1.1; margin-bottom: 1.5rem; color: #0f172a; }
        .p-hero p { font-size: 1.25rem; color: #64748b; max-width: 700px; margin: 0 auto 3rem; line-height: 1.6; }
        .p-hero-btns { display: flex; gap: 1rem; justify-content: center; }
        .p-btn-primary { background: #22c55e; color: #fff; padding: 1.2rem 2.5rem; border-radius: 16px; font-weight: 800; display: flex; align-items: center; gap: 0.75rem; }
        .p-btn-outline { background: #fff; color: #0f172a; border: 2px solid #e2e8f0; padding: 1.2rem 2.5rem; border-radius: 16px; font-weight: 800; }
        
        /* Options Cards */
        .p-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .p-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 40px; padding: 3.5rem; transition: all 0.3s; }
        .p-card:hover { transform: translateY(-10px); border-color: #22c55e; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .p-card-icon { width: 70px; height: 70px; background: #0f172a; color: #fff; border-radius: 20px; display: grid; place-items: center; margin-bottom: 2rem; }
        .p-card h2 { font-size: 2rem; font-weight: 800; margin-bottom: 1rem; }
        .p-card-desc { color: #64748b; line-height: 1.6; margin-bottom: 2rem; }
        .p-feat-list { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }
        .p-feat-item { display: flex; align-items: center; gap: 0.75rem; font-weight: 700; color: #334155; }
        .p-feat-item svg { color: #22c55e; }
        .p-card-btn { background: #0f172a; color: #fff; padding: 1.2rem; border-radius: 16px; font-weight: 800; width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.75rem; }
        .p-card:hover .p-card-btn { background: #22c55e; }

        /* How It Works */
        .section-header { text-align: center; margin-bottom: 4rem; }
        .section-header h2 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1rem; }
        .step-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.5rem; position: relative; }
        .step-card { text-align: center; position: relative; }
        .step-num { width: 50px; height: 50px; background: #22c55e; color: #fff; border-radius: 50%; display: grid; place-items: center; font-weight: 900; margin: 0 auto 1.5rem; font-size: 1.2rem; }
        .step-card h4 { font-weight: 800; margin-bottom: 0.75rem; font-size: 1.1rem; }
        .step-card p { font-size: 0.9rem; color: #64748b; line-height: 1.5; }

        /* Benefits Grid */
        .benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .benefit-card { background: #fff; padding: 2.5rem; border-radius: 24px; border: 1px solid #f1f5f9; }
        .benefit-icon { color: #22c55e; margin-bottom: 1.5rem; }
        .benefit-card h4 { font-weight: 800; margin-bottom: 1rem; font-size: 1.2rem; }
        .benefit-card p { color: #64748b; font-size: 0.95rem; line-height: 1.6; }

        /* Requirements Section */
        .req-split { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
        .req-box h3 { font-size: 1.8rem; font-weight: 800; margin-bottom: 2rem; display: flex; align-items: center; gap: 1rem; }
        .req-list { display: flex; flex-direction: column; gap: 1.25rem; }
        .req-item { display: flex; align-items: center; gap: 1rem; font-weight: 600; color: #475569; }
        .req-item svg { color: #22c55e; flex-shrink: 0; }

        /* FAQ */
        .faq-list { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
        .faq-item { border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; cursor: pointer; transition: all 0.2s; }
        .faq-q { padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; font-weight: 800; color: #0f172a; }
        .faq-a { padding: 0 1.5rem 1.5rem; color: #64748b; line-height: 1.6; font-weight: 500; }

        /* Final CTA */
        .cta-box { background: #22c55e; border-radius: 40px; padding: 5rem; text-align: center; color: #fff; }
        .cta-box h2 { font-size: 3rem; font-weight: 900; margin-bottom: 1.5rem; }
        .cta-box p { font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.9; max-width: 600px; margin-left: auto; margin-right: auto; }

        @media (max-width: 1000px) {
          .p-grid, .req-split, .benefits-grid { grid-template-columns: 1fr; }
          .step-grid { grid-template-columns: 1fr; }
          .p-hero h1 { font-size: 2.8rem; }
          .cta-box { padding: 3rem 1.5rem; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="p-hero">
        <div className="p-container">
          <span className="p-tag">Partner with FleetCare</span>
          <h1>Drive, List Your Vehicle,<br/>and Earn With FleetCare</h1>
          <p>Join our transport network as a driver or vehicle owner. Get verified trips, weekly payouts, and complete operational support from our team.</p>
          <div className="p-hero-btns">
            <button className="p-btn-primary" onClick={() => navigate('/partner/driver-register')}>
              <UserCheck size={20} /> Register as Driver
            </button>
            <button className="p-btn-outline" onClick={() => navigate('/partner/vehicle-register')}>
              Register Vehicle
            </button>
          </div>
        </div>
      </section>

      {/* Partner Options */}
      <section className="p-section">
        <div className="p-container">
          <div className="p-grid">
            {/* Driver Card */}
            <div className="p-card">
              <div className="p-card-icon"><Users size={32} /></div>
              <h2>Join as a Driver</h2>
              <p className="p-card-desc">Drive assigned trips, serve verified customers, and earn through reliable weekly payouts. We provide the bookings, you provide the service.</p>
              <div className="p-feat-list">
                <div className="p-feat-item"><CheckCircle2 size={18} /> Weekly payouts</div>
                <div className="p-feat-item"><CheckCircle2 size={18} /> Flexible schedule</div>
                <div className="p-feat-item"><CheckCircle2 size={18} /> Verified trips only</div>
                <div className="p-feat-item"><CheckCircle2 size={18} /> 24/7 Support</div>
              </div>
              <button className="p-card-btn" onClick={() => navigate('/partner/driver-register')}>
                Register as Driver <ArrowRight size={20} />
              </button>
            </div>

            {/* Owner Card */}
            <div className="p-card">
              <div className="p-card-icon"><Car size={32} /></div>
              <h2>Register Your Vehicle</h2>
              <p className="p-card-desc">List your car, van, or traveller in our fleet network and earn when your vehicle is assigned for verified corporate and tourist trips.</p>
              <div className="p-feat-list">
                <div className="p-feat-item"><CheckCircle2 size={18} /> Passive income from vehicle</div>
                <div className="p-feat-item"><CheckCircle2 size={18} /> Verified customers</div>
                <div className="p-feat-item"><CheckCircle2 size={18} /> Insurance/document tracking</div>
                <div className="p-feat-item"><CheckCircle2 size={18} /> Real-time trip updates</div>
              </div>
              <button className="p-card-btn" onClick={() => navigate('/partner/vehicle-register')}>
                Onboard Vehicle <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="p-section p-section-gray">
        <div className="p-container">
          <div className="section-header">
            <h2>How Partnership Works</h2>
            <p style={{color: '#64748b'}}>Simple 5-step process to get started with our network.</p>
          </div>
          
          <div style={{marginBottom: '4rem'}}>
            <h3 style={{fontWeight: 800, marginBottom: '2rem', textAlign: 'center'}}>For Drivers</h3>
            <div className="step-grid">
              {[
                { t: "Submit Details", d: "Fill the registration form with your license and ID proofs." },
                { t: "Verification", d: "Our team verifies your background and driving history." },
                { t: "Get Approved", d: "Once verified, your profile becomes active in our system." },
                { t: "Receive Trips", d: "Start receiving assigned trips on your partner app." },
                { t: "Earn Money", d: "Complete trips and receive weekly payouts to your bank." }
              ].map((s, i) => (
                <div className="step-card" key={i}>
                  <div className="step-num">{i+1}</div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{fontWeight: 800, marginBottom: '2rem', textAlign: 'center'}}>For Vehicle Owners</h3>
            <div className="step-grid">
              {[
                { t: "Register Vehicle", d: "Submit RC, Insurance, and vehicle photos." },
                { t: "Document Check", d: "Admin verifies vehicle condition and legal documents." },
                { t: "Listing Active", d: "Vehicle becomes available for customer bookings." },
                { t: "Trip Assignment", d: "Vehicle is assigned to verified trips with a driver." },
                { t: "Passive Income", d: "Earn money every time your vehicle hits the road." }
              ].map((s, i) => (
                <div className="step-card" key={i}>
                  <div className="step-num">{i+1}</div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="p-section">
        <div className="p-container">
          <div className="section-header">
            <h2>Why Partner With FleetCare?</h2>
          </div>
          <div className="benefits-grid">
            {[
              { i: ShieldCheck, t: "Verified Customers", d: "Only approved and genuine bookings are assigned to our partners." },
              { i: DollarSign, t: "Weekly Payments", d: "Receive your earnings on a consistent weekly payout cycle." },
              { i: Clock, t: "Flexible Availability", d: "Choose when your vehicle or driver profile is available for trips." },
              { i: Users, t: "Dedicated Support", d: "Our operations team supports you with booking and customer issues." },
              { i: TrendingUp, t: "More Opportunities", d: "Get access to airport, tourist, corporate, and long-distance trips." },
              { i: FileText, t: "Document Tracking", d: "Automated alerts for license, insurance, and RC expiry dates." }
            ].map((b, i) => (
              <div className="benefit-card" key={i}>
                <b.i size={40} className="benefit-icon" />
                <h4>{b.t}</h4>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="p-section p-section-gray">
        <div className="p-container">
          <div className="req-split">
            <div className="req-box">
              <h3><UserCheck size={32} color="#22c55e" /> Driver Requirements</h3>
              <div className="req-list">
                <div className="req-item"><CheckCircle2 size={20} /> Valid driving license</div>
                <div className="req-item"><CheckCircle2 size={20} /> Min. 2 years experience</div>
                <div className="req-item"><CheckCircle2 size={20} /> Valid ID proof (Aadhar/PAN)</div>
                <div className="req-item"><CheckCircle2 size={20} /> Clean driving record</div>
                <div className="req-item"><CheckCircle2 size={20} /> Basic smartphone usage</div>
                <div className="req-item"><CheckCircle2 size={20} /> Professional behavior</div>
              </div>
            </div>
            <div className="req-box">
              <h3><Car size={32} color="#22c55e" /> Vehicle Requirements</h3>
              <div className="req-list">
                <div className="req-item"><CheckCircle2 size={20} /> Valid Registration (RC)</div>
                <div className="req-item"><CheckCircle2 size={20} /> Valid Insurance & Pollution</div>
                <div className="req-item"><CheckCircle2 size={20} /> Excellent vehicle condition</div>
                <div className="req-item"><CheckCircle2 size={20} /> Clean interior and exterior</div>
                <div className="req-item"><CheckCircle2 size={20} /> Commercial permit (T-Plate)</div>
                <div className="req-item"><CheckCircle2 size={20} /> GPS support (Optional)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="p-section">
        <div className="p-container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i} onClick={() => toggleFaq(i)}>
                <div className="faq-q">
                  <span>{faq.q}</span>
                  {activeFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                {activeFaq === i && (
                  <div className="faq-a animate-fade-in">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="p-section" style={{paddingBottom: '8rem'}}>
        <div className="p-container">
          <div className="cta-box">
            <h2>Ready to Start Earning?</h2>
            <p>Join FleetCare as a verified driver or register your vehicle with our transport network today.</p>
            <div className="p-hero-btns">
              <button className="p-btn-outline" style={{border: 'none'}} onClick={() => navigate('/partner/driver-register')}>
                Register as Driver
              </button>
              <button className="p-btn-outline" style={{border: 'none', background: '#0f172a', color: '#fff'}} onClick={() => navigate('/partner/vehicle-register')}>
                Onboard Vehicle
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PartnerLandingPage
