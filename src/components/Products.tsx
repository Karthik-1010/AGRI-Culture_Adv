import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../data/mockData';
import type { ProductItem } from '../types';
import { ProductModal } from './ProductModal';
import { ArrowRight, Sparkles, Info, Check } from 'lucide-react';

interface ProductsProps {
  onSelectProductForInquiry: (productName: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ onSelectProductForInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Products & Services' },
    { id: 'organic', label: 'Organic Solutions' },
    { id: 'seeds', label: 'Premium Seeds' },
    { id: 'irrigation', label: 'Smart Irrigation' },
    { id: 'monitoring', label: 'Crop Management' },
    { id: 'consultancy', label: 'Consultancy' },
    { id: 'equipment', label: 'Equipment' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === selectedCategory);

  const handleInquire = (product: ProductItem) => {
    onSelectProductForInquiry(product.title);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFEA] text-[#26734D] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C542]" />
            <span>Catalog & Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#174B35] tracking-tight">
            Comprehensive Agricultural Products & Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            From biological organic soil conditioners to IoT-driven smart drip infrastructure and certified crop advisers, explore our integrated agricultural portfolio.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 scrollbar-none">
          <div className="flex items-center gap-1.5 bg-[#F6F9F6] p-1.5 rounded-2xl border border-[#D2E0D5]/60">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-[#26734D] text-white shadow-soft'
                    : 'text-gray-600 hover:text-[#174B35] hover:bg-white/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#F8FAF8] rounded-3xl overflow-hidden border border-[#D2E0D5] hover:border-[#26734D]/50 shadow-soft hover:shadow-soft-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Product Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#174B35]/90 text-white backdrop-blur-sm border border-white/20">
                      {product.categoryLabel}
                    </span>
                  </div>

                  {/* Impact Metric Floating Tag */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#F4C542] text-[#174B35] shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 inline" />
                      {product.impactMetric}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#174B35] group-hover:text-[#26734D] transition-colors">
                    {product.title}
                  </h3>
                  
                  <p className="text-xs font-semibold text-[#805638] mt-1 mb-3">
                    {product.tagline}
                  </p>

                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Features Quick List */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-200/70 mb-4">
                    {product.features.slice(0, 2).map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <Check className="w-3.5 h-3.5 text-[#26734D] mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalProduct(product)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-gray-300 hover:border-[#26734D] text-xs font-bold text-gray-700 hover:text-[#26734D] bg-white transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>View Specs</span>
                </button>

                <button
                  onClick={() => handleInquire(product)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#26734D] hover:bg-[#1f5f3e] text-white text-xs font-bold shadow-sm transition-all duration-200 group-hover:shadow-md"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F4C542]" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal for Product Specs */}
        <ProductModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
          onInquire={handleInquire}
        />

        {/* Catalog Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#174B35] to-[#26734D] p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F4C542]">
              Custom Agronomy Formulations & Enterprise Sourcing
            </span>
            <h3 className="text-2xl font-extrabold text-white">
              Need bulk seed volumes or custom micro-irrigation layout engineering?
            </h3>
            <p className="text-sm text-emerald-100 max-w-xl">
              Our engineering team drafts custom GIS layouts and hydraulic flow schematics for commercial estates, greenhouses, and grower collectives.
            </p>
          </div>
          <button
            onClick={() => {
              onSelectProductForInquiry('Custom Enterprise Sourcing & Layout Engineering');
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F4C542] hover:bg-yellow-300 text-[#174B35] text-xs font-bold shadow-lg transition-transform hover:scale-105"
          >
            <span>Request Enterprise Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
