import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {RootState} from '../../redux/config/configStore';
import {useDispatch, useSelector} from 'react-redux';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  DocumentData,
  Timestamp,
  limit,
  QuerySnapshot,
  serverTimestamp,
  query,
  orderBy,
  where,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import {auth, dbService} from '../../shared/firebase';
import {useNavigate, useParams} from 'react-router-dom';
import CheckModal from '../modal/CheckModal';
import {getAuth} from 'firebase/auth';

export default function CommentInput() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [nick, setNick]: any = useState('');
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

  useEffect(()=>{console.log('photoURL', authService?.currentUser);},[])
  


  

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
    </>
  );
}
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const CommentForm = styled.form`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
`;

const CommentLabel = styled.label`
  position: relative;
`;

const CommentText = styled.textarea`
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 10px;
  padding: 20px 55px 20px 20px;
  resize: none;
  border: 1px solid #d0d0d0;
  transition-duration: 0.15s;
  &:focus {
    box-shadow: 5px 5px 5px #aaa;
  }
`;

const CommentSubmitButton = styled.button`
  position: absolute;
  top: -25px;
  right: 20px;
  background-color: #fff;
  color: #262b7f;
  border: 1px solid #d0d0d0;
  width: 50px;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #262b7f;
    color: #ffffff;
  }
`;
