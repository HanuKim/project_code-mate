import React, {useState, PropsWithChildren} from 'react';
import styled from 'styled-components';
import LoginForm from '../pages/LoginForm';
import SignUpForm from '../pages/SignUpForm';
import {useNavigate} from 'react-router-dom';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  const [isNotLogin, setIsNotLogin] = useState(false);
  return (
    <ModalContainer>
      <Container modalWidth={350} modalHeight={400}>
        {/* isNotLogin이 true이면 회원가입 모달으로 / false면 로그인 모달으로 */}
        {isNotLogin ? (
          <SignUpForm setIsNotLogin={setIsNotLogin} />
        ) : (
          <LoginForm setIsNotLogin={setIsNotLogin} />
        )}
      </Container>
      <ContainerBg
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      ></ContainerBg>
    </ModalContainer>
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
  width: ${(props) => props.modalWidth + 'px'};
  height: ${(props) => props.modalHeight + 'px'};
  border: 1px solid #aaa;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f2f2f2;
  box-shadow: 3px 3px 5px black;
  align-items: center;
  z-index: 2;
`;

export default Modal;
