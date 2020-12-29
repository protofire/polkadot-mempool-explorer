import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.span`
  align-items: center;
  display: flex;

  &:hover {
    .fillColor {
      fill: ${(props) => props.theme.colors.darkestGray};
    }
    .text {
      color: ${(props) => props.theme.colors.darkestGray};
    }
  }
`

const LogoSVG = styled.svg`
  height: 35px;
  width: 35px;

  .fillColor {
    fill: ${(props) => props.theme.colors.primary};
    transition: fill 0.15s linear;
  }
`

const Text = styled.span`
  display: none;

  @media (min-width: ${(props) => props.theme.themeBreakPoints.md}) {
    color: ${(props) => props.theme.colors.primary};
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    margin-left: 10px;
    text-decoration: none;

    .text {
      transition: color 0.15s linear;
    }
  }
`

const TextTop = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: -2px;
`

const TextBottom = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;
`

export const Logo: React.FC = (props) => {
  return (
    <Wrapper {...props}>
      <LogoSVG viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <path className="fillColor" d="M10.53,500v0Z" />
        <path
          className="fillColor"
          d="M688.7,729.52c-112.84,0-205.17-89.35-210-201H11.38c14.76,257.19,228,461.2,488.85,461.2s474.08-204,488.85-461.2H898.74C893.87,640.17,801.54,729.52,688.7,729.52Z"
        />
        <path
          className="fillColor"
          d="M317.54,270.48c115.53,0,209.58,93.67,210.24,209H989.47C978.73,218.58,763.82,10.3,500.23,10.3S21.72,218.58,11,479.53H107.3C108,364.15,202,270.48,317.54,270.48Z"
        />
        <path
          className="fillColor"
          d="M688.7,680.55c85.83,0,156.2-67.4,161-152h-322C532.5,613.15,602.87,680.55,688.7,680.55Z"
        />
        <path
          className="fillColor"
          d="M317.54,319.45c-88.53,0-160.61,71.71-161.27,160.08H478.81C478.15,391.16,406.07,319.45,317.54,319.45Z"
        />
      </LogoSVG>
      <Text>
        <TextTop className="text">Conditional Tokens</TextTop>
        <TextBottom className="text">Explorer And Factory</TextBottom>
      </Text>
    </Wrapper>
  )
}
