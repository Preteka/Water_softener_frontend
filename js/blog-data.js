/**
 * AquaPure - Centralized Blog Data Repository
 * Master data store for all 6 articles, authors, categories, and content blocks.
 */

const BLOG_CATEGORIES = [
  { id: 'all', name: 'All Articles' },
  { id: 'hard-water', name: 'Hard Water' },
  { id: 'water-filtration', name: 'Water Filtration' },
  { id: 'water-softeners', name: 'Water Softeners' },
  { id: 'water-quality', name: 'Water Quality' },
  { id: 'home-water-care', name: 'Home Water Care' }
];

const BLOG_AUTHORS = {
  daniel: {
    name: 'Daniel Vance',
    role: 'Senior Water Treatment Specialist',
    bio: 'WQA-certified water specialist with over 12 years of hands-on diagnostic experience in residential hard water and conditioning systems.',
    image: 'assets/images/team_daniel.jpg'
  },
  emily: {
    name: 'Emily Roberts',
    role: 'Master Diagnostics & Quality Lead',
    bio: 'Specializing in residential water chemistry, mineral analysis, and high-efficiency household plumbing diagnostics.',
    image: 'assets/images/team_emily.jpg'
  },
  michael: {
    name: 'Michael Chen',
    role: 'Filtration Technology Director',
    bio: 'Mechanical engineer and filtration systems designer focused on multi-stage reverse osmosis and smart whole-home water purification.',
    image: 'assets/images/team_michael.jpg'
  }
};

