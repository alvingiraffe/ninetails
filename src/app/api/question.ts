interface Answer {
  id: string;
  label: string;
}

interface Article {
  url: string;
  label: string;
  snippet: string;
}

export interface Node {
  id: string;
  label: string;
  question?: Question;
  articles: Article[];
  canBeCompleted: boolean;
  currentPath: string[];
  description: string;
  parentIds: string[];
  isEnabled(): boolean;
}

export interface Question {
  id: string;
  question: string;
  options: Answer[];
}

const questions: Question[] = [
  {
    id: 'financial_readiness_ready',
    question: "Are you ready to get started?",
    options: [
      { id: 'lets_go', label: 'Let\'s Go' },
     ],
  },
  {
    id: 'your_credit_score',
    question: "What is your credit score?",
    options: [
      { id: 'dont_know', label: 'I don\'t know.' },
      { id: 'low', label: 'Below 580 (Poor)' },
      { id: 'fair', label: '580 - 640 (Fair)' },
      { id: 'good', label: '640 - 720 (Good)' },
      { id: 'high', label: 'Above 720 (Excellent)' },
    ],
  },
  {
    id: 'downpayment_saved',
    question: "Do you have money for a downpayment set aside?",
    options: [
      { id: 'yes', label: 'yes' },
      { id: 'no', label: 'no' },
    ],
  },
  {
    id: 'is_first_time_buyer',
    question: "Are you a first time home buyer?",
    options: [
      { id: 'yes', label: 'yes' },
      { id: 'no', label: 'no' },
    ],
  },
  {
    id: 'is_veteran',
    question: "Are you or your spouse a veteran or active duty service member in the United States Armed Forces?",
    options: [
      { id: 'yes', label: 'yes' },
      { id: 'no', label: 'no' },
    ],
  },
  {
    id: 'financing_ready',
    question: "Are you ready to get started?",
    options: [
      { id: 'lets_go', label: 'Let\'s Go' },
     ],
  },
  {
    id: 'eligible_home_area',
    question: "Which best describes the area where you are looking to buy?",
    options: [
      { id: 'urban', label: 'Urban' },
      { id: 'suburban', label: 'Suburban' },
      { id: 'rural', label: 'Rural' },
      { id: 'dont_know', label: 'I Don\'t know' },
     ],
  },
];

