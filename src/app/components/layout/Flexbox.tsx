import styled from 'styled-components';
import { makePropGetter } from '../utils';

type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type JustifyContent =
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'start'
    | 'end'
    | 'left'
    | 'right';
type TextAlign = 'left' | 'right' | 'center' | 'justify';
type AlignItems =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end';
type AlignSelf =
  | 'auto'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch';

export interface FlexboxProps {
  direction?: Direction;
  justifyContent?: JustifyContent;
  height?: string;
  width?: string;
  textAlign?: TextAlign;
  alignItems?: AlignItems;
  marginTop?: string;
  maxWidth?: string;
  minWidth?: string;
  alignSelf?: AlignSelf;
}

const prop = makePropGetter<FlexboxProps>();

export const Flexbox = styled.div<FlexboxProps>`
  display: flex;
  flex-direction: ${prop('direction', 'row')};
  justify-content: ${prop('justifyContent', 'flex-start')};
  height: ${prop('height', '')};
  max-width: ${prop('maxWidth', '')};
  min-width: ${prop('minWidth', '')};
  width: ${prop('width', '')};
  text-align: ${prop('textAlign', 'left')};
  align-items: ${prop('alignItems', 'stretch')};
  margin-top: ${prop('marginTop', '0px')};
  align-self: ${prop('alignSelf', 'auto')};
`;
