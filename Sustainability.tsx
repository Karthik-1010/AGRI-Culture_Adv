import React from 'react';
import { SUSTAINABILITY_PILLARS } from '../data/mockData';
import { Leaf, Droplet, Sprout, Sun, HeartHandshake, CheckCircle2, ShieldCheck, FileDown, ArrowRight } from 'lucide-react';

interface SustainabilityProps {
  onInquireSustainability: () => void;
}

export const Sustainability: React.FC<SustainabilityProps> = ({ onInquireSustainability }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplet': return Droplet;
      case 'Sprout': return Sprout;
      case 'Sun': return Sun;
      case 'HeartHandshake': return HeartHandshake;
      default: return Leaf;
    }
  };

  return (
    <section id="sustainability" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFEA] text-[#26734D] text-xs font-bold uppercase tracking-wider mb-3">
            <Leaf className="w-3.5 h-3.5 text-[#26734D]" />
            <span>Ecological & ESG Commitments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
            Regenerating Farmland for Generations to Come
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Sustainability at GreenHarvest is not an afterthought. Every product, sensor algorithm, and agronomic recommendation is engineered to protect water, regenerate living soil, and eliminate harmful chemical runoff.
          </p>
        </div>

        {/* 4 Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SUSTAINABILITY_PILLARS.map((pillar) => {
            const Icon = getIcon(pillar.iconName);
            return (
              <div
                key={pillar.id}
                className="bg-[#F8FAF8] rounded-3xl p-6 sm:p-7 border border-[#D2E0D5] hover:border-[#26734D] shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#174B35] text-[#F4C542] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#174B35] group-hover:text-[#26734D] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#805638] mt-1 mb-3">
                    {pillar.shortDesc}
                  </p>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {pillar.fullDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D2E0D5]/70">
                  <span className="text-xs font-bold text-gray-500 block">{pillar.statLabel}</span>
                  <span className="text-lg font-extrabold text-[#26734D] font-mono mt-0.5 block">
                    {pillar.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Image Banner & Charter Card */}
        <div className="rounded-3xl overflow-hidden border border-[#D2E0D5] shadow-soft-xl bg-[#174B35] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#26734D] text-[#F4C542] text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>GreenHarvest 2030 Environmental Charter</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Our 5 Zero-Tolerance Environmental Pledges
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-emerald-100">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F4C542] flex-shrink-0" />
                  <span><strong>Zero Neonicotinoids:</strong> 100% protective of native honeybees and pollinator corridors.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F4C542] flex-shrink-0" />
                  <span><strong>Closed-Loop Irrigation:</strong> Eliminate synthetic nutrient leaching into regional water aquifers.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F4C542] flex-shrink-0" />
                  <span><strong>Living Soil Enrichment:</strong> Active commitment to increasing topsoil organic carbon annually.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F4C542] flex-shrink-0" />
                  <span><strong>Clean Photovoltaic Telemetry:</strong> All field sensors and repeaters run on 100% solar capture.</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => {
                    alert('The GreenHarvest 2026 Sustainable Agriculture Charter & Environmental Audit Report (PDF) is downloading.');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-colors"
                >
                  <FileDown className="w-4 h-4 text-[#F4C542]" />
                  <span>Download ESG Sustainability Report (PDF)</span>
                </button>

                <button
                  onClick={onInquireSustainability}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F4C542] hover:bg-yellow-300 text-xs font-bold text-[#174B35] shadow-lg transition-transform hover:scale-105"
                >
                  <span>Request Farm Soil Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 h-72 lg:h-full min-h-[300px] relative">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
                alt="Panoramic view of regenerative sustainable farm with clean solar arrays"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-transparent to-[#174B35]/90"></div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