const nodes: Node[] = [
  {
    id: 'financial_readiness',
    label: 'Financial Readiness',
    question: questions[0],
    articles: [
    ] ,
    canBeCompleted: true,
    currentPath: ['Financial Readiness'],
    description: "Financial readiness is the first step towards buying a home. Lenders are looking for a few key things to approve your application - let’s walk through them together!",
    parentIds: [],
    isEnabled() {
      return true;
    },
  },
  {
    id: 'credit_score',
    label: 'Credit Score',
    question: questions[1],
    articles: [
      {
        url: 'https://www.google.com/search?q=What%27s+a+credit+score%3F&oq=What%27s+a+credit+score%3F',
        label: "What is good credit and why is it important?",
        snippet: "Credit scores can range from 300 to 850, with the average score in the high-600s. Having a lower score can make it harder to qualify for financing…",
      },
      {
        url: 'https://www.google.com/search?q=What%27s+a+credit+score%3F&oq=What%27s+a+credit+score%3F',
        label: "Equifax, Experian, & TransUnion - which score matters?",
        snippet: "Your scores from each credit bureau might be different. Each bureau uses a proprietary calculation, which leads to the discrepancies. You should only worry….",
      },
    ] ,
    canBeCompleted: true,
    currentPath: ['Financial Readiness', 'Credit Score'],
    description: "Your credit score is one of the first thing lenders look at to determine how much they are willing to lend and one of the most important in deciding what interest rate you'll pay.",
    parentIds: ['financial_readiness'],
    isEnabled() {
      return true;
    },
  },
  {
    id: 'credit_education',
    label: 'Credit Education',
    question: undefined,
    articles: [
      {
        url: 'https://www.google.com',
        label: "How can I check my credit scores?",
        snippet: "It’s easy to check your credit scores with all three credit bureaus. As a consumer, you have the right to view your credit report once a year at each…",
      },
      {
        url: 'https://www.google.com',
        label: "5 steps to dispute an error on your credit report",
        snippet: "Whether it’s an account you don’t recognize or a past-due credit card notification, errors on your credit report can have a big impact on your score…",
      },
      {
        url: 'https://www.google.com',
        label: "Why do my credit scores differ among the bureaus?",
        snippet: "You might have three (or more!) different credit scores, depending on who you ask. A big difference between scores might be an indication that something….",
      },
    ] ,
    canBeCompleted: true,
    currentPath: ['Financial Readiness', 'Credit Education'],
    description: `Your credit score is an important piece of the homebuying puzzle. Lenders use credit scores as one factor to decide who to lend to, so it is important to know what your credit score is.
    There are three main companies that track consumer credit: Experian, Equifax, and TransUnion. Every year, you can request a free copy of your credit report from each bureau to see your score as well as your credit account history, any credit inquiries, and relevant public records.
    In addition to the credit bureaus, your bank may offer free credit monitoring and websites like CreditKarma and CreditSesame can help you stay on top of your credit throughout the year.`,
    parentIds: ['financial_readiness'],
    isEnabled() {
      return questionsAndAnswers['your_credit_score'] == undefined || questionsAndAnswers['your_credit_score'] == 'dont_know'
    },
  },
  {
    id: 'credit_repair',
    label: 'Credit Repair',
    question: undefined,
    articles: [
      {
        url: 'https://www.google.com',
        label: "Start repairing your credit with Ovation today!",
        snippet: "Ovation offers one-on-one coaching to: negotiate directly with credit bureaus on your behalf, provide guidance on how to grow...",
      },
      {
        url: 'https://www.google.com',
        label: "What is good credit and why is it important?",
        snippet: "Credit scores can range from 300 to 850, with the average score in the high-600s. Having a lower score can make it harder to qualify for financing…",
      },
    ],
    canBeCompleted: true,
    currentPath: ['Financial Readiness', 'Credit Repair'],
    description: `While your credit might not be lender-ready today, there are plenty of ways to get it back on track. Improving your credit score can save you thousands, if not tens of thousands, of dollars in helping you qualify for a better interest rate. Working with a credit repair service can help you jumpstart this process. 1`,
    parentIds: ['financial_readiness'],
    isEnabled() {
      return questionsAndAnswers['your_credit_score'] == undefined || questionsAndAnswers['your_credit_score'] == 'low';
    },
  },
  {
    id: 'downpayment',
    label: 'Saving for a Downpayment',
    question: questions[2],
    articles: [
      {
        url: 'https://www.google.com',
        label: "'I need a 20% downpayment' and other myths about mortgages",
        snippet: "You may have heard you need a downpayment equal to 20% of the purchase price of your new home. While a 20% downpayment allows…",
      },
      {
        url: 'https://www.google.com',
        label: "What is PMI and why should I care?",
        snippet: "If you intend on putting less than 20% down on your new home purchase, you may be surprised to learn that you owe Private Mortgage Insurance. This doesn’t insure…",
      },
    ],
    canBeCompleted: true,
    currentPath: ['Financial Readiness', 'Saving for a Downpayment'],
    description: `Whether you're putting down 20% or 3%, you may be able to get approved for multiple lending options.`,
    parentIds: ['financial_readiness'],
    isEnabled() {
      return true;
    },
  },
  {
    id: 'first_time_buyer',
    label: 'First time buyer',
    question: questions[3],
    articles: [
      {
        url: 'https://www.google.com',
        label: "Who is a first time homeowner?",
        snippet: "You may be surprised to learn a first-time homeowner may have previously owned their own…",
      },
      {
        url: 'https://www.google.com',
        label: "Owned a home 4 years ago? Why your lender might consider you a ‘first time’ home buyer",
        snippet: "Lenders define a first time homeowner as someone who has not owned their principal residence…",
      },
      {
        url: 'https://www.google.com',
        label: "Your first home might be closer than you think",
        snippet: "Did you know their are special programs to make homes more affordable to first time homeowners…",
      },
    ],
    canBeCompleted: true,
    currentPath: ['Financial Readiness', 'First time buyer'],
    description: `A first time home buyer is someone who has either never owned a home or hasn't owned their primary residence in the past three years. `,
    parentIds: ['financial_readiness'],
    isEnabled() {
      return true;
    },
  },
  {
    id: 'veteran',
    label: 'Veteran Status',
    question: questions[4],
    articles: [
      {
        url: 'https://www.google.com',
        label: "Criteria for Veteran status for Federal Aid purposes",
        snippet: "At least 90 days of active-duty service including at least 30 consecutive days (your DD214 must…",
      },
      {
        url: 'https://www.google.com',
        label: "Guard and Reserve members receive ‘Veteran’ status",
        snippet: "A recently signed law gives veteran status to National Guard members who served 20 years…",
      },
    ],
    canBeCompleted: true,
    currentPath: ['Financial Readiness', 'Veteran Status'],
    description: `Preferrential loan terms are one way the US Government thanks veterans and active duty service members for their service.`,
    parentIds: ['financial_readiness'],
    isEnabled() {
      return true;
    },
  },
  {
    id: 'financing',
    label: 'Financing',
    question: questions[5],
    articles: [
    ],
    canBeCompleted: true,
    currentPath: ['Financing'],
    description: `While it's tempting to start looking for homes, the first step in the homebuying purchase should usually getting your financing in order. Getting pre-approved will help you set a budget, communicate with your agent, and define search, so it is a great first step towards purchasing a home. `,
    parentIds: [],
    isEnabled() {
      return true;
    },
  },
  {
    id: 'usda_eligibility',
    label: 'USDA Eligibility',
    question: questions[6],
    articles: [
      {
        url: 'https://www.google.com',
        label: "What's rural? Surprising areas the USDA categorizes as 'Rural'",
        snippet: "Rural areas might be closer than you think. While we think of USDA loans as being eligible for farmland...",
      },
      {
        url: 'https://www.google.com',
        label: "How to qualify for a USDA loan when buying in the suburbs",
        snippet: "Your white picket fence in the suburbs may qualify you for a loan from the US Department of Agriculture...",
      },
      {
        url: 'https://www.google.com',
        label: "Property eligibility - USDA.gov",
        snippet: "Final determination of property eligibility must be made by Rural Development upon receipt of a completed…",
      },
    ],
    canBeCompleted: true,
    currentPath: ['Financing','USDA Eligibility'],
    description: `Where are you looking to buy? Government-backed loans are availble for buyers looking in less-densely populated areas. `,
    parentIds: ['financing'],
    isEnabled() {
      return true;
    },
  },
  {
    id: 'usda_recommendation',
    label: 'USDA Loans',
    question: undefined,
    articles: [
      {
        url: 'https://www.google.com',
        label: "Get Pre-Approved with Guaranteed Rate! ",
        snippet: "The US Government offers a number of mortgage products that are less restrictive and more affordable than conventional loans...",
      },
      {
        url: 'https://www.google.com',
        label: "Top 5 USDA Home Loan Lenders ",
        snippet: "5 best USDA Loan lenders, compared & reviewed. Updated rates for July, 2022. Are you looking for USDA Home Loan lenders...",
      },
    ],
    canBeCompleted: true,
    currentPath: ['Financing','USDA Loans'],
    description: `Great news! It looks like you might qualify for a USDA loan. These government-backed loans are offered by many lenders and secured by the US Government, allowing you to put no money down and potentially qualify for a lower interest rate than you may receive from a conventional lender. Maximum household limits and specific location restrictions may apply. USDA loans also require Private Mortgage Insurance for the duration of the loan.`,
    parentIds: ['financing'],
    isEnabled() {
      return (questionsAndAnswers['your_credit_score'] == undefined || questionsAndAnswers['your_credit_score'] == 'good') &&
      (questionsAndAnswers['eligible_home_area'] != undefined) &&
      (questionsAndAnswers['eligible_home_area'] == 'rural' || questionsAndAnswers['eligible_home_area'] == 'suburban');
    },
  },
  {
    id: 'veteran_financing',
    label: 'VA Loans',
    question: undefined,
    articles: [
      {
        url: 'https://www.google.com',
        label: "Get Pre-Approved with Veterans United! ",
        snippet: "Trusted VA Loan Lender of 300,000+ Veterans Nationwide. Get Your VA Loan! VA Loan Expertise & Personal Service...",
      },
      {
        url: 'https://www.google.com',
        label: "Your Complete Guide to the VA Home Loan",
        snippet: "A VA home loan (also known as a Department of Veterans Affairs home loan) is one of the most useful military benefits. If you....",
      },
    ],
    canBeCompleted: true,
    currentPath: ['Financing','VA Loans'],
    description: `Great news! It looks like you might qualify for a VA loan. These government-backed loans are offered by many lenders and provide advantageous terms to veterans, active duty service members, and their spouses. In addition to lower interest rates than most conventional loans, VA loans allow you to purchase with no downpayment and may reduce your total closing costs, allowing you to get into your dream home sooner. One main restriction is that property's must conform to the VA's Minimum Property Standards, so unless you are financing a purchase and improvement, look for move-in ready homes. `,
    parentIds: ['financing'],
    isEnabled() {
      return questionsAndAnswers['is_veteran'] == undefined || questionsAndAnswers['is_veteran'] == 'yes';
    },
  },

  {
    id: 'searching_for_homes',
    label: 'Searching for Homes',
    question: undefined,
    articles: [
      {
        url: 'https://www.google.com',
        label: "What to look for when buying a house",
        snippet: "When deciding what to look for in a house, focus in on things that can't be easily changed. Location, backyard, garage, and foundation...",
      },
      {
        url: 'https://www.google.com',
        label: "'Cozy' and 'Great Potential' - How to decipher real estate eupheisms ",
        snippet: "Ask a real estate agent to describe a tiny house and they'll invariably use the word 'cozy:' we're breaking down the biggest euphemisms in real estate...",
      },
      {
        url: 'https://www.google.com',
        label: "Property Experts Reveal the Top Home Buyer Mistakes",
        snippet: "From buying a house for the decor to ignoring the crack in the foundation, property experts reveal the top home buyer mistakes they see...",
      },
    ],
    canBeCompleted: true,
    currentPath: ['Searching for Homes'],
    description: `Now that you know your financing options, it's time to start searching for homes. Working with a registered Realtor will help you learn more about the neighborhoods you're interested in, write a compelling offer, and win the house of your dreams.`,
    parentIds: [],
    isEnabled() {
      return true;
    },
  },
  {
    id: 'negotiating_an_offer',
    label: 'Negotiating an Offer',
    question: undefined,
    articles: [
      {
        url: 'https://www.google.com',
        label: "8 Simple Rules for Negotiating Your Offer and Winning the House",
        snippet: "Negotiating a home purchase price can be intimidating, especially for first-time buyers. Start by deciding what you're not willing to compromise on....",
      },
      {
        url: 'https://www.google.com',
        label: "How to Put in an Offer on a Home that's Overpriced",
        snippet: "With interest rates rising and prices falling, you may encounter sellers who are reluctant to face reality and lower their price...",
      },
    ],
    canBeCompleted: true,
    currentPath: ['Negotiating an Offer'],
    description: `It may be tempting to offer a little more money or waive an inspection in the hopes that the seller will accept your offer, but it's important to go into any negotiation with hard limits on what you are (and are not!) willing to compromise on. `,
    parentIds: [],
    isEnabled() {
      return true;
    },
  },
  {
    id: 'closing',
    label: 'Closing',
    question: undefined,
    articles: [
      {
        url: 'https://www.google.com',
        label: "3 Things to Avoid Before You Close (and 2 To Do!)",
        snippet: "Your offer was accepted, so now what? It can be frustrating to feel like you have nothing to do, but don't let that frustration torpedo your home purchase!...",
      },
      {
        url: 'https://www.google.com',
        label: "So your offer was accepted, now what?",
        snippet: "Whether you made 1 offer or 12, it is an exhilerating feeling to finally have an offer accepted! What happens next might be a lot of hurry up and wait. ",
      },
    ],
    canBeCompleted: true,
    currentPath: ['Closing'],
    description: `Closing can be a simultaneously exciting and boring time. The best thing you can do while you're under contract is to respond promptly to any questions from your lender, try to be patient, and not make any large purchases. While it may be tempting to go furniture shopping for your new home, any large purchases or new lines of credit could cause you to lose your financing. It's best to stick to window-shopping until you have keys in hand. `,
    parentIds: [],
    isEnabled() {
      return true;
    },
  },
  {
    id: 'home_ownership',
    label: 'Home Ownership',
    question: undefined,
    articles: [
      {
        url: 'https://www.google.com',
        label: "How to manage your biggest asset",
        snippet: "",
      },
      {
        url: 'https://www.google.com',
        label: "Have a Designer Decorate One Room in Your New Home",
        snippet: "",
      },
      {
        url: 'https://www.google.com',
        label: "Air filters, termites, and appliances, oh my! ",
        snippet: "Take the guess work out of home maintenance and repairs with Digs, by OJO. ",
      },
    ] ,
    canBeCompleted: false,
    currentPath: ['Home Ownership'],
    description: `Congratulations! The years of saving, months of looking, and weeks of closing have finally paid off! `,
    parentIds: [],
    isEnabled() {
      return true
    },
  },

];

const questionsAndAnswers: Record<string, string> = {};
const completedNodes: Record<string, boolean> = {};
let current = nodes[0]

export function currentNode(): Node {
  return current;
}

function isNodeCompleted(node: Node): boolean {
  if (completedNodes[node.id]) {
    return true;
  }

  for (let parentId of node.parentIds) {
    if (completedNodes[parentId]) {
      return true;
    }
  }

  if (node.question) {
    return questionsAndAnswers[node.question.id] != undefined
  }

  return false
}

function updateCurrentNode(): Node {
  //find the first node that is not completed
  // and where isEnabled = true

  let found = nodes.find(node => !isNodeCompleted(node) && node.isEnabled())
  if (found != undefined) {
    current = found
  } else {
    console.error("Found no nodes left enabled.");
  }
  return current;
}

export function submitAnswer(questionId: string, answerId: string): Node {
  questionsAndAnswers[questionId] = answerId;
  return updateCurrentNode();
}

export function completeNode(nodeId: string): Node {
  completedNodes[nodeId] = true;
  return updateCurrentNode();
}
