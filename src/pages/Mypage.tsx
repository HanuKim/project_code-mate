// react-icons 다운
import { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MypageModal from '../components/MypageModal';
// import { ShowImage } from '../components/ShowImage';
import UploadImage from '../components/UploadImage';
import {
  doc,
  getDoc,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  updateDoc,
  Firestore,
  setDoc,
  DocumentData,
} from 'firebase/firestore';
import { auth, dbService, authService } from '../shared/firebase';
import Profile from '../components/Profile';
import { useParams } from 'react-router-dom';
import MyPost from '../components/MyPost';
import { identifier } from '@babel/types';
import { getAuth, onAuthStateChanged, updateProfile } from '@firebase/auth';
import { UserInfo } from '../shared/type';
import MyInfo from '../components/MyInfo';
import EditInfo from '../components/EditInfo';
import userEvent from '@testing-library/user-event';

export default function Mypage() {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [nickName, setnickName] = useState('');
  const [stack, setStack]: any = useState('');
  const [gitAddress, setGitAddress] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [myInfo, setMyInfo] = useState<DocumentData>();
  const uid = authService.currentUser?.uid;
  const { id } = useParams();
  const displayName = authService.currentUser?.displayName;
  console.log(stack);
  const [formData, setFormData] = useState<DocumentData>({
    nickName: displayName,
    stack: stack,
    gitAddress: '',
    introduce: '',
    userid: uid,
  });

  console.log('formData', formData);

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnickName(e.target.value);
    // console.log(nickName)
  };
  const onChangegitAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGitAddress(e.target.value);
    // console.log(gitAddress);
  };
  const onChangeintroduce = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntroduce(e.target.value);
    // console.log(introduce);
  };

  const onSubmitMyInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let reg_url =
      /^(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))*\/?$/;
    // 문서 id를 uid로 저장해서, 동일한 문서id가 있으면 update 됨.
    if (formData?.nickName.replace(/ /g, '') === '') {
      alert('nickname 을 입력해주세요');
      return;
    } else if (formData?.stack.replace(/ /g, '') === '') {
      alert('내용을 입력해주세요');
      return;
    } else if (formData?.gitAddress.replace(/ /g, '') === '') {
      alert('Url 을 입력해주세요');
      return;
    } else if (!reg_url.test(formData?.gitAddress)) {
      alert('Url 형식에 맞게 입력해주세요!');
      return;
    } else if (formData?.introduce.replace(/ /g, '') === '') {
      alert('내용을 입력해주세요');
      return;
    } else {
      await updateDoc(doc(dbService, 'user', id), {
        gitAddress: formData?.gitAddress,
        nickName: formData?.nickName,
        introduce: formData?.introduce,
        stack: formData?.stack,
        userid: uid,
      });
      await updateProfile(authService?.currentUser, {
        displayName: formData?.nickName,
      });
      getMyInfo();
      setIsEditProfile(false);
    }
  };

  const getMyInfo: any = async () => {
    const snapshot = await getDoc(doc(dbService, 'user', id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    setFormData(data);
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  // 저장된 데이터를 불러와서 myInfo에 넣어줌.

  const [profileContents, setProfileContents] = useState<any>([]);

  return (
    <>
      <Container>
        <MypageBox>
          {/* <ProfileTitle> */}
          {/* <TopProfilePhoto> */}
          {/* <PicInfoContainer> */}
          <Profile />
          {/* </TopProfilePhoto> */}

          <TopProfileNickName></TopProfileNickName>
          <UploadWrap></UploadWrap>
          {isEditProfile ? (
            <MyInfo
              isEditProfile={isEditProfile}
              onChangeNickName={onChangeNickName}
              myInfo={myInfo}
              setStack={setStack}
              stack={stack}
              onChangegitAddress={onChangegitAddress}
              onChangeintroduce={onChangeintroduce}
              setIsEditProfile={setIsEditProfile}
              onSubmitMyInfo={onSubmitMyInfo}
              formData={formData}
              handleChange={handleChange}
            />
          ) : (
            <EditInfo
              myInfo={myInfo}
              setIsEditProfile={setIsEditProfile}
              stack={stack}
              formData={formData}
            />
          )}
          {/* </PicInfoContainer> */}
          {/* </ProfileTitle> */}

          <BottomContainer>
            <MyPostTitle>작성한 글</MyPostTitle>
            <MyPost />
          </BottomContainer>
        </MypageBox>
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  border-radius: 10px;
  background-color: #fff;
`;

const MypageBox = styled.div`
  max-width: 1100px;
  width: 100%;
  height: 100%;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f2f2f2;
`;

const UploadWrap = styled.div`
  /* background-color: blue; */
  min-width: 200px;
  position: absolute;
  top: 185px;
  left: 50px;
`;

// ------------ post ---------------

const MyPostTitle = styled.div`
  margin-top: 50px;
  font-size: 20px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// const TopProfilePhoto = styled.div`
//   background-color: orange;
//   background-position: center center;
//   background-size: contain;
//   background-repeat: no-repeat;
//   /* cursor: pointer; */
//   width: 140px;
//   height: 140px;
//   margin-bottom: 30px;
//   /* border: 1px solid black;
//   border-radius: 100px; */
// `;

const TopProfileNickName = styled.p`
  background-color: pink;
  font-size: 18px;
  font-weight: 500;
`;

// const ProfileWrap = styled.div`
//   width: 100px;
//   height: 100px;
//   background-color: blue;
// `;

const PicInfoContainer = styled.div`
  display: flex;
  /* flex-direction: row; */
  width: 100%;
  height: 100%;
  background-color: gray;
`;
