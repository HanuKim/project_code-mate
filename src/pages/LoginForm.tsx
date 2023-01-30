import React, { useState } from "react";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../shared/firebase";
import close from "../img/close.png";
import AlertModal from "../components/modal/AlertModal";

function LoginForm({
  setIsNotLogin,
  setOpenModal,
}: {
  setIsNotLogin: any;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertText, setAlertText] = useState("");
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const [AlertMessageText, setAlertMessageText] = useState("");

  const alertTextTimer = (message: any) => {
    setAlertText(message);
    setTimeout(() => setAlertText(""), 3000);
  };
  // email, password 정규식
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  const signIn = (e: any) => {
    e.preventDefault();

    if (email.match(emailRegEx) === null) {
      setAlertModal(true);
      setAlertMessageText("올바른 이메일 형식이 아닙니다.");
      //return;
    } else if (password.match(passwordRegEx) === null) {
      setAlertModal(true);
      setAlertMessageText(
        "비밀번호를 확인해주세요. 영문자, 숫자 혼합 8~20자입니다."
      );
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAlertModal(true);
        setAlertMessageText("로그인 성공! 🎉");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage.includes("user-not-found")) {
          setAlertModal(true);
          setAlertMessageText("가입되지 않은 회원입니다.");
          return;
        } else if (errorMessage.includes("wrong-password")) {
          setAlertModal(true);
          setAlertMessageText("비밀번호가 올바르지 않습니다.");
        } else {
        }
      });
  };

  // input마다 onKeyDown 속성에 이 함수를 넣었습니다.
  // input에서 Enter를 누르면 signIn 함수가 실행됩니다.
  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      signIn(e);
    }
  };
  return (
    <>
      {alertModal ? (
        <AlertModal
          children={AlertMessageText}
          setAlertModal={setAlertModal}
          setOpenModal={setOpenModal}
        />
      ) : null}
      <Form onSubmit={signIn}>
        <BtnContainer>
          <CloseButton onClick={() => setOpenModal(false)}></CloseButton>
        </BtnContainer>
        <TitleText>로그인</TitleText>
        {/* Error! */}
        <LoginFormContainer>
          <div>
            <EmailInput
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              onKeyDown={handleOnKeyPress}
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
              required
              onKeyDown={handleOnKeyPress}
            />
          </div>
          <SignUpBtn
            onClick={() => {
              setIsNotLogin(true);
            }}>
            Join
          </SignUpBtn>
          <LoginBtn>SignIn</LoginBtn>
        </LoginFormContainer>
      </Form>
    </>
  );
}
export default LoginForm;

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.div`
  width: 32px;
  height: 32px;

  margin-top: 20px;
  margin-right: 12px;

  background-image: url(${close});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  cursor: pointer;
`;

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.h2`
  font-size: 20px;
  margin-left: 40px;
  margin-top: 10px;
`;

const EmailInput = styled.input`
  width: 318px;
  color: #333;
  margin-bottom: 12px;
  padding: 8px;
  font-size: 14px;
  transition-duration: 0.3s;
  :focus {
    box-shadow: 3px 3px 3px #aaa;
    transform: scale(1.03);
  }
`;

const PwInput = styled.input`
  width: 318px;
  color: #333;
  margin-bottom: 32px;
  padding: 8px;
  font-size: 14px;
  transition-duration: 0.3s;
  :focus {
    transform: scale(1.03);
    box-shadow: 3px 3px 3px #aaa;
  }
`;
const SignUpBtn = styled.button`
  background-color: #333;
  color: #f2f2f2;
  width: 80%;
  margin-bottom: 8px;
  padding: 12px;

  cursor: pointer;
`;

const LoginBtn = styled.button`
  width: 80%;
  padding: 12px;
  background-color: #262b7f;
  color: #ffffff;
  cursor: pointer;
`;
