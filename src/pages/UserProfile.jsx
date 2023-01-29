import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import CommentItem from "../components/comment/CommentItem";
import Profile from "../components/Profile";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  updateDoc,
  Firestore,
  setDoc,
  DocumentData,
} from "firebase/firestore";
import { auth, dbService, authService } from "../shared/firebase";

import MyPost from "../components/MyPost";
import { identifier } from "@babel/types";
import { getAuth, onAuthStateChanged, updateProfile } from "@firebase/auth";
import { UserInfo } from "../shared/type";
import MyInfo from "../components/MyInfo";
import EditInfo from "../components/EditInfo";
import userEvent from "@testing-library/user-event";

function UserProfileModal({ setOpenProfileModal, isOpenProfileModal }) {
  const [user, setUser] = useState("");
  let { id } = useParams();

  const getUser = async () => {
    const snapshot = await getDoc(doc(dbService, "comment", id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    setUser(data);
    // console.log("data : ", data.nickName);
  };

  console.log("id: ", id);
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Container modalWidth={450} modalHeight={520}>
        <UserProfileImage
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          width={70}
          height={70}
        />
        <UserProfileTextArea>
          <div>
            <UserNickName>{id.nickName}</UserNickName>
          </div>
          <div>
            <UserStack></UserStack>
          </div>
          <div>
            <GitAddress></GitAddress>
          </div>
        </UserProfileTextArea>
        <CloseButton onClick={() => setOpenProfileModal(false)}>x</CloseButton>
        <UserProfileIntroduce></UserProfileIntroduce>
      </Container>

      <ContainerBg
        onClick={(e) => {
          e.preventDefault();

          if (isOpenProfileModal) {
            setOpenProfileModal(false);
          }
        }}
      />
    </>
  );
}
export default UserProfileModal;

const CloseButton = styled.button`
  float: right;
  width: 18px;
  height: 18px;
  margin-top: -88px;
  margin-right: 20px;
  border-radius: 100px;
  border: none;
  background-color: black;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #262b7f;
    box-shadow: 2px 4px 3px -3px black;
    transition: 0.3s;
  }
`;

const UserProfileImage = styled.img`
  border-radius: 100px;
  margin-top: 30px;
  margin-left: 30px;
`;

const UserProfileTextArea = styled.div`
  float: right;
  margin-top: 30px;
  margin-right: 280px;
`;

const UserNickName = styled.text``;

const UserStack = styled.text`
  font-size: 10px;
`;

const GitAddress = styled.text`
  font-size: 10px;
`;

const UserProfileIntroduce = styled.div`
  border: 1px solid black;
  width: 85%;
  height: 69%;
  margin-left: 34px;
  margin-top: 20px;
  border-radius: 5px;
`;

const ContainerBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Container = styled.div`
  width: ${(props) => props.modalWidth + "px"};
  height: ${(props) => props.modalHeight + "px"};
  border: 1px solid #aaa;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f2f2f2;
  box-shadow: 3px 3px 5px black;
  align-items: center;
  z-index: 2;
`;
