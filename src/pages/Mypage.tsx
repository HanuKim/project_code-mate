// react-icons 다운

import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import MypageModal from "../components/MypageModal";
// import { ShowImage } from '../components/ShowImage';
import UploadImage from "../components/UploadImage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { dbService } from "../shared/firebase";
import MypageCreate from "../components/MypageCreate";
import { auth } from "../shared/firebase";
import Profile from "../components/Profile";
import { useParams } from "react-router-dom";
import { getAuth } from 'firebase/auth';

export default function Mypage() {
  const authService = getAuth();
  const uid = authService.currentUser?.uid;
  console.log(uid)
  return (
    <>
      <Container>
        <MypageBox>
          <TopContainer>
            <ProfileTitle>
              <TopProfileContainer>
                <TopProfilePhoto>
                  <ProfileWrap>
                    <Profile />
                  </ProfileWrap>
                </TopProfilePhoto>
                <ProfileContents>ProfileContents</ProfileContents>
                <TopProfileNickName></TopProfileNickName>
              </TopProfileContainer>
              <UploadWrap></UploadWrap>
            </ProfileTitle>

            <InputContainer>
              <InputBox placeholder="내용을 입력해주세요" cols={30}></InputBox>
              <InputBtnWrap>
                {/* {isOpenModall && (
                  <MypageModal onClickToggleModal={onClickToggleModall}>
                    <MypageCreate />
                  </MypageModal>
                )}
                <InputBtn onClick={onClickToggleModall}>등록</InputBtn> */}
                <InputBtn type={"submit"}>등록</InputBtn>
              </InputBtnWrap>
            </InputContainer>
          </TopContainer>

          <BottomContainer>
            <MyPostTitle>내가쓴글</MyPostTitle>
            <Posts>
              <PostsTopWrap>
                <ProfileContainer>
                  <ProfilePhoto />
                  <ProfileNickName>Lee</ProfileNickName>
                </ProfileContainer>
                <Datee>0000-00-00</Datee>
              </PostsTopWrap>
              <TitleText>제목</TitleText>
              <ContentText>내용</ContentText>
              <CategoryContainer>
                <CategoryBtn>BackEnd</CategoryBtn>
                <CategoryBtn>FrontEnd</CategoryBtn>
                <CategoryBtn>Publisher</CategoryBtn>
              </CategoryContainer>
            </Posts>
            {/* --test posts --- */}
            <Posts>
              <PostsTopWrap>
                <ProfileContainer>
                  <ProfilePhoto />
                  <ProfileNickName>Lee</ProfileNickName>
                </ProfileContainer>
                <Datee>0000-00-00</Datee>
              </PostsTopWrap>
              <TitleText>제목</TitleText>
              <ContentText>내용</ContentText>
              <CategoryContainer>
                <CategoryBtn>BackEnd</CategoryBtn>
                <CategoryBtn>FrontEnd</CategoryBtn>
                <CategoryBtn>Publisher</CategoryBtn>
              </CategoryContainer>
            </Posts>
            <Posts>
              <PostsTopWrap>
                <ProfileContainer>
                  <ProfilePhoto />
                  <ProfileNickName>Lee</ProfileNickName>
                </ProfileContainer>
                <Datee>0000-00-00</Datee>
              </PostsTopWrap>
              <TitleText>제목</TitleText>
              <ContentText>내용</ContentText>
              <CategoryContainer>
                <CategoryBtn>BackEnd</CategoryBtn>
                <CategoryBtn>FrontEnd</CategoryBtn>
                <CategoryBtn>Publisher</CategoryBtn>
              </CategoryContainer>
            </Posts>
            <Posts>
              <PostsTopWrap>
                <ProfileContainer>
                  <ProfilePhoto />
                  <ProfileNickName>Lee</ProfileNickName>
                </ProfileContainer>
                <Datee>0000-00-00</Datee>
              </PostsTopWrap>
              <TitleText>제목</TitleText>
              <ContentText>내용</ContentText>
              <CategoryContainer>
                <CategoryBtn>BackEnd</CategoryBtn>
                <CategoryBtn>FrontEnd</CategoryBtn>
                <CategoryBtn>Publisher</CategoryBtn>
              </CategoryContainer>
            </Posts>
            {/* --- test ---- */}
          </BottomContainer>
        </MypageBox>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100%;
  background-color: lightgray;
  display: flex;
  justify-content: center;
`;

const MypageBox = styled.div`
  width: 1000px;
  height: 100%;
  background-color: white;
  margin: 120px;
  border-radius: 10px;
  padding: 30px;
`;

const TopContainer = styled.div`
  background-color: white;
  height: 850px;
  margin-top: 50px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 40px;
  position: relative;
`;

const ProfileTitle = styled.div`
  /* background-color: red; */
  height: 200px;
  display: flex;
  flex-direction: row;
`;

const UploadWrap = styled.div`
  /* background-color: blue; */
  min-width: 200px;
  position: absolute;
  top: 185px;
  left: 50px;
`;

const InputContainer = styled.form`
  /* background-color: skyblue; */
  /* position: relative; */
`;

const InputBox = styled.textarea`
  /* background-color: red; */
  height: 560px;
  width: 100%;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid black;
`;

const InputBtnWrap = styled.div`
  /* background-color: red; */
  position: flex;
  margin-left: 800px;
`;

const InputBtn = styled.button`
  /* position: flex; */

  background-color: #262b7f;
  color: white;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const UploadContents = styled.input`
  /* background-color: gray; */
  width: 100%;
`;

const TestInput = styled.button``;

// ------------ post ---------------

const MyPostTitle = styled.div`
  /* background-color: blue; */
  height: 60px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Posts = styled.div`
  background-color: white;
  width: 100%;
  height: 240px;
  border-radius: 30px;
  padding: 40px;
  margin-top: 20px;
  border: 1px solid black;
`;

const PostsTopWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: -18px;
`;

const ProfilePhoto = styled.div`
  background-image: url(https://www.pngall.com/wp-content/uploads/5/Profile.png);
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

const Datee = styled.p`
  color: #aaaaaa;
  font-size: 15px;
  margin-top: -12px;
`;

const TitleText = styled.h1`
  margin: 20px 0 20px 40px;
  font-size: 25px;
  font-weight: 600;
`;

const ContentText = styled.p`
  font-size: 16px;
  margin-left: 43px;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 15px;
  margin: 50px 0 0 40px;
`;

const CategoryBtn = styled.button`
  width: 100px;
  height: 30px;
  border: 1px solid #a8a8a8;
  border-radius: 30px;
  color: #efefef;
  background-color: #262b7f;
  /* filter: drop-shadow(1px 2px 3px #818181); */
`;

const TopProfileContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: -70px;
`;

const TopProfilePhoto = styled.div`
  /* background-image: url(https://www.pngall.com/wp-content/uploads/5/Profile.png); */
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  /* cursor: pointer; */
  width: 140px;
  height: 140px;
  /* border: 1px solid black;
  border-radius: 100px; */
`;

const TopProfileNickName = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const DialogButton = styled.div`
  width: 120px;
  height: 36px;
  background-color: #262b7f;
  color: white;
  font-size: 1.2rem;
  font-weight: 400;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    /* transform: translateY(-1px); */
  }
`;

const ProfileWrap = styled.div`
  /* background-color: red; */
`;

const ProfileBox = styled.div`
  /* background-color: blue; */
  display: flex;
  width: 300px;
`;

const Test = styled.div`
  display: flex;
  flex-direction: column;
`;

const Test1 = styled.div`
  /* background-color: gray; */
`;

const Test2 = styled.div`
  /* background-color: pink; */
`;

const ProfileContents = styled.div`
  /* background-color: red; */
  width: 680px;
  height: 200px;
  margin-left: 30px;
  margin-top: 30px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 30px;
`;
