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
      { id: 'terrible', label: 'Terrible' },
      { id: 'ok', label: 'Fair' },
      { id: 'excellent', label: 'Excellent' },
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
    ] ,
    canBeCompleted: true,
    currentPath: ['Financial Readiness', 'Credit Education'],
    description: "what is credit and stuff",
    parentIds: [],
    isEnabled() {
      return questionsAndAnswers['your_credit_score'] == undefined || questionsAndAnswers['your_credit_score'] == 'dont_know'
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
  {
    id: 'node3',
    label: 'Some Info About Stuff',
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
      {
        url: 'https://www.google.com/search?q=How+much+should+I+have+for+a+down+payment%3F&oq=How+much+should+I+have+for+a+down+payment%3F',
        label: "How much should I have for a down payment?",
        snippet: "here's a snippet for downpayment",
      },
    ] ,
    canBeCompleted: true,
    currentPath: ['Financial Readiness', 'Credit Score'],
    description: "something about credit score",
    parentIds: [],
    isEnabled() {
      return true;
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

  node.parentIds.forEach(parentId => {
    if (completedNodes[parentId]) {
      return true;
    }
  })

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
