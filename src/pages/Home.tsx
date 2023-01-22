import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import {HiOutlinePencilSquare} from 'react-icons/hi2';
import basicImg from '../img/basicImg.png';
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
} from 'firebase/firestore';
import {dbService} from '../shared/firebase';
import {async} from '@firebase/util';

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

  const setCat = async (cat: string) => {
    setCategory(cat);
    await updateDoc(doc(dbService, 'category', 'currentCategory'), {
      category: cat,
    });
  };
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

  // const BorderStyles = (categoryitem:string) => {
  //   for (let i = 0; i < category.length; i++)
  //   { style = {{ borderColor: category[i] === categoryitem ? '#262b7f' : '#a8a8a8' } }
  // }
  // }

  return (
    <Container>
      {/* <Modal /> */}

      {/* 카테고리 */}
      <CategoryContainer>
        <CategoryBt
          onClick={() => setCat('all')}
          style={{borderColor: category === 'all' ? '#262b7f' : '#a8a8a8'}}
        >
          전체
        </CategoryBt>
        <CategoryBt
          onClick={() => setCat('front')}
          style={{
            borderColor: category === 'front' ? '#262b7f' : '#a8a8a8',
          }}
        >
          프론트엔드
        </CategoryBt>
        <CategoryBt
          onClick={() => setCat('back')}
          style={{borderColor: category === 'back' ? '#262b7f' : '#a8a8a8'}}
        >
          백엔드
        </CategoryBt>
        <CategoryBt
          onClick={() => setCat('design')}
          style={{
            borderColor: category === 'design' ? '#262b7f' : '#a8a8a8',
          }}
        >
          디자이너
        </CategoryBt>
        <CategoryBt
          onClick={() => setCat('publ')}
          style={{borderColor: category === 'publ' ? '#262b7f' : '#a8a8a8'}}
        >
          퍼블리셔
        </CategoryBt>
        <CategoryBt
          onClick={() => setCat('pm')}
          style={{borderColor: category === 'pm' ? '#262b7f' : '#a8a8a8'}}
        >
          PM
        </CategoryBt>
      </CategoryContainer>

      {/* 글쓰기 버튼 */}
      <WriteContainer>
        <WriteBt>
          <HiOutlinePencilSquare size={30} />
        </WriteBt>
      </WriteContainer>

      {/* 포스트 전체 */}
      <PostsContainer>
        {posts.map((post) => {
          for (let i = 0; i < post.category.length; i++) {
            if (category === post.category[i]) {
              return (
                <Posts key={post.id}>
                  {/* 포스트 상단 프로필 + 날짜 */}
                  <PostsTopContainer>
                    <ProfileContainer>
                      <ProfilePhoto />
                      <ProfileNickName>{post.nickname}</ProfileNickName>
                    </ProfileContainer>
                    <Date>{JSON.stringify(post.createdAt).slice(1, 11)}</Date>
                  </PostsTopContainer>
                  {/* 제목, 내용 */}
                  <TitleText>{post.title}</TitleText>
                  <ContentText>{post.content}</ContentText>
                  {/* 선택된 카테고리 */}
                  <BottomCategoryContainer>
                    {post.category.map((item: string) => {
                      // 카테고리가 all이면 버튼보이지않게
                      if (item === 'all') {
                        return;
                      } else {
                        return (
                          <BottomCategoryBt>
                            {item === 'front'
                              ? '프론트엔드'
                              : item === 'back'
                              ? '백엔드'
                              : item === 'design'
                              ? '디자이너'
                              : item === 'publ'
                              ? '퍼블리셔'
                              : item === 'pm'
                              ? 'PM'
                              : ''}
                          </BottomCategoryBt>
                        );
                      }
                    })}
                  </BottomCategoryContainer>
                </Posts>
              );
            }
          }
        })}
      </PostsContainer>
    </Container>
  );
}
const Container = styled.div`
  background-color: #f2f2f2;
  max-width: 1440px;
  width: 80%;
  margin: 20px auto;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;
`;
const CategoryBt = styled.button`
  height: 55px;
  width: 150px;
  border: 1px solid #a8a8a8;
  background-color: white;
  border-radius: 30px;
  color: #a8a8a8;
  font-size: 18px;
  cursor: pointer;
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

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Posts = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 280px;
  border-radius: 30px;
  padding: 40px;
  cursor: pointer;
`;

const PostsTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  width: 30px;
  height: 30px;
`;

const ProfileNickName = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const Date = styled.p`
  color: #aaaaaa;
  font-size: 15px;
`;

const TitleText = styled.h1`
  margin: 30px 0 20px 30px;
  font-size: 25px;
  font-weight: 600;
`;

const ContentText = styled.p`
  font-size: 16px;
  margin-left: 30px;
`;

const BottomCategoryContainer = styled.div`
  display: flex;
  gap: 15px;
  margin: 50px 0 0 30px;
`;

const BottomCategoryBt = styled.button`
  width: 100px;
  height: 30px;
  border: 1px solid #a8a8a8;
  border-radius: 30px;
  color: #efefef;
  background-color: #262b7f;
  filter: drop-shadow(1px 2px 3px #818181);
`;
