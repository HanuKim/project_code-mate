import { DocumentData } from 'firebase/firestore';
import React, { useState } from 'react';
import styled from 'styled-components';
import { authService } from '../shared/firebase';

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
      <EditMyInfoForm onSubmit={onSubmitMyInfo}>
        <ProfileContentsBox>
          <label>
            NickName:
            <input
              type="text"
              onChange={handleChange}
              value={formData?.nickName ?? displayName}
              id="nickName"
              name="nickName"
            />
          </label>

          <StackContainer>
            Stack:
            <StackButton
              type="button"
              value={'프론트엔드'}
              onClick={handleChange}
              id="stack"
              name="stack"
              style={{
                backgroundColor:
                  stackData === '프론트엔드' ? '#262b7f' : '#ffffff',
                color: stackData === '프론트엔드' ? '#ffffff' : '#262b7f',
              }}
            />
            <StackButton
              type="button"
              value={'백엔드'}
              onClick={handleChange}
              style={{
                backgroundColor: stackData === '백엔드' ? '#262b7f' : '#ffffff',
                color: stackData === '백엔드' ? '#ffffff' : '#262b7f',
              }}
              id="stack"
              name="stack"
            />
            <StackButton
              type="button"
              value={'디자이너'}
              onClick={handleChange}
              style={{
                backgroundColor:
                  stackData === '디자이너' ? '#262b7f' : '#ffffff',
                color: stackData === '디자이너' ? '#ffffff' : '#262b7f',
              }}
              id="stack"
              name="stack"
            />
            <StackButton
              type="button"
              value={'퍼블리셔'}
              onClick={handleChange}
              style={{
                backgroundColor:
                  stackData === '퍼블리셔' ? '#262b7f' : '#ffffff',
                color: stackData === '퍼블리셔' ? '#ffffff' : '#262b7f',
              }}
            />
            <StackButton
              type="button"
              value={'PM'}
              onClick={handleChange}
              style={{
                backgroundColor: stackData === 'PM' ? '#262b7f' : '#ffffff',
                color: stackData === 'PM' ? '#ffffff' : '#262b7f',
              }}
              id="stack"
              name="stack"
            />
          </StackContainer>

          <label>
            github_Address:
            <input
              type="text"
              onChange={handleChange}
              value={formData?.gitAddress}
              id="gitAddress"
              name="gitAddress"
            />
          </label>
          <label>
            introduce:
            <input
              type="text"
              onChange={handleChange}
              value={formData?.introduce}
              id="introduce"
              name="introduce"
            />
          </label>
        </ProfileContentsBox>
        <ProfileContentsBtnBox>
          <button>저장</button>
        </ProfileContentsBtnBox>
      </EditMyInfoForm>
    </>
  );
}

const EditMyInfoForm = styled.form``;

const ProfileContentsBox = styled.div`
  /* background-color: blue; */
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  margin-top: -7px;
`;

const StackContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const StackButton = styled.input`
  height: 30px;
  line-height: 26px;
  border: 1px solid black;
  border-radius: 30px;
  background-color: #ffffff;
  padding: 0 15px;
  filter: drop-shadow(1px 2px 3px #818181);
  font-size: 12px;
  &:hover {
    border: 2px solid #262b7f;
  }
`;

const ProfileContentsBtnBox = styled.div`
  /* background-color: gray; */
  position: absolute;
  right: 70px;
  top: 215px;
`;
