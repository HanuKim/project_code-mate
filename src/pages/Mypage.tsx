import React, { useState } from 'react';
import styled from 'styled-components';

export default function Mypage() {
  return (
    <>
      <Container>
        <MypageBox>
          <TopContainer>
            <ProfileTitle>
              <TopProfileContainer>
                <TopProfilePhoto />
                <TopProfileNickName>Lee Tae Eon</TopProfileNickName>
              </TopProfileContainer>
              <UploadWrap>
                <UploadBtn> 사진 등록 </UploadBtn>
              </UploadWrap>
              {/* <UploadContents></UploadContents> */}
            </ProfileTitle>
            <InputContainer>
              <InputBox></InputBox>
              <InputBtn>등록</InputBtn>
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
                <Date>0000-00-00</Date>
              </PostsTopWrap>
              <TitleText>제목</TitleText>
              <ContentText>내용</ContentText>
              <CategoryContainer>
                <CategoryBtn>BackEnd</CategoryBtn>
                <CategoryBtn>FrontEnd</CategoryBtn>
                <CategoryBtn>Publisher</CategoryBtn>
              </CategoryContainer>
            </Posts>
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
  top: 190px;
  left: 60px;
`;

const InputContainer = styled.div`
  /* background-color: skyblue; */
  position: relative;
`;

const InputBox = styled.textarea`
  background-color: white;
  height: 560px;
  width: 100%;
  border-radius: 10px;
  padding: 15px;
`;

const InputBtn = styled.button`
  position: absolute;
  right: 20px;
  top: 510px;
  background-color: #262b7f;
  color: white;
  width: 60px;
  height: 30px;
  border-radius: 5px;
`;

const UploadContents = styled.input`
  /* background-color: gray; */
  width: 100%;
`;

const UploadBtn = styled.button`
  width: 100px;
  height: 25px;
`;

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
  gap: 8px;
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

const Date = styled.p`
  color: #aaaaaa;
  font-size: 15px;
  margin-top: -12px;
`;

const TitleText = styled.h1`
  margin: 25px 0 20px 40px;
  font-size: 25px;
  font-weight: 600;
`;

const ContentText = styled.p`
  font-size: 16px;
  margin-left: 40px;
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
  filter: drop-shadow(1px 2px 3px #818181);
`;

const TopProfileContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: -70px;
`;

const TopProfilePhoto = styled.div`
  background-image: url(https://www.pngall.com/wp-content/uploads/5/Profile.png);
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  width: 140px;
  height: 140px;
  border: 1px solid black;
  border-radius: 100px;
`;

const TopProfileNickName = styled.p`
  font-size: 18px;
  font-weight: 500;
`;
