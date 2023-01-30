import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, dbService } from "../shared/firebase";
import { getAuth } from "firebase/auth";
import {
  setDoc,
  doc,
  collection,
  getDocs,
  where,
  query,
  DocumentData,
} from "firebase/firestore";
import close from "../img/close.png";
import AlertModal from "../components/modal/AlertModal";

export default function SignUpForm({
  setIsNotLogin,
  setOpenModal,
}: {
  setIsNotLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [checkNick, setCheckNick] = useState<DocumentData>();

  const authService = getAuth();
  const uid = authService.currentUser?.uid;
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const [AlertMessageText, setAlertMessageText] = useState("");

  // email, password 정규식
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  const emailCheck = (email: any) => {
    return emailRegEx.test(email); //형식에 맞을 경우, true 리턴
  };
  const passwordCheck = (password: any) => {
    if (password.match(passwordRegEx) === null) {
      //형식에 맞지 않을 경우 아래 alert 출력
      console.log("비밀번호 형식을 확인해주세요");
    } else {
      // 맞을 경우 출력
      console.log("비밀번호 형식이 맞아요");
    }
  };
  const passwordDoubleCheck = (password: any, passwordConfirm: any) => {
    if (password !== passwordConfirm) {
      console.log("비밀번호가 다릅니다.");
      return;
    } else {
      console.log("비밀번호가 동일합니다.");
    }
  };

  // 회원가입 시, DB와 비교하여 닉네임을 체크해주는 함수입니다.
  const getNick = async () => {
    const q = query(
      collection(dbService, "user"),
      where("nickName", "==", nickname)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const isNick: any = {
        ...doc.data(),
      };
      setCheckNick(isNick);
    });
  };
  useEffect(() => {
    getNick();
  }, [nickname]);
  // -----------------------------------------------

  // Join Btn 시작
  const signUpForm = (e: any) => {
    e.preventDefault();

    if (email.match(emailRegEx) === null) {
      setAlertModal(true);
      setAlertMessageText("이메일 형식을 확인해주세요.");
      return;
    } else if (nickname === "") {
      setAlertModal(true);
      setAlertMessageText("닉네임을 입력해주세요.");
      return;
    } else if (checkNick.nickName === nickname) {
      setAlertModal(true);
      setAlertMessageText("중복된 닉네임입니다.");
      return;
    } else if (password.match(passwordRegEx) === null) {
      setAlertModal(true);
      setAlertMessageText("비밀번호 형식을 확인해주세요.");
      return;
    } else if (password !== passwordConfirm) {
      setAlertModal(true);
      setAlertMessageText("비밀번호와 비밀번호 확인은 같아야 합니다.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setAlertModal(true);
        setAlertMessageText("회원가입 완료! 🎉");
        if (alertModal === true) {
          setIsNotLogin(false);
        }
        await setDoc(doc(dbService, "user", email), {
          userid: "",
          nickName: nickname,
          gitAddress: "",
          introduce: "",
          stack: "",
          imageUrl: "",
          useremail: email,
        });
        console.log(uid);
        await updateProfile(authService?.currentUser, {
          displayName: nickname,
        });
      })
      .catch(async (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorMessage.includes("auth/email-already-in-use")) {
          setAlertModal(true);
          setAlertMessageText("이미 가입된 회원입니다.");
          return;
        } else if (errorMessage.includes("auth/displayName-already-in-use")) {
          setAlertModal(true);
          setAlertMessageText("동일한 닉네임이 존재합니다.");
          return;
        } else {
          return;
        }
      });
  };

  // input마다 onKeyDown 속성에 이 함수를 넣었습니다.
  // input에서 Enter를 누르면 signUpForm 함수가 실행됩니다.
  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      signUpForm(e);
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
      <Form onSubmit={signUpForm}>
        <BtnContainer>
          <CloseButton onClick={() => setOpenModal(false)}></CloseButton>
        </BtnContainer>
        <TitleText>회원가입</TitleText>
        <EmailInput
          onChange={(e) => {
            setEmail(e.target.value);
            emailCheck(e.target.value);
          }}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          required
          onKeyDown={handleOnKeyPress}
        />

        <NickNameWrap>
          <NickNameInput
            type="nickname"
            name="nickname"
            id="nickname"
            placeholder="Nick name"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            onKeyDown={handleOnKeyPress}
          />

          <NickNameCheckBtn
            onClick={() => {
              getNick();
            }}>
            중복검사
          </NickNameCheckBtn>
        </NickNameWrap>

        <PwInput
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            passwordCheck(e.target.value);
          }}
          required
          onKeyDown={handleOnKeyPress}
        />

        <PwChekckInput
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="Password Confirm"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
            passwordDoubleCheck(password, e.target.value);
          }}
          required
          onKeyDown={handleOnKeyPress}
        />

        <Text>비밀번호는 영문자, 숫자를 혼합하여 8~20자를 입력해주세요.</Text>
        <JoinBtn type="submit" onClick={signUpForm}>
          Join !
        </JoinBtn>
        <LoginBtn
          onClick={() => {
            setIsNotLogin(false);
          }}>
          Back to SignIn
        </LoginBtn>
      </Form>
    </>
  );
}

const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
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

const TitleText = styled.h2`
  margin: inherit;
  margin: 16px 0;
  font-size: 20px;
`;

const EmailInput = styled.input`
  width: 318px;
  color: #333;
  background: #d0d0d0;
  margin-bottom: 12px;
  padding: 8px;
  font-size: 14px;
  transition-duration: 0.3s;
  :focus {
    box-shadow: 3px 3px 3px #aaa;
    transform: scale(1.03);
  }
`;

const NickNameInput = styled.input`
  width: 70%;
  color: #333;
  background: #d0d0d0;
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
  background: #d0d0d0;
  margin-bottom: 12px;
  padding: 8px;
  font-size: 14px;
  transition-duration: 0.3s;
  :focus {
    transform: scale(1.03);
    box-shadow: 3px 3px 3px #aaa;
  }
`;

const PwChekckInput = styled.input`
  width: 318px;
  color: #333;
  background: #d0d0d0;
  margin-bottom: 4px;
  padding: 8px;
  font-size: 14px;
  transition-duration: 0.3s;
  :focus {
    transform: scale(1.03);
    box-shadow: 3px 3px 3px #aaa;
  }
`;

const Text = styled.p`
  font-size: 12px;
  color: #262b7f;
  margin-bottom: 32px;
`;

const NickNameWrap = styled.div`
  width: 80%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NickNameCheckBtn = styled.button`
  height: 36px;

  margin-bottom: 8px;
  padding: 0 12px;

  align-self: flex-start;
  border-radius: 10px;

  font-size: 12px;

  color: #f2f2f2;
  background-color: #476be3;
  transition-duration: 0.3s;
  :hover {
    box-shadow: 3px 3px 5px #aaa;
    background-color: #fff;
    color: #476be3;
  }
`;

const JoinBtn = styled.button`
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
