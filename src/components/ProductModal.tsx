import React from 'react';
import type { ProductItem } from '../types';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Download, Sparkles } from 'lucide-react';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onInquire: (product: ProductItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onInquire }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Dialog Content */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 z-10">
        
        {/* Header Image with close button */}
        <div className="relative h-60 w-full overflow-hidden bg-gray-900">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-colors"
            aria-label="Close details modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F4C542] text-[#174B35] mb-1.5">
              {product.categoryLabel}
            </span>
            <h3 className="text-2xl font-extrabold text-white">{product.title}</h3>
            <p className="text-xs text-gray-200 mt-0.5">{product.tagline}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Solution Overview
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Validated Capabilities & Agronomic Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-[#F6F9F6] p-2.5 rounded-xl border border-[#D2E0D5]/50">
                  <CheckCircle2 className="w-4 h-4 text-[#26734D] mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-800 font-medium leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Technical & Agronomic Specifications
            </h4>
            <div className="rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100 text-xs">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50">
                  <span className="font-medium text-gray-500">{spec.label}</span>
                  <span className="font-semibold text-gray-900 font-mono">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certification Badge */}
          <div className="p-3.5 rounded-2xl bg-[#E8EFEA] border border-[#D2E0D5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#26734D]" />
              <div>
                <p className="text-xs font-bold text-[#174B35]">GreenHarvest Quality Guarantee</p>
                <p className="text-[11px] text-gray-600">Field-calibrated and lab-verified for commercial use.</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#26734D] bg-white px-2.5 py-1 rounded-full shadow-sm">
              {product.impactMetric}
            </span>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                alert(`Technical specification sheet for ${product.title} has been prepared for download.`);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Spec Sheet (PDF)</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onInquire(product);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#26734D] hover:bg-[#1f5f3e] text-white shadow-soft transition-all duration-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F4C542]" />
              <span>Request Quote for {product.title.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
