import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight, Sprout, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'products', 'solutions', 'ai-assistant', 'land-locator', 'calculator', 'impact', 'testimonials', 'sustainability', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Products & Services', href: '#products', id: 'products' },
    { label: 'Farming Solutions', href: '#solutions', id: 'solutions' },
    { label: 'AI Assistant', href: '#ai-assistant', id: 'ai-assistant' },
    { label: 'Land Search', href: '#land-locator', id: 'land-locator' },
    { label: 'ROI Calculator', href: '#calculator', id: 'calculator' },
    { label: 'Impact', href: '#impact', id: 'impact' },
    { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { label: 'Sustainability', href: '#sustainability', id: 'sustainability' },
    { label: 'Contact Us', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full overflow-hidden">
      {/* Top Advisory Bar */}
      <div className="bg-[#174B35] text-white text-[11px] py-1.5 px-4 border-b border-[#26734D]/40 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F4C542] text-[#174B35] flex-shrink-0">
              <Sparkles className="w-2.5 h-2.5 mr-1" /> 2026
            </span>
            <span className="text-gray-200 truncate text-[11px]">
              🌱 Soil Health Audits & Agritech Grants Available
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-gray-200 flex-shrink-0">
            <a
              href="tel:+18004733642"
              className="flex items-center hover:text-[#F4C542] transition-colors"
            >
              <Phone className="w-3 h-3 mr-1 text-[#F4C542]" />
              <span className="font-semibold text-xs">+1 (800) 473-3642</span>
            </a>
            <span className="hidden md:inline text-gray-400">|</span>
            <span className="hidden md:inline text-gray-300">Mon - Fri: 7am - 6pm PST</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-soft py-2.5 sm:py-3 border-b border-[#D2E0D5]'
            : 'bg-white/95 backdrop-blur-md py-3 sm:py-4 border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
          {/* Logo (Left) */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group focus:outline-none flex-shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#26734D] to-[#174B35] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-[#F4C542]" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#174B35]">Green</span>
                <span className="text-lg sm:text-xl font-bold tracking-tight text-[#26734D]">Harvest</span>
              </div>
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-[#805638] font-bold -mt-1">
                Agriculture
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Center, >= 1024px) */}
          <div className="hidden 2xl:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-2 py-2 rounded-lg text-[11px] font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-[#26734D] bg-[#E8EFEA] font-bold'
                      : 'text-gray-700 hover:text-[#26734D] hover:bg-[#F6F9F6]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Action Container (Right) */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Desktop CTA Button */}
            <button
              onClick={onOpenConsultation}
              className="hidden 2xl:inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-bold bg-[#26734D] hover:bg-[#1f5f3e] text-white shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#F4C542]" />
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="2xl:hidden p-2 sm:p-2.5 rounded-xl bg-[#26734D] text-[#F4C542] hover:bg-[#174B35] focus:outline-none transition-colors shadow-sm flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-[#F4C542]" />}
            </button>
          </div>
        </div>

        {/* Responsive dropdown for screens below 2xl */}
        {mobileMenuOpen && (
          <div className="2xl:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                    activeSection === link.id
                      ? 'text-[#174B35] bg-[#E8EFEA] font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && (
                    <span className="w-2 h-2 rounded-full bg-[#26734D]"></span>
                  )}
                </a>
              ))}
              <div className="pt-3 border-t border-gray-100 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-bold bg-[#26734D] text-white shadow-soft"
                >
                  <span>Get Free Farm Consultation</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-[#F4C542]" />
                </button>
                <div className="mt-3 text-center">
                  <a
                    href="tel:+18004733642"
                    className="text-xs text-gray-600 font-medium hover:text-[#26734D]"
                  >
                    Agronomy Hotline: +1 (800) 473-3642
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
