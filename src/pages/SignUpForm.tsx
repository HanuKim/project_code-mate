// import Modal from "../components/Modal";
import styled from 'styled-components';
import React, {useState, Dispatch, useEffect} from 'react';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth, dbService} from '../shared/firebase';
import {getAuth} from 'firebase/auth';
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
  setDoc,
  doc,
  query,
  where,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import {useDispatch} from 'react-redux';
import AlertModal from "../components/modal/AlertModal";

export default function SignUpForm({
  setIsNotLogin,
  setOpenModal,
}: {
  setIsNotLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [authObj, setAuthObj] = useState({
    nickName: '',
  });
  const AlertMessageTextMessge = useState("");
  const authService = getAuth();
  const uid = authService.currentUser?.uid;

  const [modalOpen, setModalOpen] = useState(false);
  const [authObj, setAuthObj] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [dpNameCheck, setDpNameCheck] = useState(false);
  const [checkError, setCheckError] = useState("");
  const [error, setError] = useState("");
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
      setAlertMessageText("비밀번호 형식을 확인해주세요.");
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

  const displayName = auth.currentUser?.displayName;

  const signUpForm = (e: any) => {
    e.preventDefault();
    if (email.match(emailRegEx) === null) {
      //형식에 맞지 않을 경우 아래 alert 출력
      //return alert("이메일 형식을 확인해주세요.");
      setAlertModal(true);
      setAlertMessageText("이메일 형식을 확인해주세요.");
    }
    if (nickname === "") {
      //return alert("닉네임을 입력해주세요.");
      setAlertModal(true);
      setAlertMessageText("닉네임을 입력해주세요.");
    }
    if (password.match(passwordRegEx) === null) {
      //형식에 맞지 않을 경우 아래 alert 출력
      //return alert("비밀번호 형식을 확인해주세요.");
      setAlertModal(true);
      setAlertMessageText("비밀번호 형식을 확인해주세요.");
    }
    if (password !== passwordConfirm) {

      //return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
      setAlertModal(true);
      setAlertMessageText("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setAlertModal(true);
        setAlertMessageText("회원가입 완료! 🎉");
        if (alertModal === true) {
          setIsNotLogin(false);
        }
        //setOpenModal(false);
        await updateProfile(authService?.currentUser, {
          displayName: nickname,
        });

        await setDoc(doc(dbService, "user", uid), {
          userid: uid,
          nickName: nickname,
          gitAddress: '3',
          introduce: '3',
          stack: '3',
        });
        console.log(uid)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorMessage.includes("auth/email-already-in-use")) {
          // alert("이미 가입된 회원입니다.");
          // return;
          setAlertModal(true);
          setAlertMessageText("이미 가입된 회원입니다.");
        }
        if (errorMessage.includes("auth/displayName-already-in-use")) {
          // alert("동일한 닉네임이 존재합니다.");
          // return;
          setAlertModal(true);
          setAlertMessageText("동일한 닉네임이 존재합니다.");
        } else {
          //alert("회원가입 완료! 🎉");
          //return;

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
    <Container>
      {alertModal ? (
        <AlertModal
          children={AlertMessageText}
          setAlertModal={setAlertModal}
          setOpenModal={setOpenModal}
        />
      ) : null}
      <form onSubmit={signUpForm}>

        <div className="form-inner">
          <CloseButton onClick={() => setOpenModal(false)}>x</CloseButton>
          <TitleText>회원가입</TitleText>
          {/* Error! */}
          <SignUpFormContainer>
            <div>
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
            </div>
            <div>
              <NickNameInput
                type="nickname"
                name="nickname"
                id="nickname"
                placeholder="Nick name"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  passwordCheck(e.target.value);
                }}
                required
                onKeyDown={handleOnKeyPress}
              />
            </div>
            <div>
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
            </div>
            <Text>
              비밀번호는 영문자, 숫자를 혼합하여 8~20자를 입력해주세요.
            </Text>
            <JoinBtn type="submit" onClick={signUpForm}>
              회원가입
            </JoinBtn>
            <LoginBtn
              onClick={() => {
                setIsNotLogin(false);
              }}
            >
              로그인 화면으로
            </LoginBtn>
          </SignUpFormContainer>
        </div>
      </form>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 18px;
`;

const CloseButton = styled.button`
  width: 18px;
  height: 18px;
  margin-left: 310px;
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
`;

const TitleText = styled.h2`
  font-size: 20px;
  margin-left: 40px;
  margin-top: 3px;
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
    transition: 0.3s;
  }
`;

const LoginBtn = styled.button`
  border: none;
  width: 50%;
  margin-bottom: 10px;
  margin-left: 55px;
  margin-top: 15px;
  cursor: pointer;
  color: #a29f9f;
  &:hover {
    color: #262b7f;
    transition: 0.3s;
  }
`;
