import { getAuth } from "firebase/auth";
import React, { useState, useCallback } from "react";
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
          <LoginBtn onClick={onClickToggleModal}>
            {uid ? "로그아웃" : "로그인/회원가입"}
          </LoginBtn>

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