const BLOG_ARTICLES = [
  {
    id: 1,
    slug: 'signs-of-hard-water',
    aliases: ['7-signs-your-home-may-have-hard-water', 'signs-of-hard-water'],
    title: '7 Signs Your Home May Have Hard Water',
    category: 'Hard Water',
    categorySlug: 'hard-water',
    excerpt: 'Discover common signs of hard water, from mineral deposits on taps to scale buildup on household appliances and dry skin after showering.',
    coverImage: 'assets/images/blog_signs_hard_water.jpg',
    coverAlt: 'Close-up of mineral scale and hard water buildup on a chrome bathroom tap fixture',
    author: BLOG_AUTHORS.daniel,
    publishedDate: 'October 4, 2026',
    updatedDate: 'October 8, 2026',
    readingTime: '5 min read',
    tags: ['Hard Water', 'Mineral Scale', 'Home Care', 'Plumbing'],
    featured: true,
    content: {
      intro: 'Hard water is one of the most widespread yet frequently overlooked plumbing challenges facing modern homeowners. Dissolved minerals—primarily calcium and magnesium—flow silently through your pipes, gradually leaving behind chalky deposits, reducing appliance efficiency, and altering your daily bathing and cleaning experience.',
      sections: [
        {
          id: 'crusty-faucet-buildup',
          heading: '1. Crusty White Buildup on Faucets & Showerheads',
          paragraphs: [
            'Have you noticed chalky white or greenish crust gathering around the aerators of your kitchen faucet or bathroom showerhead? This limescale forms when hard water evaporates, leaving behind concentrated mineral crystals.',
            'Over time, this buildup restricts water flow, causes uneven spray patterns, and can permanently corrode decorative plumbing finishes.'
          ],
          tip: 'A quick vinegar soak can dissolve surface deposits temporarily, but persistent mineral return signals that hard water is continuously flowing into your home.'
        },
        {
          id: 'spotted-glassware',
          heading: '2. Cloudy Glassware and Spotted Dishes',
          paragraphs: [
            'If clean glasses coming out of the dishwasher look foggy, hazy, or covered in tiny droplet rings despite quality detergent, dissolved calcium is the culprit.',
            'Hard water prevents soap from dissolving cleanly, leaving behind mineral film and detergent scum that requires endless hand-polishing to remove.'
          ]
        },
        {
          id: 'dry-skin-hair',
          heading: '3. Dry, Irritated Skin and Dull Hair After Showers',
          paragraphs: [
            'Bathing in hard water makes it difficult to rinse away soaps and shampoos completely. The remaining soap film strips your skin of its natural moisture barrier, leading to post-shower tightness, flakiness, and aggravated eczema.',
            'Hair washed in hard water often feels brittle, dry, and difficult to manage because minerals cling to the hair shaft.'
          ]
        },
        {
          id: 'soap-scum-buildup',
          heading: '4. Stubborn Soap Scum on Shower Doors & Tiles',
          paragraphs: [
            'Instead of forming rich, cleansing suds, soap reacts with calcium ions to create insoluble curd commonly known as soap scum. This sticky residue coats bathtub walls, tile grout, and glass shower enclosures, demanding intensive chemical scrubbing.'
          ]
        },
        {
          id: 'faded-stiff-laundry',
          heading: '5. Faded, Stiff Laundry and Premature Fabric Wear',
          paragraphs: [
            'Hard water traps detergent in clothing fibers, leaving towels feeling rough like sandpaper and making vibrant colored fabrics look dingy and gray after only a few wash cycles.',
            'Over time, trapped minerals weaken textile fibers, reducing the lifespan of bedding and everyday clothing by up to 30%.'
          ]
        },
        {
          id: 'water-heater-struggles',
          heading: '6. High Energy Bills & Water Heater Strain',
          paragraphs: [
            'Water heaters bear the brunt of hard water damage. Heat forces calcium and magnesium out of solution, forming a dense insulating rock layer at the bottom of tank heaters or inside tankless heat exchangers.',
            'Just a 1/8-inch layer of scale can reduce heating efficiency by up to 25%, forcing your system to consume significantly more energy to achieve standard water temperatures.'
          ],
          callout: {
            title: 'Diagnostic Insight',
            text: 'Popping or rumbling sounds coming from your water heater tank indicate that boiling water is trapped under settled mineral scale.'
          }
        },
        {
          id: 'reduced-water-pressure',
          heading: '7. Gradual Reduction in Home Water Pressure',
          paragraphs: [
            'In severe cases, limescale slowly constricts the internal diameter of copper and galvanized pipes, mimicking clogged arteries and steadily dropping water pressure across multiple fixtures throughout the house.'
          ]
        }
      ],
      conclusion: 'If you recognize several of these signs in your household, testing your water hardness is the most practical first step. An on-site diagnostic test reveals your exact grains-per-gallon (GPG) rating so you can select the right softening capacity without guesswork.',
      ctaBox: {
        title: 'Wondering How Hard Your Water Is?',
        desc: 'Schedule a certified in-home water hardness test with our local diagnostic technicians.',
        btnText: 'Book Free Water Hardness Test',
        btnAction: 'trigger-water-test'
      }
    }
  },
  {
    id: 2,
    slug: 'water-softener-vs-water-filter',
    aliases: ['water-softener-vs-filter', 'softener-vs-filtration'],
    title: 'Water Softener vs. Water Filter: What\'s the Difference?',
    category: 'Water Softeners',
    categorySlug: 'water-softeners',
    excerpt: 'Understand how water softeners and filtration systems work, what each treats, and when your home may need one or both.',
    coverImage: 'assets/images/system_water_softener.jpg',
    coverAlt: 'Modern residential ion-exchange water softener system next to whole-home filtration unit',
    author: BLOG_AUTHORS.michael,
    publishedDate: 'September 28, 2026',
    updatedDate: 'October 6, 2026',
    readingTime: '6 min read',
    tags: ['Water Softener', 'Water Filtration', 'System Guide', 'Equipment'],
    featured: false,
    content: {
      intro: 'One of the most frequent questions homeowners ask our specialists is: "Do I need a water softener, a water filter, or both?" While the terms are sometimes used interchangeably in casual conversation, softeners and filters perform fundamentally different functions using distinct engineering technologies.',
      sections: [
        {
          id: 'how-water-softeners-work',
          heading: 'How Water Softeners Work (Targeting Mineral Hardness)',
          paragraphs: [
            'A water softener is engineered specifically to eliminate hardness minerals—chiefly calcium (Ca²⁺) and magnesium (Mg²⁺)—through a proven process called ion exchange.',
            'Inside the softener\'s mineral tank are millions of microscopic food-grade resin beads charged with sodium or potassium ions. As hard water flows over the bed, calcium and magnesium ions bond strongly to the resin, releasing harmless sodium ions in exact chemical balance.',
            'Key benefits of water softening include eliminating pipe scale, extending appliance lifespans, producing luxuriously soft bath water, and reducing detergent usage by up to 50%.'
          ],
          tip: 'Water softeners do NOT remove chemical contaminants, chlorine, pesticides, sediment, or microplastics. Their sole job is mineral conditioning.'
        },
        {
          id: 'how-water-filters-work',
          heading: 'How Water Filtration Systems Work (Targeting Purity)',
          paragraphs: [
            'Water filters, in contrast, are designed to trap, absorb, or separate harmful contaminants, chemicals, and unwanted tastes and odors from your water supply.',
            'Common filtration technologies include:',
            '• Activated Carbon Filters: Highly porous media that absorbs chlorine, chloramines, volatile organic compounds (VOCs), and unpleasant chemical tastes.',
            '• Sediment Pre-filters: Physical mesh barriers that catch rust flakes, silt, sand, and suspended particulates.',
            '• Reverse Osmosis (RO) Membranes: Semi-permeable barriers capable of removing up to 99% of dissolved solids, lead, arsenic, nitrates, and pharmaceuticals at the molecular level.'
          ]
        },
        {
          id: 'direct-comparison-table',
          heading: 'Key Comparison: Softener vs. Filter',
          paragraphs: [
            'To understand which solution solves your specific concerns, consider their distinct capabilities:'
          ],
          callout: {
            title: 'Quick Rule of Thumb',
            text: 'Softeners protect your pipes, fixtures, and appliances from hard mineral crust. Filters protect your drinking water, taste, and personal health from chemical contaminants.'
          }
        },
        {
          id: 'when-you-need-both',
          heading: 'When Does a Home Need Both Systems?',
          paragraphs: [
            'Many municipal and well water supplies contain both high mineral hardness AND significant chlorine, chloramines, or heavy metals.',
            'In these scenarios, a dual-stage setup provides comprehensive protection: water first enters a whole-house carbon filter to remove chlorine (which protects the softener\'s resin from oxidizing), passes through the water softener for whole-home scale prevention, and finishes at an under-sink Reverse Osmosis tap for pristine drinking purity.'
          ]
        }
      ],
      conclusion: 'Choosing between softening and filtration starts with knowing what is actually in your water. An in-depth chemical evaluation ensures you invest in the exact equipment that addresses your household\'s verified water profile.',
      ctaBox: {
        title: 'Need Help Choosing the Right Setup?',
        desc: 'Our certified technicians provide unbiased water evaluations with clear equipment sizing.',
        btnText: 'Request System Recommendation',
        btnAction: 'trigger-water-test'
      }
    }
  },
  {
    id: 3,
    slug: 'improve-drinking-water-quality',
    aliases: ['how-to-improve-drinking-water-quality', 'drinking-water-quality'],
    title: 'How to Improve the Quality of Your Drinking Water',
    category: 'Water Filtration',
    categorySlug: 'water-filtration',
    excerpt: 'Explore practical ways to assess your drinking water and understand the filtration options available for your household.',
    coverImage: 'assets/images/system_undersink_ro.jpg',
    coverAlt: 'Pouring pure crystal-clear water from an under-sink reverse osmosis tap into a clear glass',
    author: BLOG_AUTHORS.emily,
    publishedDate: 'September 22, 2026',
    updatedDate: 'October 2, 2026',
    readingTime: '5 min read',
    tags: ['Drinking Water', 'Reverse Osmosis', 'Filtration', 'Health'],
    featured: false,
    content: {
      intro: 'Drinking water quality directly impacts daily hydration, culinary taste, and long-term household wellness. Even when city tap water meets baseline regulatory standards at the municipal treatment plant, aging distribution infrastructure, chlorine disinfection byproducts, and localized pipe corrosion can affect what comes out of your kitchen faucet.',
      sections: [
        {
          id: 'identify-common-impurities',
          heading: '1. Identify What Might Be in Your Tap Water',
          paragraphs: [
            'Tap water commonly carries trace elements that alter flavor and composition:',
            '• Disinfectants: Chlorine and chloramines added for biological safety leave sharp bleach-like odors and chemical aftertastes.',
            '• Total Dissolved Solids (TDS): Inorganic salts and organic matter that create metallic or brackish notes.',
            '• Lead & Copper: Heavy metals leached from pre-1986 household plumbing solder or municipal service lines.'
          ]
        },
        {
          id: 'point-of-use-solutions',
          heading: '2. Dedicated Point-of-Use Drinking Systems',
          paragraphs: [
            'For drinking and cooking water, under-sink Reverse Osmosis (RO) systems represent the gold standard in residential purification. Operating under household line pressure, water is forced through multi-stage sediment filters, activated carbon blocks, and a microscopic semi-permeable membrane with 0.0001-micron pores.',
            'This multi-barrier process eliminates up to 99% of dissolved impurities while delivering crisp, clean water straight from a dedicated designer faucet.'
          ],
          tip: 'Look for systems equipped with a remineralization stage, which reintroduces beneficial calcium and magnesium ions to balance pH and enhance crisp taste.'
        },
        {
          id: 'maintenance-best-practices',
          heading: '3. Keep Up With Routine Filter Replacements',
          paragraphs: [
            'Even the finest filtration system loses efficacy if replacement schedules are neglected. Saturated carbon blocks can harbor bacterial growth or allow contaminant breakthrough.',
            'Establish regular change intervals: sediment and carbon pre-filters typically require renewal every 6 to 12 months, while RO membranes last 2 to 3 years.'
          ]
        }
      ],
      conclusion: 'Upgrading your drinking water creates an immediate difference in everyday coffee, cooking, and refreshing hydration. Start by evaluating your current tap water to choose the most effective purification tier for your family.',
      ctaBox: {
        title: 'Taste the Difference in Pure Water',
        desc: 'Ask about our compact multi-stage drinking water systems with professional under-sink setup.',
        btnText: 'Explore Drinking Systems',
        btnAction: 'trigger-water-test'
      }
    }
  },
  {
    id: 4,
    slug: 'water-hardness-ph-tds-explained',
    aliases: ['understanding-water-test-results', 'water-hardness-ph-and-tds'],
    title: 'What Do Water Hardness, pH and TDS Actually Mean?',
    category: 'Water Quality',
    categorySlug: 'water-quality',
    excerpt: 'Learn what common water test measurements indicate and why each measurement tells you something different about water quality.',
    coverImage: 'assets/images/water_testing_card.jpg',
    coverAlt: 'Professional water diagnostic test kit with digital meters and reagent color comparison chart',
    author: BLOG_AUTHORS.daniel,
    publishedDate: 'September 15, 2026',
    updatedDate: 'September 30, 2026',
    readingTime: '6 min read',
    tags: ['Water Quality', 'TDS', 'pH Level', 'Water Testing'],
    featured: false,
    content: {
      intro: 'When receiving a comprehensive water diagnostic report, the sheer volume of numbers, units, and acronyms can feel overwhelming. Understanding the fundamental metrics—Grains per Gallon (GPG), pH, and Total Dissolved Solids (TDS)—empowers you to make informed decisions about your home\'s water treatment.',
      sections: [
        {
          id: 'water-hardness-gpg',
          heading: '1. Water Hardness (Measured in GPG and PPM)',
          paragraphs: [
            'Water hardness quantifies the concentration of dissolved calcium and magnesium. It is commonly reported in Grains per Gallon (GPG) or Parts per Million (PPM / mg/L), where 1 GPG equals approximately 17.1 PPM.',
            'According to the Water Quality Association (WQA) classification standards:',
            '• 0 – 3.5 GPG: Soft to Slightly Hard',
            '• 3.5 – 7.0 GPG: Moderately Hard (mild spotting noticeable)',
            '• 7.0 – 10.5 GPG: Hard (scale accumulation in appliances)',
            '• Over 10.5 GPG: Very Hard to Extremely Hard (rapid plumbing deterioration)'
          ]
        },
        {
          id: 'ph-levels-explained',
          heading: '2. Water pH (The Acid-Base Balance)',
          paragraphs: [
            'The pH scale ranges from 0 to 14, with 7.0 representing neutral. Natural drinking water typically sits between 6.5 and 8.5.',
            '• Low pH (< 6.5): Acidic water that actively leaches copper pipes, leaving blue-green stains on porcelain sinks and pinhole pipe leaks.',
            '• High pH (> 8.5): Alkaline water that often tastes slippery or bitter and accelerates mineral encrustation.'
          ],
          callout: {
            title: 'Plumbing Alert',
            text: 'Blue-green stains under bathroom taps indicate acidic water dissolving your copper piping from the inside out.'
          }
        },
        {
          id: 'tds-total-dissolved-solids',
          heading: '3. Total Dissolved Solids (TDS in PPM)',
          paragraphs: [
            'TDS measures the combined total of all organic and inorganic substances dissolved in water, including minerals, salts, and trace metals. While a moderate TDS reading is normal in mineral-rich spring water, high readings (> 500 PPM) often indicate heavy mineral density or urban runoff.',
            'TDS meters provide a valuable baseline metric for assessing reverse osmosis performance before and after membrane filtration.'
          ]
        }
      ],
      conclusion: 'Each water test metric tells one specific part of your water\'s story. A professional on-site evaluation examines all three in harmony to recommend balanced, effective treatment.',
      ctaBox: {
        title: 'Get Your Free Detailed Water Report',
        desc: 'Our digital on-site testing measures GPG, pH, TDS, and chlorine in under 15 minutes.',
        btnText: 'Book Free Diagnostic Test',
        btnAction: 'trigger-water-test'
      }
    }
  },
  {
    id: 5,
    slug: 'hard-water-effects-on-appliances',
    aliases: ['hard-water-and-household-appliances', 'hard-water-appliances'],
    title: 'How Hard Water Can Affect Household Appliances',
    category: 'Home Water Care',
    categorySlug: 'home-water-care',
    excerpt: 'Learn how mineral scale can accumulate in water-using appliances and what steps may help reduce buildup and energy costs.',
    coverImage: 'assets/images/hard_water_intro.jpg',
    coverAlt: 'Modern residential laundry room and appliances with clean water softening connection',
    author: BLOG_AUTHORS.emily,
    publishedDate: 'September 8, 2026',
    updatedDate: 'September 25, 2026',
    readingTime: '5 min read',
    tags: ['Appliances', 'Plumbing Care', 'Energy Efficiency', 'Hard Water'],
    featured: false,
    content: {
      intro: 'Modern household appliances—water heaters, dishwashers, washing machines, and smart coffee makers—represent substantial home investments. However, hard water silently shortens their working lifespans and degrades their operating efficiency from day one.',
      sections: [
        {
          id: 'tank-tankless-water-heaters',
          heading: '1. Water Heaters: The Greatest Scale Accumulators',
          paragraphs: [
            'Because heat dramatically accelerates mineral precipitation, water heaters experience the heaviest scale accumulation in the entire home. In tankless units, narrow heat exchanger passages clog, triggering error codes and automatic shutdowns.',
            'Studies by the Battelle Memorial Institute demonstrated that soft water helps tankless water heaters maintain their original factory efficiency rating for over 15 years, whereas hard water units suffered noticeable flow reduction within two years.'
          ]
        },
        {
          id: 'dishwashers-and-washers',
          heading: '2. Dishwashers and High-Efficiency Washing Machines',
          paragraphs: [
            'Limescale coats internal heating elements, spray arm nozzles, and solenoid valves in dishwashers. In washing machines, mineral friction wears out rubber gaskets and pump seals, leading to premature leaks.',
            'With conditioned soft water, washing machines achieve superior cleaning performance using cold water and half the typical detergent dose.'
          ],
          tip: 'Conditioned water allows you to lower dishwasher and washing machine cycle temperatures without sacrificing cleanliness, generating immediate utility savings.'
        },
        {
          id: 'coffee-makers-refrigerators',
          heading: '3. Premium Coffee Makers and Ice Dispensers',
          paragraphs: [
            'Espresso machines and refrigerator ice makers rely on ultra-narrow capillary tubes. Mineral scale easily constricts these pathways, resulting in cloudy ice cubes, slow water dispensing, and burnt heating coils.'
          ]
        }
      ],
      conclusion: 'Protecting your major appliances with whole-home water softening pays dividends through reduced maintenance calls, extended equipment longevity, and lower monthly energy bills.',
      ctaBox: {
        title: 'Protect Your Home Appliances Today',
        desc: 'Discover how a high-efficiency AquaPure softener safeguards your plumbing and high-end appliances.',
        btnText: 'Check System Compatibility',
        btnAction: 'trigger-water-test'
      }
    }
  },
  {
    id: 6,
    slug: 'choosing-whole-house-filtration',
    aliases: ['whole-house-filtration-guide', 'choosing-a-whole-house-water-filtration-system'],
    title: 'Choosing a Whole-House Water Filtration System',
    category: 'Water Filtration',
    categorySlug: 'water-filtration',
    excerpt: 'Explore the key considerations when selecting a filtration system, including water conditions, household flow rates, and maintenance.',
    coverImage: 'assets/images/system_filtration.jpg',
    coverAlt: 'Whole-house multi-stage carbon filtration system installed in clean utility space',
    author: BLOG_AUTHORS.michael,
    publishedDate: 'September 1, 2026',
    updatedDate: 'September 20, 2026',
    readingTime: '7 min read',
    tags: ['Whole House', 'Carbon Filter', 'Installation', 'Buyer Guide'],
    featured: false,
    content: {
      intro: 'A whole-house water filtration system treats every drop of water entering your home at the main point of entry (POE). From kitchen sinks and showers to laundry machines and garden hoses, whole-home filtration ensures consistent water quality across all fixtures.',
      sections: [
        {
          id: 'understanding-flow-rate',
          heading: '1. Sizing Your System for Household Flow Rate (GPM)',
          paragraphs: [
            'One of the most critical factors in whole-house system selection is Gallons per Minute (GPM) capacity. Undersized filtration tanks restrict home water pressure during peak simultaneous use—such as running a shower while the dishwasher operates.',
            '• 1 – 2 Bathrooms: 8 to 10 GPM capacity',
            '• 3 – 4 Bathrooms: 12 to 15 GPM capacity',
            '• 5+ Bathrooms or Large Estates: 18 to 25+ GPM capacity'
          ]
        },
        {
          id: 'media-types-and-stages',
          heading: '2. Multi-Stage Media Configurations',
          paragraphs: [
            'Comprehensive whole-house systems utilize sequential filtration stages:',
            '• Stage 1: 5-micron sediment pre-filter capturing sand, rust, and silt.',
            '• Stage 2: Catalytic coconut-shell activated carbon targeting chlorine, chloramines, VOCs, and chemical pesticide residues.',
            '• Stage 3: KDF-55 redox media for heavy metal reduction and bacteriostatic protection.',
            '• Optional Stage 4: Integrated scale inhibitor or post-filtration UV sterilizer for well water supplies.'
          ]
        },
        {
          id: 'cartridge-vs-backwashing',
          heading: '3. Cartridge Systems vs. Automatic Backwashing Tanks',
          paragraphs: [
            'Cartridge-based systems utilize replaceable filter elements requiring manual swaps every 6 to 12 months. In contrast, automatic backwashing media tanks automatically clean and redistribute their internal carbon bed on a smart timer, providing up to 8–10 years of maintenance-free filtration.'
          ],
          callout: {
            title: 'Longevity Note',
            text: 'Automatic backwashing systems eliminate filter cartridge waste and provide superior contact time for chemical absorption.'
          }
        }
      ],
      conclusion: 'The ideal whole-house filtration system balances your family\'s peak water consumption with targeted contaminant removal. A professional plumbing assessment guarantees optimal pipe diameter matching and zero pressure drop.',
      ctaBox: {
        title: 'Ready for Whole-Home Pure Water?',
        desc: 'Schedule an on-site consultation to size the ideal whole-house filtration system for your home.',
        btnText: 'Schedule In-Home Consultation',
        btnAction: 'trigger-water-test'
      }
    }
  }
];

