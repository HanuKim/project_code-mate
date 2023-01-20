import React from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import {HiOutlinePencilSquare} from 'react-icons/hi2';
import basicImg from '../img/basicImg.png';

export default function Home() {
  return (
    <Container>
      {/* <Modal /> */}

      {/* 카테고리 */}
      <MainTopContainer>
        <MainTopBt>전체</MainTopBt>
        <MainTopBt>프론트엔드</MainTopBt>
        <MainTopBt>백엔드</MainTopBt>
        <MainTopBt>디자이너</MainTopBt>
        <MainTopBt>퍼블리셔</MainTopBt>
        <MainTopBt>PM</MainTopBt>
      </MainTopContainer>

      {/* 글쓰기 버튼 */}
      <WriteContainer>
        <WriteBt>
          <HiOutlinePencilSquare size={30} />
        </WriteBt>
      </WriteContainer>

      {/* 포스트 전체 */}
      <PostsContainer>
        {/* 포스트 1개 */}
        <Posts>
          {/* 포스트 상단 프로필 + 날짜 */}
          <PostsTopContainer>
            <ProfileContainer>
              <ProfilePhoto />
              <ProfileNickName>김미영</ProfileNickName>
            </ProfileContainer>
            <Date>2023-01-20</Date>
          </PostsTopContainer>
          {/* 제목, 내용 */}
          <TitleText>Title</TitleText>
          <ContentText>토이 프로젝트 팀원 구합니다.</ContentText>
          {/* 선택된 카테고리 */}
          <BottomCategoryContainer>
            <BottomCategoryBt>백엔드</BottomCategoryBt>
            <BottomCategoryBt>프론트엔드</BottomCategoryBt>
            <BottomCategoryBt>퍼블리셔</BottomCategoryBt>
          </BottomCategoryContainer>
        </Posts>
        <Posts>
          {/* 포스트 상단 프로필 + 날짜 */}
          <PostsTopContainer>
            <ProfileContainer>
              <ProfilePhoto />
              <ProfileNickName>김미영</ProfileNickName>
            </ProfileContainer>
            <Date>2023-01-20</Date>
          </PostsTopContainer>
          {/* 제목, 내용 */}
          <TitleText>Title</TitleText>
          <ContentText>토이 프로젝트 팀원 구합니다.</ContentText>
          {/* 선택된 카테고리 */}
          <BottomCategoryContainer>
            <BottomCategoryBt>백엔드</BottomCategoryBt>
            <BottomCategoryBt>프론트엔드</BottomCategoryBt>
            <BottomCategoryBt>퍼블리셔</BottomCategoryBt>
          </BottomCategoryContainer>
        </Posts>
        <Posts>
          {/* 포스트 상단 프로필 + 날짜 */}
          <PostsTopContainer>
            <ProfileContainer>
              <ProfilePhoto />
              <ProfileNickName>김미영</ProfileNickName>
            </ProfileContainer>
            <Date>2023-01-20</Date>
          </PostsTopContainer>
          {/* 제목, 내용 */}
          <TitleText>Title</TitleText>
          <ContentText>토이 프로젝트 팀원 구합니다.</ContentText>
          {/* 선택된 카테고리 */}
          <BottomCategoryContainer>
            <BottomCategoryBt>백엔드</BottomCategoryBt>
            <BottomCategoryBt>프론트엔드</BottomCategoryBt>
            <BottomCategoryBt>퍼블리셔</BottomCategoryBt>
          </BottomCategoryContainer>
        </Posts>
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

const MainTopContainer = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;
`;
const MainTopBt = styled.button`
  height: 55px;
  width: 150px;
  border: 1px solid #a8a8a8;
  background-color: white;
  border-radius: 30px;
  color: #a8a8a8;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    border: 1px solid #262b7f;
    color: #262b7f;
  }
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
`

const BottomCategoryContainer = styled.div`
  display: flex;
  gap: 15px;
  margin: 50px 0 0 30px;
`

const BottomCategoryBt = styled.button`
  width: 100px;
  height: 30px;
  border: 1px solid #a8a8a8;
  border-radius: 30px;
  color: #efefef;
  background-color: #262b7f;
  filter: drop-shadow(1px 2px 3px #818181);
`;
