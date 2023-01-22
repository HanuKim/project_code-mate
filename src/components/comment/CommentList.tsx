import React from 'react';
import styled from 'styled-components';
import basicImg from '../../img/basicImg.png';

export default function CommentList() {
  return (
    <Container>
      <CommentTitle>Comment</CommentTitle>
      {/* 댓글들 컨테이너 */}
      <CommentsContainer>
        {/* 댓글1개 */}
        <CommentContentContainer>
          {/* 댓글쓴이+날짜 */}
          <CommentTopContainer>
            <ProfileContainer>
              <ProfilePhoto />
              <ProfileNickName>먕먀미</ProfileNickName>
            </ProfileContainer>
            <Date>2022-12-14</Date>
          </CommentTopContainer>
          <ContentText>안녕하세요.참여합니다.</ContentText>
          <ContentText>안녕하세요.참여합니다.</ContentText>
          <ContentText>안녕하세요.참여합니다.</ContentText>
          <ContentText>안녕하세요.참여합니다.</ContentText>
          <DeleteModifyButtonsContainer>
            <CommentDeleteModifyButton>수정</CommentDeleteModifyButton>
            <CommentDeleteModifyButton>삭제</CommentDeleteModifyButton>
          </DeleteModifyButtonsContainer>
        </CommentContentContainer>
        {/* 댓글1개 */}
        <CommentContentContainer>
          {/* 댓글쓴이+날짜 */}
          <CommentTopContainer>
            <ProfileContainer>
              <ProfilePhoto />
              <ProfileNickName>먕먀미</ProfileNickName>
            </ProfileContainer>
            <Date>2022-12-14</Date>
          </CommentTopContainer>
          <ContentText>안녕하세요.참여합니다.</ContentText>
          <DeleteModifyButtonsContainer>
            <CommentDeleteModifyButton>수정</CommentDeleteModifyButton>
            <CommentDeleteModifyButton>삭제</CommentDeleteModifyButton>
          </DeleteModifyButtonsContainer>
        </CommentContentContainer>
        {/* 댓글1개 */}
        <CommentContentContainer>
          {/* 댓글쓴이+날짜 */}
          <CommentTopContainer>
            <ProfileContainer>
              <ProfilePhoto />
              <ProfileNickName>먕먀미</ProfileNickName>
            </ProfileContainer>
            <Date>2022-12-14</Date>
          </CommentTopContainer>
          <ContentText>안녕하세요.참여합니다.</ContentText>
          <DeleteModifyButtonsContainer>
            <CommentDeleteModifyButton>수정</CommentDeleteModifyButton>
            <CommentDeleteModifyButton>삭제</CommentDeleteModifyButton>
          </DeleteModifyButtonsContainer>
        </CommentContentContainer>
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
  padding: 20px 20px 35px 20px;
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

const ContentText = styled.p``;
const DeleteModifyButtonsContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 5px;
  right: 15px;
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
