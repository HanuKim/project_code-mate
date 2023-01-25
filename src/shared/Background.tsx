import React, { Children } from "react";
import styled from "styled-components";

export default function Background() {
  return <Container></Container>;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: red;
`;
