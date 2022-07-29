import React from 'react';
import styled from 'styled-components';
import { Box } from './layout/Box';
import { makePropToggle } from './utils';

interface OptionProps {
  selected?: boolean;
}

const prop = makePropToggle<OptionProps>();

const Option = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid #333;
  border-radius: 1rem;
  padding: .5rem 1rem;
  background-color: ${prop('selected', '#c3e4ff', '#fff')};
  margin-bottom: 1rem;
`;

interface SelectOption {
  id: string;
  label: string;
  selected?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  onSelect: (id: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  options,
  onSelect,
}: SelectProps) => {
  const os = options.map(o => (
    <Option selected={o.selected} key={o.id} onClick={() => onSelect(o.id)}>
      {o.label}
    </Option>
  ));

  return <Box width="100%">{os}</Box>;
};
