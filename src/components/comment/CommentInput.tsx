import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {collection, addDoc} from 'firebase/firestore';
import {dbService} from '../../shared/firebase';
import {useParams} from 'react-router-dom';
import CheckModal from '../modal/CheckModal';
import {getAuth} from 'firebase/auth';

export default function CommentInput() {
  const {id} = useParams();
  const [commentText, setCommentText] = useState('');
  const [checkViewModal, setCheckViewModal] = useState(false);
  const authService = getAuth();
  const uid = authService.currentUser?.uid;
  const displayName = authService.currentUser?.displayName;
  const photoURL = authService.currentUser?.photoURL;

  const newComment = {
    commentText,
    postId: id,
    userId: uid,
    nickName: displayName,
    createdAt: Date.now(),
    isEdit: false,
    profileImg: photoURL,
  };

  useEffect(() => {
    console.log('photoURL', authService?.currentUser);
  }, []);

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  // ADD
  const handleSubmitButtonClick = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    // 내용
    if (!commentText.trim() || commentText === null) {
      setCheckViewModal(true);
      return;
    } else {
      await addDoc(collection(dbService, 'comment'), newComment);
      setCommentText('');
    }
  };

  return (
    <>
      {checkViewModal ? (
        <CheckModal setCheckViewModal={setCheckViewModal} />
      ) : null}
      <Container>
        <CommentForm onSubmit={handleSubmitButtonClick}>
          <CommentText
            placeholder='댓글을 입력 해주세요.'
            onChange={handleChangeComment}
            value={commentText}
            cols={30}
            wrap='hard'
          />
          <CommentSubmitButtonContainer>
            <CommentSubmitButton>등록</CommentSubmitButton>
          </CommentSubmitButtonContainer>
        </CommentForm>
      </Container>
    </>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const CommentForm = styled.form`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
`;

const CommentText = styled.textarea`
  min-height: 150px;
  width: 100%;
  height: 100%;

  margin-bottom: 12px;
  padding: 20px;

  border: 1px solid #d0d0d0;
  border-radius: 10px;

  resize: none;

  transition-duration: 0.3s;
  &:focus {
    box-shadow: 5px 5px 5px #aaa;
  }
`;

const CommentSubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const CommentSubmitButton = styled.button`
  width: 50px;
  height: 30px;

  border: 1px solid #d0d0d0;
  border-radius: 10px;

  background-color: #fff;
  color: #262b7f;

  cursor: pointer;
  &:hover {
    background-color: #262b7f;
    color: #ffffff;
  }
`;
