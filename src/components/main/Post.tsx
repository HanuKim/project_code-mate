import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import basicImg from "../../img/basicImg.png";
import { PostState } from "../../shared/type";

export default function Post({ post }: { post: PostState }) {
  const navigate = useNavigate();

  return (
    <Posts
      onClick={() => {
        navigate(`/detail/${post.id}`);
        // navigate(`/detail/${post.id}`, { state: { ...post } });
      }}>
      {/* 포스트 상단 프로필 + 날짜 */}
      <PostsTopContainer>
        <ProfileContainer>
          <ProfilePhoto background={post.profileImg ?? basicImg} />
          <ProfileNickName>{post.nickName}</ProfileNickName>
        </ProfileContainer>
        <Date>{post.createdAt}</Date>
      </PostsTopContainer>
      {/* 제목, 내용 */}
      <TitleText>{post.title}</TitleText>
      <ContentText>{post.content}</ContentText>
      {/* 선택된 카테고리 */}
      <BottomCategoryContainer>
        {post.category.map((item: string) => {
          // 카테고리가 all이면 버튼보이지않게
          if (item === "all") {
            return;
          } else {
            return (
              // BottomCategoryBt에 key 지정해줘야 함.
              <BottomCategoryBt>
                {item === "front"
                  ? "프론트엔드"
                  : item === "back"
                  ? "백엔드"
                  : item === "design"
                  ? "디자이너"
                  : item === "publ"
                  ? "퍼블리셔"
                  : item === "pm"
                  ? "PM"
                  : ""}
              </BottomCategoryBt>
            );
          }
        })}
      </BottomCategoryContainer>
    </Posts>
  );
}
const Posts = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  padding: 0 20px;
  border: 1px solid #d0d0d0;
  cursor: pointer;
  transition-duration: 0.3s;
  &:hover {
    box-shadow: 5px 5px 5px #666;
  }
`;

const PostsTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 30px;
  margin-top: 24px;

  /* height: 50px; */
  /* background-color: red; */
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const ProfilePhoto = styled.div<{ background: any }>`
  width: 48px;
  height: 48px;
  border: 1px solid #d0d0d0;
  border-radius: 100%;
  background-image: url(${(props) => props.background});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const ProfileNickName = styled.p`
  font-size: 18px;
`;

const Date = styled.p`
  color: #aaa;
  font-size: 14px;
`;

const TitleText = styled.h1`
  margin: 0px 56px;
  font-size: 22px;
  font-weight: bold;
`;

const ContentText = styled.p`
  font-size: 16px;
  margin: 24px 56px 58px 58px;
`;

const BottomCategoryContainer = styled.div`
  display: flex;
  gap: 16px;
  margin: 0 54px;
  margin-bottom: 24px;
`;

const BottomCategoryBt = styled.button`
  padding: 10px 12px;
  border: 1px solid #262b7f;
  border-radius: 12px;

  font-size: 12px;
  font-weight: bold;
  color: #f2f2f2;
  background-color: #262b7f;
`;
