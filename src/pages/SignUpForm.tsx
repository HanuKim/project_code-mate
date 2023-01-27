// import Modal from "../components/Modal";
import styled from "styled-components";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, dbService } from "../shared/firebase";
import { getAuth } from "firebase/auth";
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
} from "firebase/firestore";

function SignUpForm({
  setIsNotLogin,
  setOpenModal,
}: {
  setIsNotLogin: any;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [modal, setModal] = useState(false);

  const authService = getAuth();
  const uid = authService.currentUser?.uid;

  // email, password 정규식
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  const emailCheck = (email: any) => {
    return emailRegEx.test(email); //형식에 맞을 경우, true 리턴
  };

  console.log('nickname', nickname);
  const passwordCheck = (password: any) => {
    if (password.match(passwordRegEx) === null) {
      //형식에 맞지 않을 경우 아래 alert 출력
      console.log('비밀번호 형식을 확인해주세요');
      return;
    } else {
      // 맞을 경우 출력
      console.log('비밀번호 형식이 맞아요');
    }
  };
  const passwordDoubleCheck = (password: any, passwordConfirm: any) => {
    if (password !== passwordConfirm) {
      console.log('비밀번호가 다릅니다.');
      return;
    } else {
      console.log('비밀번호가 동일합니다.');
    }
  };

  const displayName = auth.currentUser?.displayName;
  console.log('displayName', displayName);
  const userInfo = {
    introduce: '',
    location: '',
    nickname: nickname,
    position: '',
    stack: '',
    userid: uid,
  };

  console.log('email : ', email);
  console.log('PW : ', password);

  const signUpForm = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        console.log('회원가입 성공 ! :', userCredential);
        console.log('디스플레이네임', authService.currentUser.displayName);
        setIsNotLogin(false);
        setOpenModal(false);
         await updateProfile(authService?.currentUser, {
          displayName: nickname,
        });
         addDoc(collection(dbService, 'user'), userInfo);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <form onSubmit={signUpForm}>
        <div className='form-inner'>
          <CloseButton onClick={() => setModal(false)}>x</CloseButton>
          <TitleText>회원가입</TitleText>
          {/* Error! */}
          <SignUpFormContainer>
            <div>
              <EmailInput
                onChange={(e) => {
                  setEmail(e.target.value);
                  emailCheck(e.target.value);
                }}
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                value={email}
              />
            </div>
            <div>
              <NickNameInput
                type='nickname'
                name='nickname'
                id='nickname'
                placeholder='Nick name'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div>
              <PwInput
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  passwordCheck(e.target.value);
                }}
              />
            </div>
            <div>
              <PwChekckInput
                type='password'
                name='passwordConfirm'
                id='passwordConfirm'
                placeholder='Password Confirm'
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                  passwordDoubleCheck(password, e.target.value);
                }}
              />
            </div>
            <Text>
              비밀번호는 영문 대소문자, 숫자를 혼합하여 8~20자를 입력해주세요.
            </Text>
            <JoinBtn type='submit' onClick={() => {}}>
              회원가입
            </JoinBtn>
          </SignUpFormContainer>
        </div>
      </form>
    </Container>
  );
}

export default SignUpForm;

const Container = styled.div`
  margin-top: 18px;
`;

const CloseButton = styled.button`
  width: 18px;
  height: 18px;
  margin-left: 310px;
  margin-bottom: 10px;
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

const SignUpFormContainer = styled.div`
  margin-left: 38px;
  margin-top: 10px;
`;

const TitleText = styled.h2`
  font-size: 20px;
  margin-left: 40px;
`;

const EmailInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 86%;
  color: #7f7d7d;
  border: 1px solid #d0d0d0;
`;

const NickNameInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 86%;
  color: #7f7d7d;
  border: 1px solid #d0d0d0;
`;

const PwInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 86%;
  color: #7f7d7d;
  border: 1px solid #d0d0d0;
`;

const Text = styled.p`
  font-size: 10px;
  color: #262b7f;
  margin-bottom: 0;
`;
const PwChekckInput = styled.input`
  margin-bottom: 2px;
  padding: 10px;
  width: 86%;
  color: #7f7d7d;
  border: 1px solid #d0d0d0;
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

// Firestore DB 연결 Code
const db = collection(dbService, "user"); // (참조할 데이터베이스, 그 데이터베이스의 컬렉션 이름)
const data = {
  introduce: "",
  location: "",
  nickname: "",
  position: "",
  stack: "",
  userid: "",
};
addDoc(db, data) // (들어갈 db, 넣을 데이터)
  .then((db) => {
    console.log("Document has been added successfully");
  })
  .catch((error) => {
    console.log(error);
  });
