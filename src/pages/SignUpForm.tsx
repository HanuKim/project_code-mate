// import Modal from "../components/Modal";
import styled from "styled-components";

import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, dbService} from '../shared/firebase';
import { getAuth } from 'firebase/auth';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  DocumentData,
  Timestamp,
  limit,
  QuerySnapshot,
  serverTimestamp,
} from 'firebase/firestore';


function SignUpForm ({
  setIsNotLogin,
}: {
  setIsNotLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  //todo 닉네임 상태 관리
  const [] = useState("");
  
  const authService = getAuth();
  const uid = authService.currentUser?.uid;
  const displayName = auth.currentUser?.displayName;
  console.log('displayName', displayName);
  const userInfo = {
    introduce: '',
    location: '',
    nickname: nickName,
    position: '',
    stack: '',
    userid: uid,
  };

  console.log("email : ", email);
  console.log("PW : ", password);

  const signUpForm = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log('회원가입 성공 ! :', userCredential);
        await addDoc(collection(dbService, 'user'), userInfo);
        setIsNotLogin(false);
        updateProfile(authService.currentUser, {
          displayName: nickName,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <Container>
      <form onSubmit={signUpForm}>
        <div className="form-inner">
          <TitleText>회원가입</TitleText>
          {/* Error! */}
          <SignUpFormContainer>
            <div>
              <EmailInput
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <NickNameInput
                type="nickname"
                name="nickname"
                id="nickname"
                placeholder="NickName"
                value={nickName}
                onChange={(e)=> setNickName(e.target.value)}
              />
            </div>
            <div>
              <PwInput
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <PwChekckInput
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <JoinBtn type="submit" onClick={() => {}}>
              회원가입
            </JoinBtn>
          </SignUpFormContainer>
        </div>
      </form>
    </Container>
  );
};

export default SignUpForm;


const Container = styled.div`
  margin-top: 40px;
`;

const SignUpFormContainer = styled.div`
  margin-left: 38px;
  margin-top: 30px;
`;

const TitleText = styled.h2`
  font-size: 20px;
  margin-left: 40px;
  margin-top: 60px;
`;

const EmailInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 86%;
  color: #d0d0d0;
`;

const NickNameInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 86%;
  color: #d0d0d0;
`;

const PwInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 86%;
  color: #d0d0d0;
`;

const PwChekckInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 86%;
  color: #d0d0d0;
`;

const JoinBtn = styled.button`
  border: none;
  border-radius: 5px;
  padding: 8px;
  width: 86%;
  margin: 20px;
  margin-left: 0px;
  margin-top: 10px;
  position: flex;
  align-items: center;
  background-color: #262b7f;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #ffffff;
    border: 1px solid #262b7f;
    box-shadow: 1px 1px 1px 1px #262b7f;
    color: #262b7f;
  }
`;
