import {createSlice} from '@reduxjs/toolkit';
import {CommentState} from '../../shared/type';

const initialState: CommentState = {
  comments: [
    {
      comment: '안녕하세요 반갑습니다.',
      postId: '5G3bMUMQmHBWfQLNFjFc',
      userId: '2',
      nickName: '묨묘미댓글',
    },
    {
      comment: '안녕하세요 반갑습니다.',
      postId: '5G3bMUMQmHBWfQLNFjFc',
      userId: '2',
      nickName: '묨묘미댓글2',
    },
    {
      comment: '안녕하세요 반갑습니다.',
      postId: '5G3bMUMQmHBWfQLNFjFc',
      userId: '2',
      nickName: '묨묘미댓글3',
    },
  ],
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => ({
      ...state,
      comments: [...state.comments, action.payload],
    })
  }
})

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;
