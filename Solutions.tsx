import React, { useState } from 'react';
import { FARMING_SOLUTIONS_DATA } from '../data/mockData';
import { Cpu, Droplets, Activity, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface SolutionsProps {
  onSelectSolution: (title: string) => void;
}

export const Solutions: React.FC<SolutionsProps> = ({ onSelectSolution }) => {
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(FARMING_SOLUTIONS_DATA[0].id);

  const selectedSolution = FARMING_SOLUTIONS_DATA.find(s => s.id === selectedSolutionId) || FARMING_SOLUTIONS_DATA[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return Cpu;
      case 'Droplets': return Droplets;
      case 'Activity': return Activity;
      case 'ShieldCheck': return ShieldCheck;
      default: return Sparkles;
    }
  };

  return (
    <section id="solutions" className="py-24 bg-[#F8FAF8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFEA] text-[#26734D] text-xs font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#26734D]" />
            <span>Modern Agritech Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
            How Technology Elevates Agricultural Productivity
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            By shifting from reactive crisis management to proactive sensor-driven stewardship, GreenHarvest empowers farms to produce more while using fewer inputs.
          </p>
        </div>

        {/* 4 Solution Selector Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {FARMING_SOLUTIONS_DATA.map((solution) => {
            const IconComponent = getIcon(solution.iconName);
            const isSelected = selectedSolutionId === solution.id;
            return (
              <button
                key={solution.id}
                onClick={() => setSelectedSolutionId(solution.id)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#174B35] text-white border-[#174B35] shadow-soft-lg transform -translate-y-1'
                    : 'bg-white text-gray-800 border-[#D2E0D5] hover:border-[#26734D]/60 hover:bg-[#F6F9F6]'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected ? 'bg-[#26734D] text-[#F4C542]' : 'bg-[#E8EFEA] text-[#26734D]'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-bold ${isSelected ? 'text-white' : 'text-[#174B35]'}`}>
                    {solution.title}
                  </h3>
                  <p className={`text-xs mt-1.5 line-clamp-2 ${isSelected ? 'text-gray-200' : 'text-gray-500'}`}>
                    {solution.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? 'text-[#F4C542]' : 'text-[#26734D]'}>
                    {solution.metricBadge}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Showcase Panel */}
        <div className="bg-white rounded-3xl border border-[#D2E0D5] shadow-soft-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFEA] text-[#174B35] text-xs font-bold mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#26734D]"></span>
                  <span>Featured Solution Focus</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#174B35]">
                  {selectedSolution.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
                  {selectedSolution.description}
                </p>

                {/* Technical Bullet Points */}
                <div className="mt-6 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Operational Features & Impact
                  </h4>
                  {selectedSolution.bulletPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#26734D] mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-800 font-medium">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Bar & Action CTA */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {selectedSolution.stats.map((stat, idx) => (
                    <div key={idx} className="bg-[#F8FAF8] p-3 rounded-xl border border-gray-100">
                      <p className="text-[11px] text-gray-500 font-medium">{stat.label}</p>
                      <p className="text-base sm:text-lg font-bold text-[#174B35] mt-0.5 font-mono">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    onSelectSolution(selectedSolution.title);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#26734D] hover:bg-[#1f5f3e] text-white text-xs font-bold shadow-soft transition-all duration-200"
                >
                  <span>Implement {selectedSolution.title.split('&')[0]} On Your Farm</span>
                  <ArrowRight className="w-4 h-4 text-[#F4C542]" />
                </button>
              </div>

            </div>

            {/* Right Image & Infographic Column */}
            <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-full bg-gray-900">
              <img
                src={selectedSolution.imageUrl}
                alt={selectedSolution.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#174B35]/90 via-[#174B35]/40 to-transparent"></div>
              
              {/* Overlay Stat Capsule */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#805638]">
                      Verified Field Benchmark
                    </span>
                    <p className="text-base font-extrabold text-[#174B35] mt-0.5">
                      {selectedSolution.metricBadge}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#26734D] text-[#F4C542] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-[11px] text-gray-600 mt-2">
                  Calibrated across over 85,000 hectares of commercial and diversified acreage.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
