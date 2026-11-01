/**
 * SHARED COPY used on several pages.
 * Edit text here; layout lives in src/components. Icon names map to
 * src/components/ui/icons.js.
 */

export const ctas = {
  primary: { label: 'Book a discovery call', short: 'Book a call', to: '/book-a-call' },
  secondary: { label: 'Get a free mini-audit', to: '/free-mini-audit' },
}

export const pillars = [
  {
    icon: 'crosshair',
    title: "Measure what's real",
    body: 'Tracking and data you can trust, checked against your actual store orders or CRM records, not just what the ad platforms report.',
  },
  {
    icon: 'scale',
    title: 'Spend where it pays',
    body: 'Budget decisions based on profit, cost per customer and real business outcomes, not platform ROAS or cost per lead.',
  },
  {
    icon: 'cpu',
    title: 'Scale with intelligence',
    body: 'Clean, reliable data that automated bidding, forecasting and reporting can actually use, so your systems learn from real customers.',
  },
]

export const processSteps = [
  {
    key: 'audit',
    step: '01',
    title: 'Audit',
    oneLine: "Find what's broken in your tracking and what it's costing you.",
    timeline: 'Typically 2 weeks',
  },
  {
    key: 'setup',
    step: '02',
    title: 'Setup',
    oneLine: 'Fix the tracking and connect your ads to real revenue.',
    timeline: 'Typically 3–6 weeks',
  },
  {
    key: 'oversight',
    step: '03',
    title: 'Oversight',
    oneLine: 'Use clean data every month to decide where the next budget goes.',
    timeline: 'Monthly, ongoing',
  },
]

export const agencyNote = {
  title: 'We work alongside your agency, not instead of it.',
  body: "Already have an agency or freelancer running your ads? Good. We don't buy media or take over your accounts. We make sure the numbers they optimise against are real, and give you an independent view of what's working. Most agencies welcome it, because better data makes their work look as good as it actually is.",
}

export const pricingNote = 'Audits from USD 1,250. Setup and retainer pricing depends on your stack and is agreed after a discovery call.'
