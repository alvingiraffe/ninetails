import React, { useCallback, useEffect, useState } from 'react';
import { completeNode, currentNode, Node, submitAnswer } from '../api/question';
import { Flexbox } from './layout/Flexbox';
import styled from 'styled-components';
import { Select } from './Select';
import { Line } from './common/Line';
import { makePropToggle } from './utils';

const NodeLabel = styled.h1`
`;

const Breadcrumb = styled.p`
  margin-top: -1rem;
  font-size: .75rem;
`;

const NodeDescription = styled.p`
`;

const QuestionText = styled.h2`
`;

interface SubmitButtonProps {
  enabled: boolean;
}

const submitProp = makePropToggle<SubmitButtonProps>();

const SubmitButton = styled.button`
  width: fit-content;
  margin: 2rem 0rem;
  border: 1px solid #333;
  border-radius: 1rem;
  padding: .5rem 1rem;
  background-color: ${submitProp('enabled', '#396cf7', '#efefef')};
  color:${submitProp('enabled', '#efefef', '#464646')};
`;

const Link = styled.a`
`;

const ArticleSnippet = styled.p`
`;

const CompleteButton = styled.button`
  width: fit-content;
  margin: 2rem 0rem;
  border: 1px solid #333;
  border-radius: 1rem;
  padding: .5rem 1rem;
  background-color: #396cf7;
  color: #efefef;
`;

export interface QuizComponentProps {}
export const QuizComponent: React.FC<QuizComponentProps> = () => {
  const [node, setNode] = useState<Node>();
  // const [question, setQuestion] = useState<Question>();
  const [selected, setSelected] = useState<string | null>();

  useEffect(() => {
    setNode(currentNode());
  }, []);

  const onSelect = useCallback((id: string) => setSelected(id), [setSelected]);

  const onSubmit = useCallback(() => {
    if (selected) {
      const nextNode = submitAnswer(node!.question!.id, selected);
      setNode(nextNode);
      setSelected(null);
    }
  }, [node, selected]);

  const onComplete = useCallback(() => {
    if (node?.canBeCompleted) {
      const nextNode = completeNode(node.id);
      setNode(nextNode);
      setSelected(null);
    }
  }, [node]);

  if (!node) return <div>Loading...</div>;

  const selectOptions = node.question?.options.map(o => ({
    ...o,
    selected: o.id === selected,
  }));

  const articles = (node.articles ?? []).map(article => (
    <Flexbox marginTop='1rem' direction='column' alignItems='center' key={article.label}>
      <Link href={article.url}>{article.label}</Link>
      <ArticleSnippet>{article.snippet}</ArticleSnippet>
    </Flexbox>
  ));

  return (
    <Flexbox justifyContent="center">
      <Flexbox direction="column" textAlign="center" alignItems="center">
        <NodeLabel>{node.label}</NodeLabel>
        <Breadcrumb>{node.currentPath.join(' > ')}</Breadcrumb>
        <NodeDescription>{node.description}</NodeDescription>
        <Line />
        {!!node.question &&
          <>
            <QuestionText>{node.question.question}</QuestionText>
            <Select options={selectOptions!} onSelect={onSelect}></Select>
            <SubmitButton enabled={!!selected} onClick={onSubmit}>Submit</SubmitButton>
          </>
        }
        {!!node.question && articles.length > 0 &&
          <Line />
        }
        {articles.length > 0 && (
          <>
            {articles}
          </>
        )}
        {node.canBeCompleted &&
          <CompleteButton onClick={onComplete}>What's Next?</CompleteButton>
        }
      </Flexbox>
    </Flexbox>
  );
};
