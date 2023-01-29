import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import basicImg from '../../img/basicImg.png';
import { PostState } from '../../shared/type';

export default function MyPosts({ post }: { post: PostState }) {
  const navigate = useNavigate();

  return (
    <Posts
      onClick={() => {
        navigate(`/detail/${post.id}`);
        // navigate(`/detail/${post.id}`, { state: { ...post } });
      }}
    >
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
          if (item === 'all') {
            return;
          } else {
            return (
              // BottomCategoryBt에 key 지정해줘야 함.
              <BottomCategoryBt>
                {item === 'FrontEnd'
                  ? 'FrontEnd'
                  : item === 'BackEnd'
                  ? 'BackEnd'
                  : item === 'Designer'
                  ? 'Designer'
                  : item === 'Web Publish'
                  ? 'Web Publish'
                  : item === 'Product Manage'
                  ? 'Product Manage'
                  : ''}
              </BottomCategoryBt>
            );
          }
        })}
      </BottomCategoryContainer>
    </Posts>
  );
}
const Posts = styled.div`
  background-color: #fff;
  min-height: 225px;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  padding: 25px 30px;
  cursor: pointer;
  border: 1px solid #d0d0d0;
  transition-duration: 0.3s;
  &:hover {
    box-shadow: 3px 3px 3px #aaa;
  }
`;

const PostsTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ProfilePhoto = styled.div<{ background: any }>`
  background-image: url(${props => props.background});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border: 1px solid #d0d0d0;
  border-radius: 50%;
`;

const ProfileNickName = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const Date = styled.p`
  color: #aaa;
  font-size: 15px;
`;

const TitleText = styled.h1`
  margin-left: 44px;
  font-size: 20px;
  font-weight: 600;
`;

const ContentText = styled.p`
  margin-bottom: 80px;
  margin-left: 44px;
`;

const BottomCategoryContainer = styled.div`
  display: flex;
  gap: 15px;
  margin: 0 44px;
`;

const BottomCategoryBt = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
  background-color: #262b7f;
`;
