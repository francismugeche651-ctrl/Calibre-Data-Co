export const leadgen = {
  hero: {
    eyebrow: 'Lead generation · Services, education and B2B',
    title: 'Stop paying for leads that never buy.',
    body: 'We connect your ads to your CRM so you can see which campaigns produce customers, not just form fills, and what each customer really costs.',
  },
  symptoms: {
    eyebrow: 'Sound familiar?',
    title: "Signs you're optimising for the wrong thing",
    items: [
      'Marketing reports 500 leads. Sales says 20 were real.',
      "Cost per lead keeps falling, but revenue isn't going up.",
      "Your CRM doesn't record which ad, campaign or post a lead came from.",
      "Ad platforms can't tell a good lead from a bad one, so they keep finding more bad ones.",
      'Sales blames marketing, marketing blames sales, and nobody has the data to settle it.',
      'You report cost per lead because cost per customer is too hard to calculate.',
    ],
  },
  segments: {
    eyebrow: 'Who this is for',
    title: 'Different sales cycles, same problem',
    items: [
      {
        icon: 'briefcase',
        name: 'Services',
        body: 'Clinics, legal, financial and home services. Enquiries turn into bookings or consultations within days.',
        measure: 'Measure: cost per booked appointment and per paying client.',
      },
      {
        icon: 'graduation-cap',
        name: 'Education',
        body: 'Schools, colleges and training providers. Enquiries become applications, then enrolments, over weeks or months.',
        measure: 'Measure: cost per application and per enrolment, by intake.',
      },
      {
        icon: 'building',
        name: 'B2B',
        body: 'Software, professional services and suppliers. Long sales cycles, several decision-makers, high deal values.',
        measure: 'Measure: cost per qualified opportunity and pipeline value by channel.',
      },
    ],
  },
  offers: {
    eyebrow: 'Services',
    title: 'Three ways we work with lead-generation businesses',
    items: [
      {
        id: 'lead_audit',
        step: '01',
        name: 'Lead-to-Revenue Audit',
        price: 'From USD 1,250',
        timeline: 'Typically 2 weeks',
        summary: 'Trace your leads from ad click to closed deal, and find where the trail goes cold.',
        problem:
          "You can see what leads cost, but not which ones become customers, so budget follows volume instead of revenue.",
        deliverables: [
          'Review of form, call and chat tracking on your website and landing pages',
          'Check of how lead source and campaign data reach your CRM, and where they get lost',
          'Review of lead stages and definitions with your sales team',
          'Cost per lead vs cost per qualified lead vs cost per customer, where your data allows',
          'Readiness check for sending CRM outcomes back to ad platforms',
          'A written report with a prioritised fix list and a walkthrough call',
        ],
        value: 'A clear picture of which channels produce customers, and exactly what to fix to measure it properly.',
        idealFor: 'Businesses spending on ads for leads who suspect much of that spend is producing poor-quality enquiries.',
      },
      {
        id: 'lead_setup',
        step: '02',
        name: 'Closed-Loop Measurement Setup',
        price: 'Quoted after audit',
        timeline: 'Typically 3–6 weeks',
        summary: 'Connect ads, website and CRM so every customer can be traced to the campaign that found them.',
        problem:
          "Without a closed loop, ad platforms optimise for form fills, and you can't report cost per customer.",
        deliverables: [
          'UTM and click-ID capture on every form, stored on the contact record in your CRM',
          'Agreed lead stages (e.g. lead → qualified → opportunity → customer) built into the CRM',
          'Qualified-lead and sale events sent back to Google Ads, Meta and LinkedIn',
          'Consent-aware tracking setup with Google Tag Manager and GA4',
          'A dashboard showing cost per qualified lead, cost per customer and pipeline by channel',
          'Testing, documentation and a short training session for your team',
        ],
        value: 'Ad platforms learn what a good lead looks like, and you can finally report cost per customer.',
        idealFor: 'Teams with a CRM (HubSpot, Zoho, Pipedrive, Salesforce or similar) who want marketing judged on revenue.',
      },
      {
        id: 'lead_retainer',
        step: '03',
        name: 'Pipeline Growth Oversight Retainer',
        price: 'Monthly, agreed on a call',
        timeline: 'Ongoing',
        summary: 'Monthly, measurement-first oversight of the full journey from ad to revenue.',
        problem:
          "Lead quality shifts as campaigns, offers and sales teams change. Without regular review, spend drifts back toward cheap, low-quality volume.",
        deliverables: [
          'Ongoing monitoring of form, CRM and conversion-feedback tracking',
          'Monthly review of cost per qualified lead and cost per customer by channel',
          'Budget recommendations based on pipeline and revenue, not lead volume',
          'Regular marketing and sales alignment on lead quality',
          'Independent oversight of your agency or in-house team',
        ],
        value: 'Marketing and sales agree on one set of numbers, and budget follows the channels that produce customers.',
        idealFor: 'Businesses with consistent monthly ad spend and a sales process, who want an independent measurement partner.',
      },
    ],
  },
  loop: {
    eyebrow: 'The closed loop',
    title: 'From ad click to customer, and back again',
    intro: "A closed loop means what happens in your CRM is sent back to your ad platforms. They stop optimising for form fills and start optimising for customers.",
  },
  faqs: [
    {
      q: 'Which CRMs do you work with?',
      a: 'HubSpot, Zoho, Pipedrive, Salesforce and most CRMs that support integrations or exports. Even a well-structured spreadsheet can be a starting point.',
    },
    {
      q: "Our sales team doesn't update the CRM consistently. Can this still work?",
      a: "Yes, but it's usually the first thing we fix. We keep lead stages simple so updating them takes seconds, and show sales why it benefits them: better leads.",
    },
    {
      q: 'A lot of our leads come by phone or WhatsApp. Can those be tracked?',
      a: "Often, yes, using call tracking, click-to-chat tracking and consistent source capture. The audit tells you what's realistic for your setup.",
    },
    {
      q: 'Our sales cycle is months long. How do you measure that?',
      a: "We measure earlier signals that reliably predict revenue, such as qualified leads and opportunities, and report final revenue as deals close.",
    },
    {
      q: 'Will you replace our agency?',
      a: 'No. We work alongside your agency. We make sure the numbers they optimise against reflect real customers.',
    },
    {
      q: 'What does it cost?',
      a: 'Audits start from USD 1,250. Setup and retainer pricing depends on your CRM, channels and spend, and is agreed after a discovery call.',
    },
  ],
}
