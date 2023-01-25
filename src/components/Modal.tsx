import React, { useState, useEffect, PropsWithChildren } from "react";
import styled from "styled-components";
import LoginForm from "../pages/LoginForm";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) {
  // 모달창 떴을 때 스크롤 방지, 인풋창 초기화
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return createPortal(
    <ModalContainer>
      <Container modalWidth={350} modalHeight={400}>
        <LoginForm />
      </Container>
      <ContainerBg
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      ></ContainerBg>
    </ModalContainer>,
    document.getElementById("modal-root")
  );
}

interface ModalProps {
  modalWidth: number;
  modalHeight: number;
}

const ModalContainer = styled.div``;

const ContainerBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Container = styled.div<ModalProps>`
  width: ${(props) => props.modalWidth + "px"};
  height: ${(props) => props.modalHeight + "px"};
  border: 1px solid #aaa;
  border-radius: 15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f2f2f2;
  box-shadow: 3px 3px 5px black;
  align-items: center;
  z-index: 2;
`;

export default Modal;
