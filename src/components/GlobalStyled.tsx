// import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    // css 초기값 정의
    /* ${reset}; */

    // 따로 스타일링
    Anything {
        text-decoration:none;
        color:inherit;
    }

    *{
        box-sizing:border-box;
    }

    body{
        background-color: #f2f2f2;
    }
`;

export default globalStyles;
