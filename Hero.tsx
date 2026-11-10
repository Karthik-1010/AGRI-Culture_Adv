import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Droplet, Sprout, Play, Sparkles, Activity } from 'lucide-react';

interface HeroProps {
  onExploreSolutions: () => void;
  onTalkToAi: () => void;
  onOpenVideoDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreSolutions,
  onTalkToAi,
  onOpenVideoDemo
}) => {
  // Simulated live field telemetry fluctuations
  const [telemetry, setTelemetry] = useState({
    moisture: 68.4,
    temp: 21.8,
    activeNodes: 1420
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        moisture: +(prev.moisture + (Math.random() * 0.4 - 0.2)).toFixed(1),
        temp: +(prev.temp + (Math.random() * 0.2 - 0.1)).toFixed(1),
        activeNodes: prev.activeNodes
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden w-full">
      {/* Background Agriculture Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=85"
          alt="Lush green agricultural fields at golden sunrise"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Layered Gradient Overlay for optimal contrast, readability, and brand depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F3123]/95 via-[#174B35]/85 to-[#0F3123]/70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#26734D]/30 via-transparent to-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-7 text-white space-y-5 sm:space-y-6 min-w-0">
            
            {/* Agritech Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F4C542] text-[11px] sm:text-xs font-semibold tracking-wide shadow-sm max-w-full">
              <span className="flex h-2 w-2 relative flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4C542] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F4C542]"></span>
              </span>
              <span className="truncate">Next-Gen Agricultural Intelligence & Sustainable Inputs</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Growing a Sustainable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4C542] via-yellow-200 to-white">
                Future Through
              </span>{' '}
              Smart Agriculture
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-200 max-w-2xl font-normal leading-relaxed">
              Empowering farmers with innovative agricultural solutions, expert guidance, and sustainable farming technologies.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onExploreSolutions}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#F4C542] text-[#174B35] hover:bg-yellow-300 shadow-soft-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
              >
                <span>Explore Our Solutions</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onTalkToAi}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 hover:border-white/50 transition-all duration-200"
              >
                <span>Talk to Our AI Assistant</span>
              </button>

              <button
                onClick={onOpenVideoDemo}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-colors gap-2"
                aria-label="Watch Smart Farming System Architecture Overview"
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <Play className="w-3 h-3 ml-0.5 fill-current" />
                </div>
                <span>Platform Tour</span>
              </button>
            </div>

            {/* Trust Proof Metrics */}
            <div className="pt-5 border-t border-white/15 grid grid-cols-3 gap-1.5 sm:gap-6 max-w-lg min-w-0">
              <div className="min-w-0">
                <p className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-white truncate">15,000+</p>
                <p className="text-[10px] sm:text-xs text-gray-300 font-medium mt-0.5 truncate">Acres Managed</p>
              </div>
              <div className="min-w-0 px-1 border-x border-white/10">
                <p className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#F4C542] truncate">45%</p>
                <p className="text-[10px] sm:text-xs text-gray-300 font-medium mt-0.5 truncate">Water Saved</p>
              </div>
              <div className="min-w-0">
                <p className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-white truncate">98.4%</p>
                <p className="text-[10px] sm:text-xs text-gray-300 font-medium mt-0.5 truncate">Satisfaction</p>
              </div>
            </div>

          </div>

          {/* Right Column: Live Agritech Telemetry Dashboard Card */}
          <div className="lg:col-span-5 min-w-0">
            <div className="relative rounded-2xl bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/25 p-4 sm:p-6 shadow-2xl text-white">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/15">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#26734D] flex items-center justify-center text-[#F4C542] flex-shrink-0">
                    <Activity className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white truncate">Field Sensor Mesh</h3>
                    <p className="text-[10px] text-[#F4C542] flex items-center gap-1 font-medium truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4C542] animate-ping flex-shrink-0"></span>
                      Sacramento Sector 4 • Live Feed
                    </p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#26734D]/80 border border-emerald-400/30 text-emerald-100 font-mono flex-shrink-0">
                  Online 99.8%
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 my-3.5 sm:my-5">
                <div className="p-2.5 sm:p-3.5 rounded-xl bg-black/20 border border-white/10 min-w-0">
                  <div className="flex items-center justify-between text-gray-300 text-[10px] sm:text-xs mb-1">
                    <span className="truncate">Root Moisture</span>
                    <Droplet className="w-3 h-3 text-blue-400 flex-shrink-0" />
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-white font-mono">{telemetry.moisture}%</div>
                  <div className="text-[9px] text-emerald-400 font-medium mt-1 truncate">
                    Optimal (65-72%)
                  </div>
                </div>

                <div className="p-2.5 sm:p-3.5 rounded-xl bg-black/20 border border-white/10 min-w-0">
                  <div className="flex items-center justify-between text-gray-300 text-[10px] sm:text-xs mb-1">
                    <span className="truncate">Soil Temp</span>
                    <Sparkles className="w-3 h-3 text-[#F4C542] flex-shrink-0" />
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-white font-mono">{telemetry.temp}°C</div>
                  <div className="text-[9px] text-emerald-400 font-medium mt-1 truncate">
                    Optimal range
                  </div>
                </div>

                <div className="p-2.5 sm:p-3.5 rounded-xl bg-black/20 border border-white/10 min-w-0">
                  <div className="flex items-center justify-between text-gray-300 text-[10px] sm:text-xs mb-1">
                    <span className="truncate">Active Nodes</span>
                    <ShieldCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-white font-mono">{telemetry.activeNodes}</div>
                  <div className="text-[9px] text-gray-300 font-medium mt-1 truncate">
                    LoRa Sub-GHz
                  </div>
                </div>

                <div className="p-2.5 sm:p-3.5 rounded-xl bg-black/20 border border-white/10 min-w-0">
                  <div className="flex items-center justify-between text-gray-300 text-[10px] sm:text-xs mb-1">
                    <span className="truncate">Soil Carbon</span>
                    <Sprout className="w-3 h-3 text-[#F4C542] flex-shrink-0" />
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-white font-mono">3.42%</div>
                  <div className="text-[9px] text-emerald-400 font-medium mt-1 truncate">
                    +0.4% YoY Growth
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#26734D]/40 border border-[#26734D]/60 flex items-center justify-between text-[10px] sm:text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
                  <span className="font-medium text-emerald-100 truncate">Drip Scheduling:</span>
                </div>
                <span className="font-bold text-[#F4C542] flex-shrink-0 ml-1">Active (Solar)</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Subtle bottom curve separator */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#F8FAF8] [clip-path:polygon(0_100%,100%_100%,100%_0,0_100%)]"></div>
    </section>
  );
};
