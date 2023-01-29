import { DocumentData } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { authService } from "../shared/firebase";

export default function MyInfo({
  isEditProfile,
  onChangeNickName,
  myInfo,
  setStack,
  stack,
  onChangegitAddress,
  onChangeintroduce,
  setIsEditProfile,
  onSubmitMyInfo,
  formData,
  handleChange,
}: {
  isEditProfile: boolean;
  onChangeNickName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  myInfo: DocumentData;
  setStack: any;
  stack: string;
  onChangegitAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeintroduce: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitMyInfo: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: any;
  handleChange: (e: any) => void;
}) {
  const displayName = authService.currentUser?.displayName;
  const stackData = formData?.stack;

  return (
    <>
      <form onSubmit={onSubmitMyInfo}>
        <Container>
          <ProfileContentsBox>
            <Input
              type="text"
              placeholder="활동명을 작성해주세요."
              onChange={handleChange}
              value={formData?.nickName ?? displayName}
              id="nickName"
              name="nickName"
              maxLength={10}
              style={{ width: "180px" }}
            />

            <StackContainer>
              <StackButton
                type="button"
                value={"FrontEnd"}
                onClick={handleChange}
                id="stack"
                name="stack"
                style={{
                  backgroundColor:
                    stackData === "FrontEnd" ? "#262b7f" : "#ffffff",
                  color: stackData === "FrontEnd" ? "#ffffff" : "#262b7f",
                }}
              />
              <StackButton
                type="button"
                value={"BackEnd"}
                onClick={handleChange}
                style={{
                  backgroundColor:
                    stackData === "BackEnd" ? "#262b7f" : "#ffffff",
                  color: stackData === "BackEnd" ? "#ffffff" : "#262b7f",
                }}
                id="stack"
                name="stack"
              />
              <StackButton
                type="button"
                value={"Designer"}
                onClick={handleChange}
                style={{
                  backgroundColor:
                    stackData === "Designer" ? "#262b7f" : "#ffffff",
                  color: stackData === "Designer" ? "#ffffff" : "#262b7f",
                }}
                id="stack"
                name="stack"
              />
              <StackButton
                type="button"
                value={"Web Publish"}
                onClick={handleChange}
                style={{
                  backgroundColor:
                    stackData === "Web Publish" ? "#262b7f" : "#ffffff",
                  color: stackData === "Web Publish" ? "#ffffff" : "#262b7f",
                }}
                id="stack"
                name="stack"
              />
              <StackButton
                type="button"
                value={"Product Manage"}
                onClick={handleChange}
                style={{
                  backgroundColor:
                    stackData === "Product Manage" ? "#262b7f" : "#ffffff",
                  color: stackData === "Product Manage" ? "#ffffff" : "#262b7f",
                }}
                id="stack"
                name="stack"
              />
            </StackContainer>

            <Input
              type="text"
              onChange={handleChange}
              value={formData?.gitAddress}
              id="gitAddress"
              name="gitAddress"
              placeholder="본인 Github 주소를 소개합니다."
              style={{ width: "240px" }}
            />
            <TextAreaIntroduce
              placeholder="간단한 소개글을 적어주세요."
              onChange={handleChange}
              value={formData?.introduce}
              id="introduce"
              name="introduce"
              maxLength={150}></TextAreaIntroduce>
            <BtnContainer>
              <BtnWrap>
                <SaveBtn>저장</SaveBtn>
                <CancelBtn
                  onClick={() => {
                    setIsEditProfile(false);
                  }}>
                  취소
                </CancelBtn>
              </BtnWrap>
            </BtnContainer>
          </ProfileContentsBox>
        </Container>
      </form>
    </>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 25px;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
`;

const ProfileContentsBox = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
`;

const StackContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;

  border: 1px solid #d0d0d0;
  border-radius: 10px;

  transition-duration: 0.3s;
  :focus {
    background-color: #fff;
    transform: scale(1.03);
    box-shadow: 3px 3px 3px #aaa;
  }
`;

const TextAreaIntroduce = styled.textarea`
  min-height: 200px;
  width: 100%;
  height: 100%;
  padding: 16px;

  border: 1px solid #d0d0d0;
  border-radius: 10px;

  transition-duration: 0.3s;

  :focus {
    transform: scale(1.03);
    box-shadow: 3px 3px 3px #aaa;
  }
`;

const StackButton = styled.input`
  height: 30px;
  line-height: 26px;
  border: 1px solid #d0d0d0;
  border-radius: 30px;
  background-color: #ffffff;
  padding: 0 15px;
  font-size: 12px;
  transition-duration: 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const BtnContainer = styled.div`
  width: 100%;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SaveBtn = styled.button`
  margin-right: 8px;
  padding: 4px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  color: #262b7f;
  background-color: #fff;
  :hover {
    color: #fff;
    background-color: #262b7f;
    border: 1px solid #262b7f;
  }
`;

const CancelBtn = styled.button`
  padding: 4px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  color: #262b7f;
  background-color: #fff;
  :hover {
    color: #fff;
    background-color: #262b7f;
    border: 1px solid #262b7f;
  }
`;
