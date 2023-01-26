import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../shared/firebase";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CodeMate from "../img/CodeMate.png";
import Modal from "./Modal";

// interface Props {
//   setIsOpen: React.Dispatch<React.SetStateAction<any>>;
// }

export default function Header() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const authService = getAuth();
  const uid = authService.currentUser?.uid;
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

  const logout = () => {
    if (login === true) {
      return signOut(auth).then(() => {
        setLogin(true);
        alert("로그아웃 성공 !");
      });
    } else {
      return signOut(auth).catch((error) => {
        alert("로그아웃 실패..");
      });
    }
  };

  const onClickToggleModal = () => {
    setOpenModal(!isOpenModal);
  };

  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        <LogoBox
          onClick={() => {
            navigate("/");
          }}
        />

        {/* Modal On, Off */}
        {isOpenModal ? (
          <Modal setOpenModal={setOpenModal} isOpenModal={isOpenModal} />
        ) : null}

        <BtnWrap>
          {/* 로그인 유무에 따른 버튼 텍스트 변화 */}
          {authService.currentUser ? (
            <LoginBtn
              onClick={() => {
                logout();
              }}>
              로그아웃
            </LoginBtn>
          ) : (
            <LoginBtn
              onClick={() => {
                onClickToggleModal();
              }}>
              로그인/회원가입
            </LoginBtn>
          )}

          {authService.currentUser ? (
            <LoginBtn
              onClick={() => {
                navigate(`/Mypage/${uid}`);
              }}>
              마이페이지
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
  width: 160px;
  height: 80px;
  margin-left: 70px;
  background-image: url(${CodeMate});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const LoginBtn = styled.button`
  width: 160px;
  height: 50px;
  border: 1px solid #eee;
  border-radius: 30px;
  color: #262b7f;
  font-weight: bold;
  background-color: #fff;
  cursor: pointer;
  transition-duration: 0.3s;
  &:hover {
    background-color: #262b7f;
    color: #fff;
    border: 1px solid #262b7f;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 360px;
  width: 100%;
  height: 100%;
  gap: 15px;
`;
