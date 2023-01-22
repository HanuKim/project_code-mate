import { configureStore } from "@reduxjs/toolkit";
import commentSlice from '../modules/commentSlice';

const store = configureStore({
  reducer: {comments: commentSlice},
  // 여기에서 store와 module이 연결된다.
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// RootState와 Dispatch의 타입을 reducer에 state slice를 추가한 store의 타입을 추론하여 지정한 것

export default store;
