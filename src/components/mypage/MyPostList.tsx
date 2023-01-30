import styled from 'styled-components';
import { PostState } from '../../shared/type';
import MyPost from './MyPosts';

export default function MyPostList({
  posts,
  category,
}: {
  posts: PostState[];
  category: string;
}) {
  return (
    <PostsContainer>
      {posts.map(post => {
        // map 메소드에는 기본적으로 for문처럼 한 번 다 훑기 때문에 현재 이중 for문 구조라고 함.
        for (let i = 0; i < post.category.length; i++) {
          if (category === post.category[i]) {
            return <MyPost post={post} key={post.id} />;
          }
        }
      })}
    </PostsContainer>
  );
}

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-height: 50.26vh;
  margin-top: 20px;
`;
