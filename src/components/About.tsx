import React, { useState } from 'react';
import { Target, Compass, HeartHandshake, Leaf, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutProps {
  onLearnMoreContact: () => void;
}

export const About: React.FC<AboutProps> = ({ onLearnMoreContact }) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'contribution' | 'sustainability'>('mission');

  const tabContent = {
    mission: {
      title: 'Our Business Mission',
      icon: Target,
      headline: 'Empowering growers through smart science and regenerative stewardship.',
      description: 'GreenHarvest Agriculture exists to bridge the historic gap between generational farming wisdom and modern frontier agronomy. We engineer accessible, robust agricultural technology and organic inputs that elevate farm profitability while replenishing the ecological health of soil and water ecosystems.',
      keyPoints: [
        'Accessible agritech tailored for both smallholders and large commercial producers',
        'Elimination of toxic chemical runoff through bio-derived alternatives',
        'Scientific field validation before any input reaches commercial release',
        'Transparent data ownership ensuring farmers retain full control of field metrics'
      ]
    },
    vision: {
      title: 'Our Strategic Vision',
      icon: Compass,
      headline: 'A resilient global food system where farms and natural ecosystems thrive together.',
      description: 'We envision an agricultural future where water scarcity, changing climatic extremes, and soil depletion are met with proactive precision intelligence. By equipping agricultural communities with real-time telemetry, closed-loop irrigation, and living microbiome nutrition, we are forging food security for generations to come.',
      keyPoints: [
        'Global network of 100,000+ digitized, climate-resilient farms by 2030',
        'Universal transition toward zero-net carbon agricultural production',
        'Democratization of satellite crop diagnostics and early disease alerting',
        'Empowered local farming communities with generational economic stability'
      ]
    },
    contribution: {
      title: 'Contribution to Farmers',
      icon: HeartHandshake,
      headline: 'Putting grower profitability, health, and independence at the center.',
      description: 'Farmers bear the weight of global food production under demanding conditions. GreenHarvest supports producers with dedicated agronomy consultants, 24/7 harvest advisory hotlines, cooperative financing packages, and practical on-field training to ensure technology translates into verifiable bottom-line profit.',
      keyPoints: [
        'Average 3.4x return on investment within the first full crop cycle',
        'Dedicated certified crop advisers (CCA) assigned directly to regional hubs',
        'Flexible equipment leasing and cooperative subscription arrangements',
        'On-site workshops teaching precision calibration and organic pest scouting'
      ]
    },
    sustainability: {
      title: 'Sustainable Agriculture Approach',
      icon: Leaf,
      headline: 'Rebuilding soil organic matter and safeguarding regional watersheds.',
      description: 'True sustainability cannot simply be an afterthought or marketing slogan—it is the biological foundation of crop yield. Our bio-fertilizers, microbial inoculants, and closed-loop irrigation systems regenerate living topsoil, stimulate pollinator populations, and eliminate synthetic reliance.',
      keyPoints: [
        '100% OMRI Listed, bio-derived biological inputs and conditioners',
        'Subsurface drip systems slashing freshwater consumption by over 45%',
        'Living mycorrhizal fungi enrichment enhancing carbon sequestration',
        'Strict zero-neonicotinoid pollinator protection guarantee'
      ]
    }
  };

  const CurrentIcon = tabContent[activeTab].icon;

  return (
    <section id="about" className="py-24 bg-[#F8FAF8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFEA] text-[#26734D] text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>About GreenHarvest Agriculture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
            Bridging Generational Farming & Modern Agritech
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            GreenHarvest connects farmers, agricultural scientists, input suppliers, and clean technology pioneers to build sustainable, high-yield agricultural ecosystems.
          </p>
        </div>

        {/* Two-Column Grid: Image & Interactive Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Composition with Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-soft-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern farmer inspecting precision crop health with agritech tablet in green field"
                  className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#174B35]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#F4C542]">
                    Field Verified Science
                  </span>
                  <p className="text-lg font-bold mt-1">
                    Trusted across 15,000+ cultivated acres globally.
                  </p>
                </div>
              </div>

              {/* Floating Highlight Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl p-4 sm:p-5 shadow-soft-xl border border-[#D2E0D5] max-w-[240px]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#26734D] flex items-center justify-center text-[#F4C542] flex-shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-[#174B35]">12+ Years</p>
                    <p className="text-xs text-gray-500 font-medium">Agronomic Innovation</p>
                  </div>
                </div>
              </div>

              {/* Floating Secondary Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-[#174B35] text-white rounded-xl py-2.5 px-4 shadow-lg border border-[#26734D] flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#F4C542]" />
                <span className="text-xs font-bold tracking-wide">OMRI Certified Organic</span>
              </div>

            </div>
          </div>

          {/* Right Column: Tabbed Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Navigation Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#E8EFEA] p-1.5 rounded-2xl">
              <button
                onClick={() => setActiveTab('mission')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  activeTab === 'mission'
                    ? 'bg-white text-[#174B35] shadow-sm'
                    : 'text-gray-600 hover:text-[#174B35]'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Mission</span>
              </button>

              <button
                onClick={() => setActiveTab('vision')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  activeTab === 'vision'
                    ? 'bg-white text-[#174B35] shadow-sm'
                    : 'text-gray-600 hover:text-[#174B35]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Vision</span>
              </button>

              <button
                onClick={() => setActiveTab('contribution')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  activeTab === 'contribution'
                    ? 'bg-white text-[#174B35] shadow-sm'
                    : 'text-gray-600 hover:text-[#174B35]'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Farmers</span>
              </button>

              <button
                onClick={() => setActiveTab('sustainability')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  activeTab === 'sustainability'
                    ? 'bg-white text-[#174B35] shadow-sm'
                    : 'text-gray-600 hover:text-[#174B35]'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>Eco Approach</span>
              </button>
            </div>

            {/* Active Tab Content Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-[#D2E0D5] space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#26734D]/10 text-[#26734D] flex items-center justify-center">
                  <CurrentIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#805638] uppercase tracking-wider">
                    {tabContent[activeTab].title}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#174B35]">
                    {tabContent[activeTab].headline}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {tabContent[activeTab].description}
              </p>

              {/* Key Bullet Points */}
              <div className="pt-3 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
                  Key Strategic Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {tabContent[activeTab].keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#26734D] flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-700 font-medium leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Ready to discover how this applies to your acreage?
                </span>
                <button
                  onClick={onLearnMoreContact}
                  className="inline-flex items-center text-xs font-bold text-[#26734D] hover:text-[#174B35] gap-1 group"
                >
                  <span>Connect with an Agronomist</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
