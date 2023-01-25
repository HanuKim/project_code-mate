import React from "react";
import Modal from "../components/Modal";
import styled from "styled-components";
import { getAuth } from 'firebase/auth';

function SignUpForm({
  setIsNotLogin,
}: {
  setIsNotLogin: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
  const authService = getAuth();
  const uid = authService.currentUser?.uid;

  const 변수 = {
    introduce: '',
    location: '',
    nickname:'',
    position: '',
    stack: '',
    userid : uid,
  }

  return (
    <Container>
      <form>
        <div className='form-inner'>
          <TitleText>회원가입</TitleText>
          {/* Error! */}
          <SignUpFormContainer>
            <div>
              <EmailInput
                type='email'
                name='email'
                id='email'
                placeholder='Email'
              />
            </div>
            <div>
              <NickNameInput
                type='nickname'
                name='nickname'
                id='nickname'
                placeholder='NickName'
              />
            </div>
            <div>
              <PwInput
                type='password'
                name='password'
                id='password'
                placeholder='Password'
              />
            </div>
            <div>
              <PwChekckInput
                type='password'
                name='password'
                id='password'
                placeholder='Password'
              />
            </div>
            <JoinBtn
              onClick={() => {
                setIsNotLogin(false);
              }}
            >
              회원가입
            </JoinBtn>
          </SignUpFormContainer>
        </div>
      </form>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 40px;
`;

const SignUpFormContainer = styled.div`
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

export default SignUpForm;
