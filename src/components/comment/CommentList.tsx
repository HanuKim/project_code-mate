import React, {useEffect, useState} from 'react';
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
  where,
} from 'firebase/firestore';
import {dbService} from '../../shared/firebase';
import {CommentState, Comment} from '../../shared/type';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/config/configStore';
import {async} from '@firebase/util';
import { useParams } from 'react-router-dom';
import CommentItem from './CommentItem'

export default function CommentList() {
  

  const [comments, setComments] = useState<Comment[]>([]);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  
  const q = query(
    collection(dbService, 'comment'),
    orderBy('createdAt', 'desc'),
    where('postId', '==', id)
    // Where를 만들 때에는 색인을 만들어줘야 한다. 브라우저에서 나오는 에러 링크를 누르면 됨
  );

    

    // post 시간 나타내는 함수
    const getTimegap = (posting: any) => {
      const msgap = Date.now() - posting;
      const minutegap = Math.floor(msgap / 60000);
      const hourgap = Math.floor(msgap / 3600000);
      const daygap = Math.floor(msgap / 86400000);
      if (msgap < 0) {
        return '0분전';
      }
      if (daygap > 8) {
        const time = new Date(posting);
        const timegap = time.toJSON().substring(0, 10);
        return <p>{timegap}</p>;
      }
      if (hourgap > 24) {
        return <p>{daygap}일 전</p>;
      }
      if (minutegap > 60) {
        return <p>{hourgap}시간 전</p>;
      } else {
        return <p>{minutegap}분 전</p>;
      }
    };
  
  const getComment = () => {
    onSnapshot(q, (snapshot) => {
      const newComments = snapshot.docs.map((doc) => {
        const newComment = {
          id: doc.id,
          ...doc.data(), // <- poststate
          createdAt: getTimegap(doc.data().createdAt)
          // doc.data().createdAt, // timestamp로 저장된 데이터 가공

        } as any;
          // Comment;
        // poststate로 들어올걸 확신해서 as를 사용함
        // as 사용하기 전에는 doc을 추론하지 못해서 계속 에러가 났음
        console.log('newComment', newComment);
        return newComment;
      });
      setComments(newComments);
    });
  };

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
          return <CommentItem comment={comment} comments={comments} />;
          {/* 댓글1개 */ }
        })}
        
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

