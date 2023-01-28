import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import MapContainer from '../components/MapContainer';
import JobCategory from '../components/JobCategory';
import CodeMate from '../img/CodeMate.png';
import Comments from '../components/comment/Comments';
import CommentInput from '../components/comment/CommentInput';
import CommentList from '../components/comment/CommentList';
import basicImg from '../img/basicImg.png';
import { useLocation } from 'react-router-dom';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  orderBy,
  where,
  onSnapshot,
  setDoc,
  getDocs,
} from 'firebase/firestore';
import { dbService, authService } from '../shared/firebase';
import { getAuth } from 'firebase/auth';

// 리액트에서 라우터 사용 시, 파라미터 정보를 가져와 활용하고 싶으면 useParams라는 훅을 사용하면 된다.
// 참고로 파라미터가 아닌 현재 페이지의 Pathname을 가져오려면 useLocation()을 사용해야 한다.
import { useParams } from 'react-router-dom';

export default function Detail() {
  const [setDetail, getSetDetail] = useState('');
  // const state = useLocation();
  // console.log("state : ", state);
  let { id } = useParams();
  // const q = query(
  //   collection(dbService, "post"),
  //   // orderBy('createdAt', 'desc')
  //   where("id", "==", id)
  // );

  const getDetail = async () => {
    const snapshot = await getDoc(doc(dbService, 'post', id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    getSetDetail(data);
    console.log('data : ', data);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <>
      <Container>
        <InnerWidth>
          {setDetail === '' ? null : (
            <MapContainer location={setDetail.coord} />
          )}
          <ContentsContainer>
            <ProfileContainer>
              <ProfileWrap>
                <ProfilePic profile={setDetail.profileImg ?? basicImg} />
                <ProfileName>{setDetail.nickName}</ProfileName>
              </ProfileWrap>
              <Button
                location={setDetail.coord}
                delete="삭제"
                edit="수정"
                btnWidth={80}
                btnHeight={40}
              ></Button>
            </ProfileContainer>
            <Title>{setDetail.title}</Title>
            <Contents>{setDetail.content}</Contents>
            <JobCategory></JobCategory>
          </ContentsContainer>
        </InnerWidth>
        <CommentInput />
        <CommentList />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 1200px;
  min-height: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 50px 10px;
  background-color: #f2f2f2;
  border-radius: 10px;
  position: relative;
`;

const InnerWidth = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
`;

const ContentsContainer = styled.div`
  position: relative;
  min-height: 700px;
  width: 100%;
  height: 100%;
  padding: 30px;
  border: 1px solid #d0d0d0;
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 30px;
`;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ProfilePic = styled.div`
  max-width: 64px;
  max-height: 64px;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.profile});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid #d0d0d0;
  border-radius: 50%;
  cursor: pointer;
`;

const ProfileName = styled.div`
  margin-left: 20px;
  font-size: 20px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
`;

const CommentEdit = styled.form`
  position: relative;

  max-width: 1100px;
  min-height: 130px;
  width: 100%;
  height: 100%;

  padding: 15px;

  border: 1px solid #d0d0d0;
  border-radius: 10px;
`;

const Input = styled.textarea`
  max-width: 1060px;
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  padding: 15px;
  border: none;
  word-wrap: wrap;
  word-break: break-all;
  background-color: #f2f2f2;
  transition-duration: 0.3s;
  &:focus {
    box-shadow: 7px 7px 7px #d0d0d0;
  }
`;

const CommentContainer = styled.div`
  max-width: 1100px;
  width: 100%;
  height: 100%;
`;

const CommentTitle = styled.div`
  padding-left: 5px;
  margin-top: 32px;
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: bold;
`;

const CommentWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  min-height: 25px;
  width: 100%;

  margin: 4px 0;
`;

const CommentWriter = styled.div`
  margin-left: 12px;
  font-size: 14px;
  font-weight: 500;
`;
