export const ecommerce = {
  hero: {
    eyebrow: 'E-commerce · Shopify and online stores',
    title: 'Know which ads actually make your store money.',
    body: 'We check your ad platforms against your real orders, fix the tracking, and give you the numbers that matter: revenue, customers and profit, not platform ROAS.',
  },
  symptoms: {
    eyebrow: 'Sound familiar?',
    title: 'Signs your numbers are lying to you',
    items: [
      'Meta says 4x ROAS. Your bank disagrees.',
      'Add up every platform\'s reported sales and it\'s more than your store actually took.',
      'GA4, Shopify and your ad accounts all show different revenue for the same week.',
      "You can't say what it costs to win a new customer, as opposed to a repeat one.",
      "You've scaled spend, revenue grew, and profit didn't.",
      'Your agency reports "great results" and you can\'t independently check them.',
    ],
  },
  offers: {
    eyebrow: 'Services',
    title: 'Three ways we work with online stores',
    items: [
      {
        id: 'ecom_audit',
        step: '01',
        name: 'Data & Measurement Audit',
        price: 'From USD 1,250',
        timeline: 'Typically 2 weeks',
        summary: 'Find out which of your numbers you can trust, and which are costing you money.',
        problem:
          "You're making budget decisions on platform-reported conversions you've never checked against real orders.",
        deliverables: [
          'Tracking health check across your store, GA4, Google Tag Manager and ad platforms',
          'Platform-reported sales reconciled against actual store orders for a sample period',
          'Review of purchase events: duplicates, missing orders, consent and checkout gaps',
          'UTM and attribution hygiene review',
          'A written report with a prioritised fix list, ranked by business impact',
          'A walkthrough call to agree next steps',
        ],
        value: 'You know which numbers to trust before you spend another dollar on ads.',
        idealFor: 'Stores already running paid ads whose platform numbers don\'t match the store or the bank.',
      },
      {
        id: 'ecom_setup',
        step: '02',
        name: 'Measurement Foundations Setup',
        price: 'Quoted after audit',
        timeline: 'Typically 3–6 weeks',
        summary: 'Fix your tracking so platforms optimise for real purchases, and you can see real profit.',
        problem:
          "Broken or incomplete tracking feeds bad signals to ad platforms and leaves you without a reliable view of performance.",
        deliverables: [
          'Clean Google Tag Manager and GA4 e-commerce setup',
          'Server-side conversion signals where useful (e.g. Meta Conversions API, Google enhanced conversions)',
          'Consent Mode v2 and a compliant cookie banner',
          'A UTM naming convention your whole team and agency can follow',
          'A single source-of-truth dashboard: MER, new-customer CAC and contribution margin',
          'End-to-end testing and handover documentation',
        ],
        value: 'Ad platforms learn from real customers, and you get one set of numbers everyone agrees on.',
        idealFor: 'Stores that have completed an audit, or are about to scale spend and want the foundations right first.',
      },
      {
        id: 'ecom_retainer',
        step: '03',
        name: 'Growth Oversight Retainer',
        price: 'Monthly, agreed on a call',
        timeline: 'Ongoing',
        summary: 'An independent, measurement-first view of your growth, every month.',
        problem:
          "Tracking breaks quietly, and without someone watching the numbers against profit, budget drifts to what looks good rather than what pays.",
        deliverables: [
          'Ongoing tracking monitoring and QA after site, app or platform changes',
          'Monthly performance review against MER, CAC and contribution margin',
          'Budget allocation recommendations by channel and campaign',
          'Test planning and readout, so you know what actually moved the needle',
          'Independent oversight of your agency or in-house team',
        ],
        value: 'Confident budget decisions every month, based on profit rather than platform claims.',
        idealFor: 'Brands with steady monthly ad spend and an agency or in-house team, who want an independent measurement partner.',
      },
    ],
  },
  metrics: {
    eyebrow: 'What you will finally see',
    title: 'The metrics that answer "is this working?"',
    items: [
      {
        name: 'MER',
        full: 'Marketing Efficiency Ratio',
        body: 'Total revenue divided by total marketing spend. One honest number that no single platform can inflate.',
      },
      {
        name: 'nCAC',
        full: 'New-customer acquisition cost',
        body: 'What it really costs to win a first-time buyer, separated from repeat customers who would have bought anyway.',
      },
      {
        name: 'CM',
        full: 'Contribution margin',
        body: "What's left after product costs, shipping, fees and ad spend. The number that tells you if growth is profitable.",
      },
      {
        name: 'Δ',
        full: 'Platform vs real revenue',
        body: 'The gap between what ad platforms claim and what your store recorded, tracked over time.',
      },
    ],
  },
  faqs: [
    {
      q: 'Do you run our ads?',
      a: "No. We focus on measurement, analysis and oversight. We'll tell you where budget should go and work with whoever runs your ads, whether that's your agency, a freelancer or your in-house team.",
    },
    {
      q: 'We already have an agency. Is this a conflict?',
      a: 'No. We work alongside agencies, not instead of them. Accurate tracking makes their optimisation better and their reporting more credible.',
    },
    {
      q: 'Which platforms do you work with?',
      a: 'Shopify and other common store platforms, Google Analytics 4, Google Tag Manager, Google Ads, Meta, TikTok and LinkedIn. If you use something else, ask on the call.',
    },
    {
      q: 'Do we need server-side tracking?',
      a: "Not always. The audit tells you whether it's worth it for your store, based on how much data you are losing today, not on what's fashionable.",
    },
    {
      q: 'What access do you need?',
      a: 'Usually read access to your store, analytics, Tag Manager and ad accounts, plus an order export for the reconciliation period. We send a short checklist before we start.',
    },
    {
      q: 'What does it cost?',
      a: 'Audits start from USD 1,250. Setup and retainer pricing depends on your stack and spend, and is agreed after a discovery call.',
    },
  ],
}
