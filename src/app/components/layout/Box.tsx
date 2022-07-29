import styled from 'styled-components';
import { makePropGetter } from '../utils';

export interface BoxProps {
  height?: string;
  width?: string;
}

const prop = makePropGetter<BoxProps>();

export const Box = styled.div<BoxProps>`
  height: ${prop('height', '')};
  width: ${prop('width', '')};
`;
