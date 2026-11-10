import React from 'react';
import { IMPACT_STATISTICS } from '../data/mockData';
import { Users, MapPin, Droplets, Award, ArrowUpRight, Check, X, ShieldAlert } from 'lucide-react';

export const Statistics: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Users': return Users;
      case 'MapPin': return MapPin;
      case 'Droplets': return Droplets;
      case 'Award': return Award;
      default: return Award;
    }
  };

  return (
    <section id="impact" className="py-24 bg-[#174B35] text-white relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26734D] text-[#F4C542] text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Demonstrated Agronomic Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cultivating Measurable Progress Across Agriculture
          </h2>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed">
            Our technology-driven approach combines data telemetry and biological science to unlock sustainable productivity across diverse farming regions.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {IMPACT_STATISTICS.map((stat) => {
            const Icon = getIcon(stat.iconName);
            return (
              <div
                key={stat.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 hover:border-[#F4C542]/50 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#26734D] flex items-center justify-center text-[#F4C542] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-emerald-400 group-hover:text-[#F4C542] transition-colors" />
                </div>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-xs font-semibold text-[#F4C542]">{stat.unit}</span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white mt-1">
                  {stat.label}
                </h3>
                
                <p className="text-xs text-gray-300 mt-1 leading-snug">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Side-by-side Comparative Analysis */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6 sm:p-8 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">Conventional Farming vs. GreenHarvest Smart Agritech</h3>
            <p className="text-xs text-gray-300 mt-1">A direct operational comparison across key agricultural parameters</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/15 text-gray-300">
                  <th className="py-3 px-4 font-semibold">Parameter</th>
                  <th className="py-3 px-4 font-semibold text-rose-300">Conventional Approach</th>
                  <th className="py-3 px-4 font-semibold text-[#F4C542]">GreenHarvest Model</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Irrigation Scheduling</td>
                  <td className="py-3 px-4 text-gray-300 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>Fixed timers, high evaporation</span>
                  </td>
                  <td className="py-3 px-4 text-emerald-200 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#F4C542] flex-shrink-0" />
                    <span>IoT closed-loop moisture sensors (-45% water)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Fertilizer Application</td>
                  <td className="py-3 px-4 text-gray-300 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>Broadcast synthetic chemicals</span>
                  </td>
                  <td className="py-3 px-4 text-emerald-200 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#F4C542] flex-shrink-0" />
                    <span>Microbial precision fertigation & slow-release</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Crop Disease Detection</td>
                  <td className="py-3 px-4 text-gray-300 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>Reactive spraying after visual damage</span>
                  </td>
                  <td className="py-3 px-4 text-emerald-200 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#F4C542] flex-shrink-0" />
                    <span>7-day predictive microclimate & spore alerts</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Soil Biology & Carbon</td>
                  <td className="py-3 px-4 text-gray-300 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>Gradual degradation & soil erosion</span>
                  </td>
                  <td className="py-3 px-4 text-emerald-200 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#F4C542] flex-shrink-0" />
                    <span>Restorative cover cropping & SOC carbon credits</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Illustrative Disclaimer Note (Explicitly required by guidelines) */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-gray-400 max-w-2xl mx-auto flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#F4C542] flex-shrink-0" />
            <span>Note: Statistics presented are illustrative sample benchmarks based on aggregate agricultural research models.</span>
          </p>
        </div>

      </div>
    </section>
  );
};
