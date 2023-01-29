import React, { Children, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  DocumentData,
  Timestamp,
  limit,
  QuerySnapshot,
  where,
} from 'firebase/firestore';
import { dbService } from '../../shared/firebase';
import styled from 'styled-components';
import {
  ContainerBg,
  Container,
  TellText,
  CheckButtonContainer,
  CheckButton,
} from './DeleteModal';

export default function MypageUploadModal({
  setCheckImageModal,
}: {
  setCheckImageModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const closeModal = () => {
    setCheckImageModal(false);
  };
  return (
    <ContainerBg>
      <Container>
        <TellText>Upload 완료되었습니다.</TellText>
        <CheckButtonContainer>
          <CheckButton onClick={closeModal}>확인</CheckButton>
        </CheckButtonContainer>
      </Container>
    </ContainerBg>
  );
}
