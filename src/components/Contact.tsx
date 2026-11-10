import React, { useState, useEffect } from 'react';
import type { ContactFormData, FormErrors } from '../types';
import { FAQS_DATA } from '../data/mockData';
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle2,
  AlertCircle, HelpCircle, ChevronDown, ShieldAlert
} from 'lucide-react';

interface ContactProps {
  prefilledSolution?: string;
  prefilledAcreage?: string;
  prefilledMessage?: string;
  onSubmissionSuccess: (title: string, message: string) => void;
}

export const Contact: React.FC<ContactProps> = ({
  prefilledSolution = '',
  prefilledAcreage = '',
  prefilledMessage = '',
  onSubmissionSuccess
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    farmType: 'Commercial Producer',
    acreage: prefilledAcreage || '100 - 500 Acres',
    solution: prefilledSolution || 'Smart Irrigation Systems',
    message: prefilledMessage || ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string;
    name: string;
  } | null>(null);

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Sync prefilled data if parent changes
  useEffect(() => {
    if (prefilledSolution) {
      setFormData(prev => ({ ...prev, solution: prefilledSolution }));
    }
    if (prefilledAcreage) {
      setFormData(prev => ({ ...prev, acreage: prefilledAcreage }));
    }
    if (prefilledMessage) {
      setFormData(prev => ({ ...prev, message: prefilledMessage }));
    }
  }, [prefilledSolution, prefilledAcreage, prefilledMessage]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format (e.g., name@domain.com).';
    }

    // Phone validation
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required for our agronomists to reach you.';
    } else if (!phoneRegex.test(formData.phone.trim().replace(/\s+/g, ''))) {
      newErrors.phone = 'Please provide a valid 10-digit phone number (e.g. +1 800-473-3642 or 555-123-4567).';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief message or describe your farm requirements.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate verified frontend submission with loading feedback
    setTimeout(() => {
      setIsSubmitting(false);
      const referenceId = `GH-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedData({
        referenceId,
        name: formData.fullName
      });

      onSubmissionSuccess(
        'Consultation Inquiry Logged!',
        `Thank you ${formData.fullName}. Your request (${referenceId}) has been validated.`
      );
    }, 1200);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      farmType: 'Commercial Producer',
      acreage: '100 - 500 Acres',
      solution: 'Smart Irrigation Systems',
      message: ''
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-24 bg-[#F8FAF8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFEA] text-[#26734D] text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5 text-[#26734D]" />
            <span>Consultation & Direct Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
            Schedule an Agronomy Consultation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Whether you are evaluating smart drip irrigation, seeking certified organic inputs, or planning precision soil mapping, our agronomists are ready to partner with you.
          </p>
        </div>

        {/* Contact Grid: Form & Fictional Business Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-soft-xl border border-[#D2E0D5]">
            
            {submittedData ? (
              /* Success State */
              <div className="text-center py-10 space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#E8EFEA] text-[#26734D] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                
                <div>
                  <span className="text-xs font-bold text-[#805638] uppercase tracking-wider">
                    Inquiry Verified
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#174B35] mt-1">
                    Thank You, {submittedData.name}!
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
                    Your request has been successfully validated in our consultation queue.
                  </p>
                </div>

                {/* Reference ID Capsule */}
                <div className="bg-[#F8FAF8] p-4 rounded-2xl border border-[#D2E0D5] max-w-sm mx-auto text-left space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Inquiry Reference:</span>
                    <span className="font-mono font-bold text-[#26734D]">{submittedData.referenceId}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Selected Solution:</span>
                    <span className="font-semibold text-gray-800">{formData.solution}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Acreage Stated:</span>
                    <span className="font-semibold text-gray-800">{formData.acreage}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 text-[11px] text-gray-500">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#F4C542] inline mr-1" />
                    <span>Demo mode: Frontend form validation verified. No live emails are dispatched.</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#26734D] hover:bg-[#1f5f3e] text-white text-xs font-bold transition-colors shadow-soft"
                >
                  <span>Submit Another Inquiry</span>
                </button>
              </div>
            ) : (
              /* Active Form */
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <h3 className="text-xl font-bold text-[#174B35]">
                    Request a Customized Farm Evaluation
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Fill out the parameters below and a regional Certified Crop Adviser will connect within 1 business day.
                  </p>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      placeholder="e.g. Rachel Adams"
                      className={`w-full text-xs px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 ${
                        errors.fullName
                          ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-400'
                          : 'border-gray-200 focus:border-[#26734D] focus:ring-[#26734D]/20'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="e.g. rachel@greenacres.com"
                      className={`w-full text-xs px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-400'
                          : 'border-gray-200 focus:border-[#26734D] focus:ring-[#26734D]/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Farm Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="e.g. +1 (555) 234-5678"
                      className={`w-full text-xs px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-400'
                          : 'border-gray-200 focus:border-[#26734D] focus:ring-[#26734D]/20'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Operation Type
                    </label>
                    <select
                      value={formData.farmType}
                      onChange={(e) => setFormData({ ...formData, farmType: e.target.value })}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#26734D] focus:ring-2 focus:ring-[#26734D]/20"
                    >
                      <option value="Commercial Producer">Commercial Farm / Producer</option>
                      <option value="Family / Smallholder Farm">Family / Smallholder Farm</option>
                      <option value="Agricultural Cooperative">Agricultural Cooperative</option>
                      <option value="Agronomy Consultant">Agronomy Consultant / Retailer</option>
                      <option value="Investor / Partner">Ag Investor / Clean Tech Partner</option>
                    </select>
                  </div>
                </div>

                {/* Acreage & Solution of Interest */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Approximate Acreage
                    </label>
                    <select
                      value={formData.acreage}
                      onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#26734D] focus:ring-2 focus:ring-[#26734D]/20"
                    >
                      <option value="Under 50 Acres">Under 50 Acres</option>
                      <option value="50 - 200 Acres">50 - 200 Acres</option>
                      <option value="200 - 1,000 Acres">200 - 1,000 Acres</option>
                      <option value="1,000 - 5,000 Acres">1,000 - 5,000 Acres</option>
                      <option value="Over 5,000 Acres">Over 5,000 Acres</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Primary Solution of Interest
                    </label>
                    <select
                      value={formData.solution}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                      className="w-full text-xs px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#26734D] focus:ring-2 focus:ring-[#26734D]/20"
                    >
                      <option value="Organic Farming Solutions">Organic Farming Solutions</option>
                      <option value="Premium Seeds and Fertilizers">Premium Seeds & Fertilizers</option>
                      <option value="Smart Irrigation Systems">Smart Irrigation Systems</option>
                      <option value="Agricultural Consultancy">Agricultural Consultancy</option>
                      <option value="Crop Management Solutions">Crop Management (AI & Drones)</option>
                      <option value="Modern Farming Equipment">Modern Electric Farming Equipment</option>
                      <option value="Full Precision Agritech Suite">Full Precision Agritech Suite</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Field Description & Inquiries <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Tell us about your soil type, crops, current irrigation method, or specific challenges..."
                    className={`w-full text-xs px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 ${
                      errors.message
                        ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-400'
                        : 'border-gray-200 focus:border-[#26734D] focus:ring-[#26734D]/20'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#26734D] hover:bg-[#1f5f3e] disabled:bg-gray-400 text-white text-xs font-bold shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-2 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Validating Consultation Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#F4C542]" />
                      <span>Submit Farm Consultation Request</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-gray-500 text-center">
                  🔒 We respect your agronomic privacy. Your field data is never sold or shared.
                </p>

              </form>
            )}

          </div>

          {/* Right Column: Fictional Contact Info & FAQ Accordion */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Contact Cards */}
            <div className="bg-[#174B35] rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-soft-xl">
              <div>
                <span className="text-xs font-bold text-[#F4C542] uppercase tracking-wider">
                  Direct Agronomy Headquarters
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">
                  GreenHarvest Agriculture Hub
                </h3>
                <p className="text-xs text-emerald-100 mt-1">
                  Connect directly with regional agronomists, soil labs, and technical support.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#26734D] flex items-center justify-center text-[#F4C542] flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Innovation Campus & Soil Labs</p>
                    <p className="text-gray-300">4500 Verdant Valley Rd, Suite 300</p>
                    <p className="text-gray-300">Sacramento, CA 95814, United States</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#26734D] flex items-center justify-center text-[#F4C542] flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Telephone & Hotline</p>
                    <a href="tel:+18004733642" className="text-gray-300 hover:text-[#F4C542] transition-colors block">
                      Toll-Free: +1 (800) 473-3642 (GREEN-HARVEST)
                    </a>
                    <span className="text-[11px] text-emerald-300 block">24/7 Urgent Agronomic Diagnostic Support</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#26734D] flex items-center justify-center text-[#F4C542] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Direct Email Inquiries</p>
                    <a href="mailto:advisory@greenharvest-agri.com" className="text-gray-300 hover:text-[#F4C542] transition-colors block">
                      advisory@greenharvest-agri.com
                    </a>
                    <a href="mailto:support@greenharvest-agri.com" className="text-gray-400 hover:text-white transition-colors block text-[11px]">
                      support@greenharvest-agri.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#26734D] flex items-center justify-center text-[#F4C542] flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Operating Hours</p>
                    <p className="text-gray-300">Mon - Fri: 7:00 AM – 6:00 PM PST</p>
                    <p className="text-gray-300">Saturday: 8:00 AM – 2:00 PM PST</p>
                  </div>
                </div>
              </div>

              {/* Fictional Details Notice */}
              <div className="pt-4 border-t border-white/10 text-[11px] text-emerald-200/80">
                <span>* Fictional business contact details presented for demonstration and portfolio testing.</span>
              </div>
            </div>

            {/* Interactive FAQs Accordion */}
            <div className="bg-white rounded-3xl p-6 border border-[#D2E0D5] shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-4 h-4 text-[#26734D]" />
                <h4 className="text-sm font-bold text-[#174B35]">Frequently Asked Farmer Questions</h4>
              </div>

              <div className="space-y-2">
                {FAQS_DATA.map((faq, idx) => {
                  const isOpen = expandedFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-gray-100 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : idx)}
                        className="w-full p-3.5 text-left text-xs font-bold text-gray-800 hover:text-[#26734D] flex items-center justify-between gap-2"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#26734D]' : 'text-gray-400'}`} />
                      </button>

                      {isOpen && (
                        <div className="px-3.5 pb-3.5 text-xs text-gray-600 leading-relaxed border-t border-gray-50 bg-[#F8FAF8]">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
