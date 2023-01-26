import { Timestamp } from "firebase/firestore";

export interface PostState {
  id: string;
  nickname: string;
  category: string[];
  content: string;
  createdAt: string;
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

export interface ModalProps {
  modalWidth: number;
  modalHeight: number;
}

export interface BtnProps {
  btnWidth?: number;
  btnHeight?: number;
  delete?: string;
  edit?: string;
}
