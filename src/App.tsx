import "./App.css";
import React from "react";
import Router from "./router/Router";
import GlobalStyles from "../src/components/GlobalStyled";


function App() {
  return (
    <>
      <GlobalStyles /> {/* 글로벌 스타일 적용*/}
      <Router />
    </>
  );
}

export default App;
