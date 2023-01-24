import React, {useState} from 'react';
import styled from 'styled-components';
import {RootState} from '../../redux/config/configStore';
import {useDispatch, useSelector} from 'react-redux';
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
  serverTimestamp,
} from 'firebase/firestore';
import { auth, dbService } from '../../shared/firebase';
import { useParams } from 'react-router-dom';


export default function CommentInput() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [commentText, setCommentText]:any= useState('');

  const uid = auth.currentUser?.uid;


  const newComment = {
    commentText,
    postId: id,
    userId: '1',
    nickName: '묨묘미',
    createdAt: Date.now(),
    isEdit: false,
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  // ADD
  const handleSubmitButtonClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 내용
    if (!commentText.trim() || commentText === null) {
      alert('내용을 입력해');
      return;
    } else {
      await addDoc(collection(dbService, 'comment'), newComment);
      setCommentText('')
    }
  };



  return (
    <Container>
      <CommentForm onSubmit={handleSubmitButtonClick}>
        <CommentLabel>
          <CommentText
            placeholder='댓글을 입력 해주세요.'
            onChange={handleChangeComment}
            value={commentText}
            cols={30}
            wrap='hard'
          />
          <CommentSubmitButton>등록</CommentSubmitButton>
        </CommentLabel>
      </CommentForm>
    </Container>
  );
}
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const CommentForm = styled.form``;

const CommentLabel = styled.label`
  position: relative;
`;

const CommentText = styled.textarea`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  padding: 20px 55px 20px 20px;
  resize: none;
  outline-color: #262b7f;
`;

const CommentSubmitButton = styled.button`
  position: absolute;
  top: -25px;
  right: 20px;
  background-color: #ffffff;
  border: 1px solid #000000;
  width: 50px;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #262b7f;
    color: #ffffff;
  }
`;
