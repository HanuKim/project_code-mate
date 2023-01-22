import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {HiOutlinePencilSquare} from 'react-icons/hi2';
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
import {dbService} from '../shared/firebase';
import MainCategory from '../components/main/MainCategory';
import PostList from '../components/main/PostList';
import { useFirestoreQuery } from '@react-query-firebase/firestore';

export default function Home() {
  interface PostState {
    id: string;
    nickname: string;
    category: any;
    comment: string[];
    content: string;
    createdAt: any;
    title: string;
    userid: number;
  }

  // interface CategoryState {
  //   all: string;
  //   back: string;
  //   front: string;
  //   design: string;
  //   publ: string;
  //   pm: string;
  // }
  const [posts, setPosts] = useState<PostState[]>([]);
  const [category, setCategory]: any = useState('');
  // any 타입 말고 어떤 타입을 줘야 하는지 확인해보기

  // post 데이터에서 createAt을 내림차순으로 정렬
  const q = query(collection(dbService, 'post'), orderBy('createdAt', 'desc'));

  // // 데이터 실시간 업데이트
  // const storeQuery = useFirestoreQuery(['post'], q, {
  //   subscribe: true,
  // });
  // console.log(storeQuery)

  // if (storeQuery.isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (storeQuery.isError) {
  //   return <div>Error!!!!</div>;
  // }

  const getPost = () => {
    onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => {
        console.log('doc', doc.data());
        const newPost = {
          id: doc.id,
          ...doc.data(), // <- poststate
          createdAt: doc.data().createdAt.toDate(), // timestamp로 저장된 데이터 가공
        } as PostState;
        // poststate로 들어올걸 확신해서 as를 사용함
        // as 사용하기 전에는 doc을 추론하지 못해서 계속 에러가 났음
        console.log('newpost', newPost);
        return newPost;
      });
      setPosts(newPosts);
      console.log('posts2', newPosts);
    });
  };

  // 현재 누른 카테고리를 category 컬렉션에 업데이트
  

  useEffect(() => {
    getPost();
    console.log('posts', posts);
    console.log('category', category);

    const getCategory = async () => {
      const snapshot = await getDoc(
        doc(dbService, 'category', 'currentCategory')
      );
      console.log(snapshot.data());
      setCategory(snapshot.data().category); // 스냅샷.data() 오류났었는데 tsconfig.json에 "strictNullChecks": false, 추가해줬더니 오류안남. 이렇게 해도 괜찮은건지 확인필요
    };
    getCategory();
  }, []);

  return (
    <Container>

      {/* 카테고리 */}
      {/* Slice로 어떻게 넣지..? */}
      <MainCategory category={category} setCategory={setCategory} />

      {/* 글쓰기 버튼 */}
      <WriteContainer>
        <WriteBt>
          <HiOutlinePencilSquare size={30} />
        </WriteBt>
      </WriteContainer>

      {/* 포스트 */}
      <PostList posts={posts} category={category} />

    </Container>
  );
}
const Container = styled.div`
  background-color: #f2f2f2;
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


