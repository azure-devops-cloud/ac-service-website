'use client';
import { useState } from 'react';
import { AirVent, ArrowRight, BadgeCheck, CalendarCheck, CheckCircle2, ChevronDown, Clock3, Droplets, Fan, Gauge, Headphones, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles, Wrench, Zap } from 'lucide-react';

const services = [
  { icon: Fan, title: 'AC Service & Cleaning', text: 'Deep indoor and outdoor unit cleaning for better airflow and cooling.', price: 'From ₹499' },
  { icon: Wrench, title: 'AC Repair', text: 'Cooling, noise, water leakage, sensor and electrical fault diagnosis.', price: 'From ₹299' },
  { icon: Droplets, title: 'Gas Charging', text: 'Leak inspection and refrigerant top-up with proper pressure checks.', price: 'From ₹1,499' },
  { icon: Gauge, title: 'Installation', text: 'Professional split AC installation with vacuuming and testing.', price: 'From ₹999' },
  { icon: Zap, title: 'PCB & Electrical', text: 'Diagnosis and repair of PCB, capacitor, wiring and power issues.', price: 'Inspection first' },
  { icon: ArrowRight, title: 'Uninstallation & Relocation', text: 'Safe removal and shifting of split AC systems with re-installation.', price: 'From ₹799' },
];

