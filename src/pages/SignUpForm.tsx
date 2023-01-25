import React from "react";
import SignUpModal from "../components/modal/SignUpModal";
import styled from "styled-components";

function SignUpForm() {
  return (
    <Container>
      <form>
        <div className="form-inner">
          <TitleText>회원가입</TitleText>
          {/* Error! */}
          <SignUpFormContainer>
            <div>
              <EmailInput type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div>
              <PwInput type="password" name="password" id="password" placeholder="Password" />
            </div>
            <div>
              <PwChekckInput type="password" name="password" id="password" placeholder="Password" />
            </div>
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

export default SignUpForm;
