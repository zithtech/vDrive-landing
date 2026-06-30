import { useState, useEffect } from 'react';
import './Header.css';
import { Home, Info, Car, IndianRupee, Workflow, ShieldCheck, UserPlus, HelpCircle, Smartphone, MapPin, Menu, X } from 'lucide-react';

const NavigationLinks = [
  'Home',
  'About Us',
  'Ride Type',
  'Pricing',
  'Process',
  'Trust & Safety'
];

const mobileNavItems = [
  { icon: Home, label: 'Home', href: '#home' },
  { icon: Info, label: 'About', href: '#about-us' },
  { icon: Car, label: 'Rides', href: '#ride-type' },
  { icon: Workflow, label: 'Process', href: '#process' },
  { icon: IndianRupee, label: 'Pricing', href: '#pricing' },
  { icon: ShieldCheck, label: 'Safety', href: '#trust-&-safety' },
  { icon: UserPlus, label: 'Driver', href: '#become-driver' },
  { icon: Smartphone, label: 'App', href: '#app-showcase' },
  { icon: HelpCircle, label: 'FAQ', href: '#faq' },
  { icon: MapPin, label: 'Footer', href: '#footer' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    mobileNavItems.forEach((item) => {
      const sectionId = item.href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="header">
        <div className="container flex-between header-container">
          {/* Mobile Hamburger Menu Toggle */}
          <button 
            className="mobile-hamburger" 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>

          {/* Logo */}
          <div className="logo-container">
            <a href="#" className="logo">
              <img
                src="/images/vdrive_logo_header.png"
                alt="VDrive Logo"
                className="logo-img"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-list flex gap-8">
              {NavigationLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="nav-link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="desktop-actions flex gap-4">
            <button className="btn btn-join-driver font-bold">Join as Driver</button>
            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="mobile-sidebar-header">
            <a href="#" className="logo">
              <img
                src="/images/vdrive_logo_header.png"
                alt="VDrive Logo"
                className="logo-img"
              />
            </a>
            <button className="close-sidebar" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={28} />
            </button>
          </div>
          <nav className="mobile-sidebar-nav">
            {mobileNavItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a 
                  key={item.label} 
                  href={item.href} 
                  className={`mobile-sidebar-item ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon size={22} className="mobile-sidebar-icon" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

