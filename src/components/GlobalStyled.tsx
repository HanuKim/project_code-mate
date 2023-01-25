// import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`


    * {
        box-sizing:border-box;
    }
    
    body {
        color: #333;
        background-color : #e0e0e0;
        font-family: 'Noto Sans KR', sans-serif;
        letter-spacing : -0.01em;
        line-height :1.5;
        width : 100%;
        height : 100%;
        position: relative;
    }

`;

export default globalStyles;