// Helper functions for data access
function getArticleBySlug(slug) {
  if (!slug) return null;
  const clean = slug.toLowerCase().trim();
  return BLOG_ARTICLES.find(article => {
    if (article.slug === clean) return true;
    if (article.aliases && article.aliases.includes(clean)) return true;
    return false;
  }) || null;
}

function getRelatedArticles(currentSlug, limit = 3) {
  const current = getArticleBySlug(currentSlug);
  if (!current) return BLOG_ARTICLES.slice(0, limit);
  
  // Find articles matching same category or sharing tags, excluding current
  const others = BLOG_ARTICLES.filter(a => a.id !== current.id && a.slug !== current.slug);
  const sameCategory = others.filter(a => a.categorySlug === current.categorySlug);
  const differentCategory = others.filter(a => a.categorySlug !== current.categorySlug);

  const combined = [...sameCategory, ...differentCategory];
  return combined.slice(0, limit);
}

function filterArticles(searchTerm = '', categoryId = 'all') {
  const term = searchTerm.toLowerCase().trim();
  
  return BLOG_ARTICLES.filter(article => {
    const matchesCategory = categoryId === 'all' || article.categorySlug === categoryId;
    
    if (!term) return matchesCategory;

    const matchesSearch = 
      article.title.toLowerCase().includes(term) ||
      article.excerpt.toLowerCase().includes(term) ||
      article.category.toLowerCase().includes(term) ||
      article.tags.some(tag => tag.toLowerCase().includes(term)) ||
      (article.content.intro && article.content.intro.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });
}
