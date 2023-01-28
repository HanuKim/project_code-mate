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

export default function Mypage() {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [nickName, setnickName] = useState('');
  const [stack, setStack]: any = useState('');
  const [gitAddress, setGitAddress] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [myInfo, setMyInfo] = useState<DocumentData>();
  const uid = authService.currentUser?.uid;
  const { id } = useParams();
  console.log(stack);
  const [formData, setFormData] = useState<DocumentData>({
    nickName: '',
    stack: stack,
    gitAddress: '',
    introduce: '',
    userid: uid,
  });
  console.log('formData:', formData);

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
    // 문서 id를 uid로 저장해서, 동일한 문서id가 있으면 update 됨.
    e.preventDefault();
    await setDoc(doc(dbService, 'user', uid), {
      gitAddress: formData.gitAddress,
      nickName: formData.nickName,
      introduce: formData.introduce,
      stack: formData.stack,
      userid: uid,
    });
    await updateProfile(authService?.currentUser, {
      displayName: formData.nickName,
    });
    getMyInfo();
    setIsEditProfile(false);
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
          <TopContainer>
            <ProfileTitle>
              <TopProfileContainer>
                <TopProfilePhoto>
                  <ProfileWrap>
                    <Profile />
                  </ProfileWrap>
                </TopProfilePhoto>
                <ProfileContents>
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
                </ProfileContents>
                <TopProfileNickName></TopProfileNickName>
              </TopProfileContainer>
              <UploadWrap></UploadWrap>
            </ProfileTitle>

            <InputContainer>
              {/* {isOpenModall && (
                  <MypageModal onClickToggleModal={onClickToggleModall}>
                    <MypageCreate />
                  </MypageModal>
                )}
                <InputBtn onClick={onClickToggleModall}>등록</InputBtn> */}

              {/* <InputBox placeholder="내용을 입력해주세요" cols={30}></InputBox> */}
            </InputContainer>
          </TopContainer>

          <BottomContainer>
            <MyPostTitle>내가쓴글</MyPostTitle>
            <MyPost />
          </BottomContainer>
        </MypageBox>
      </Container>
    </>
  );
}

const ProfileContentsBtnBox = styled.div`
  background-color: gray;
  position: absolute;
  right: 70px;
`;

const Container = styled.div`
  height: 100%;
  background-color: fffff;
  display: flex;
  justify-content: center;
`;

const MypageBox = styled.div`
  width: 1000px;
  height: 100%;
  background-color: white;
  margin: 120px;
  border-radius: 10px;
  padding: 30px;
`;

const TopContainer = styled.div`
  background-color: white;
  height: 850px;
  margin-top: 50px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 40px;
  position: relative;
`;

const ProfileTitle = styled.div`
  /* background-color: red; */
  height: 200px;
  display: flex;
  flex-direction: row;
`;

const UploadWrap = styled.div`
  /* background-color: blue; */
  min-width: 200px;
  position: absolute;
  top: 185px;
  left: 50px;
`;

const InputContainer = styled.div`
  /* background-color: skyblue; */
  /* position: relative; */
`;

// ------------ post ---------------

const MyPostTitle = styled.div`
  /* background-color: blue; */
  height: 60px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const TopProfilePhoto = styled.div`
  /* background-image: url(https://www.pngall.com/wp-content/uploads/5/Profile.png); */
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  /* cursor: pointer; */
  width: 140px;
  height: 140px;
  margin-bottom: 30px;
  /* border: 1px solid black;
  border-radius: 100px; */
`;

const TopProfileNickName = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const ProfileWrap = styled.div`
  /* background-color: red; */
`;

const ProfileContents = styled.div`
  /* background-color: red; */
  width: 680px;
  margin-left: 30px;
  margin-top: 30px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 30px;
`;
