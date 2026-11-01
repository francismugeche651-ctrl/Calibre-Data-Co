export const home = {
  hero: {
    eyebrow: 'Measurement-led growth for e-commerce and lead-generation brands',
    // Alternative headlines from the plan:
    //   "Your ad platforms are guessing. We make them accurate."
    //   "Stop paying for clicks, leads and sales that don't exist."
    title: 'Know which ads actually make you money.',
    body: 'Calibre Data Co fixes your tracking, connects your ads to real revenue, and tells you exactly where your next budget should go.',
    paths: [
      { label: 'I run an online store', to: '/ecommerce', icon: 'store', id: 'hero_path_ecommerce' },
      { label: 'I generate leads', to: '/lead-generation', icon: 'users', id: 'hero_path_leadgen' },
    ],
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Your ad platforms are guessing.',
    intro: "Every platform grades its own homework. When the numbers you make budget decisions with are wrong, every decision after that is wrong too.",
    items: [
      {
        title: 'Platforms over-report sales.',
        body: "Meta, Google and TikTok each take credit for the same order. Add their numbers together and you've often \"sold\" more than your store actually did.",
      },
      {
        title: 'Most leads never become customers.',
        body: 'Cost per lead looks healthy in the dashboard. Sales tells a different story, and nobody connects the two.',
      },
      {
        title: 'Bad data makes AI bidding worse.',
        body: "Automated bidding optimises toward whatever signal you feed it. Feed it duplicate purchases or junk leads and it will find you more of them.",
      },
    ],
  },
  pillars: {
    eyebrow: 'What we do',
    title: 'Measurement first. Then growth.',
    intro: 'Three principles behind every project.',
  },
  process: {
    eyebrow: 'How we work',
    title: 'Audit → Setup → Oversight',
    intro: 'Start with an audit. Fix what matters. Then keep the numbers honest as you scale.',
  },
  audiences: {
    eyebrow: 'Who we help',
    title: 'Built for two kinds of business.',
    cards: [
      {
        icon: 'shopping-bag',
        label: 'E-commerce',
        title: 'Online stores and Shopify brands',
        body: "Your ad platforms claim sales that don't show up in the bank, and you can't tell which products or channels are actually profitable.",
        points: ['Platform vs real revenue', 'MER and new-customer CAC', 'Profit-based optimisation'],
        to: '/ecommerce',
        cta: 'See e-commerce services',
      },
      {
        icon: 'users',
        label: 'Lead generation',
        title: 'Services, education and B2B',
        body: 'Plenty of leads, not enough customers. Marketing reports volume, sales says the leads are poor, and nobody can prove who is right.',
        points: ['Cost per customer, not per lead', 'Closed-loop CRM tracking', 'Lead quality by channel'],
        to: '/lead-generation',
        cta: 'See lead-gen services',
      },
    ],
  },
  proof: {
    eyebrow: 'Proof',
    title: 'Results, reported the way we ask you to report them.',
    body: 'Every case study we publish shows the client type, the problem, what we did, and the numbers before and after. No vanity metrics.',
  },
  founder: {
    eyebrow: 'From the founder',
    // [PLACEHOLDER]: replace with your own two sentences.
    quote:
      "[PLACEHOLDER: Two sentences in your own voice. For example, why you started Calibre Data Co and what you saw go wrong when businesses scaled ad spend on numbers they couldn't trust.]",
  },
}
