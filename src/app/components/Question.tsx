import React, { useCallback, useEffect, useState } from 'react';
import { currentNode, Node, submitAnswer } from '../api/question';
import { Flexbox } from './layout/Flexbox';
import styled from 'styled-components';
import { Select } from './Select';
import { Line } from './common/Line';
import { makePropToggle } from './utils';
// import { TypeReveal } from './common/TypeReveal';

const QuestionText = styled.h1`
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
  padding: 1rem 0;
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

  if (!node) return <div>Loading...</div>;
  if (!node.question) return <div>haven't implemented node without question</div>;

  const selectOptions = node.question.options.map(o => ({
    ...o,
    selected: o.id === selected,
  }));

  const articles = (node.articles ?? []).map(l => <Link href={l.url} key={l.label}>{l.label}</Link>);

  return (
    <Flexbox justifyContent="center">
      <Flexbox direction="column" textAlign="center" alignItems="center">
        <QuestionText>{node.question.question}</QuestionText>
        {/* <TypeReveal text={question.question} /> */}
        <Select options={selectOptions} onSelect={onSelect}></Select>
        <SubmitButton enabled={!!selected} onClick={onSubmit}>Submit</SubmitButton>
        {articles.length > 0 && (
          <>
            <Line />
            {articles}
          </>
        )}
      </Flexbox>
    </Flexbox>
  );
};
