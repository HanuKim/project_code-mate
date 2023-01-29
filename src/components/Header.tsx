import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../shared/firebase";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CodeMate from "../img/CodeMate.png";
import Modal from "./Modal";
import AlertModal from "./modal/AlertModal";
// interface Props {
//   setIsOpen: React.Dispatch<React.SetStateAction<any>>;
// }

export default function Header() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const [AlertMessageText, setAlertMessageText] = useState("");
  const authService = getAuth();
  const uid = authService.currentUser?.uid;

  // login, logout 상태 변화 감지
  const [authUser, setAuthUser] = useState(null);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);
  // ----------------------

  const logout = () => {
    signOut(auth)
      .then(() => {
        //alert("로그아웃 성공 !");
        setAlertModal(true);
        setAlertMessageText("로그아웃 성공 !");
      })
      .catch((error) => {
        //alert("로그아웃 실패..");
        setAlertModal(true);
        setAlertMessageText("로그아웃 실패..");
      });
  };

  const onClickToggleModal = () => {
    setOpenModal(!isOpenModal);
  };

  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        {alertModal ? (
          <AlertModal
            children={AlertMessageText}
            setAlertModal={setAlertModal}
            setOpenModal={setOpenModal}
          />
        ) : null}
        <LogoBox
          onClick={() => {
            navigate("/");
          }}
        />

        {/* Modal On, Off */}
        {isOpenModal ? (
          <Modal setOpenModal={setOpenModal} isOpenModal={isOpenModal} />
        ) : null}
        {/* 여백 emptyBox 공간 */}
        <EmptyBox></EmptyBox>

        <BtnWrap>
          {/* 로그인 유무에 따른 버튼 텍스트 변화 */}
          {authService.currentUser ? (
            <LoginBtn
              onClick={() => {
                logout();
                navigate("/");
              }}>
              SignOut
            </LoginBtn>
          ) : (
            <LoginBtn
              onClick={() => {
                onClickToggleModal();
              }}>
              SignUp / Join
            </LoginBtn>
          )}

          {authService.currentUser ? (
            <LoginBtn
              onClick={() => {
                navigate(`/Mypage/${uid}`);
              }}>
              MyPage
            </LoginBtn>
          ) : null}
        </BtnWrap>
      </HeaderContainer>
    </>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 120px;
  margin-bottom: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 1px -1px 3px #333;
`;

const LogoBox = styled.div`
  min-width: 160px;
  height: 80px;
  margin-left: 40px;
  background-image: url(${CodeMate});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const BtnWrap = styled.div`
  max-width: 260px;
  width: 100%;
  height: 100%;
  margin-right: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0 20px;
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 100%;
`;

const LoginBtn = styled.button`
  width: 120px;
  height: 40px;
  border: 1px solid #d0d0d0;
  border-radius: 30px;
  color: #262b7f;
  font-weight: bold;
  background-color: #fff;
  cursor: pointer;
  transition-duration: 0.3s;
  &:hover {
    background-color: #262b7f;
    border: 1px solid #262b7f;
    color: #fff;
  }
`;
