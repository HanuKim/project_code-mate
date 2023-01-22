export interface PostState {
    id: string;
    nickname: string;
    category: any;
    comment: string[];
    content: string;
    createdAt: any;
    title: string;
    userid: number;
}
  
export interface Comment {
  comment: string;
  postId: string;
  userId: string;
  nickName: string;
}
export interface CommentState {
  comments: Comment[];
}