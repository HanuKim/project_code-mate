import {createGlobalStyle} from 'styled-components';

const globalStyles = createGlobalStyle`

    * {
        box-sizing:border-box;
        font-family: 'Noto Sans KR', sans-serif;
        font-weight: 500;
        text-decoration : none;
        box-shadow:none;
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
    button, label {
        background: inherit;
        border:none;
        border-radius:0;
        padding:0;
        overflow:visible;
        cursor:pointer
    }
    input, textarea {
        background: inherit;
        border:none;
        border-radius:0;
        margin :0;
        padding:0;
        outline : none;
    }

`;

export default globalStyles;
