import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  .prefix__cls-1 {
    fill: #131f3e;
  }
`

export const Protofire: React.FC<{ className?: string }> = (props) => (
  <Wrapper
    className={`protofire ${props.className}`}
    height="22"
    viewBox="0 0 89.987 22"
    width="89.987"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient
        gradientUnits="objectBoundingBox"
        id="prefix__linear-gradient"
        x1=".275"
        x2=".724"
        y1=".945"
        y2=".053"
      >
        <stop offset="0" stopColor="#f54703" />
        <stop offset="1" stopColor="#fac902" />
      </linearGradient>
    </defs>
    <g id="prefix__Protofire_Logo" transform="translate(4.978 .012)">
      <path
        className="prefix__cls-1"
        d="M172.595 97.258a.816.816 0 01-.838-.849v-6.042a.822.822 0 01.849-.849h2.086a2.582 2.582 0 012.883 2.548 2.608 2.608 0 01-2.883 2.56h-1.261v1.784a.816.816 0 01-.836.849zm.838-4.039h1.274a1.147 1.147 0 100-2.294h-1.274z"
        id="prefix__Path_1"
        transform="translate(-153.487 -82.848)"
      />
      <path
        className="prefix__cls-1"
        d="M219.571 97.257a.861.861 0 01-.762-.429l-1.47-2.205h-1.409v1.784a.838.838 0 11-1.674 0v-6.041a.822.822 0 01.854-.849h2.09a2.578 2.578 0 012.883 2.535 2.42 2.42 0 01-.995 2.005l-.164.121 1.173 1.658a1.22 1.22 0 01.254.681.778.778 0 01-.78.74zm-3.639-4.039h1.274a1.147 1.147 0 100-2.294h-1.274z"
        id="prefix__Path_2"
        transform="translate(-188.329 -82.848)"
      />
      <path
        className="prefix__cls-1"
        d="M260.651 96.588a3.948 3.948 0 114.126-3.944 3.981 3.981 0 01-4.126 3.944zm.013-6.382a2.44 2.44 0 102.391 2.44 2.312 2.312 0 00-2.392-2.44z"
        id="prefix__Path_3"
        transform="translate(-223.004 -82.178)"
      />
      <path
        className="prefix__cls-1"
        d="M311.108 97.26a.816.816 0 01-.838-.849v-5.423h-1.77a.734.734 0 010-1.468h5.225a.734.734 0 110 1.468h-1.773v5.423a.816.816 0 01-.843.849z"
        id="prefix__Path_4"
        transform="translate(-264.991 -82.851)"
      />
      <path
        className="prefix__cls-1"
        d="M354.531 96.588a3.948 3.948 0 114.126-3.944 3.981 3.981 0 01-4.126 3.944zm.013-6.382a2.44 2.44 0 102.391 2.44 2.312 2.312 0 00-2.392-2.44z"
        id="prefix__Path_5"
        transform="translate(-299.969 -82.178)"
      />
      <path
        className="prefix__cls-1"
        d="M407.423 97.258a.807.807 0 01-.838-.849v-6.042a.822.822 0 01.849-.849h3.549a.734.734 0 110 1.468h-2.724v1.942h2.086a.734.734 0 010 1.468h-2.086v2.014a.807.807 0 01-.836.847z"
        id="prefix__Path_6"
        transform="translate(-346.006 -82.849)"
      />
      <path
        className="prefix__cls-1"
        d="M445.533 96.469a.807.807 0 01-.838-.849v-6.189a.838.838 0 111.674 0v6.187a.807.807 0 01-.836.85z"
        id="prefix__Path_7"
        transform="translate(-377.249 -82.059)"
      />
      <path
        className="prefix__cls-1"
        d="M472.023 97.258a.861.861 0 01-.76-.429l-1.47-2.205h-1.413v1.784a.838.838 0 11-1.674 0v-6.041a.822.822 0 01.849-.849h2.086a2.578 2.578 0 012.883 2.535 2.42 2.42 0 01-.995 2.005l-.164.121 1.173 1.658a1.22 1.22 0 01.254.681.778.778 0 01-.769.74zm-3.643-4.039h1.274a1.147 1.147 0 100-2.294h-1.274z"
        id="prefix__Path_8"
        transform="translate(-395.295 -82.848)"
      />
      <path
        className="prefix__cls-1"
        d="M513.137 97.112a.822.822 0 01-.849-.849v-5.9a.822.822 0 01.849-.849h3.658a.734.734 0 010 1.468h-2.84V92.5h1.885a.668.668 0 010 1.335h-1.885v1.8h2.985a.734.734 0 010 1.468z"
        id="prefix__Path_9"
        transform="translate(-432.664 -82.848)"
      />
      <circle
        cx="2.607"
        cy="2.607"
        fill="#f54703"
        id="prefix__Ellipse_1"
        r="2.607"
        transform="rotate(-63.09 13.498 13.869)"
      />
      <path
        d="M48.755 56.684a7.949 7.949 0 001.575 9.43.721.721 0 001-.011 3.912 3.912 0 00.877-4.221 3.91 3.91 0 114.5 2.285 3.912 3.912 0 00-2.9 3.194.721.721 0 00.582.814 7.947 7.947 0 004.96-14.933 8.074 8.074 0 00-10.594 3.442z"
        fill="url(#prefix__linear-gradient)"
        id="prefix__Path_10"
        transform="translate(-51.912 -52.45)"
      />
    </g>
  </Wrapper>
)
