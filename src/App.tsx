import "./App.css";
import React from "react";
import Router from "./router/Router";
import GlobalStyles from "../src/components/GlobalStyled";
import { dbService } from "./shared/firebase";

function App() {
  return (
    <>
      <GlobalStyles /> {/* 글로벌 스타일 적용*/}
      <Router />
    </>
  );
}

export default App;
