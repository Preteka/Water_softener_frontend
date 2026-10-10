/**
 * AquaPure - Services Data Architecture
 * Single source of truth for all six core water treatment solutions.
 */

const SERVICES_DATA = [
  {
    id: 1,
    slug: 'whole-home-water-softening',
    name: 'Whole-Home Water Softening',
    category: 'Water Softeners',
    categorySlug: 'softeners',
    shortDescription: 'Reduce the effects of hard water throughout your home and help minimize mineral scale on fixtures, pipes, and appliances.',
    fullDescription: 'Our Whole-Home Ion-Exchange Water Softening systems are engineered to eliminate dissolved calcium and magnesium ions that cause scale buildup, dry skin, soap scum, and shortened appliance lifespans. By treating water at the main entry point of your residence, every faucet, showerhead, water heater, dishwasher, and washing machine receives softened, conditioned water.',
    image: 'assets/images/system_water_softener.jpg',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    benefitSnippet: 'Eliminates scale buildup & extends appliance lifespan by up to 35%',
    idealFor: [
      'Homes with municipal or well water testing above 7 GPG (Grains Per Gallon) hardness',
      'Households experiencing stiff laundry, soap residue, and dry skin after showers',
      'Homeowners looking to protect tankless or conventional water heaters from internal scaling',
      'Families seeking easier cleaning and spotless glass and chrome fixtures'
    ],
    features: [
      {
        title: 'High-Efficiency Resin Matrix',
        desc: 'Premium cross-linked ion-exchange resin beads engineered for maximum hardness ion removal with minimal salt consumption.'
      },
      {
        title: 'Smart Metered Regeneration',
        desc: 'Digital metering monitors actual water consumption and only regenerates when needed, saving up to 40% in salt and water.'
      },
      {
        title: 'Bypass Valve & Safety Float',
        desc: 'Integrated heavy-duty bypass valve allows unsoftened outdoor hose bib usage, paired with brine overflow safety floats.'
      },
      {
        title: 'Corrosion-Proof Polyglass Tank',
        desc: 'Reinforced fiberglass outer winding with NSF-certified liner designed to withstand continuous household water pressures.'
      }
    ],
    keyBenefits: [
      {
        title: 'Extended Appliance Longevity',
        desc: 'Prevents limescale buildup inside water heaters, dishwashers, and washing machines, preserving heating efficiency.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
      },
      {
        title: 'Healthier Skin & Softer Hair',
        desc: 'Softened water rinses away soap cleanly without stripping natural moisture, soothing eczema and dry scalp.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
      },
      {
        title: 'Lower Detergent & Energy Bills',
        desc: 'Requires 50% less soap and detergent to produce rich lather while restoring water heater thermodynamic efficiency.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>`
      },
      {
        title: 'Spotless Dishes & Clean Fixtures',
        desc: 'No more foggy glassware, chalky rings in tubs, or stubborn mineral deposits clogging showerheads.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`
      }
    ],
    process: [
      {
        stepNumber: 1,
        title: 'Water Hardness Assessment',
        desc: 'Our technician measures grains per gallon (GPG) hardness and iron levels right from your main line.'
      },
      {
        stepNumber: 2,
        title: 'Capacity & Flow Sizing',
        desc: 'We calculate your household peak flow rate and bathroom count to select the ideal grain capacity tank.'
      },
      {
        stepNumber: 3,
        title: 'Clean Plumbing Tie-In',
        desc: 'Seamless installation into your main supply loop with full bypass valves, drain routing, and brine hookup.'
      },
      {
        stepNumber: 4,
        title: 'Commissioning & Setting',
        desc: 'Digital hardness calibration, cycle programming, first salt charge, and follow-up soft water test.'
      }
    ],
    pricingDescription: 'Softener pricing is tailored to your home water hardness (GPG), household peak flow rate (GPM), and plumbing loop readiness. Each quotation includes certified delivery, valve configuration, salt starter kit, and comprehensive labor warranty.',
    faqs: [
      {
        q: 'What size water softener does my household require?',
        a: 'System sizing is calculated by multiplying daily water usage per person (~75 gallons) by household members and hardness GPG. A family of 4 with 10 GPG hardness typically uses a 32,000 to 48,000 grain system.'
      },
      {
        q: 'How frequently will I need to add salt to the brine tank?',
        a: 'Most typical households use one 40-lb bag of high-purity solar salt or potassium chloride per month, depending on water hardness and regeneration frequency.'
      },
      {
        q: 'Will softened water taste salty or contain high sodium?',
        a: 'Ion exchange adds a negligible amount of sodium (about the same as a slice of bread per quart). For zero-sodium drinking water, we pair softeners with reverse osmosis drinking systems.'
      },
      {
        q: 'Can a softener be installed in an outdoor or garage closet?',
        a: 'Yes. As long as the location has access to the main water loop, a 120V outlet, a drain line, and freeze protection, garage and utility room installations are very common.'
      }
    ],
    relatedSlugs: ['drinking-water-filtration', 'reverse-osmosis-systems', 'water-system-installation']
  },
  {
    id: 2,
    slug: 'drinking-water-filtration',
    name: 'Drinking Water Filtration',
    category: 'Water Filtration',
    categorySlug: 'filtration',
    shortDescription: 'Explore filtration options designed to improve drinking water quality, taste, and clarity based on your household conditions.',
    fullDescription: 'Our targeted drinking water filtration systems eliminate unpleasant municipal chlorine taste, chloramines, volatile organic compounds (VOCs), sediment, and chemical odors right at your kitchen faucet. Whether installed under the sink or inline with your refrigerator ice maker, you get crisp, pristine, refreshing water on demand.',
    image: 'assets/images/system_filtration.jpg',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>`,
    benefitSnippet: 'Removes 99% chlorine, lead & chemical taste for pure hydration',
    idealFor: [
      'Families tired of bad chemical or chlorine tap water odors',
      'Households wanting to eliminate expensive single-use plastic water bottles',
      'Cooking enthusiasts seeking pure water that does not alter beverage flavors',
      'Apartments or homes with compact under-counter space'
    ],
    features: [
      {
        title: 'Catalytic Carbon Block Media',
        desc: 'Advanced sub-micron coconut shell carbon blocks engineered to absorb difficult chloramines, pharmaceuticals, and pesticides.'
      },
      {
        title: 'Lead & Heavy Metal Scavengers',
        desc: 'NSF 53 certified media specifically formulated to capture soluble lead, copper, and mercury.'
      },
      {
        title: 'High-Flow Direct Output',
        desc: 'Delivers up to 2.2 gallons per minute directly through your designer faucet without bulky storage tanks.'
      },
      {
        title: 'Twist-Lock Sanitary Cartridges',
        desc: 'Dripless dry-swap filter heads let you replace filter cartridges in under 60 seconds with zero plumbing tools.'
      }
    ],
    keyBenefits: [
      {
        title: 'Superior Taste & Crisp Odor',
        desc: 'Enjoy restaurant-grade water, coffee, and tea free from swimming pool chlorine smells and metallic aftertastes.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`
      },
      {
        title: 'Eco-Friendly Plastic Reduction',
        desc: 'A single filtration cartridge replaces over 3,000 standard 16.9 oz plastic water bottles annually.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`
      },
      {
        title: 'Protects Essential Minerals',
        desc: 'Targets toxic chemical contaminants and sediments while retaining beneficial calcium and magnesium electrolytes.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
      },
      {
        title: 'Zero Wastewater Discharge',
        desc: '100% of incoming water is filtered directly to your glass without any brine drain or waste runoff.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>`
      }
    ],
    process: [
      {
        stepNumber: 1,
        title: 'Source Water Quality Check',
        desc: 'Testing chlorine levels, total dissolved solids, and presence of chemical impurities at your sink.'
      },
      {
        stepNumber: 2,
        title: 'Cartridge Stage Configuration',
        desc: 'Choosing the optimal sediment, catalytic carbon, and specialty lead cartridges for your water profile.'
      },
      {
        stepNumber: 3,
        title: 'Under-Sink Installation',
        desc: 'Mounting bracket assembly, angle-stop adapter connection, and designer drinking faucet placement.'
      },
      {
        stepNumber: 4,
        title: 'Sanitizing & Flow Verification',
        desc: 'System flushing, leak pressure test, and TDS comparative reading demonstration.'
      }
    ],
    pricingDescription: 'Filtration packages vary according to multi-stage configuration, faucet finish selections, and refrigerator line extensions. Transparent quotations include complete hardware, mounting, connection tubing, and certified installation.',
    faqs: [
      {
        q: 'How often do drinking water filter cartridges need replacement?',
        a: 'Standard multi-stage carbon cartridges are rated for 1,000 to 1,500 gallons, which equates to roughly 6 to 12 months for an average four-person family.'
      },
      {
        q: 'Can this system be connected to my refrigerator ice maker?',
        a: 'Yes. We routinely install a dedicated auxiliary 1/4" polyethylene line from the filter unit to your refrigerator, providing crystal-clear ice cubes and cold door water.'
      },
      {
        q: 'Do I need to drill a hole in my granite countertop?',
        a: 'If you do not have an existing accessory hole (like an unused soap dispenser or sprayer hole), our technicians are equipped with diamond core bits to safely drill standard granite, quartz, or marble countertops.'
      },
      {
        q: 'Does this remove dissolved minerals and fluoride?',
        a: 'Carbon drinking filtration removes chemicals, chlorine, and heavy metals while retaining beneficial minerals. If you require complete total dissolved solids (TDS) and fluoride removal, our Reverse Osmosis system is the recommended solution.'
      }
    ],
    relatedSlugs: ['reverse-osmosis-systems', 'whole-home-water-softening', 'professional-water-testing']
  },
  {
    id: 3,
    slug: 'reverse-osmosis-systems',
    name: 'Reverse Osmosis Systems',
    category: 'Water Filtration',
    categorySlug: 'filtration',
    shortDescription: 'Discover multi-stage treatment options for households seeking an additional level of drinking water purification.',
    fullDescription: 'Our 5-Stage and 6-Stage Ultra-Purification Reverse Osmosis (RO) systems push water through a semi-permeable membrane with pores as small as 0.0001 microns. This process removes up to 99% of all total dissolved solids (TDS), arsenic, lead, microplastics, nitrates, PFAS forever chemicals, fluoride, and dissolved heavy metals, followed by natural remineralization.',
    image: 'assets/images/system_undersink_ro.jpg',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    benefitSnippet: 'Ultra-pure 0.0001-micron filtration removes PFAS, lead & 99% TDS',
    idealFor: [
      'Families concerned about PFAS forever chemicals, microplastics, lead, or fluoride',
      'Well water households with elevated nitrates, arsenic, or high dissolved minerals',
      'Parents preparing infant formula and specialized dietary hydration',
      'Anyone desiring the purest possible water with balanced alkaline remineralization'
    ],
    features: [
      {
        title: '0.0001 Micron TFC Membrane',
        desc: 'High-rejection Thin Film Composite membrane that rejects microscopic pathogens, heavy metals, and chemical compounds.'
      },
      {
        title: 'Alkaline Remineralization Stage',
        desc: 'Restores healthy calcium, magnesium, and potassium minerals, elevating water pH to an optimal 7.5–8.5 balance.'
      },
      {
        title: '1:1 High-Efficiency Eco-Ratio',
        desc: 'Advanced permeate recovery engineering cuts wastewater drain ratio by up to 300% compared to traditional RO systems.'
      },
      {
        title: 'Pressurized Food-Grade Tank',
        desc: 'Sealed 3.2-gallon stainless steel or composite bladder tank delivers rapid flow directly to your dedicated tap.'
      }
    ],
    keyBenefits: [
      {
        title: 'Comprehensive Contaminant Barrier',
        desc: 'Removes up to 99% of PFAS, arsenic, lead, fluoride, nitrates, radium, and volatile pharmaceutical residues.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
      },
      {
        title: 'Mineral-Enriched Alkaline Hydration',
        desc: 'Post-filtration calcite/corosex bed adds natural bio-available minerals for smooth, silky hydration.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`
      },
      {
        title: 'Pristine Coffee, Teas & Broths',
        desc: 'Zero mineral interference allows the authentic floral notes of coffees and true culinary flavors to shine.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>`
      },
      {
        title: 'Whisper-Quiet Fast Delivery',
        desc: 'Compact under-counter footprint engineered with silent auto-shutoff valves and leak-detector sensors.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>`
      }
    ],
    process: [
      {
        stepNumber: 1,
        title: 'TDS & Pressure Testing',
        desc: 'Measuring incoming total dissolved solids (PPM) and home water pressure to verify membrane operating conditions.'
      },
      {
        stepNumber: 2,
        title: 'System Component Assembly',
        desc: 'Securing sediment, carbon pre-filters, high-recovery membrane, storage tank, and remineralizer under the sink.'
      },
      {
        stepNumber: 3,
        title: 'Dedicated Tap & Refrigerator Run',
        desc: 'Installing the lead-free designer dispensing faucet and connecting refrigerator branch lines.'
      },
      {
        stepNumber: 4,
        title: 'Purge Cycle & Verification',
        desc: 'Full system tank flush, membrane efficiency verification, and side-by-side PPM comparison test.'
      }
    ],
    pricingDescription: 'Pricing depends on system stages (5-stage vs 6-stage alkaline), daily gallon capacity, booster pump requirements for low-pressure homes, and faucet finish choices. All quotes include certified plumbing and 100% leak-tested setup.',
    faqs: [
      {
        q: 'Does Reverse Osmosis make water too acidic or flat?',
        a: 'Standard RO can lower pH slightly, but all AquaPure RO systems include our final Alkaline Remineralization cartridge that restores healthy minerals and raises pH to a refreshing 7.5 to 8.5 balance.'
      },
      {
        q: 'How much water does an AquaPure RO system waste?',
        a: 'Older traditional systems wasted up to 4 gallons per gallon produced. Our modern high-recovery membranes operate at a highly efficient 1:1 ratio under standard household pressure.'
      },
      {
        q: 'How frequently does the RO membrane need replacing?',
        a: 'Pre-filters and post-filters are changed every 12 months, while the high-durability RO membrane typically lasts between 24 and 36 months.'
      },
      {
        q: 'Will RO remove microplastics and PFAS forever chemicals?',
        a: 'Yes. With a pore rating down to 0.0001 microns, reverse osmosis is recognized by the EPA as the most effective residential technology for removing PFAS compounds and microplastics.'
      }
    ],
    relatedSlugs: ['drinking-water-filtration', 'whole-home-water-softening', 'maintenance-filter-replacement']
  },
  {
    id: 4,
    slug: 'professional-water-testing',
    name: 'Professional Water Testing',
    category: 'Water Testing',
    categorySlug: 'testing',
    shortDescription: 'Understand your water hardness, mineral levels, and other relevant characteristics before choosing a treatment system.',
    fullDescription: 'Accurate water treatment begins with precise diagnostic data. Our certified water quality specialists perform comprehensive on-site testing measuring total hardness (GPG), total dissolved solids (TDS), chlorine/chloramines, iron, sulfur, and pH balance. For complex well water sources, we offer certified laboratory analysis for heavy metals, bacteria, and contaminants.',
    image: 'assets/images/water_testing_card.jpg',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/><path d="M14.5 11h-5"/></svg>`,
    benefitSnippet: 'Accurate multi-parameter digital audit with zero purchase obligation',
    idealFor: [
      'Homeowners moving into a new neighborhood unsure of local municipal water chemistry',
      'Private well owners requiring annual safety and mineral diagnostics',
      'Families experiencing unexplained staining, scale buildup, or odd odors',
      'Homeowners seeking honest, scientific equipment recommendations without guesswork'
    ],
    features: [
      {
        title: 'Precision Digital Spectrophotometry',
        desc: 'Calibrated field photometers provide exact readings for free and total chlorine, hardness, and iron down to 0.01 PPM.'
      },
      {
        title: 'Comprehensive 12-Point Analysis',
        desc: 'Evaluates Hardness, TDS, pH, Iron, Manganese, Nitrates, Sulfates, Chloramines, Alkalinity, and Turbidity.'
      },
      {
        title: 'Certified Laboratory Options',
        desc: 'Access to state-accredited EPA laboratory panels for coliform bacteria, lead, VOCs, arsenic, and PFAS.'
      },
      {
        title: 'Clear Educational Report',
        desc: 'You receive an easy-to-read diagnostic summary explaining what your numbers mean for health and plumbing.'
      }
    ],
    keyBenefits: [
      {
        title: 'Data-Driven Recommendations',
        desc: 'Eliminates oversizing or purchasing unnecessary filtration gear by matching equipment strictly to proven data.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`
      },
      {
        title: 'Zero Obligation or Pressure',
        desc: 'Our standard in-home water audit is completely complimentary with no high-pressure sales tactics.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
      },
      {
        title: 'Plumbing & Appliance Protection',
        desc: 'Identifies corrosive acidic pH or extreme hardness before costly water heater and fixture damage occurs.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`
      },
      {
        title: 'Well Water Peace of Mind',
        desc: 'Detects seasonal fluctuations in well groundwater quality to keep your family completely safe.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
      }
    ],
    process: [
      {
        stepNumber: 1,
        title: 'Convenient In-Home Visit',
        desc: 'Our certified technician arrives with calibrated mobile testing gear at a time convenient for you.'
      },
      {
        stepNumber: 2,
        title: 'Multi-Tap Sampling',
        desc: 'Collecting direct samples from your main incoming line, kitchen tap, and outdoor spigots.'
      },
      {
        stepNumber: 3,
        title: 'Immediate On-Site Analysis',
        desc: 'Performing reagent and digital tests in your kitchen, demonstrating real-time hardness and chemical reactions.'
      },
      {
        stepNumber: 4,
        title: 'Custom Action Plan',
        desc: 'Reviewing your test results, comparing against EPA standards, and presenting tailored treatment options.'
      }
    ],
    pricingDescription: 'Our standard in-home 12-point water hardness and chemical test is 100% complimentary. Comprehensive certified EPA laboratory health panels (bacteria, heavy metals, PFAS) are available at direct lab cost with zero markup.',
    faqs: [
      {
        q: 'How long does the in-home water test take?',
        a: 'A standard diagnostic test takes approximately 25 to 40 minutes. We test samples right at your kitchen table and explain every metric in clear terms.'
      },
      {
        q: 'Is there any purchase obligation with the free water test?',
        a: 'Absolutely none. We believe educated homeowners make the best decisions. You receive a copy of your test results to keep whether you choose our services or not.'
      },
      {
        q: 'Why should I test if my city publishes an annual water report?',
        a: 'City water reports reflect municipal plant output miles away. They do not account for aging utility pipes, neighborhood distribution lines, or internal home plumbing leaching lead and copper into your specific taps.'
      },
      {
        q: 'How frequently should well water be tested?',
        a: 'The EPA recommends private well owners perform basic testing annually for coliform bacteria, nitrates, and pH, and every 3 years for heavy metals and volatile organic chemicals.'
      }
    ],
    relatedSlugs: ['whole-home-water-softening', 'drinking-water-filtration', 'water-system-installation']
  },
  {
    id: 5,
    slug: 'water-system-installation',
    name: 'Water System Installation',
    category: 'Installation',
    categorySlug: 'installation',
    shortDescription: 'Get professional installation planned around your home plumbing, space, and selected water-treatment equipment.',
    fullDescription: 'Flawless water treatment performance relies on expert plumbing installation. Our licensed, insured technicians handle everything: space planning, bypass loop creation, whole-home shutoff valves, drain line routing, electrical tie-ins, and precision code-compliant connections. We ensure zero pressure drops and clean, organized mechanical layouts.',
    image: 'assets/images/process_step4_install.jpg',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    benefitSnippet: 'Licensed, code-compliant plumbing with full multi-year labor warranty',
    idealFor: [
      'New homeowners looking to protect their plumbing before moving in',
      'Homeowners replacing an outdated, inefficient, or broken water softener',
      'Complex installations requiring new loop piping, drywall access, or outdoor enclosures',
      'Anyone wanting professional workmanship backed by comprehensive leak guarantees'
    ],
    features: [
      {
        title: 'Full-Port Brass Bypass Loops',
        desc: 'Installed with commercial-grade full-flow isolation valves so you maintain uninterrupted water service during servicing.'
      },
      {
        title: 'Air-Gap Drain Protectors',
        desc: 'Code-mandated backflow air-gap fixtures ensure regeneration water can never siphon into your potable water supply.'
      },
      {
        title: 'Zero Pressure-Drop Sizing',
        desc: 'Matched 1-inch or 1.25-inch high-flow internal piping preserves maximum shower pressure across multi-bathroom homes.'
      },
      {
        title: 'Clean Structural Integration',
        desc: 'Neat, clamped, insulated copper or PEX runs with seismic strapping and floor drain management.'
      }
    ],
    keyBenefits: [
      {
        title: 'Licensed & Insured Master Technicians',
        desc: 'Every installation is executed by certified water treatment specialists adhering strictly to uniform plumbing codes.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
      },
      {
        title: 'Same-Day Clean Completion',
        desc: 'Most residential systems are fully installed, tested, and operational within 3 to 5 hours with zero mess left behind.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>`
      },
      {
        title: 'Comprehensive Labor Warranty',
        desc: 'All pipework, valves, fittings, and connections are backed by our multi-year leak-free installation guarantee.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
      },
      {
        title: 'Complete User Walkthrough',
        desc: 'Our technician walks you through valve operations, salt loading, filter change intervals, and system bypass controls.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`
      }
    ],
    process: [
      {
        stepNumber: 1,
        title: 'Site Survey & Loop Check',
        desc: 'Inspecting main water shutoff, pressure regulator, drain line access, and electrical outlet placement.'
      },
      {
        stepNumber: 2,
        title: 'Plumbing Preparation',
        desc: 'Connecting full-port isolation bypass manifolds and soldering or crimping dedicated supply lines.'
      },
      {
        stepNumber: 3,
        title: 'Equipment Positioning',
        desc: 'Placing mineral and brine tanks, mounting brackets, drain line routing with code-required air gaps.'
      },
      {
        stepNumber: 4,
        title: 'Pressurization & Testing',
        desc: 'Controlled repressurization, leak check, manual valve cycle test, and digital controller configuration.'
      }
    ],
    pricingDescription: 'Installation labor is quoted following an initial site inspection or photo review of your water loop. Standard installs with existing soft water loops have fixed upfront rates with zero surprise charges.',
    faqs: [
      {
        q: 'What if my home does not have a pre-plumbed water softener loop?',
        a: 'No problem. Our team regularly installs new supply loops from main water lines in garages, basements, and utility closets, ensuring outdoor hose bibs remain on unsoftened lines.'
      },
      {
        q: 'How long will my household water be shut off during installation?',
        a: 'Main water is typically shut off for only 45 to 90 minutes while the bypass manifold is tied in. Once the bypass is closed, your home water is immediately restored while we finish equipment hookups.'
      },
      {
        q: 'Do you remove and dispose of old water treatment equipment?',
        a: 'Yes. We provide complete haul-away and environmentally responsible recycling of your old water softener or filtration unit upon request.'
      },
      {
        q: 'Do I need a permit for water softener installation?',
        a: 'Permit requirements vary by municipality. Where required, AquaPure handles the complete permit filing and inspection coordination process.'
      }
    ],
    relatedSlugs: ['whole-home-water-softening', 'reverse-osmosis-systems', 'maintenance-filter-replacement']
  },
  {
    id: 6,
    slug: 'maintenance-filter-replacement',
    name: 'Maintenance & Filter Replacement',
    category: 'Maintenance',
    categorySlug: 'maintenance',
    shortDescription: 'Keep your water treatment system operating as intended through scheduled servicing, filter replacement, and system checks.',
    fullDescription: 'Proactive maintenance ensures your water softener and filtration equipment continues delivering peak water purity year after year. Our comprehensive maintenance visits cover sanitary filter cartridge replacements, RO membrane sanitization, resin bed chemical cleaning, brine tank de-bridging, seal inspection, valve recalibration, and water quality testing.',
    image: 'assets/images/about_hero_technician.jpg',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>`,
    benefitSnippet: 'Annual multi-point tune-up, sanitization & cartridge renewal',
    idealFor: [
      'Households with existing filtration systems due for scheduled cartridge replacement',
      'Water softener owners noticing salty water, reduced soft water feel, or brine tank bridging',
      'Families wanting hassle-free automated annual maintenance reminders',
      'Homeowners with older systems needing valve diagnostic checkups'
    ],
    features: [
      {
        title: 'Certified Filter Cartridge Swaps',
        desc: 'Genuine OEM sediment, catalytic carbon, specialty lead, and reverse osmosis replacement cartridges.'
      },
      {
        title: 'Resin Bed Restorative Cleansing',
        desc: 'Removes accumulated iron, manganese, and silt foulants from resin beads, restoring original grain capacity.'
      },
      {
        title: 'Sanitary Chamber Sterilization',
        desc: 'Food-grade sanitizing wash of filter housings, RO storage bladders, and brine tank interiors.'
      },
      {
        title: 'Digital Meter Recalibration',
        desc: 'Testing meter turbine accuracy, injector nozzles, and timer cycles for optimized salt usage.'
      }
    ],
    keyBenefits: [
      {
        title: 'Guaranteed Continuous Purity',
        desc: 'Prevents exhausted filter cartridges from channeling contaminants or slowing water flow rates.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`
      },
      {
        title: 'Prevents Costly Equipment Breakdowns',
        desc: 'Routine O-ring lubrication and valve cleanings catch tiny seal wear before catastrophic basement leaks.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
      },
      {
        title: 'Priority Emergency Scheduling',
        desc: 'Maintenance plan members receive rapid priority dispatch and discounted replacement parts.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>`
      },
      {
        title: 'Post-Service Water Quality Verification',
        desc: 'Every tune-up concludes with a live hardness and TDS test to verify 100% optimal system output.',
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
      }
    ],
    process: [
      {
        stepNumber: 1,
        title: 'Pre-Service Diagnostic Test',
        desc: 'Testing raw water versus treated water hardness, TDS, and checking digital error logs.'
      },
      {
        stepNumber: 2,
        title: 'Component Inspection & Cleaning',
        desc: 'Inspecting brine injectors, venturi nozzles, O-rings, and clearing any salt bridge encrustation.'
      },
      {
        stepNumber: 3,
        title: 'Cartridge Swap & Sanitization',
        desc: 'Replacing spent filter elements with fresh OEM media and running food-grade sanitizer through chambers.'
      },
      {
        stepNumber: 4,
        title: 'Pressure Check & Water Test',
        desc: 'Repressurizing the system, checking for leaks, and conducting a confirmation output test.'
      }
    ],
    pricingDescription: 'Standard maintenance checkups and annual filter replacement services have clear, upfront flat rates based on system type and stage count. All replacement cartridges, sanitizing solution, and labor are included in your quote.',
    faqs: [
      {
        q: 'Do you service water softeners and filters installed by other companies?',
        a: 'Yes. Our technicians are trained on all major industry brands including Fleck, Clack, Culligan, Autotrol, Kinetico, Pentair, and standard modular systems.'
      },
      {
        q: 'What is a salt bridge in a water softener?',
        a: 'A salt bridge is a hard crust that forms inside the brine tank, creating empty space between the salt and the water below. When this happens, salt cannot dissolve and your system fails to soften water. We break down bridges and clean tanks during service.'
      },
      {
        q: 'How do I know when my reverse osmosis filters need replacement?',
        a: 'Signs include noticeably slower water flow from your drinking tap, changes in water taste, or rising total dissolved solids (TDS) readings. We recommend proactive annual filter swaps.'
      },
      {
        q: 'Do you offer automatic recurring service reminders?',
        a: 'Yes. We keep digital service records of your installation and send friendly reminder notices via SMS or email when your system is approaching its recommended maintenance window.'
      }
    ],
    relatedSlugs: ['whole-home-water-softening', 'drinking-water-filtration', 'reverse-osmosis-systems']
  }
];

// Helper functions for services
function getAllServices() {
  return SERVICES_DATA;
}

function getServiceBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = String(slug).trim().toLowerCase();
  return SERVICES_DATA.find(s => s.slug.toLowerCase() === cleanSlug) || null;
}

function getServicesByCategory(categorySlug) {
  if (!categorySlug || categorySlug === 'all') return SERVICES_DATA;
  return SERVICES_DATA.filter(s => s.categorySlug === categorySlug);
}

function getRelatedServices(currentSlug, limit = 3) {
  const current = getServiceBySlug(currentSlug);
  if (!current) return SERVICES_DATA.slice(0, limit);
  
  if (current.relatedSlugs && current.relatedSlugs.length > 0) {
    const related = current.relatedSlugs
      .map(slug => getServiceBySlug(slug))
      .filter(s => s && s.slug !== current.slug);
    if (related.length >= limit) return related.slice(0, limit);
  }
  
  return SERVICES_DATA.filter(s => s.slug !== current.slug).slice(0, limit);
}
