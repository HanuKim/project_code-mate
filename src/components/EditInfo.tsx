import { doc, DocumentData, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import styled from "styled-components";
import { authService, dbService } from "../shared/firebase";

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
    await setDoc(doc(dbService, "user", uid), {
      nickName: displayName,
      stack: "",
      gitAddress: "",
      introduce: "",
      userid: uid,
    });
  };
  useEffect(() => {
    const displayName = authService.currentUser?.displayName;
    console.log(displayName);
  }, []);
  const displayName = authService.currentUser?.displayName;
  console.log(displayName);
  return (
    <>
      <IntroduceContainer>
        <InfoWrap>
          <InfoWrapContent>별명 : {displayName}</InfoWrapContent>
          <InfoWrapContent>
            주 포지션 :
            {formData?.stack ? (
              <ViewStackButton> {formData?.stack} </ViewStackButton>
            ) : undefined}
          </InfoWrapContent>
          <InfoWrapContent>
            GitHub Address :{formData?.gitAddress}
          </InfoWrapContent>
        </InfoWrap>
        <IntroduceContent>{formData?.introduce}</IntroduceContent>
        <ProfileContentsBtnBox>
          <EditBtn
            onClick={() => {
              setIsEditProfile(true);
              getProfileName();
            }}>
            편집
          </EditBtn>
        </ProfileContentsBtnBox>
      </IntroduceContainer>
    </>
  );
}

const ViewStackButton = styled.button`
  padding: 4px 8px;
  border-radius: 10px;
  background-color: #262b7f;
  font-size: 12px;
  color: #f2f2f2;
`;

const ProfileContentsBtnBox = styled.div`
  display: flex;
  margin: 12px 0;
  justify-content: flex-end;
`;

const InfoWrap = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 24px;
  margin-bottom: 50px;
`;

const InfoWrapContent = styled.div`
  height: 100%;
  margin: 8px 0;
`;

const IntroduceContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 25px;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
`;

const IntroduceContent = styled.div`
  width: 100%;
  min-height: 200px;
  padding: 20px;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
`;

const EditBtn = styled.button`
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
