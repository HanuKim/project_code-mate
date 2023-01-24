import { Timestamp } from 'firebase/firestore';

export interface PostState {
    id: string;
    nickname: string;
    category: any;
    content: string;
    createdAt: any;
    title: string;
    userid: number;
}
  
export interface Comment {
  id: string;
  commentText: string;
  postId: string;
  userId: string;
  nickName: string;
  createdAt: string;
  isEdit: boolean;
}
export interface CommentState {
  comments: Comment[];
}