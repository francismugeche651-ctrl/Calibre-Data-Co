// Main navigation (order as in the website plan). "Book a call" is always shown as a button.
export const mainNav = [
  { label: 'E-commerce', to: '/ecommerce' },
  { label: 'Lead gen', to: '/lead-generation' },
  { label: 'How we work', to: '/how-we-work' },
  { label: 'Results', to: '/results' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
]

export const footerNav = [
  {
    title: 'Services',
    links: [
      { label: 'E-commerce measurement', to: '/ecommerce' },
      { label: 'Lead-generation measurement', to: '/lead-generation' },
      { label: 'How we work', to: '/how-we-work' },
      { label: 'Working with agencies', to: '/how-we-work#agencies' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Results', to: '/results' },
      { label: 'Insights', to: '/insights' },
      { label: 'Referral partners', to: '/about#partners' },
    ],
  },
  {
    title: 'Get started',
    links: [
      { label: 'Book a discovery call', to: '/book-a-call' },
      { label: 'Free mini-audit', to: '/free-mini-audit' },
    ],
  },
]
