// import { doNetworkRequest } from './util';

interface Option {
  id: string;
  label: string;
}

interface Link {
  url: string;
  label: string;
}

export interface Question {
  id: string;
  question: string;
  options: Option[];
  links?: Link[];
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
    links: [
      { url: 'https://www.google.com/search?q=What%27s+a+credit+score%3F&oq=What%27s+a+credit+score%3F', label: "What's a credit score?" },
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
    links: [
      { url: 'https://www.google.com/search?q=How+much+should+I+have+for+a+down+payment%3F&oq=How+much+should+I+have+for+a+down+payment%3F', label: "How much should I have for a down payment?" },
    ],
  },
];

const getQ = (questionId: number): Question => ({
    ...questions[questionId],
    links: Math.random() >= .5 ? undefined : questions[questionId]?.links,
});

export const getQuestion = async (questionId: string): Promise<Question> => {
  // TODO mock
  return getQ(parseInt(questionId, 10)) ?? getQ(0);
};

export const submitAnswer = async (questionId: string, answer: string): Promise<Question> => {
  // TODO mock
  return getQ((parseInt(questionId, 10) + 1) % questions.length);
};
