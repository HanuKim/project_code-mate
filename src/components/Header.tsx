import React, { useState } from 'react';
import styled from 'styled-components';
import CodeMate from '../img/CodeMate.png';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const goToMypageHandler = () => {
    navigate('/Mypage');
  };

  return (
    <>
      <HeaderContainer>
        <LogoBox />
        <LoginBtn onClick={goToMypageHandler}>로그인/회원가입</LoginBtn>
      </HeaderContainer>
    </>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
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
  margin-right: 70px;
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
    box-shadow: 1px 1px 1px #aaa;
  }
`;
