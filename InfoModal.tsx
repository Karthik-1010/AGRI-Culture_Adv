import React from 'react';
import { X, ShieldCheck, Play, CheckCircle2, ArrowRight } from 'lucide-react';

interface InfoModalProps {
  type: 'privacy' | 'terms' | 'demo' | null;
  onClose: () => void;
  onBookCall?: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose, onBookCall }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'demo' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#26734D] text-[#F4C542] flex items-center justify-center">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#805638] uppercase tracking-wider">
                Platform Architecture Overview
              </span>
              <h3 className="text-2xl font-extrabold text-[#174B35] mt-1">
                GreenHarvest Connected Agritech
              </h3>
            </div>

            {/* Simulated Architecture Flow */}
            <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#D2E0D5] space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#174B35] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Subsurface Probe Telemetry</h4>
                  <p className="text-[11px] text-gray-600">Probes capture root-zone volumetric water content, EC electrical conductivity, and temperature every 15 minutes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#174B35] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">LoRaWAN Long-Range Mesh</h4>
                  <p className="text-[11px] text-gray-600">Data transmits up to 12km over private sub-GHz radio to the solar-powered central field hub, requiring zero cell towers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#174B35] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Automated Smart Valve Dosing</h4>
                  <p className="text-[11px] text-gray-600">The cloud engine pairs moisture telemetry with satellite evapotranspiration data to automatically trigger precision drip cycles.</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Our engineering team conducts live interactive remote walkthroughs personalized for your farm's acreage and soil survey data.
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  if (onBookCall) onBookCall();
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#26734D] hover:bg-[#1f5f3e] text-white text-xs font-bold shadow-soft"
              >
                <span>Book Live Demonstration</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F4C542]" />
              </button>
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#26734D]/10 text-[#26734D] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#174B35]">Farmer Data Privacy & Ownership Policy</h3>
            <div className="text-xs text-gray-600 space-y-3 leading-relaxed">
              <p>
                <strong>1. Grower Data Sovereignty:</strong> GreenHarvest Agriculture believes farmers own their agronomic data. All soil chemistry, yield figures, satellite indices, and moisture metrics remain your sole intellectual property.
              </p>
              <p>
                <strong>2. Zero Commercial Resale:</strong> We never sell, monetize, or license your field telemetry, boundary coordinates, or yield yields to grain commodity traders or third-party advertisers.
              </p>
              <p>
                <strong>3. Bank-Grade Encryption:</strong> Sensor telemetry transmitted via LoRaWAN and cloud storage is protected using AES-128 and TLS 1.3 cryptographic protocols.
              </p>
              <p>
                <strong>4. Easy Data Export:</strong> You can export full historical moisture, soil analysis, and spray prescription records at any time in standard CSV or Shapefile GIS formats.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#26734D] text-white text-xs font-bold"
              >
                Understood & Close
              </button>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#26734D]/10 text-[#26734D] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#174B35]">Terms of Service & Agronomic Advisory</h3>
            <div className="text-xs text-gray-600 space-y-3 leading-relaxed">
              <p>
                <strong>1. Agronomic Advisory Scope:</strong> Diagnostic alerts and recommendations provided by GreenHarvest are generated by certified crop advisers and calibrated sensor algorithms to assist growers in making educated field management choices.
              </p>
              <p>
                <strong>2. Environmental Compliance:</strong> All biological fertilizers and organic soil inputs comply with USDA NOP (National Organic Program) and OMRI standards. Growers are advised to apply products in accordance with label instructions.
              </p>
              <p>
                <strong>3. Hardware Warranty:</strong> GreenHarvest IoT sensor stations and solar gateways include a 3-year full replacement warranty covering thermal weathering, UV degradation, and electrical surges.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#26734D] text-white text-xs font-bold"
              >
                Accept & Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
