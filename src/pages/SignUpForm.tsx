// import Modal from "../components/Modal";
import styled from "styled-components";
import React, { useState, useReducer, useCallback, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../shared/firebase";
import { getAuth } from "firebase/auth";

function SignUpForm({ setIsNotLogin }: { setIsNotLogin: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [modal, setModal] = useState(false);

  const authService = getAuth();
  const uid = authService.currentUser?.uid;

  const 변수 = {
    introduce: "",
    location: "",
    nickname: "",
    position: "",
    stack: "",
    userid: uid,
  };

  console.log("email : ", email);
  console.log("PW : ", password);

  const signUpForm = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("회원가입 성공 ! :", userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <form onSubmit={signUpForm}>
        <div className="form-inner">
          <CloseButton onClick={() => setModal(false)}>x</CloseButton>
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
                placeholder="Nick name"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div>
              <PwInput
                type="password"
                name="password"
                id="password"
                placeholder="Password Confirm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <PwChekckInput
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
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
}

export default SignUpForm;

const Container = styled.div`
  margin-top: 18px;
`;

const CloseButton = styled.button`
  width: 18px;
  height: 18px;
  margin-left: 310px;
  margin-bottom: 20px;
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
  margin-top: 30px;
`;

const TitleText = styled.h2`
  font-size: 20px;
  margin-left: 40px;
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
