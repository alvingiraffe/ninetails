// import { doNetworkRequest } from './util';

interface Answer {
  id: string;
  label: string;
}

interface Link {
  url: string;
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

  isEnabled(): boolean;
}

export interface Question {
  id: string;
  question: string;
  options: Answer[];
}

const questions: Question[] = [
  {
    id: '0',
    question: "What's your credit score?",
    options: [
      { id: 'good', label: 'Good' },
      { id: 'bad', label: 'Bad' },
      { id: 'unknown', label: 'I dunno' },
      { id: 'long', label: 'some really long option... some really long option... some really long option... ' },
    ],
  },
  {
    id: '1',
    question: "Do you have a down payment?",
    options: [
      { id: 'yes', label: 'Oh yeah! :koolaid:' },
      { id: 'no', label: 'Heck naw.' },
      { id: 'unknown', label: 'How would I know?' },
    ],
  },
];

const nodes: Node[] = [
  {
    id: 'node1',
    label: 'Credit Score',
    question: questions[0],
    articles: [
      {
        url: 'https://www.google.com/search?q=What%27s+a+credit+score%3F&oq=What%27s+a+credit+score%3F',
        label: "What's a credit score?",
        snippet: "here's a snippet for credit score",
      },
    ] ,
    canBeCompleted: false,
    currentPath: ['Financial Readiness', 'Credit Score'],
    description: "something about credit score",
    isEnabled() {
      return true;
    },
  },
  {
    id: 'node2',
    label: 'Downpayment',
    question: questions[1],
    articles: [
      {
        url: 'https://www.google.com/search?q=How+much+should+I+have+for+a+down+payment%3F&oq=How+much+should+I+have+for+a+down+payment%3F',
        label: "How much should I have for a down payment?",
        snippet: "here's a snippet for downpayment",
      },
    ] ,
    canBeCompleted: false,
    currentPath: ['Financial Readiness', 'Downpayment'],
    description: "something about downpayment",
    isEnabled: () => true,
  },
];

let nodeIndex = 0;

const questionsAndAnswers: Record<string, string> = {};
const completedNodes: Record<string, boolean> = {};

export function currentNode(): Node {
  return nodes[0];
}

export function submitAnswer(questionId: string, answerId: string): Node {
  questionsAndAnswers[questionId] = answerId;
  return nodes[(++nodeIndex) % nodes.length];
  // const node = {
  //   ...nodes[(++nodeIndex) % nodes.length],
  //   question: undefined,
  // };
  // return node;
}

export function completeNode(nodeId: string): Node {
  completedNodes[nodeId] = true;
  return nodes[(++nodeIndex) % nodes.length];
}
