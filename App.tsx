import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products } from './components/Products';
import { Solutions } from './components/Solutions';
import { Calculator } from './components/Calculator';
import { Statistics } from './components/Statistics';
import { Testimonials } from './components/Testimonials';
import { Sustainability } from './components/Sustainability';
import { Contact } from './components/Contact';
import { AiAssistant } from './components/AiAssistant';
import { LandLocator } from './components/LandLocator';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import { InfoModal } from './components/InfoModal';
import { ArrowUp } from 'lucide-react';

export function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'demo' | null>(null);

  // Prefill state for the contact form
  const [prefilledSolution, setPrefilledSolution] = useState<string>('');
  const [prefilledAcreage, setPrefilledAcreage] = useState<string>('');
  const [prefilledMessage, setPrefilledMessage] = useState<string>('');

  // Scroll to top indicator
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = () => {
    scrollToSection('#contact');
  };

  const handleSelectProductForInquiry = (productName: string) => {
    setPrefilledSolution(productName);
    addToast('Solution Selected', `${productName} has been pre-selected in the inquiry form below.`);
  };

  const handleApplyEstimate = (data: { acreage: string; solution: string; message: string }) => {
    setPrefilledAcreage(data.acreage);
    setPrefilledSolution(data.solution);
    setPrefilledMessage(data.message);
    addToast('ROI Estimate Applied', 'Your modeled crop acreage and cost figures have been applied to the inquiry form.');
  };

  const handleSelectSolution = (title: string) => {
    setPrefilledSolution(title);
    addToast('Solution Selected', `${title} has been pre-selected in the consultation form.`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#1F2937] flex flex-col font-sans selection:bg-[#26734D] selection:text-white">
      {/* Sticky Navigation */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* SECTION 2: Hero */}
        <Hero
          onExploreSolutions={() => scrollToSection('#solutions')}
          onTalkToAi={() => scrollToSection('#ai-assistant')}
          onOpenVideoDemo={() => setModalType('demo')}
        />

        {/* SECTION 3: About Us */}
        <About onLearnMoreContact={() => scrollToSection('#contact')} />

        {/* SECTION 4: Products & Services */}
        <Products onSelectProductForInquiry={handleSelectProductForInquiry} />

        {/* SECTION 5: Farming Solutions */}
        <Solutions onSelectSolution={handleSelectSolution} />

        {/* INTERACTIVE EXTRA: Farm ROI & Savings Calculator */}
        <Calculator onApplyEstimate={handleApplyEstimate} />

        {/* SECTION 6: Agricultural Impact Statistics */}
        <Statistics />

        {/* SECTION 7: Farmer Testimonials */}
        <Testimonials />

        {/* SECTION 8: Sustainability & ESG */}
        <Sustainability onInquireSustainability={() => {
          setPrefilledSolution('Living Soil & Carbon Audit');
          scrollToSection('#contact');
        }} />

        <AiAssistant />
        <LandLocator />

        {/* SECTION 9: Contact Us */}
        <Contact
          prefilledSolution={prefilledSolution}
          prefilledAcreage={prefilledAcreage}
          prefilledMessage={prefilledMessage}
          onSubmissionSuccess={(title, message) => addToast(title, message, 'success')}
        />
      </main>

      {/* SECTION 10: Footer */}
      <Footer
        onNavClick={scrollToSection}
        onOpenPrivacy={() => setModalType('privacy')}
        onOpenTerms={() => setModalType('terms')}
      />

      {/* Modals */}
      <InfoModal
        type={modalType}
        onClose={() => setModalType(null)}
        onBookCall={() => scrollToSection('#contact')}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-2xl bg-white text-[#174B35] shadow-soft-xl border border-[#D2E0D5] hover:bg-[#26734D] hover:text-white transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default App;
