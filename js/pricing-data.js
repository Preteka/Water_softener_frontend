/**
 * AquaPure - Pricing & Booking Data Configuration
 * Centralized indicative price ranges, plan features, time slots, and quote calculation helpers.
 */

const PRICING_CONFIG = {
  currency: 'INR',
  currencySymbol: '₹',
  advancePercentDefault: 10,
  
  plans: [
    {
      id: 'essential-water-care',
      name: 'Essential Water Care',
      category: 'Drinking-Water Filtration',
      indicativeMin: 8000,
      indicativeMax: 15000,
      formattedRange: '₹8,000–₹15,000',
      standardConfirmedQuote: 12000,
      advancePercent: 10,
      description: 'Suitable for households exploring drinking-water filtration and point-of-use purification.',
      idealFor: 'Apartments & small homes focusing on drinking water',
      features: [
        'Drinking-water filtration options',
        'Water requirements assessment',
        'System selection guidance',
        'Installation requirements review',
        'Filter care & maintenance guidance',
        'Lead-free designer dispensing faucet'
      ]
    },
    {
      id: 'whole-home-protection',
      name: 'Whole-Home Protection',
      category: 'Whole-Home Softening',
      indicativeMin: 20000,
      indicativeMax: 45000,
      formattedRange: '₹20,000–₹45,000',
      standardConfirmedQuote: 32000,
      advancePercent: 10,
      isFeatured: true,
      description: 'Suitable for households considering whole-home water softening to protect plumbing and appliances.',
      idealFor: 'Independent villas & family homes with hard water',
      features: [
        'Household water requirements assessment',
        'High-capacity ion-exchange water softener selection',
        'Digital on-demand metered regeneration controller',
        'Capacity & flow rate recommendations',
        'Full installation planning & bypass loop hookup',
        'Salt starter kit & ongoing maintenance guidance'
      ]
    },
    {
      id: 'advanced-water-treatment',
      name: 'Advanced Water Treatment',
      category: 'Combined Softening & RO',
      indicativeMin: 30000,
      indicativeMax: 70000,
      formattedRange: '₹30,000–₹70,000+',
      standardConfirmedQuote: 48000,
      advancePercent: 10,
      description: 'Suitable for households requiring combined whole-home softening plus multi-stage reverse osmosis filtration.',
      idealFor: 'Comprehensive water purity across every tap + drinking',
      features: [
        'Complete multi-parameter water assessment',
        'Combined whole-home softening + 6-Stage Alkaline RO',
        'System compatibility & flow rate review',
        'PFAS, microplastics, lead & 99% TDS removal',
        'Customized master plumbing installation planning',
        'Includes 1st year annual maintenance & filter renewal'
      ]
    }
  ],

  timeSlots: [
    { id: 'slot-1', label: '09:00 AM – 11:00 AM', period: 'Morning' },
    { id: 'slot-2', label: '11:00 AM – 01:00 PM', period: 'Morning / Noon' },
    { id: 'slot-3', label: '02:00 PM – 04:00 PM', period: 'Afternoon' },
    { id: 'slot-4', label: '04:00 PM – 06:00 PM', period: 'Evening' }
  ],

  waterConcerns: [
    'Hard water and mineral scale',
    'Drinking-water filtration',
    'Water taste or odor',
    'Whole-home water treatment',
    'Not sure — need a water assessment'
  ]
};

// Formatting Helper in Indian Rupee format
function formatINR(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Calculate advance and remaining balance safely
function calculateQuoteBreakdown(confirmedQuote, advancePercent = 10) {
  const quote = Math.max(0, parseInt(confirmedQuote, 10) || 0);
  const percent = Math.min(100, Math.max(1, parseInt(advancePercent, 10) || 10));
  const advanceAmount = Math.round((quote * percent) / 100);
  const remainingBalance = quote - advanceAmount;

  return {
    confirmedQuote: quote,
    formattedQuote: formatINR(quote),
    advancePercent: percent,
    advanceAmount: advanceAmount,
    formattedAdvance: formatINR(advanceAmount),
    remainingBalance: remainingBalance,
    formattedRemaining: formatINR(remainingBalance)
  };
}

// Lookup plan by ID
function getPricingPlanById(planId) {
  if (!planId) return PRICING_CONFIG.plans[1]; // default to whole-home
  const cleanId = String(planId).trim().toLowerCase();
  return PRICING_CONFIG.plans.find(p => p.id === cleanId) || PRICING_CONFIG.plans[1];
}

// Generate unique Booking Reference
function generateBookingReference() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `AQ-2026-${randomNum}`;
}
