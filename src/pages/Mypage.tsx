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
} from 'firebase/firestore';
import { auth, dbService, authService } from '../shared/firebase';
import Profile from '../components/Profile';
import { useParams } from 'react-router-dom';
import MyPost from '../components/MyPost';
import { identifier } from '@babel/types';
import { getAuth, onAuthStateChanged } from '@firebase/auth';


export default function Mypage() {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditIntroduce, setIsEditIntroduce] = useState(false);
  const [nickName, setnickName] = useState('');
  const [stack, setStack] = useState('');
  const [location, setLocation] = useState('');
  const [introduce, setIntroduce] = useState('');

  const uid = authService.currentUser?.uid;
  console.log("authService", authService.currentUser);

  const [profileContents, setProfileContents] = useState<any>([]);

  // const authService = getAuth();

  console.log('authService:', auth.currentUser?.displayName);

  const { id } = useParams();
  // console.log('useParams', useParams());

  const q = query(
    collection(dbService, 'user')
    // orderBy('createdAt', 'desc')
    // where('userid', '==', authService.currentUser?.uid || '')
    // where('nickname', '==', authService.currentUser?.displayName || '')
  );

  // const handleUpdate = async (e: any) => {
  //   e.preventDefault();
  //   const taskDocRef = doc(dbService, 'user', id);
  //   try {
  //     await updateDoc(taskDocRef, {
  //       nickname: 1,
  //       stack: 2,
  //     });
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  const getProfile = () => {
    onSnapshot(q, snapshot => {
      const newContents = snapshot.docs.map(doc => {
        const newContent = {
          id: doc.id,
          ...doc.data(),
        } as any;
        return newContent;
      });
      // console.log('newContents:', newContents);
      setProfileContents(newContents);
    });
  };

  // useEffect(() => {
  //   (async function fetchData() {
  //     const detailRef = doc(dbService, 'users', id);
  //     const res = await getDoc(detailRef);
  //     setProfileContents(res.data());
  //   })();
  // }, []);

  useEffect(() => {
    getProfile();
  }, []);
  console.log('profileContents', profileContents);

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
                    <>
                      <ProfileContentsForm>
                        <ProfileContentsBox>
                          <label>
                            NickName:
                            <input
                              type="text"
                              defaultValue={
                                profileContents.length === 0
                                  ? null
                                  : profileContents[0].nickname
                              }
                              onChange={e => setnickName(e.target.value)}
                            />
                          </label>
                          <LabelNickName>
                            Stack:
                            <input
                              type="text"
                              defaultValue={
                                profileContents.length === 0
                                  ? null
                                  : profileContents[0].stack
                              }
                              onChange={e => setStack(e.target.value)}
                            />
                          </LabelNickName>
                          <label>
                            Location:
                            <input
                              type="text"
                              defaultValue={
                                profileContents.length === 0
                                  ? null
                                  : profileContents[0].location
                              }
                              onChange={e => setLocation(e.target.value)}
                            />
                          </label>
                        </ProfileContentsBox>
                      </ProfileContentsForm>

                      <ProfileContentsBtnBox>
                        <button
                          onClick={() => {
                            setIsEditProfile(false);
                          }}
                        >
                          저장
                        </button>
                      </ProfileContentsBtnBox>
                    </>
                  ) : (
                    <>
                      <p>
                        Nickname:
                        {profileContents.length === 0
                          ? null
                          : profileContents[0].nickname}
                      </p>
                      <p>
                        Stack:
                        {profileContents.length === 0
                          ? null
                          : profileContents[0].stack}
                      </p>
                      <p>
                        Location:
                        {profileContents.length === 0
                          ? null
                          : profileContents[0].location}
                      </p>
                      <ProfileContentsBtnBox>
                        <button
                          onClick={() => {
                            setIsEditProfile(true);
                          }}
                        >
                          편집
                        </button>
                      </ProfileContentsBtnBox>
                    </>
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
              {isEditIntroduce ? (
                <>
                  <InputBox
                    defaultValue={
                      profileContents.length === 0
                        ? null
                        : profileContents[0].introduce
                    }
                  />

                  <InputBtnWrap>
                    <InputBtn
                      onClick={() => {
                        setIsEditIntroduce(false);
                      }}
                    >
                      완료
                    </InputBtn>
                  </InputBtnWrap>
                </>
              ) : (
                <>
                  <IntroduceBox>
                    {profileContents.length === 0
                      ? null
                      : profileContents[0].introduce}
                  </IntroduceBox>
                  <InputBtnWrap>
                    <InputBtn
                      onClick={() => {
                        setIsEditIntroduce(true);
                      }}
                    >
                      편집
                    </InputBtn>
                  </InputBtnWrap>
                </>
              )}

              {/* <InputBox placeholder="내용을 입력해주세요" cols={30}></InputBox> */}
                <InputBtn type={"submit"}>등록</InputBtn>
              </InputBtnWrap>
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

const InputBox = styled.textarea`
  /* background-color: red; */
  height: 560px;
  width: 100%;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid black;
  resize: none;
`;

const IntroduceBox = styled.div`
  /* background-color: red; */
  height: 560px;
  width: 100%;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid black;
`;

const InputBtnWrap = styled.div`
  background-color: red;
  position: absolute;
  margin-top: -50px;
  margin-left: 775px;
`;

const InputBtn = styled.button`
  /* position: flex; */

  background-color: #262b7f;
  color: white;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const UploadContents = styled.input`
  /* background-color: gray; */
  width: 100%;
`;

const TestInput = styled.button``;

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

const Posts = styled.div`
  background-color: white;
  width: 100%;
  height: 240px;
  border-radius: 30px;
  padding: 40px;
  margin-top: 20px;
  border: 1px solid black;
`;

const PostsTopWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: -25px;
`;

const ProfilePhoto = styled.div`
  background-image: url(https://www.pngall.com/wp-content/uploads/5/Profile.png);
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

const ProfileNickName = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const Datee = styled.p`
  color: #aaaaaa;
  font-size: 15px;
  margin-top: -12px;
`;

const TitleText = styled.h1`
  margin: 0 0 20px 40px;
  font-size: 25px;
  font-weight: 600;
`;

const ContentText = styled.p`
  font-size: 16px;
  margin-left: 43px;
  margin-top: -5px;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 15px;
  margin: 30px 0 0 40px;
`;

const CategoryBtn = styled.button`
  width: 100px;
  height: 30px;
  border: 1px solid #a8a8a8;
  border-radius: 30px;
  color: #efefef;
  background-color: #262b7f;
  /* filter: drop-shadow(1px 2px 3px #818181); */
`;

const TopProfileContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: -70px;
`;

const TopProfilePhoto = styled.div`
  /* background-image: url(https://www.pngall.com/wp-content/uploads/5/Profile.png); */
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  /* cursor: pointer; */
  width: 140px;
  height: 140px;
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
  height: 200px;
  margin-left: 30px;
  margin-top: 30px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 30px;
`;

const ProfileContentsForm = styled.form`
  /* background-color: red; */
`;

const ProfileContentsBox = styled.div`
  /* background-color: blue; */
  display: flex;
  gap: 30px;
  flex-direction: column;
  width: 400px;
  align-items: flex-end;
`;

const ProfileContentsBtnBox = styled.div`
  background-color: gray;
  position: absolute;
  right: 70px;
`;

const LabelNickName = styled.label`
  /* background-color: pink; */
`;
