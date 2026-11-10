import React, { useState } from 'react';
import { Sprout, Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavClick: (href: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenPrivacy, onOpenTerms }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail.trim() || !emailRegex.test(newsletterEmail.trim())) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError('');
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#0F3123] text-gray-300 relative border-t-4 border-[#26734D]">
      {/* Newsletter Bar */}
      <div className="border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#174B35] to-[#26734D] rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-1.5 text-center lg:text-left">
              <span className="text-xs font-bold text-[#F4C542] uppercase tracking-wider">
                Agronomy Intelligence Dispatch
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                Receive Seasonal Agritech Briefings & Soil Advisories
              </h3>
              <p className="text-xs text-gray-200 max-w-xl">
                Join 18,000+ growers and agricultural consultants who receive our monthly microclimate alerts, drought management strategies, and organic yield guides.
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              {subscribed ? (
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-[#F4C542]/40 text-white flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F4C542] flex-shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold">Subscription Confirmed!</p>
                    <p className="text-gray-300 text-[11px]">Welcome to the GreenHarvest Agronomy Network.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterError) setNewsletterError('');
                      }}
                      placeholder="Enter your farm email address..."
                      className="flex-1 text-xs px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4C542]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl bg-[#F4C542] hover:bg-yellow-300 text-[#174B35] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {newsletterError && (
                    <p className="text-[11px] text-rose-300">{newsletterError}</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick('#hero');
                }}
                className="flex items-center gap-2.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#26734D] flex items-center justify-center text-[#F4C542]">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-xl font-extrabold text-white">Green</span>
                    <span className="text-xl font-bold text-[#F4C542]">Harvest</span>
                  </div>
                  <span className="block text-[10px] uppercase tracking-widest text-emerald-200 font-bold -mt-1">
                    Agriculture
                  </span>
                </div>
              </a>

              <p className="text-xs text-gray-300 leading-relaxed">
                GreenHarvest Agriculture is an agritech company committed to improving agricultural productivity through modern IoT technology, sustainable farming practices, biological organic inputs, and expert agronomic guidance.
              </p>

              {/* Social Media Links */}
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-2">
                  Follow Our Research
                </span>
                <div className="flex items-center gap-2.5">
                  {[
                    { label: 'LinkedIn', icon: 'LI', url: 'https://linkedin.com' },
                    { label: 'Twitter/X', icon: 'X', url: 'https://twitter.com' },
                    { label: 'YouTube', icon: 'YT', url: 'https://youtube.com' },
                    { label: 'Instagram', icon: 'IG', url: 'https://instagram.com' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#26734D] hover:text-[#F4C542] text-xs font-bold flex items-center justify-center text-white transition-all"
                      aria-label={s.label}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                {[
                  { label: 'Home', href: '#hero' },
                  { label: 'About Us', href: '#about' },
                  { label: 'Products & Services', href: '#products' },
                  { label: 'Farming Solutions', href: '#solutions' },
                  { label: 'ROI Calculator', href: '#calculator' },
                  { label: 'Agricultural Impact', href: '#impact' },
                  { label: 'Farmer Testimonials', href: '#testimonials' },
                  { label: 'Sustainability & ESG', href: '#sustainability' },
                  { label: 'Contact Us', href: '#contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavClick(item.href);
                      }}
                      className="hover:text-[#F4C542] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products & Solutions */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Products & Technologies
              </h4>
              <ul className="space-y-2 text-xs">
                {[
                  'Organic Farming Solutions',
                  'Premium Seeds and Fertilizers',
                  'Smart Irrigation Systems',
                  'Crop Management & AI Diagnostics',
                  'Agricultural Consultancy (CCA)',
                  'Modern Electric Farm Equipment',
                  'Subsurface Soil Probes',
                  'Solar Telemetry Gateways'
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#products"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavClick('#products');
                      }}
                      className="hover:text-[#F4C542] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Headquarters */}
            <div className="lg:col-span-3 space-y-3 text-xs">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Global Headquarters
              </h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F4C542] flex-shrink-0 mt-0.5" />
                  <span>4500 Verdant Valley Rd, Suite 300, Sacramento, CA 95814</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#F4C542] flex-shrink-0" />
                  <span>+1 (800) 473-3642 (GREEN-HARVEST)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#F4C542] flex-shrink-0" />
                  <span>advisory@greenharvest-agri.com</span>
                </p>
              </div>

              <div className="pt-3 border-t border-white/10">
                <span className="text-[11px] text-[#F4C542] font-semibold block">
                  Agronomy Diagnostic Lab Hours
                </span>
                <span className="text-[11px] text-gray-400 block mt-0.5">
                  Monday – Friday: 7:00 AM – 6:00 PM PST
                </span>
                <span className="text-[10px] text-emerald-300 block mt-0.5">
                  24/7 Field Sensor Network Telemetry Monitoring
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} GreenHarvest Agriculture Inc. All rights reserved.</p>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <span>•</span>
            <span className="text-[#F4C542]">OMRI Organic Listed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
