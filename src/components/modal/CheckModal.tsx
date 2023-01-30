import React from 'react';

import {
  ContainerBg,
  Container,
  TellText,
  CheckButtonContainer,
  CheckButton,
} from './DeleteModal';

export default function CheckModal({
  setCheckViewModal,
}: {
  setCheckViewModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const closeModal = () => {
    setCheckViewModal(false);
  };
  return (
    <ContainerBg>
      <Container>
        <TellText>내용을 입력해주세요.</TellText>
        <CheckButtonContainer>
          <CheckButton onClick={closeModal}>확인</CheckButton>
        </CheckButtonContainer>
      </Container>
    </ContainerBg>
  );
}
