import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import basicImg from '../../img/basicImg.png';
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
} from 'firebase/firestore';
import { dbService } from '../../shared/firebase';
import { CommentState, Comment } from '../../shared/type';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import { async } from '@firebase/util';
import { useParams } from 'react-router-dom';

export default function CommentList() {
  const [isEdit, setIsEdit]:any = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  console.log(id)

  const onClickIsEditSwitch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsEdit((prev:boolean)=> !prev)
    }

  
  const q = query(
      collection(dbService, 'comment'),
      orderBy('createdAt', 'desc')
    );
  
  const getComment = () => {
    onSnapshot(q, (snapshot) => {
      const newComments = snapshot.docs.map((doc) => {
          const newComment = {
            id: doc.id,
            ...doc.data(), // <- poststate
            createdAt: doc.data().createdAt.toDate(), // timestamp로 저장된 데이터 가공
          } as Comment;
          // poststate로 들어올걸 확신해서 as를 사용함
          // as 사용하기 전에는 doc을 추론하지 못해서 계속 에러가 났음
          console.log(doc.data().createdAt.toDate());
          return newComment;
        
      })
      setComments(newComments);
    });
  };
  const setEdit = async() => {
    await updateDoc(doc(dbService, 'comment', id), {
      
    });
    getComment();
  }
  
  useEffect(() => {
    getComment();
    console.log(comments);
  }, []);


  return (
    <Container>
      <CommentTitle>Comment</CommentTitle>
      {/* 댓글들 컨테이너 */}
      <CommentsContainer>
        {comments.map((comment) => {
          if (comment.postId === id) {
            return (
              <CommentContentContainer key={comment.id}>
                {/* 댓글쓴이+날짜 */}
                <CommentTopContainer>
                  <ProfileContainer>
                    <ProfilePhoto />
                    <ProfileNickName>{comment.nickName}</ProfileNickName>
                  </ProfileContainer>
                  <Date>{JSON.stringify(comment.createdAt).slice(1, 11)}</Date>
                </CommentTopContainer>
                <ContentText>{comment.commentText}</ContentText>
                <DeleteModifyButtonsContainer>
                  <CommentDeleteModifyButton onClick={onClickIsEditSwitch}>
                    수정
                  </CommentDeleteModifyButton>
                  <CommentDeleteModifyButton>삭제</CommentDeleteModifyButton>
                </DeleteModifyButtonsContainer>
              </CommentContentContainer>
            );
          } else return;
        })}
        {/* 댓글1개 */}
        

      </CommentsContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 100px;
`;

const CommentTitle = styled.h1`
  font-size: 35px;
  margin: 50px 0;
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

const CommentContentContainer = styled.div`
  width: 70%;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px 20px 45px 20px;
  position: relative;
`;

const CommentTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ProfilePhoto = styled.div`
  background-image: url(${basicImg});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const ProfileNickName = styled.p`
  font-size: 15px;
  font-weight: 500;
`;

const Date = styled.p`
  color: #aaaaaa;
  font-size: 15px;
`;

const ContentText = styled.p`
  white-space: pre-wrap;
`;
const DeleteModifyButtonsContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 5px;
  right: 15px;
  bottom: 10px
`;
const CommentDeleteModifyButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #000000;
  width: 50px;
  height: 30px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #262b7f;
    color: #ffffff;
  }
`;
