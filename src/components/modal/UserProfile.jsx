import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import basicImg from '../../img/basicImg.png';
import close from '../../img/close.png';
import gitIcon from '../../img/gitIcon.png';
import notgitIcon from '../../img/notgitIcon.png';
import {useEffect, useState} from 'react';
import {doc, getDoc} from 'firebase/firestore';
import {dbService, authService} from '../../shared/firebase';

function UserProfileModal({setOpenProfileModal, isOpenProfileModal}) {
  const {id} = useParams();
  const [serchPost, setSerchPost] = useState({});
  const [myInfo, setMyInfo] = useState({});
  const userEmail = authService.currentUser?.email;

  const getDetail = async () => {
    const snapshot = await getDoc(doc(dbService, 'post', id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    setSerchPost(data);
  };

  const getUser = async () => {
    const snapshot = await getDoc(doc(dbService, 'user', userEmail));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    setMyInfo(data);
  };

  useEffect(() => {
    getDetail();
    getUser();
  }, []);

  return (
    <>
      <Container modalWidth={450} modalHeight={540}>
        <CloseBtContainer>
          <CloseButton
            onClick={() => {
              if (isOpenProfileModal) {
                setOpenProfileModal(false);
              }
            }}
          />
        </CloseBtContainer>
        <ProfileImgContainer>
          <ProfileImg background={myInfo.imageUrl ?? basicImg} />
        </ProfileImgContainer>
        <UserInfoContainer>
          {/* 깃헙아이콘,닉네임,포지션,인사말 */}
          <NickName
            style={{
              color: myInfo.nickName ? 'black' : '#d0d0d0',
            }}
          >
            {myInfo.nickName ?? '닉네임이 없습니다.'}
          </NickName>
          {myInfo.stack ? (
            <StackBt>{myInfo.stack}</StackBt>
          ) : (
            'Stack을 등록해주세요.'
          )}
          <FieldsetContainer>
            <IntroFildset>
              <IntroTitle>
                {myInfo.introduce ? '인사말' : '인사말이 없습니다'}
              </IntroTitle>
              <IntroText>{myInfo.introduce}</IntroText>
            </IntroFildset>
          </FieldsetContainer>
          <GitIconContainer>
            {myInfo.gitAddress ? (
              <a href={myInfo.gitAddress} target='_blank'>
                <GitIcon />
              </a>
            ) : (
              <NotGitIcon />
            )}
          </GitIconContainer>
        </UserInfoContainer>
      </Container>

      <ContainerBg
        onClick={() => {
          if (isOpenProfileModal) {
            setOpenProfileModal(false);
          }
        }}
      />
    </>
  );
}
export default UserProfileModal;

const CloseBtContainer = styled.div`
  display: flex;
  justify-content: right;
`;

const ProfileImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ProfileImg = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${(props) => props.background});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  margin: 0 30px;
`;

const CloseButton = styled.div`
  width: 32px;
  height: 32px;
  margin-top: 20px;
  margin-right: 12px;
  background-image: url(${close});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  cursor: pointer;
`;

const ContainerBg = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Container = styled.div`
  width: ${(props) => props.modalWidth + 'px'};
  height: ${(props) => props.modalHeight + 'px'};
  border: 1px solid #aaa;
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f2f2f2;
  box-shadow: 3px 3px 5px black;
  align-items: center;
  z-index: 2;
`;

const UserInfoContainer = styled.div`
  width: 80%;
  border: 1px solid balck;
  margin: 0 auto;
  text-align: center;
`;
const GitIconContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 10px;
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

const NickName = styled.h2`
  margin: 20px 0 10px;
`;

const StackBt = styled.button`
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 12px;
  color: #f2f2f2;
  background-color: #262b7f;
  margin-bottom: 5px;
`;

const IntroFildset = styled.fieldset`
  border-radius: 10px;
  height: 105px;
`;
const IntroTitle = styled.legend`
  font-size: 20px;
`;
const FieldsetContainer = styled.div``;

const IntroText = styled.p`
  margin: 5px;
`;
