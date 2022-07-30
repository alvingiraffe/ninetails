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
      {
        url: 'https://www.google.com/search?q=What%27s+a+credit+score%3F&oq=What%27s+a+credit+score%3F',
        label: "What's a credit score?",
        snippet: "Here's a snippet for credit score.",
      },
      {
        url: 'https://www.google.com/search?q=What%27s+a+credit+score%3F&oq=What%27s+a+credit+score%3F',
        label: "No but seriously, what is it?",
        snippet: "Alright fine, some more information.",
      },
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
        label: "What's a credit score?",
        snippet: "here's a snippet for credit score",
      },
      {
        url: 'https://www.google.com/search?q=What%27s+a+credit+score%3F&oq=What%27s+a+credit+score%3F',
        label: "No but seriously, what is it?",
        snippet: "Alright fine, some more information.",
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
        url: 'https://www.google.com/search?q=How+much+should+I+have+for+a+down+payment%3F&oq=How+much+should+I+have+for+a+down+payment%3F',
        label: "How much should I have for a down payment?",
        snippet: "here's a snippet for downpayment",
      },
      {
        url: 'https://www.google.com/search?q=What%27s+a+credit+score%3F&oq=What%27s+a+credit+score%3F',
        label: "No but seriously, what is it?",
        snippet: "Alright fine, some more information.",
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
    label: 'Veteran',
    question: questions[4],
    articles: [
    ],
    canBeCompleted: true,
    currentPath: ['Financial Readiness', 'Veteran'],
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
    label: 'Check for USDA Eligibility',
    question: questions[6],
    articles: [
    ],
    canBeCompleted: true,
    currentPath: ['Financing','Check for USDA Eligibility'],
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
    ],
    canBeCompleted: true,
    currentPath: ['Financing','USDA loans'],
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
    ],
    canBeCompleted: true,
    currentPath: ['Financing','VA loans'],
    description: `Great news! It looks like you might qualify for a VA loan. These government-backed loans are offered by many lenders and provide advantageous terms to veterans, active duty service members, and their spouses. In addition to lower interest rates than most conventional loans, VA loans allow you to purchase with no downpayment and may reduce your total closing costs, allowing you to get into your dream home sooner. One main restriction is that property's must conform to the VA's Minimum Property Standards, so unless you are financing a purchase and improvement, look for move-in ready homes. `,
    parentIds: ['financing'],
    isEnabled() {
      return questionsAndAnswers['is_veteran'] == undefined || questionsAndAnswers['is_veteran'] == 'yes';
    },
  },

  {
    id: 'searching_for_homes',
    label: 'Searching for homes',
    question: undefined,
    articles: [
    ],
    canBeCompleted: true,
    currentPath: ['Searching for homes'],
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
