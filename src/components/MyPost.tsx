import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
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
import { dbService, authService } from '../shared/firebase';
import MainCategory from '../components/main/MainCategory';
import PostList from '../components/main/PostList';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { PostState } from '../shared/type';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState<PostState[]>([]);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const q = query(
    collection(dbService, 'post'),
    orderBy('createdAt', 'desc'),
    where('userid', '==', authService.currentUser?.uid || '')
  );

  const getTimegap = (posting: number) => {
    const msgap = Date.now() - posting;
    const minutegap = Math.floor(msgap / 60000);
    const hourgap = Math.floor(msgap / 3600000);
    const daygap = Math.floor(msgap / 86400000);
    if (msgap < 0) {
      return '0분전';
    }
    if (daygap > 7) {
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
  const getPost = () => {
    onSnapshot(q, snapshot => {
      const newPosts = snapshot.docs.map(doc => {
        // console.log('doc', doc.data());
        const newPost = {
          id: doc.id,
          ...doc.data(),
          createdAt: getTimegap(doc.data().createdAt),
        } as PostState;

        // console.log('newpost', newPost);
        return newPost;
      });
      setPosts(newPosts);
      //   console.log('posts2', newPosts);
    });
  };

  useEffect(() => {
    getPost();
    // console.log('posts', posts);
    // console.log('category', category);

    const getCategory = async () => {
      const snapshot = await getDoc(
        doc(dbService, 'category', 'currentCategory')
      );
      //   console.log(snapshot.data());
      setCategory(snapshot.data().category);
    };
    getCategory();
  }, []);

  return (
    <Container>
      <MainCategory category={category} setCategory={setCategory} />

      <PostList posts={posts} category={category} />
    </Container>
  );
}
const Container = styled.div`
  max-width: 1440px;
  width: 80%;
  margin: 20px auto;
`;

const WriteContainer = styled.div`
  text-align: right;
`;
const WriteBt = styled.button`
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 40px 0 20px 0;
  cursor: pointer;
  &:hover {
    border: 1px solid #262b7f;
  }
`;
