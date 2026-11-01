export const howWeWork = {
  hero: {
    eyebrow: 'How we work',
    title: 'Measurement first. Then everything else.',
    body: 'Three clear steps, each with a defined output. You can start with an audit and stop there, or continue to setup and ongoing oversight.',
  },
  // Timelines are suggested defaults. Adjust them to how you actually deliver.
  steps: [
    {
      step: '01',
      title: 'Audit',
      timeline: 'Typically 2 weeks',
      summary: "We find out what's broken, what's missing, and what it is costing you.",
      points: [
        'Kick-off call to understand your business, goals and current setup',
        'Review of tracking, analytics, ad platforms and store or CRM data',
        'Reconciliation: what platforms report vs what actually happened',
        'Written report with a prioritised fix list, ranked by business impact',
        'Walkthrough call to go through findings and next steps',
      ],
      output: 'A clear report you own, whether or not you continue with us.',
    },
    {
      step: '02',
      title: 'Setup',
      timeline: 'Typically 3–6 weeks',
      summary: 'We fix the foundations so your numbers are reliable, and platforms learn from real outcomes.',
      points: [
        'Tag Manager, GA4 and conversion tracking cleaned up or rebuilt',
        'Server-side or offline conversion signals where they add value',
        'CRM or store data connected to marketing data',
        'Consent Mode v2 and cookie banner',
        'One dashboard with the metrics that matter for your model',
        'Testing, documentation and handover',
      ],
      output: "Tracking you can trust, documented so it doesn't depend on any one person.",
    },
    {
      step: '03',
      title: 'Oversight',
      timeline: 'Monthly, ongoing',
      summary: 'We keep the numbers honest and turn them into budget decisions, every month.',
      points: [
        'Monitoring and QA so tracking stays accurate as things change',
        'Monthly performance review against profit and cost per customer',
        'Budget and test recommendations by channel and campaign',
        'Independent oversight of your agency or in-house team',
      ],
      output: 'A monthly decision, not a monthly report: where to spend next, and why.',
    },
  ],
  provide: {
    title: 'What we need from you',
    items: [
      'Access to your ad accounts, analytics and Tag Manager (read access is enough for the audit)',
      'Access to, or an export from, your store or CRM for the review period',
      'One point of contact in marketing, and one in sales for lead-gen businesses',
      'About an hour for a kick-off call, and short check-ins as we go',
    ],
  },
  principles: {
    title: 'How we behave',
    items: [
      { title: 'Plain language', body: 'Every finding comes with what it means for your business, in one line.' },
      { title: 'Honest answers', body: "If your tracking is fine, we'll tell you, and you won't need a setup project." },
      { title: 'Independent', body: "We don't buy media or earn commission on spend. Our only incentive is accurate numbers." },
      { title: 'You own everything', body: 'Accounts, data, dashboards and documentation stay yours.' },
    ],
  },
}