const faqs = [
  ['How quickly can a technician visit?', 'We aim to offer same-day or next-available appointments depending on your location and technician availability.'],
  ['Do you service all AC brands?', 'Yes. Our service model is designed for major split and window AC brands. Parts availability and warranty terms can vary by brand.'],
  ['Will I know the price before repair?', 'Yes. The technician diagnoses the issue first and explains the recommended work and expected cost before proceeding.'],
  ['Do you provide a service warranty?', 'Warranty coverage depends on the service and replacement part. The applicable coverage is confirmed on the service invoice.'],
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({name:'', phone:'', service:'AC Service', area:'', issue:''});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, service: form.service, area: form.area, issue: form.issue }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to submit the request.');
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit the request.');
    } finally {
      setSubmitting(false);
    }
  }

  return <main>
    <header className="nav"><a className="brand" href="#top"><span className="brandMark"><AirVent size={23}/></span><span>AC <b>CARE</b></span></a><nav><a href="#services">Services</a><a href="#process">How it works</a><a href="#areas">Service areas</a><a href="#faq">FAQ</a></nav><div className="navActions"><a className="phone" href="tel:+919999999999"><Phone size={17}/> Call now</a><a className="wa" href="https://wa.me/919999999999"><MessageCircle size={17}/> WhatsApp</a></div></header>
    <section id="top" className="hero"><div className="heroGlow"/><div className="heroCopy"><div className="eyebrow"><Sparkles size={15}/> Reliable AC care, without the guesswork</div><h1>Cool air.<br/><em>Zero hassle.</em></h1><p className="lead">Professional AC service, repair and installation with clear pricing, trained technicians and convenient doorstep appointments.</p><div className="heroButtons"><a className="primary" href="#booking">Book a service <ArrowRight size={18}/></a><a className="secondary" href="tel:+919999999999"><Phone size={18}/> Speak to a technician</a></div><div className="trust"><span><BadgeCheck size={17}/> Verified technicians</span><span><ShieldCheck size={17}/> Transparent estimates</span><span><Clock3 size={17}/> Convenient slots</span></div></div><div className="heroVisual"><div className="unit"><div className="unitTop"><span>AC CARE</span><span className="led"/></div><div className="unitVent"><i/><i/><i/><i/><i/><i/><i/></div><div className="unitBottom"><span>INVERTER</span><span>SMART COOL</span></div></div><div className="temp"><span>Comfort</span><strong>23°</strong><small>°C</small></div><div className="bubble bubble1"><CheckCircle2 size={16}/> 4.9/5 customer rating</div><div className="bubble bubble2"><Wrench size={16}/> 10+ service types</div></div></section>
    <section className="stats"><div><strong>10+</strong><span>AC services</span></div><div><strong>24/7</strong><span>Booking requests</span></div><div><strong>100%</strong><span>Upfront estimate</span></div><div><strong>4.9/5</strong><span>Target customer experience</span></div></section>
    <section id="services" className="section"><div className="sectionHead"><div><span className="kicker">WHAT WE DO</span><h2>Everything your AC needs.</h2></div><p>From a seasonal cleanup to a stubborn cooling problem, get one dependable service experience from diagnosis to completion.</p></div><div className="serviceGrid">{services.map(({icon:Icon,title,text,price})=><article className="service" key={title}><div className="iconBox"><Icon size={22}/></div><h3>{title}</h3><p>{text}</p><span className="price">{price}</span><a href="#booking">Book now <ArrowRight size={15}/></a></article>)}</div></section>
    <section className="splitSection"><div className="checkVisual"><div className="checkCard"><div className="checkIcon"><ShieldCheck size={28}/></div><div><b>Service checklist</b><span>Diagnosis · Cleaning · Testing</span></div><CheckCircle2 size={22}/></div><div className="checkCard offset"><div className="checkIcon"><BadgeCheck size={28}/></div><div><b>Clear estimate</b><span>Know the cost before work starts</span></div><CheckCircle2 size={22}/></div></div><div className="splitCopy"><span className="kicker">WHY AC CARE</span><h2>Service that respects your home, time and budget.</h2><p>We designed the experience around the things customers care about most: a clear diagnosis, clean workmanship, honest communication and easy follow-up.</p><ul><li><CheckCircle2/> No surprise repair work without approval</li><li><CheckCircle2/> Job completion check before the technician leaves</li><li><CheckCircle2/> Digital-friendly booking and communication</li><li><CheckCircle2/> Support for routine maintenance and urgent repairs</li></ul><a className="textLink" href="#booking">Request a technician <ArrowRight size={17}/></a></div></section>
    <section id="process" className="process"><div className="sectionHead"><div><span className="kicker">HOW IT WORKS</span><h2>Three simple steps.</h2></div></div><div className="steps"><div className="step"><span>01</span><CalendarCheck/><h3>Tell us the problem</h3><p>Choose a service and share your AC issue, location and preferred time.</p></div><div className="step"><span>02</span><Headphones/><h3>Get confirmation</h3><p>We confirm the request and coordinate a suitable technician visit.</p></div><div className="step"><span>03</span><CheckCircle2/><h3>Relax, we handle it</h3><p>Your technician diagnoses, explains and completes the approved work.</p></div></div></section>
    <section id="booking" className="booking"><div className="bookingCopy"><span className="kicker">BOOK A SERVICE</span><h2>Tell us what your AC needs.</h2><p>Share a few details and our team can follow up to confirm the appointment.</p><div className="mini"><Phone/><div><b>Prefer a quick call?</b><a href="tel:+919999999999">+91 99999 99999</a></div></div><div className="mini"><MessageCircle/><div><b>WhatsApp works too</b><a href="https://wa.me/919999999999">Message us on WhatsApp</a></div></div></div><form onSubmit={submit}>{submitted ? <div className="success"><CheckCircle2 size={44}/><h3>Request received</h3><p>Thanks, {form.name || 'there'}! We’ll use the details you provided to follow up.</p><button type="button" className="primary" onClick={()=>setSubmitted(false)}>Submit another request</button></div> : <><div className="formRow"><label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label><label>Phone<input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="10-digit mobile number"/></label></div><div className="formRow"><label>Service<select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}>{services.map(s=><option key={s.title}>{s.title}</option>)}</select></label><label>Area / PIN code<input required value={form.area} onChange={e=>setForm({...form,area:e.target.value})} placeholder="Your area or PIN code"/></label></div><label>What’s happening? <textarea value={form.issue} onChange={e=>setForm({...form,issue:e.target.value})} placeholder="Example: AC is running but not cooling..."/></label><button className="primary full" disabled={submitting}>{submitting ? 'Submitting…' : 'Request service'} {!submitting && <ArrowRight size={18}/>}</button>{error && <p role="alert" className="formError">{error}</p>}<small>By submitting, you’re requesting a callback/appointment confirmation. Final pricing is confirmed after diagnosis.</small></>}</form></section>
    <section id="areas" className="areas"><div><span className="kicker">SERVICE AREAS</span><h2>Local service, built to scale.</h2><p>Start with your city and expand coverage as your technician network grows. Replace the placeholder locations below before launch.</p></div><div className="areaGrid"><div><MapPin/><b>City & suburbs</b><span>Placeholder service zone</span></div><div><MapPin/><b>Residential communities</b><span>Placeholder coverage</span></div><div><MapPin/><b>Commercial sites</b><span>On-request availability</span></div></div></section>
    <section id="faq" className="faq section"><div className="sectionHead"><div><span className="kicker">FAQ</span><h2>Questions, answered.</h2></div></div><div className="faqList">{faqs.map(([q,a],i)=><button className={'faqItem '+(openFaq===i?'open':'')} key={q} onClick={()=>setOpenFaq(openFaq===i?-1:i)}><div><b>{q}</b>{openFaq===i&&<p>{a}</p>}</div><ChevronDown size={20}/></button>)}</div></section>
    <section className="finalCta"><div><span className="kicker">READY WHEN YOU ARE</span><h2>Get your AC back to comfortable.</h2><p>Book a visit or speak to a technician about the problem.</p></div><div className="heroButtons"><a className="primary" href="#booking">Book a service <ArrowRight size={18}/></a><a className="secondary" href="https://wa.me/919999999999"><MessageCircle size={18}/> WhatsApp</a></div></section>
    <footer><div className="brand"><span className="brandMark"><AirVent size={20}/></span><span>AC <b>CARE</b></span></div><p>Professional AC service, repair & installation.</p><div className="footerLinks"><a href="#services">Services</a><a href="#booking">Book</a><a href="#faq">FAQ</a><a href="tel:+919999999999">Contact</a></div><small>© 2026 AC CARE. Demo business identity — replace contact and service-area details before launch.</small></footer>
  </main>
}