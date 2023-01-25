import styled from 'styled-components';
import { PostState } from '../../shared/type';
import Post from './Post';
export default function PostList({posts,category}:{posts:PostState[],category:string}) {
  return (
    <PostsContainer>
      {posts.map((post) => {
        for (let i = 0; i < post.category.length; i++) {
          if (category === post.category[i]) {
            return <Post post={post} key={post.id} />;
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
`;

