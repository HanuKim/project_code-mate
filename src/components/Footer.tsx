import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <>
      <Container>
        <InfoWrap>
          <InfoWrap>Information</InfoWrap>
        </InfoWrap>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 180px;
  margin-top: 100px;
  border-top: 1px solid #262b7f;
  background-color: #262b7f;
`;

const InfoWrap = styled.div`
  max-width: 300px;
  width: 100%;
  height: 100px;
  color: white;

  /* background-color: white; */
`;
