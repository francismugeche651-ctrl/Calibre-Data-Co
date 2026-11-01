/**
 * INSIGHTS ARTICLES
 * -------------------------------------------------------------------------
 * A home for LinkedIn posts turned into short articles. Three starter
 * drafts are included; review and edit them before launch.
 *
 * To add an article, copy one object and change it. Block types:
 *   { p: 'Paragraph text' }
 *   { h2: 'Sub-heading' }
 *   { ul: ['Bullet', 'Bullet'] }
 *   { quote: 'Pull quote' }
 * `related` sends readers to the matching service page ('/ecommerce' or '/lead-generation').
 * Plain JavaScript only (this file is also read at build time for SEO).
 */
export const articles = [
  {
    slug: 'why-ad-platforms-report-more-sales-than-your-store',
    title: 'Why your ad platforms report more sales than your store',
    description:
      'Meta, Google and TikTok can each claim the same order. Here is why platform-reported sales add up to more than your real revenue, and what to check instead.',
    date: '2026-11-01',
    readingTime: '4 min read',
    category: 'E-commerce',
    related: '/ecommerce',
    body: [
      { p: "If you add up the sales reported by every ad platform you use, there's a good chance the total is higher than what your store actually recorded. That isn't a bug. It's how platform attribution works." },
      { h2: 'Every platform grades its own homework' },
      { p: 'Each ad platform counts a sale as "theirs" if the buyer interacted with one of their ads within a set window: clicked within days, or sometimes just viewed. A customer who saw an Instagram ad, later clicked a Google search ad, then bought, can be claimed in full by both.' },
      { p: 'Neither platform is lying by its own rules. But the rules are different, they overlap, and none of them checks against your store.' },
      { h2: 'Tracking problems make it worse' },
      { p: 'On top of overlapping attribution, technical issues inflate or distort the numbers:' },
      { ul: [
        'Purchase events firing twice, for example on a page refresh of the order confirmation page',
        'Test orders, cancelled orders and refunds still counted as sales',
        'Missing consent setup, so some platforms model data and others drop it',
        'Currency or tax inconsistencies between platforms',
      ] },
      { h2: 'What to check instead' },
      { p: 'Start with a number no single platform can inflate: your Marketing Efficiency Ratio (MER), which is total store revenue divided by total marketing spend. If MER is flat while platform ROAS climbs, the platforms are taking credit for sales that would have happened anyway, or for sales that never happened.' },
      { p: 'Then reconcile: take a sample week, export your store orders, and compare them line by line with what each platform reports. The gap tells you how much to trust each source, and where to fix tracking first.' },
      { quote: "Platform ROAS tells you what a platform thinks it did. MER tells you what your business actually got." },
      { p: 'This reconciliation is the first thing we do in a Data & Measurement Audit.' },
    ],
  },
  {
    slug: 'cost-per-lead-is-the-wrong-number',
    title: 'Cost per lead is the wrong number. Measure cost per customer.',
    description:
      'Cheap leads are not the same as good leads. Why lead-generation businesses should measure cost per customer, and what closed-loop measurement involves.',
    date: '2026-11-01',
    readingTime: '4 min read',
    category: 'Lead generation',
    related: '/lead-generation',
    body: [
      { p: 'Cost per lead is easy to measure, easy to report and easy to improve. That is exactly the problem.' },
      { h2: 'Cheap leads are easy to buy' },
      { p: "If you tell an ad platform to get you leads, it will. It will find the people most likely to fill in a form, which is not the same as the people most likely to buy. Lower your cost per lead aggressively enough and you'll often see lead quality fall with it." },
      { p: 'Marketing reports success. Sales reports a pile of unreachable numbers, students who never apply, or businesses that were never a fit. Both are telling the truth about their part of the funnel.' },
      { h2: 'The number that settles the argument' },
      { p: 'Cost per customer (total spend divided by the number of leads that became paying customers) is harder to calculate, because it needs data from your CRM, not just your ad account. But it is the only number that tells you whether a campaign is worth running.' },
      { h2: 'What closed-loop measurement means' },
      { ul: [
        'Every form submission records where the lead came from: source, campaign and click ID',
        'That information is saved on the contact in your CRM',
        'Sales updates the lead stage: qualified, opportunity, customer',
        'Those outcomes are sent back to the ad platforms, so they learn what a good lead looks like',
      ] },
      { p: "Once the loop is closed, you can compare channels on cost per qualified lead and cost per customer, and the ad platforms' own algorithms start working toward the same goal you are." },
      { quote: 'A lead is a cost. A customer is the result. Measure the result.' },
    ],
  },
  {
    slug: 'bad-data-makes-ai-bidding-worse',
    title: 'Bad data makes AI bidding worse, not better',
    description:
      "Automated bidding optimises toward the signals you send it. If those signals are wrong, automation scales the mistake. Here's how to fix the inputs.",
    date: '2026-11-01',
    readingTime: '3 min read',
    category: 'Measurement',
    related: '/how-we-work',
    body: [
      { p: "Most ad platforms now run on automated bidding. You set a goal, such as purchases, leads or a target return, and the platform's algorithm decides who to show ads to and how much to bid. It's powerful. It is also only as good as the data you give it." },
      { h2: 'Automation learns from your conversion signals' },
      { p: "The algorithm doesn't know your business. It knows which events you've told it are conversions. If a purchase event fires twice, it thinks that buyer was twice as valuable. If every form fill counts as a lead, it hunts for people who fill in forms, including spam and people who will never buy." },
      { h2: 'Common signal problems' },
      { ul: [
        'Duplicate or missing purchase events',
        'Counting every lead the same, regardless of quality',
        'No order value, or values that include tax and shipping inconsistently',
        'Conversions lost to blocked cookies, with no server-side or consented fallback',
      ] },
      { h2: 'Fix the inputs first' },
      { p: 'Before testing new campaigns, audiences or creative, make sure the platform is learning from real outcomes: accurate purchases with correct values, or qualified leads and customers from your CRM. Clean signals are the cheapest performance improvement available, because they make every other optimisation work better.' },
      { quote: 'Automation scales whatever you feed it. Feed it real customers.' },
    ],
  },
]

export function getArticle(slug) {
  return articles.find((a) => a.slug === slug)
}
