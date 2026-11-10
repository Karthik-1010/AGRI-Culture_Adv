import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/mockData';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, MessageSquarePlus, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [storySubmitted, setStorySubmitted] = useState(false);
  const [storyForm, setStoryForm] = useState({ name: '', farm: '', feedback: '' });

  const current = TESTIMONIALS_DATA[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyForm.name || !storyForm.feedback) return;
    setStorySubmitted(true);
    setTimeout(() => {
      setStorySubmitted(false);
      setShowStoryModal(false);
      setStoryForm({ name: '', farm: '', feedback: '' });
    }, 2500);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#F8FAF8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFEA] text-[#26734D] text-xs font-bold uppercase tracking-wider mb-3">
              <Quote className="w-3.5 h-3.5 text-[#26734D]" />
              <span>Voices From The Field</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
              Trusted by Farmers & Agronomists
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Discover how growers across grains, vineyards, and horticulture utilize GreenHarvest solutions to overcome climate obstacles and improve farm yields.
            </p>
          </div>

          {/* Carousel Controls & Story Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowStoryModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#D2E0D5] bg-white text-xs font-bold text-[#174B35] hover:bg-[#E8EFEA] transition-colors"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#26734D]" />
              <span>Share Your Story</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-white border border-[#D2E0D5] text-gray-700 hover:text-[#174B35] hover:border-[#26734D] flex items-center justify-center transition-all shadow-sm"
                aria-label="Previous farmer testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-[#26734D] text-white hover:bg-[#1f5f3e] flex items-center justify-center transition-all shadow-sm"
                aria-label="Next farmer testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="bg-white rounded-3xl border border-[#D2E0D5] shadow-soft-xl p-8 sm:p-12 relative overflow-hidden transition-all duration-300">
          <div className="absolute top-6 right-8 text-[#E8EFEA]">
            <Quote className="w-24 h-24 stroke-[1]" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Farmer Avatar & Farm Specs */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
              <div className="relative">
                <img
                  src={current.avatarUrl}
                  alt={current.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-[#E8EFEA] shadow-md"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#26734D] text-[#F4C542] p-1.5 rounded-lg shadow">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#174B35]">{current.name}</h3>
                <p className="text-xs font-semibold text-[#805638]">{current.role} • {current.farmName}</p>
                <p className="text-xs text-gray-500 mt-0.5">{current.location}</p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-gray-100 w-full text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Farm Scale:</span>
                  <span className="font-semibold text-gray-900">{current.acreage}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Focus:</span>
                  <span className="font-semibold text-gray-900">{current.cropFocus}</span>
                </div>
              </div>

              {/* Verified Result Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E8EFEA] text-[#174B35] text-xs font-bold w-full justify-center sm:justify-start">
                <Sparkles className="w-3.5 h-3.5 text-[#26734D]" />
                <span>Impact: {current.improvementHighlight}</span>
              </div>
            </div>

            {/* Testimonial Quote & Stars */}
            <div className="lg:col-span-8 space-y-6">
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F4C542] text-[#F4C542]" />
                ))}
                <span className="text-xs font-bold text-gray-500 ml-2">Verified Grower Review</span>
              </div>

              {/* Quote text */}
              <blockquote className="text-lg sm:text-2xl font-medium text-gray-800 leading-relaxed italic">
                "{current.quote}"
              </blockquote>

              {/* Selector Dots */}
              <div className="flex items-center gap-2 pt-4">
                {TESTIMONIALS_DATA.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-8 bg-[#26734D]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`View testimonial by ${t.name}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Fictional Sample Disclaimer Note */}
        <div className="mt-6 text-center">
          <p className="text-[11px] text-gray-500 italic">
            * Sample grower profiles and feedback presented for illustrative design demonstration.
          </p>
        </div>

      </div>

      {/* Share Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100">
            {storySubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#E8EFEA] text-[#26734D] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#174B35]">Thank You for Sharing!</h3>
                <p className="text-xs text-gray-600">Your agricultural feedback has been recorded for review by our grower community coordinator.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitStory} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-[#174B35]">Submit Your Farmer Testimonial</h3>
                  <button
                    type="button"
                    onClick={() => setShowStoryModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={storyForm.name}
                    onChange={(e) => setStoryForm({ ...storyForm, name: e.target.value })}
                    placeholder="e.g. Thomas Miller"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#26734D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Farm Name & Location</label>
                  <input
                    type="text"
                    value={storyForm.farm}
                    onChange={(e) => setStoryForm({ ...storyForm, farm: e.target.value })}
                    placeholder="e.g. Miller Valley Organic Farm, Oregon"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#26734D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Experience or Yield Results</label>
                  <textarea
                    rows={4}
                    required
                    value={storyForm.feedback}
                    onChange={(e) => setStoryForm({ ...storyForm, feedback: e.target.value })}
                    placeholder="Describe your experience with GreenHarvest smart irrigation, organic inputs, or agronomy consultation..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#26734D]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowStoryModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#26734D] text-white hover:bg-[#1f5f3e]"
                  >
                    Submit Story
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
