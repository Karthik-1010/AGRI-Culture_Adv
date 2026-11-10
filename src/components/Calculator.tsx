import React, { useState } from 'react';
import { Calculator as CalcIcon, Droplets, DollarSign, TrendingUp, Sparkles, ArrowRight, Sprout } from 'lucide-react';

interface CalculatorProps {
  onApplyEstimate: (data: { acreage: string; solution: string; message: string }) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onApplyEstimate }) => {
  const [acreage, setAcreage] = useState<number>(250);
  const [cropType, setCropType] = useState<'grains' | 'orchards' | 'vegetables' | 'cotton'>('grains');

  // Multipliers based on crop types
  const cropMultipliers = {
    grains: { waterPerAcre: 14000, yieldUplift: 24, costSavePerAcre: 135, carbonOffsetPerAcre: 0.45 },
    orchards: { waterPerAcre: 28000, yieldUplift: 28, costSavePerAcre: 310, carbonOffsetPerAcre: 0.65 },
    vegetables: { waterPerAcre: 32000, yieldUplift: 35, costSavePerAcre: 420, carbonOffsetPerAcre: 0.55 },
    cotton: { waterPerAcre: 22000, yieldUplift: 26, costSavePerAcre: 210, carbonOffsetPerAcre: 0.40 },
  };

  const current = cropMultipliers[cropType];

  const estimatedWaterSaved = Math.round(acreage * current.waterPerAcre);
  const estimatedYieldGain = current.yieldUplift;
  const estimatedCostSavings = Math.round(acreage * current.costSavePerAcre);
  const estimatedCarbonOffset = Math.round(acreage * current.carbonOffsetPerAcre);

  const handleApply = () => {
    onApplyEstimate({
      acreage: `${acreage} Acres`,
      solution: 'Smart Irrigation & Precision Tech Suite',
      message: `I modeled my farm of ${acreage} acres (${cropType.toUpperCase()}) with your Agritech ROI Calculator. Expected savings: $${estimatedCostSavings.toLocaleString()} and ${estimatedWaterSaved.toLocaleString()} gallons of water. Please prepare a detailed site consultation.`
    });
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="calculator" className="py-20 bg-white relative border-y border-[#D2E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFEA] text-[#26734D] text-xs font-bold uppercase tracking-wider mb-3">
            <CalcIcon className="w-3.5 h-3.5 text-[#26734D]" />
            <span>Interactive Farm ROI Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
            Estimate Your Water, Yield & Cost Savings
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Select your farm size and primary crop category to model realistic agronomic improvements backed by field research data.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-[#F8FAF8] rounded-3xl border border-[#D2E0D5] p-6 sm:p-10 shadow-soft-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Crop Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  1. Select Primary Crop Focus
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'grains', label: 'Corn, Wheat & Soy', icon: '🌾' },
                    { id: 'orchards', label: 'Vineyards & Orchards', icon: '🍇' },
                    { id: 'vegetables', label: 'Horticulture & Greens', icon: '🥦' },
                    { id: 'cotton', label: 'Cotton & Cash Crops', icon: '🌱' },
                  ].map((crop) => (
                    <button
                      key={crop.id}
                      onClick={() => setCropType(crop.id as any)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center gap-2 ${
                        cropType === crop.id
                          ? 'bg-[#174B35] text-white border-[#174B35] shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-[#26734D]'
                      }`}
                    >
                      <span className="text-base">{crop.icon}</span>
                      <span>{crop.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Acreage Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    2. Farm Size (Acres)
                  </label>
                  <span className="text-base font-extrabold text-[#26734D] bg-[#E8EFEA] px-3 py-0.5 rounded-lg font-mono">
                    {acreage.toLocaleString()} Acres
                  </span>
                </div>
                
                <input
                  type="range"
                  min="20"
                  max="3000"
                  step="20"
                  value={acreage}
                  onChange={(e) => setAcreage(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#26734D]"
                />

                <div className="flex justify-between text-[11px] text-gray-400 font-medium mt-1">
                  <span>20 Acres (Family Farm)</span>
                  <span>1,500 Acres</span>
                  <span>3,000+ Acres (Commercial)</span>
                </div>
              </div>

              {/* Informational Callout */}
              <div className="p-4 rounded-2xl bg-white border border-[#D2E0D5] flex items-start gap-3">
                <Sprout className="w-5 h-5 text-[#26734D] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  Estimates are calculated using regional USDA and FAO micro-irrigation performance tables comparing conventional flood/overhead sprinklers against smart subsurface closed-loop drip systems.
                </p>
              </div>

            </div>

            {/* Right Output Dashboard */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#174B35] to-[#26734D] rounded-2xl p-6 sm:p-8 text-white shadow-soft-lg space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <div>
                  <span className="text-xs font-bold text-[#F4C542] uppercase tracking-wider">
                    Projected Annual Outcomes
                  </span>
                  <h4 className="text-xl font-extrabold text-white">Estimated Farm Value Added</h4>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#F4C542]" />
                </div>
              </div>

              {/* 4 Outcome Cards */}
              <div className="grid grid-cols-2 gap-3.5">
                
                <div className="bg-black/20 p-3.5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-300" />
                    <span>Water Saved</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                    {(estimatedWaterSaved / 1000).toLocaleString()}k
                  </p>
                  <p className="text-[10px] text-blue-200 mt-0.5">Gallons / Year</p>
                </div>

                <div className="bg-black/20 p-3.5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#F4C542]" />
                    <span>Average Yield</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#F4C542] font-mono">
                    +{estimatedYieldGain}%
                  </p>
                  <p className="text-[10px] text-yellow-100 mt-0.5">Bushel / Density Gain</p>
                </div>

                <div className="bg-black/20 p-3.5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Input Cost Cut</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                    ${estimatedCostSavings.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-emerald-200 mt-0.5">In Fertilizer & Power</p>
                </div>

                <div className="bg-black/20 p-3.5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-1">
                    <Sprout className="w-3.5 h-3.5 text-emerald-300" />
                    <span>CO2 Sequestered</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                    {estimatedCarbonOffset}
                  </p>
                  <p className="text-[10px] text-emerald-200 mt-0.5">Tons Metric Carbon</p>
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={handleApply}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-[#F4C542] hover:bg-yellow-300 text-[#174B35] shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
              >
                <span>Apply This Estimate to Consultation Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
