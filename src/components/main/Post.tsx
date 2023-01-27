import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import basicImg from "../../img/basicImg.png";
import { PostState } from "../../shared/type";

export default function Post({ post }: { post: PostState }) {
  const navigate = useNavigate();

  return (
    <Posts
      onClick={() => {
        navigate(`/detail/${post.id}`, { state: { ...post } });
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
  /* min-height: 280px; */
  height: 250px;
  border-radius: 30px;
  padding: 40px;
  cursor: pointer;
  border: 1px solid black;
  &:hover {
    border: 2px solid #262b7f;
  }
`;

const PostsTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  align-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfilePhoto = styled.div<{ background: any }>`
  background-image: url(${(props) => props.background});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 100%;
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
  margin: 10px 0 20px 30px;
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
  margin: 30px 0 0 30px;
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
