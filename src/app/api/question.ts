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
    question: "What's your credit score?",
    options: [
      { id: 'dont_know', label: 'I don\'t know.' },
      { id: 'low', label: 'Low' },
      { id: 'medium', label: 'Medium' },
      { id: 'high', label: 'Excellent' },
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
    question: "Are you a first-time buyer?",
    options: [
      { id: 'yes', label: 'yes' },
      { id: 'no', label: 'no' },
    ],
  },
  {
    id: 'is_veteran',
    question: "Are you a veteran?",
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
      { id: 'rural', label: 'Rural' },
      { id: 'suburban', label: 'Suburban' },
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
    description: "something about financial readiness and how we're about to start asking more.",
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
    description: "something about credit score",
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
    description: "what is credit and stuff",
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
    description: "placeholder",
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
    description: "placeholder",
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
    description: "placeholder",
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
    description: "placeholder",
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
    description: "placeholder",
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
    description: "placeholder",
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
    description: "placeholder",
    parentIds: ['financing'],
    isEnabled() {
      return (questionsAndAnswers['your_credit_score'] == undefined || questionsAndAnswers['your_credit_score'] == 'medium') && 
      (questionsAndAnswers['eligible_home_area'] != undefined) && 
      (questionsAndAnswers['eligible_home_area'] == 'rural' || questionsAndAnswers['eligible_home_area'] == 'suburban');
    },
  },
  {
    id: 'va_recommendation',
    label: 'VA Loans',
    question: undefined,
    articles: [
    ],
    canBeCompleted: true,
    currentPath: ['Financing','VA loans'],
    description: "placeholder",
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
    description: "placeholder",
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
    description: "placeholder",
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
    description: "placeholder",
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
        url: 'https://www.google.com/search?q=How+much+should+I+have+for+a+down+payment%3F&oq=How+much+should+I+have+for+a+down+payment%3F',
        label: "How much should I have for a down payment?",
        snippet: "here's a snippet for downpayment",
      },
    ] ,
    canBeCompleted: false,
    currentPath: ['Home Ownership', 'Credit Education'],
    description: "All about owning a home",
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
