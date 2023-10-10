import * as React from "react";
import {useEffect, useState} from "react";
import styled from "styled-components";

const Rect = styled.button`
    transition: fill 0.2s;
     &:hover {
        fill: #013B70; 
    }
     &:active {
        fill: #013B70; 
    }
   
    
`;
const Path = styled.path`
    fill: #d9d9d9; // 기본 색상
    transition: fill 0.2s; // 색상 변화를 부드럽게 만들기 위한 트랜지션

    &:hover {
        fill: #013B70; // 호버 시 변경하고 싶은 색상
    }
`;

const Promotion_map = ({onClick}) => {
  const [hallId, setHallId]=useState(null);


  useEffect(()=>{
    onClick(hallId);
  },[hallId])

  const handleClick = (event) => {
    const clickedElementId = event.target.id;
    setHallId(clickedElementId);

  };
  return (
      <svg
          viewBox="0 0 815 528"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...onClick}
          onClick={handleClick}
      >
        <Rect as="rect"
              x={244.17}
              y={27.8761}
              width={66.1104}
              height={38.0104}
              transform="rotate(25.1765 244.17 27.8761)"
              fill="#D9D9D9"
              id="I"

        />
        <Rect as="rect"
              x={311.832}
              y={58.7425}
              width={83.1098}
              height={40.092}
              transform="rotate(21.1676 311.832 58.7425)"
              fill="#D9D9D9"
              id="P"
        />
        <Rect as="rect"
              x={284.857}
              y={105}
              width={79}
              height={34}
              transform="rotate(18.6227 284.857 105)"
              fill="#D9D9D9"
              id="H"
        />
        <g>
          <Path
              id="C"
              d="m 607,184 h 26 v 53 h -26 z m 79,-39 h 30 v 133 h -30 z m -124,39 h 136 v 33 H 562 Z"
          />
        </g>
        <Rect as="rect" x={733} y={176} width={29} height={78} fill="#D9D9D9" id="D"/>
        <Rect as="rect" x={372} y={227} width={108} height={35} fill="#D9D9D9" id="MH"/>
        <Rect as="rect"
              x={500.872}
              y={395.79}
              width={35}
              height={93}
              transform="rotate(-10.345 500.872 395.79)"
              fill="#D9D9D9"
              id="T"
        />
        <Rect as="rect" x={459} y={344} width={57} height={33} fill="#D9D9D9" id="S" />
        <Rect as="rect" x={389} y={303} width={109} height={26} fill="#D9D9D9" id="Z1"/>
        <Rect as="rect" x={480} y={139} width={46} height={41} fill="#D9D9D9" id="U"/>
        <Rect as="rect" x={498} y={236} width={175} height={26} fill="#D9D9D9" id="A"/>
        <Rect as="rect" x={516} y={182} width={25} height={89} fill="#D9D9D9" id="B"/>
        <Rect as="rect"
              x={174.362}
              y={157}
              width={38.6138}
              height={177.864}
              transform="rotate(34.7421 174.362 157)"
              fill="#D9D9D9"
              id="K"
        />
        <Path
            id="Z4"
            d="m 389,458 h 112 v 26 H 389 Z m 0,-88 h 28 v 114 h -28 z"
        />
        <Rect as="rect"
              x={541.412}
              y={396.022}
              width={27.7231}
              height={97.3946}
              transform="rotate(-10.4367 541.412 396.022)"
              fill="#D9D9D9"
              id="Z3"
        />
        <Path
            id="Z2"
            transform="rotate(-9.05753 532.604 337.059)"
            d="m 532.604,337.05899 h 26.4272 v 56.4006 H 532.604 Z m 0.31464,-0.58879 146.62604,-1.52769 0.28706,27.5521 -146.62604,1.52769 z"
        />
        <Path
            id="M"
            transform="matrix(0.959232 0.282621 -0.297995 0.954567 173.741 462.759)"
            d="M 0,0 H 82.5411 V 15.908 H 0 Z M -0.49914971,-51.443146 103.43591,-51.376607 103.36927,1.0906892 -0.56578664,1.0241501 Z"
        />
        <Path
            id="L"
            transform="rotate(24.8205 214.136 128)"
            d="m 214.136,128 h 36 v 17 h -36 z m 12.14671,-52.657299 21.3951,0.609952 -1.89742,66.555257 -21.3951,-0.60995 z m 3.53024,45.231539 41.99541,0.62086 -0.699,47.28073 -41.99541,-0.62086 z"
        />
        <Path
            id="J"
            transform="rotate(27.6142 203.156 104.933)"
            d="m 203.15601,104.933 h 15.3418 v 25 h -15.3418 z m -0.67788,-34.580613 22.30819,-0.313566 0.66099,47.024849 -22.3082,0.31357 z"
        />
        <Rect as="rect" x={445} y={189} width={61} height={33} fill="#D9D9D9" id="E"/>
        <Path
            id="Q"
            d="m 339.397,164 h 55.3378 v 33.7898 H 339.397 Z m 16.86885,-27.75277 38.65991,0.26336 -0.4157,61.02328 -38.65991,-0.26335 z"
            transform="rotate(19.0408 339.397 164)"
        />
        <Path
            id="G"
            d="m 289.63901,141.681 h 29 v 69.4659 h -29 z m -11.41694,42.23256 103.18082,-0.49344 0.13498,28.22508 -103.18082,0.49343 z"
            transform="rotate(19.8947 289.639 141.681)"
        />
        <Path
            id="R"
            d="M -45.218329 11.261575 L -45.21773 53.805969 L -0.00059213439 53.805947 L -0.00039105698 66.0249 C -17.969428 64.461396 -35.082878 62.464904 -46.015792 60.969479 L -43.38038 95.988445 C -32.176966 98.000779 -3.5785063 102.47849 21.183476 104.28837 C 45.946121 106.09902 103.79958 96.530594 129.63157 91.520329 L 118.59714 61.078854 C 111.0107 62.177403 89.098694 65.052709 62.138132 67.764971 C 55.50417 68.432343 47.078295 68.5607 37.790683 68.331433 L 37.789891 53.80636 L 46.763737 53.805655 L 46.763138 11.261261 L 37.790882 11.260864 L 37.790643 -0.00040853996 L 0.00015990644 -0.00082135131 L 0.00039862067 11.260451 L -45.218329 11.261575 z "
            transform="matrix(0.825487 0.564421 -0.581206 0.813756 109.599 332.358)"
        />
        <Path
            id="F"
            d="m 401,192 h 27 v 18 h -27 z m -1,-29 h 40 v 38 h -40 z m 5,-26 h 31 v 90 h -31 z m -8,70 h 45 v 14 h -45 z m 9,-71 h 67 v 21 h -67 z m 12,-8 a 17,17 0 0 1 -17,17 17,17 0 0 1 -17,-17 17,17 0 0 1 17,-17 17,17 0 0 1 17,17 z"

        />
      </svg>
  );

};
export default Promotion_map;
