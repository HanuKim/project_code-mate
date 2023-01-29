import { Timestamp } from "firebase/firestore";

export interface ModalProps {
  modalWidth: number;
  modalHeight: number;
}
export interface PostState {
  id: string;
  nickName: string;
  category: string[];
  content: string;
  createdAt: string;
  title: string;
  userid: number;
  coord: string;
  profileImg: string;
}

export interface UserInfo {
  introduce: string;
  gitAddress: string;
  nickName: string;
  stack: string;
  userid: string;
}

export interface MapProps {
  center: { lat: number; lng: number };
  isPanto?: boolean;
}
export interface Comment {
  id: string;
  commentText: string;
  postId: string;
  userId: any;
  nickName: string;
  createdAt: string;
  isEdit: boolean;
  profileImg: string;
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

export interface Mapprops {
  location: {
    lng: string;
    lat: string;
  };
}

export interface MixBtnProps extends BtnProps, Mapprops {}
