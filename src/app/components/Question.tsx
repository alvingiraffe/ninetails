import React, { useCallback, useEffect, useState } from 'react';
import { completeNode, currentNode, Node, submitAnswer } from '../api/question';
import { Flexbox } from './layout/Flexbox';
import styled from 'styled-components';
import { Select } from './Select';
import { Line } from './common/Line';
import { Banner } from './common/Banner';

const NodeLabel = styled.h1`
`;

const Breadcrumb = styled.p`
  margin-top: -1rem;
  font-size: .75rem;
`;

const NodeDescription = styled.p`
  max-width: 300px;
`;

const QuestionText = styled.h2`
`;

const RelatedArticlesHeader = styled.h2`
`;

const ArticleHeader = styled.a`
  font-size: 1.15rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const ArticleSnippet = styled.p`
  max-width: 300px;
`;

const CompleteButton = styled.button`
  width: 120px;
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
  const [firstPage, setFirstPage] = useState(true);

  useEffect(() => {
    setNode(currentNode());
  }, []);

  const onSelect = useCallback((id: string) => {
    const nextNode = submitAnswer(node!.question!.id, id);
    if (nextNode.id !== node?.id) {
      setFirstPage(false);
    }
    setNode(nextNode);
  }, [node]);

  const onComplete = useCallback(() => {
    if (node?.canBeCompleted) {
      const nextNode = completeNode(node.id);
      if (nextNode.id !== node?.id) {
        setFirstPage(false);
      }
      setNode(nextNode);
    }
  }, [node]);

  if (!node) return <div>Loading...</div>;

  const selectOptions = node.question?.options.map(o => ({
    ...o,
  }));

  const articles = (node.articles ?? []).map(article => (
    <Flexbox marginTop='1rem' direction='column' alignItems='flex-start' key={article.label}>
      <ArticleHeader href={article.url}>{article.label}</ArticleHeader>
      <ArticleSnippet>{article.snippet}</ArticleSnippet>
    </Flexbox>
  ));

  return (
    <Flexbox justifyContent="center" direction="column" alignItems="center">
      <Flexbox direction="column" textAlign="center" alignItems="center" width="500px" maxWidth="100%">
        {firstPage && <Banner />}
        <NodeLabel>{node.label}</NodeLabel>
        <Breadcrumb>{node.currentPath.join(' > ')}</Breadcrumb>
        <NodeDescription>{node.description}</NodeDescription>
        <Line />
        {!!node.question &&
          <>
            <QuestionText>{node.question.question}</QuestionText>
            <Select options={selectOptions!} onSelect={onSelect}></Select>
          </>
        }
        {!!node.question && articles.length > 0 &&
          <Line />
        }
        {articles.length > 0 && (
          <>
            <RelatedArticlesHeader>Related Articles</RelatedArticlesHeader>
            <Flexbox direction="column" alignItems='flex-start' width='80%'>
              {articles}
            </Flexbox>
          </>
        )}
        {node.canBeCompleted &&
          <CompleteButton onClick={onComplete}>What's Next?</CompleteButton>
        }
      </Flexbox>
    </Flexbox>
  );
};
