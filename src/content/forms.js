// Options for the mini-audit form. Edit labels freely; the `value` is what gets stored.
export const businessTypes = [
  { value: 'ecommerce', label: 'E-commerce / online store' },
  { value: 'leadgen_services', label: 'Lead generation: services' },
  { value: 'leadgen_education', label: 'Lead generation: education' },
  { value: 'leadgen_b2b', label: 'Lead generation: B2B' },
  { value: 'agency', label: 'Agency or freelancer' },
  { value: 'other', label: 'Other' },
]

export const adSpendRanges = [
  { value: 'none', label: 'Not running paid ads yet' },
  { value: 'under_1k', label: 'Under USD 1,000 / month' },
  { value: '1k_5k', label: 'USD 1,000 – 5,000 / month' },
  { value: '5k_20k', label: 'USD 5,000 – 20,000 / month' },
  { value: '20k_50k', label: 'USD 20,000 – 50,000 / month' },
  { value: '50k_plus', label: 'Over USD 50,000 / month' },
]
