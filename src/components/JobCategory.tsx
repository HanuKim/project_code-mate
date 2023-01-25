import React from "react";
import styled from "styled-components";

export default function JobCategory() {
  return (
    <Container>
      <JobBar>백엔드</JobBar>
      <JobBar>프론트엔드</JobBar>
      <JobBar>UX/UI</JobBar>
      <JobBar>웹 디자이너</JobBar>
      <JobBar>퍼블리셔</JobBar>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  position: absolute;
  bottom: 30px;
  left: 30px;
`;

const JobBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 30px;

  border: 1px solid #d0d0d0;
  border-radius: 50px;
  background-color: #f2f2f2;

  color: #909090;
  font-size: 14px;

  cursor: pointer;
  transition-duration : .3s;
  &:hover {
    color: #f2f2f2;
    background-color #262b7f;
  };
`;
