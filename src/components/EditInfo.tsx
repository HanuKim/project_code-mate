import {doc, DocumentData, setDoc} from 'firebase/firestore';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { authService, dbService } from '../shared/firebase';

export default function EditInfo({
  myInfo,
  setIsEditProfile,
  stack,
  formData,
}: {
  myInfo: DocumentData;
  setIsEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  stack: string;
  formData: DocumentData;
  }) {
  const getProfileName = async () => {
    const displayName = authService.currentUser?.displayName;
      const uid = authService.currentUser?.uid;
    await setDoc(doc(dbService, 'user', uid), {
      nickName: displayName,
      stack: '',
      gitAddress: '',
      introduce: '',
      userid: uid,
    });
  }
  useEffect(() => {
      const displayName = authService.currentUser?.displayName;
      console.log(displayName);
  },[])
  const displayName = authService.currentUser?.displayName;
  console.log(displayName);
  return (
    <>
      <p>Nickname: {displayName}</p>
      <p>
        Stack:
        {formData?.stack ? (
          <ViewStackButton>{formData?.stack}</ViewStackButton>
        ) : undefined}
      </p>

      <p>github_Address:{formData?.gitAddress}</p>
      <p>introduce:{formData?.introduce}</p>
      <ProfileContentsBtnBox>
        <button
          onClick={() => {
            setIsEditProfile(true);
            getProfileName();
          }}
        >
          편집
        </button>
      </ProfileContentsBtnBox>
    </>
  );
}

const ViewStackButton = styled.button`
  padding: 0 15px;
  height: 30px;
  border: 1px solid black;
  border-radius: 30px;
  background-color: #262b7f;
  filter: drop-shadow(1px 2px 3px #818181);
  font-size: 12px;
  color: #ffffff;
`;

const ProfileContentsBtnBox = styled.div`
  background-color: gray;
  position: absolute;
  right: 70px;
`;
