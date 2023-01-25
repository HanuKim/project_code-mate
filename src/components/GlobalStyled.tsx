// import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`


    * {
        color: #333;
        box-sizing:border-box;
    }
    
    body {
        background-color : #e0e0e0;
        font-family: 'Noto Sans KR', sans-serif;
        letter-spacing : -0.01em;
        line-height :1.5;
    }

`;

export default globalStyles;
