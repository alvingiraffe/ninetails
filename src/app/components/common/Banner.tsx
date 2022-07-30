import React from 'react';
import styled from 'styled-components';

const BannerImg = styled.img`
  max-width: 100%;
`;

export interface BannerProps {}

export const Banner: React.FC<BannerProps> = () => {
  return <BannerImg src="banner.jpg" alt="HouseGo" />;
};
