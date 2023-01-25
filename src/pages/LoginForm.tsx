import React from "react";
import Modal from "../components/Modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  return (
    <Container>
      <form>
        <div className="form-inner">
          <TitleText>로그인</TitleText>
          {/* Error! */}
          <LoginFormContainer>
            <div>
              <EmailInput type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div>
              <PwInput type="password" name="password" id="password" placeholder="Password" />
            </div>
            <LoginBtnContainer>
              <SignUpBtn
                onClick={() => {
                  navigate("/signupform");
                }}
              >
                회원가입
              </SignUpBtn>
              <LoginBtn>로그인</LoginBtn>
            </LoginBtnContainer>
          </LoginFormContainer>
        </div>
      </form>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 40px;
`;

const LoginFormContainer = styled.div`
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
  padding: 10px;
  width: 86%;
  color: #7f7d7d;
  border: 1px solid #d0d0d0;
`;

const PwInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 86%;
  border: 1px solid #d0d0d0;
  color: #7f7d7d;
`;
const SignUpBtn = styled.button`
  border: none;
  width: 30%;
  margin-top: 18px;
  margin-left: 87px;
  margin-bottom: 5px;
  cursor: pointer;
  color: #a29f9f;
  &:hover {
    color: #262b7f;
  }
`;

const LoginBtn = styled.button`
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

const LoginBtnContainer = styled.div``;
export default LoginForm;
