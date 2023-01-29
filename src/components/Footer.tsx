import React from "react";
import { Navigate, Route } from "react-router-dom";
import styled from "styled-components";
import basicImg from "../img/CodeMate.png";

export default function Footer() {
  return (
    <Container>
      <InnerContainer>
        <InfoWrap />
        {/* Contributor 내용 넣기 */}

        {/* github 링크 */}
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 180px;
  margin-top: 100px;
  /* box-shadow: 1px -1px 3px #333; */
  background-color: #f2f2f2;
`;

const InnerContainer = styled.div`
  position: relative;
  max-width: 1280px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #ffffff;
`;

const InfoWrap = styled.div`
  width: 120px;
  height: 80px;
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  background-image: url(${basicImg});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
`;

// const Button = styled.button``;

// const LinkGit = styled.div`

// `

// const ContributorContainer = styled.div``;
