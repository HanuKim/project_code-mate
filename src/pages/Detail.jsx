import {useEffect, useState} from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import MapContainer from '../components/map/MapContainer';
import JobCategory from '../components/post/JobCategory';
import CommentInput from '../components/comment/CommentInput';
import CommentList from '../components/comment/CommentList';
import basicImg from '../img/basicImg.png';
import {doc, getDoc} from 'firebase/firestore';
import {dbService, authService} from '../shared/firebase';
import UserProfileModal from '../components/modal/UserProfile';

// 리액트에서 라우터 사용 시, 파라미터 정보를 가져와 활용하고 싶으면 useParams라는 훅을 사용하면 된다.
// 참고로 파라미터가 아닌 현재 페이지의 Pathname을 가져오려면 useLocation()을 사용해야 한다.
import {useParams} from 'react-router-dom';

export default function Detail() {
  const [setDetail, getSetDetail] = useState('');
  let {id} = useParams();
  const uid = authService.currentUser?.uid;
  const [isOpenProfileModal, setOpenProfileModal] = useState(false);

  const getDetail = async () => {
    const snapshot = await getDoc(doc(dbService, 'post', id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    getSetDetail(data);
    console.log('data : ', data);
  };
  useEffect(() => {
    getDetail();
  }, []);

  const onClickToggleModal = () => {
    setOpenProfileModal(true);
  };
  return (
    <>
      <Container>
        <InnerWidth>
          {setDetail === '' ? null : (
            <MapContainer location={setDetail.coord} />
          )}
          <ContentsContainer>
            <ProfileContainer>
              <ProfileWrap>
                {isOpenProfileModal ? (
                  <UserProfileModal
                   
                    setOpenProfileModal={setOpenProfileModal}
                   
                    isOpenProfileModal={isOpenProfileModal}
                 
                  />
                ) : null}
                <ProfilePic
                 
                  onClick={onClickToggleModal}
                 
                  profile={setDetail.profileImg ?? basicImg}
               
                />
                <ProfileName>{setDetail.nickName}</ProfileName>
              </ProfileWrap>
              {uid === setDetail.userId ? (
                <Button
                  location={setDetail.coord}
                  id={id}
                  delete='삭제'
                  edit='수정'
                  btnWidth={80}
                  btnHeight={40}
                ></Button>
              ) : null}
            </ProfileContainer>
            <Title>{setDetail.title}</Title>
            <Contents>{setDetail.content}</Contents>
            <JobCategory />
          </ContentsContainer>
        </InnerWidth>
        {uid ? <CommentInput /> : undefined}
        <CommentList />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 1200px;
  min-height: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 50px 10px;
  background-color: #f2f2f2;
  border-radius: 10px;
  position: relative;
`;

const InnerWidth = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
`;

const ContentsContainer = styled.div`
  position: relative;
  min-height: 700px;
  width: 100%;
  height: 100%;
  padding: 30px;
  border: 1px solid #d0d0d0;
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 30px;
`;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ProfilePic = styled.div`
  max-width: 52px;
  max-height: 52px;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.profile});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid #d0d0d0;
  border-radius: 50%;
  cursor: pointer;
`;

const ProfileName = styled.div`
  margin-left: 20px;
  font-size: 20px;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 30px;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
`;
