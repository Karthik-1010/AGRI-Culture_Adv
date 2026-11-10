import type { ProductItem, FarmingSolution, Testimonial, StatisticMetric, SustainabilityPillar } from '../types';

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'organic-farming',
    title: 'Organic Farming Solutions',
    category: 'organic',
    categoryLabel: 'Sustainable Inputs',
    tagline: 'Certified Organic Soil Conditioners & Biological Pest Defenders',
    description: 'Transform depleted soils into thriving micro-ecosystems with our USDA Organic certified microbial inoculants, seaweed extracts, and biological pest defense formulations.',
    features: [
      '100% bio-derived microbial soil inoculant',
      'Accelerates nitrogen fixation naturally without chemical runoff',
      'Safe for beneficial pollinators, earthworms, and soil microbes',
      'OMRI Listed and suitable for regenerative agriculture'
    ],
    specs: [
      { label: 'Formulation', value: 'Liquid Concentrate & Micronized Granules' },
      { label: 'Application Rate', value: '2.5 - 4 Liters / Acre' },
      { label: 'Microbial Count', value: '2.5 × 10^9 CFU/ml' },
      { label: 'Shelf Life', value: '24 Months in cool storage' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80',
    badge: 'OMRI Listed Organic',
    impactMetric: '+32% Microbial Soil Activity'
  },
  {
    id: 'premium-seeds',
    title: 'Premium Seeds and Fertilizers',
    category: 'seeds',
    categoryLabel: 'High-Yield Seeds',
    tagline: 'Climate-Adaptive Certified Hybrid Seeds & Controlled-Release Nutrients',
    description: 'High-germination non-GMO certified seeds engineered for thermal resilience and water efficiency, paired with slow-release chelated micronutrient nutrition.',
    features: [
      'Germination rate certified above 98.2%',
      'Enhanced drought and heat shock protein pathways',
      'Customized slow-release N-P-K mineral coatings',
      'Comprehensive regional soil calibration guide included'
    ],
    specs: [
      { label: 'Germination Rate', value: '≥ 98.2% Guaranteed' },
      { label: 'Purity Level', value: '99.9% Cleaned & Graded' },
      { label: 'Nutrient Release', value: '90-Day Sustained Release Curve' },
      { label: 'Packaging', value: 'Hermetically Sealed 25kg & 50kg' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    badge: 'Non-GMO Certified',
    impactMetric: '+28% Average Harvest Density'
  },
  {
    id: 'smart-irrigation',
    title: 'Smart Irrigation Systems',
    category: 'irrigation',
    categoryLabel: 'Water Tech',
    tagline: 'Automated Solar-Powered Precision Drip with Subsurface Sensing',
    description: 'Closed-loop micro-drip networks governed by subsurface moisture sensors and local weather satellite feeds, delivering water directly to the root zone with zero wastage.',
    features: [
      'Real-time automated valve control via LoRaWAN telemetry',
      'Reduces total field water usage by up to 45%',
      'Solar-powered autonomous control station with battery backup',
      'Cloud mobile app with burst detection and fertigation injection'
    ],
    specs: [
      { label: 'Telemetry', value: 'Long-Range LoRaWAN (12km line-of-sight)' },
      { label: 'Power Source', value: 'Integrated 40W Solar Panel + LiFePO4' },
      { label: 'Flow Accuracy', value: '±0.5% Ultrasonic Flow Metering' },
      { label: 'Operating Pressure', value: '0.8 to 4.5 Bar' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80',
    badge: '45% Water Savings',
    impactMetric: 'Conserves 180K Gal / Acre'
  },
  {
    id: 'crop-management',
    title: 'Crop Management Solutions',
    category: 'monitoring',
    categoryLabel: 'AI & Diagnostics',
    tagline: 'Computer Vision Leaf Pathology & Predictive Disease Early Warning',
    description: 'AI-assisted optical monitoring cameras and thermal drone surveys detect blight, rust, and pest infestation 7 to 10 days before visible human eye symptoms.',
    features: [
      'Multispectral leaf reflectance index analysis',
      'Automated fungal spore risk index based on microclimate',
      'Prescriptive targeted treatment recommendations',
      'Seamless export to tractor spray controllers'
    ],
    specs: [
      { label: 'Detection Speed', value: '< 2.4 seconds per high-res leaf scan' },
      { label: 'Spectral Bands', value: 'Red, Green, Blue, RedEdge, NIR' },
      { label: 'Cloud Sync', value: 'Cellular 4G/5G or Satellite link' },
      { label: 'Accuracy', value: '96.8% Field-Validated Diagnostic' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
    badge: 'AI Precision Scouting',
    impactMetric: '-75% Chemical Intervention'
  },
  {
    id: 'agricultural-consultancy',
    title: 'Agricultural Consultancy',
    category: 'consultancy',
    categoryLabel: 'Expert Guidance',
    tagline: 'On-Field Agronomy Specialists, Soil Auditing & Crop Rotation Plans',
    description: 'Direct on-site and remote advisory from licensed agronomists, soil microbiologists, and agricultural financial planners tailored to your specific microclimate.',
    features: [
      'Comprehensive on-farm soil chemistry & microbial assay',
      'Customized 5-year crop rotation and regenerative roadmaps',
      'Agronomic support available via phone, chat, and field visits',
      'Assistance with organic certification and carbon credits'
    ],
    specs: [
      { label: 'Agronomist Ratio', value: '1 Dedicated Specialist per 10 Farms' },
      { label: 'Turnaround Time', value: 'Soil Lab Results within 72 Hours' },
      { label: 'Certifications', value: 'CCA (Certified Crop Adviser) & PCA' },
      { label: 'Session Formats', value: 'On-Farm Walkthrough + Digital Portal' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
    badge: 'Certified Agronomists',
    impactMetric: 'Average 3.4x ROI in Year 1'
  },
  {
    id: 'farming-equipment',
    title: 'Modern Farming Equipment',
    category: 'equipment',
    categoryLabel: 'Hardware & Robotics',
    tagline: 'Electric Autonomous Seeders, Laser Weeders & Soil Core Probes',
    description: 'Next-generation low-compaction electric agricultural machinery designed to minimize soil disruption, eliminate fossil emissions, and run automated field sweeps.',
    features: [
      'Ultra-low ground pressure tracks preventing soil compaction',
      'High-precision optical seed placement within 2mm depth accuracy',
      'Zero tailpipe emissions with swappable Li-Ion battery architecture',
      'Autonomous RTK-GPS navigation with geofence safety locks'
    ],
    specs: [
      { label: 'Working Width', value: '3.2m to 6.4m modular toolbar' },
      { label: 'Run Time', value: '8 - 12 Continuous Hours per Charge' },
      { label: 'GPS Precision', value: 'RTK Sub-centimeter (1.2cm CEP)' },
      { label: 'Tire Pressure', value: '0.4 bar ultra-low compaction' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
    badge: '100% Electric Hardware',
    impactMetric: '-85% Soil Compaction Risk'
  }
];

export const FARMING_SOLUTIONS_DATA: FarmingSolution[] = [
  {
    id: 'smart-farming',
    title: 'Smart Farming & Precision Tech',
    subtitle: 'Harness IoT sensor telemetry and satellite crop health modeling to maximize yield per square meter.',
    description: 'Precision agriculture eliminates guesswork. Our connected farm ecosystem links high-precision field sensors, tractor RTK guidance, and multispectral drone data into a unified farmer dashboard for optimal planting and harvesting decisions.',
    bulletPoints: [
      'Continuous microclimate sensing (temperature, humidity, solar lux)',
      'Sub-field yield mapping identifying high and low performance zones',
      'Autonomous drone dispatch for rapid crop vigor analysis',
      'Seamless integration with standard tractor ISOBUS systems'
    ],
    iconName: 'Cpu',
    imageUrl: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=800&q=80',
    metricBadge: '+38% Productivity Uplift',
    stats: [
      { label: 'Data Refresh', value: 'Every 15 Mins' },
      { label: 'Acre Coverage', value: 'Up to 5,000 / Gateway' },
      { label: 'Labor Saved', value: '24 hrs / Week' }
    ]
  },
  {
    id: 'water-management',
    title: 'Intelligent Water Management',
    subtitle: 'Conserve valuable aquifer reserves with climate-synchronized micro-irrigation networks.',
    description: 'Agriculture accounts for 70% of global freshwater withdrawals. GreenHarvest replaces outdated flood irrigation with closed-loop precision drip systems governed by evapotranspiration equations and root-depth moisture probes.',
    bulletPoints: [
      'Pulse fertigation delivering liquid nutrients precisely to roots',
      'Weather forecast lookahead prevents irrigation ahead of rainfall',
      'Solar-powered booster pumps requiring zero grid power hookups',
      'Acoustic sensor leak detection in buried drip lines'
    ],
    iconName: 'Droplets',
    imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80',
    metricBadge: '45% Freshwater Conserved',
    stats: [
      { label: 'Water Saved', value: '42.5M Gallons/yr' },
      { label: 'Root Delivery', value: '98% Efficiency' },
      { label: 'Power Draw', value: '100% Solar-Ready' }
    ]
  },
  {
    id: 'soil-health',
    title: 'Soil Health & Carbon Monitoring',
    subtitle: 'Nurture living, biodiverse soil beds that store carbon and build natural drought immunity.',
    description: 'Healthy crops demand living soil. Our subsurface probe arrays track nitrogen, phosphorus, potassium, moisture conductivity, and soil organic matter in real time, alerting agronomists when biological balance needs reinforcement.',
    bulletPoints: [
      'Multi-depth sensor probes measuring 10cm, 30cm, and 60cm horizons',
      'Living soil respiration index monitoring fungal-to-bacterial ratios',
      'Regenerative cover crop recommendation engine',
      'Verified soil organic carbon (SOC) sequestration auditing'
    ],
    iconName: 'Activity',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    metricBadge: '99.2% Soil Health Accuracy',
    stats: [
      { label: 'Depth Horizons', value: '3 Soil Levels' },
      { label: 'Organic Matter', value: '+1.8% in 2 Yrs' },
      { label: 'Erosion Cut', value: '-64%' }
    ]
  },
  {
    id: 'disease-prevention',
    title: 'Proactive Disease & Pest Defense',
    subtitle: 'Neutralize fungal infections and insect swarms before they compromise crop yield.',
    description: 'By analyzing continuous leaf wetness hours, atmospheric vapor pressure deficits, and spore trap counts, GreenHarvest gives farmers actionable 7-day predictive windows to apply organic preventative treatments rather than toxic rescue sprays.',
    bulletPoints: [
      'Vapor Pressure Deficit (VPD) alerts for early fungal outbreak warnings',
      'AI optical insect identification in automated sticky traps',
      'Biodiversity-friendly pheromone disruption strategies',
      'Prescription spray maps targeted only to affected clusters'
    ],
    iconName: 'ShieldCheck',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80',
    metricBadge: '7-10 Day Early Alert',
    stats: [
      { label: 'Spray Reduction', value: '-70% Pesticide' },
      { label: 'Crop Losses', value: '< 2.1% Avg' },
      { label: 'Pollinator Safety', value: '100% Protected' }
    ]
  }
];

export const IMPACT_STATISTICS: StatisticMetric[] = [
  {
    id: 'farmers-supported',
    label: 'Farmers Supported',
    value: '12,450+',
    subtext: 'Smallholders and commercial growers empowered globally',
    iconName: 'Users'
  },
  {
    id: 'land-digitized',
    label: 'Precision Hectares',
    value: '85,000+',
    subtext: 'Farmland optimized with smart IoT sensor mesh',
    iconName: 'MapPin'
  },
  {
    id: 'water-saved',
    label: 'Water Conserved',
    value: '42.5M',
    unit: 'Gallons / Year',
    subtext: 'Saved through automated climate-smart drip networks',
    iconName: 'Droplets'
  },
  {
    id: 'consultants',
    label: 'Expert Consultants',
    value: '140+',
    subtext: 'Certified agronomists, soil chemists, and tech advisors',
    iconName: 'Award'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Principal Farmer',
    farmName: 'Vance Prairie Grain Co.',
    location: 'Des Moines, Iowa',
    acreage: '1,450 Acres (Corn & Soybeans)',
    quote: 'GreenHarvest transformed our seasonal planning. The combination of precision soil probes and satellite imagery cut our fertilizer expenditure by 34% while yielding our highest bushel-per-acre count in 25 years of farming.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=300&q=80',
    cropFocus: 'Corn & Soybeans',
    improvementHighlight: '34% Fertilizer Savings'
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Managing Viticulturist',
    farmName: 'Cascadia Heritage Vineyards',
    location: 'Yakima Valley, Washington',
    acreage: '320 Acres (Wine Grapes & Stone Fruit)',
    quote: 'Water scarcity was threatening our premium Pinot Noir blocks. GreenHarvest\'s automated drip system with real-time moisture feedback saved over 1.2 million gallons in our first season without stressing the vines.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    cropFocus: 'Organic Wine Grapes',
    improvementHighlight: '1.2M Gallons Saved'
  },
  {
    id: 'david-mwangi',
    name: 'David Mwangi',
    role: 'Cooperative Director',
    farmName: 'Rift Valley Fresh Agri-Hub',
    location: 'Nakuru, Kenya',
    acreage: '850 Acres (Horticulture & Legumes)',
    quote: 'The direct agronomist support and mobile diagnostics gave our 120 member farmers the confidence to transition to certified organic practices. Our export prices doubled because our produce passes the strictest residue tests.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    cropFocus: 'Horticulture & Legumes',
    improvementHighlight: '2x Export Premium'
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Agritech Director',
    farmName: 'Pacific Delta Sustainable Farms',
    location: 'Sacramento Valley, California',
    acreage: '980 Acres (Rice & Heirloom Tomatoes)',
    quote: 'We avoided a devastating fungal blight last July thanks to the GreenHarvest predictive early warning algorithm. It notified us 8 days before our neighbors noticed signs, saving our entire heirloom harvest.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    cropFocus: 'Rice & Heirloom Tomatoes',
    improvementHighlight: '100% Crop Blight Prevention'
  }
];

export const SUSTAINABILITY_PILLARS: SustainabilityPillar[] = [
  {
    id: 'water-stewardship',
    title: 'Water Stewardship',
    shortDesc: 'Eliminating agricultural runoff and conserving vital regional aquifers.',
    fullDesc: 'By combining subsurface smart drip lines with microclimate forecasting, we ensure every droplet directly feeds roots without evaporation loss or deep groundwater contamination.',
    iconName: 'Droplet',
    stat: '42.5M Gallons',
    statLabel: 'Freshwater Conserved Annually'
  },
  {
    id: 'soil-regeneration',
    title: 'Living Soil Regeneration',
    shortDesc: 'Restoring microbial biodiversity and enhancing carbon capture.',
    fullDesc: 'We move beyond conventional chemical tilling. Our biological inputs and low-compaction farming protocols nurture deep mycorrhizal networks that naturally sequester atmospheric carbon.',
    iconName: 'Sprout',
    stat: '18,500 Tons',
    statLabel: 'Soil Carbon Sequestered'
  },
  {
    id: 'clean-energy',
    title: '100% Clean Agritech Power',
    shortDesc: 'Operating telemetry, sensors, and pumps on self-contained solar systems.',
    fullDesc: 'All GreenHarvest sensor stations, field repeaters, and smart valve controllers feature integrated photovoltaic generation, operating 100% off-grid without diesel generators.',
    iconName: 'Sun',
    stat: '0 kg CO2',
    statLabel: 'Field Telemetry Emissions'
  },
  {
    id: 'pollinator-protection',
    title: 'Pollinator Safe Formulations',
    shortDesc: 'Zero neonicotinoids or synthetic persistent pesticides in our biological lines.',
    fullDesc: 'We safeguard honeybees, native wild bees, and beneficial insects by formulating strictly biological defenses and targeted mating disruption pheromones.',
    iconName: 'HeartHandshake',
    stat: '100% Safe',
    statLabel: 'Certified Pollinator Friendly'
  }
];

export const FAQS_DATA = [
  {
    question: 'How quickly can GreenHarvest sensors and smart irrigation be installed on my farm?',
    answer: 'A standard 100 to 500-acre sensor array and solar gateway can be deployed in just 1 to 2 business days. Our field engineering technicians perform site RF testing, sensor calibration, and full app pairing on-site.'
  },
  {
    question: 'Are your organic solutions certified for organic export markets?',
    answer: 'Yes! All GreenHarvest biological inputs, microbial conditioners, and bio-nutrients are OMRI Listed and comply with USDA Organic, European Union Ecocert, and JAS standards.'
  },
  {
    question: 'Do your smart farming tools require internet or cellular coverage on remote land?',
    answer: 'No cellular connection is needed at individual field sensor locations. Our sensors communicate over private long-range LoRaWAN radio up to 12km to a central solar gateway, which can transmit data via cellular or direct low-earth-orbit satellite link.'
  },
  {
    question: 'Can smaller smallholder farms afford these modern farming solutions?',
    answer: 'Absolutely. We offer flexible modular subscriptions and work with agricultural cooperative finance programs, allowing farms as small as 5 acres to access high-accuracy soil and irrigation advisory.'
  },
  {
    question: 'What kind of support is provided after installation?',
    answer: 'Every farm is paired with a dedicated regional Certified Crop Adviser (CCA). You receive continuous real-time diagnostic alerts, seasonal planting recommendations, and direct telephone and on-field support.'
  }
];
