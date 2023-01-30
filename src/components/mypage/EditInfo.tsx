import {DocumentData} from 'firebase/firestore';
import React from 'react';
import styled from 'styled-components';
import {authService} from '../../shared/firebase';
import gitIcon from '../../img/gitIcon.png';
import notgitIcon from '../../img/notgitIcon.png';
export default function EditInfo({
  setIsEditProfile,
  formData,
}: {
  myInfo: DocumentData;
  setIsEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  stack: string;
  formData: DocumentData;
}) {
  const displayName = authService.currentUser?.displayName;

  return (
    <>
      <IntroduceContainer>
        <InfoWrap>
          <InfoWrapContent>Name : {displayName}</InfoWrapContent>
          <InfoWrapContent>
            Position :
            {formData?.stack ? (
              <CategoryBt> {formData?.stack} </CategoryBt>
            ) : undefined}
          </InfoWrapContent>
          <InfoWrapContent>
            <IconContainer>
              {formData?.gitAddress ? (
                <a href={formData?.gitAddress} target='_blank'>
                  <GitIcon />
                </a>
              ) : (
                <NotGitIcon />
              )}
            </IconContainer>
          </InfoWrapContent>
        </InfoWrap>
        <IntroduceContent>{formData?.introduce}</IntroduceContent>
        <ProfileContentsBtnBox>
          <EditBtn
            onClick={() => {
              setIsEditProfile(true);
            }}
          >
            편집
          </EditBtn>
        </ProfileContentsBtnBox>
      </IntroduceContainer>
    </>
  );
}

const ProfileContentsBtnBox = styled.div`
  display: flex;
  margin: 12px 0;
  justify-content: flex-end;
`;

const InfoWrap = styled.div`
  width: 100%;
  height: 100%;
  margin: 24px 0;
`;

const InfoWrapContent = styled.div`
  height: 100%;
  margin: 12px 0;
`;

const GitIcon = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${gitIcon});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const NotGitIcon = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${notgitIcon});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: not-allowed;
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
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

const CategoryBt = styled.button`
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 12px;
  color: #f2f2f2;
  background-color: #262b7f;
`;
