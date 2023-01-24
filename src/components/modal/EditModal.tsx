import React, {Children, useState} from 'react';
import {useDispatch} from 'react-redux';
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
import {dbService} from '../../shared/firebase';
import styled from 'styled-components';
import {
  ContainerBg,
  Container,
  TellText,
  CheckButtonContainer,
  CheckButton,
} from './DeleteModal';

export default function EditModal({
  setEditViewModal,
  comment,
  editText,
  setEditComments,
  editComments,
  setEditText,
}: {
  setEditViewModal: any;
  comment: any;
  editText: any;
  setEditComments: any;
  editComments: any;
    setEditText: any;
}) {
  const closeModal = () => {
    setEditViewModal(false);
  };

  const [empty, setEmpty] = useState(false);

  const submitEditText = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (editText === '') {
      setEmpty(true);
      return;
    } else {
      const commentRef = doc(dbService, 'comment', comment.id);
      await updateDoc(commentRef, {
        commentText: editText,
      });
      setEditComments({...editComments, isEdit: false});
      setEditViewModal(false);
      setEditText('');
    }
  };

  return (
    <ContainerBg>
      {empty ? (
        <Container>
          <TellText>내용을 입력해주세요.</TellText>
          <CheckButtonContainer>
            <CheckButton onClick={closeModal}>확인</CheckButton>
          </CheckButtonContainer>
        </Container>
      ) : (
        <Container>
          <TellText>수정 하시겠습니까?</TellText>
          <CheckButtonContainer>
            <CheckButton
              onClick={() => {
                submitEditText(comment.id);
              }}
            >
              확인
            </CheckButton>
            <CheckButton onClick={closeModal}>취소</CheckButton>
          </CheckButtonContainer>
        </Container>
      )}
    </ContainerBg>
  );
}
