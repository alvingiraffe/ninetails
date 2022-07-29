import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestion, Question, submitAnswer } from '../api/question';
import { Flexbox } from './layout/Flexbox';
import styled from 'styled-components';
import { Select } from './Select';
import { Line } from './common/Line';
import { makePropToggle } from './utils';

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
  color: #efefef;
`;

const Link = styled.a`
  padding: 1rem 0;
`;

interface QuestionParams {
  questionId: string;
  [key: string]: string;
}

export interface QuestionProps {}
export const QuestionComponent: React.FC<QuestionProps> = () => {
  const { questionId } = useParams<QuestionParams>() as QuestionParams;

  const [question, setQuestion] = useState<Question>();
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    getQuestion(questionId).then(res => setQuestion(res));
  }, [questionId, setQuestion]);

  const onSelect = useCallback((id: string) => setSelected(id), [setSelected]);

  const onSubmit = useCallback(async () => {
    if (selected) {
      const nextQuestion = await submitAnswer(question!.id, selected);
      window.location.href = `/questions/${nextQuestion.id}`;
      // then redirect
    }
  }, [question, selected]);

  if (!question) return <div>Loading...</div>;

  const selectOptions = question.options.map(o => ({
    ...o,
    selected: o.id === selected,
  }));

  const links = (question.links ?? []).map(l => <Link href={l.url} key={l.label}>{l.label}</Link>);

  return (
    <Flexbox justifyContent="center">
      <Flexbox direction="column" textAlign="center" alignItems="center">
        <QuestionText>{question.question}</QuestionText>
        <Select options={selectOptions} onSelect={onSelect}></Select>
        <SubmitButton enabled={!!selected} onClick={onSubmit}>Submit</SubmitButton>
        {links.length > 0 && (
          <>
            <Line />
            {links}
          </>
        )}
      </Flexbox>
    </Flexbox>
  );
};
