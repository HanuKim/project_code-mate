import React from "react";
import styled from "styled-components";

const AlertModal = ({
  setAlertModal,
  children,
  setOpenModal,
}: {
  children: string;
  setAlertModal: any;
  setOpenModal: any;
}) => {
  const changeModal = () => {
    setAlertModal(false);
    if (children === "로그인 성공! 🎉") {
      setOpenModal(false);
    }
    if (children === "회원가입 완료! 🎉") {
      setOpenModal(false);
    }
  };
  return (
    <Container>
      <Background>
        <ModalBlock>
          <AlerModalText>{children}</AlerModalText>
          <Close onClick={changeModal}>확인</Close>
        </ModalBlock>
      </Background>
    </Container>
  );
};
export default AlertModal;
const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  animation: modal-bg-show 1s;
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 1rem;
  background-color: #f2f2f2;
  width: 300px;
  min-height: 180px;
  box-shadow: 0px 0px 12px #777;
  text-align: center;
`;
const AlerModalText = styled.h3`
  width: 80%;
  margin: 20px 25px;
`;
const Close = styled.button`
  background-color: #262b7f;
  padding: 5px 20px;
  border-radius: 10px;
  color: #fff;
  font-size: 20px;
`;
