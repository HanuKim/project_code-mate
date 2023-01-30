import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {doc, deleteDoc} from 'firebase/firestore';
import {dbService} from '../../shared/firebase';
import styled from 'styled-components';
import {Comment} from '../../shared/type';

export default function DeleteModal({
  setDeleteViewModal,
  comment,
}: {
  setDeleteViewModal: React.Dispatch<React.SetStateAction<boolean>>;
  comment: Comment;
}) {
  let {id} = useParams();
  const navigate = useNavigate();
  const closeModal = () => {
    setDeleteViewModal(false);
  };
  const deleteCommentClickButton = async (commentid: string) => {
    await deleteDoc(doc(dbService, 'comment', commentid));
    setDeleteViewModal(false);
  };

  const deletePosttClickButton = async (id: string) => {
    await deleteDoc(doc(dbService, 'post', id));
    setDeleteViewModal(false);
    navigate(`/`);
  };
  return (
    <ContainerBg>
      <Container>
        <TellText>삭제 하시겠습니까?</TellText>
        <CheckButtonContainer>
          {comment ? (
            <CheckButton
              onClick={() => {
                deleteCommentClickButton(comment.id);
              }}
            >
              확인
            </CheckButton>
          ) : (
            <CheckButton
              onClick={() => {
                deletePosttClickButton(id);
              }}
            >
              확인
            </CheckButton>
          )}
          <CheckButton onClick={closeModal}>취소</CheckButton>
        </CheckButtonContainer>
      </Container>
    </ContainerBg>
  );
}

export const ContainerBg = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

export const Container = styled.div`
  width: 500px;
  height: 300px;
  border: 1px solid #aaa;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f2f2f2;
  box-shadow: 3px 3px 3px black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;

export const TellText = styled.h1`
  font-size: 30px;
`;

export const CheckButtonContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
`;

export const CheckButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #000000;
  width: 100px;
  height: 45px;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background-color: #262b7f;
    color: #ffffff;
  }
`;
