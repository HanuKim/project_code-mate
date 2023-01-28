import React from "react";
import styled from "styled-components";
import basicImg from "../img/CodeMate.png";

export default function Footer() {
  return (
    <Container>
      <InfoWrap>Infomation</InfoWrap>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 180px;
  margin-top: 100px;

  position: relative;
  bottom: 0;
  left: 0;

  border-top: 1px solid #262b7f;
  background-color: #262b7f;
`;

const InfoWrap = styled.div`
  width: 160px;
  height: 80px;
  background-image: url(${basicImg});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
`;
