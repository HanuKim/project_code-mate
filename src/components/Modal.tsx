import React from "react";
import styled from "styled-components";

export default function Modal() {
  return (
    <ContainerBg>
      <Container modalWidth={650} modalHeight={800}></Container>
    </ContainerBg>
  );
}

interface ModalProps {
  modalWidth: number;
  modalHeight: number;
}

const ContainerBg = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Container = styled.div<ModalProps>`
  width: ${(props) => props.modalWidth + "px"};
  height: ${(props) => props.modalHeight + "px"};
  border: 1px solid #aaa;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f2f2f2;
  box-shadow: 3px 3px 3px black;
`;
