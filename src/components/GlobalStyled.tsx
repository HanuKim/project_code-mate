// import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`


    * {
        box-sizing:border-box;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 500;
        text-decoration : none;
    }
    
    body {
        width : 100%;
        height : 100%;

        position: relative;

        background-color : #e0e0e0;

        letter-spacing : -0.01em;
        line-height :1.5;
        color: #333;
    }

`;

export default globalStyles;
