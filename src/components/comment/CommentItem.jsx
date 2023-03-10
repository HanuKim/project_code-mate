import {useEffect, useState} from 'react';
import styled from 'styled-components';
import basicImg from '../../img/basicImg.png';
import {doc, getDoc} from 'firebase/firestore';
import {dbService} from '../../shared/firebase';
import DeleteModal from '../modal/DeleteModal';
import EditModal from '../modal/EditModal';
import UserProfileModal from '../modal/UserProfile';
import {getAuth} from 'firebase/auth';

export default function CommentItem({comment}) {
  const [editText, setEditText] = useState('');
  const [isOpenProfileModal, setOpenProfileModal] = useState(false);
  const [editComments, setEditComments] = useState({
    id: comment.id,
    commentText: comment.commentText,
    postId: comment.postId,
    userId: comment.userId,
    nickName: comment.nickName,
    createdAt: comment.createdAt,
    isEdit: comment.isEdit,
    profileImg: comment.profileImg,
  });
  const authService = getAuth();
  const uid = authService.currentUser?.uid;
  // 모달

  const [viewDeleteModal, setDeleteViewModal] = useState(false);
  const [viewEditModal, setEditViewModal] = useState(false);
  const openDeleteModalClick = () => {
    setDeleteViewModal(true);
  };
  const openEditModalClick = () => {
    setEditViewModal(true);
  };

  //isEdit true로 바꾸기
  const onClickIsEditSwitch = (commentid) => {
    setEditComments({...editComments, isEdit: true});
  };

  const editTextOnChange = (e) => {
    setEditText(e.target.value);
  };

  // 수정 중 취소버튼 누르면 isEdit이 false로 변경되서 취소할 수 있는 함수
  const cancleEditButton = (commentid) => {
    console.log(commentid);
    setEditComments({...editComments, isEdit: false});
  };

  //수정 후 data get하면서 editComments state 내의 commentText를 data에 있는 내용으로 업데이트
  const getComment = async () => {
    const snapshot = await getDoc(doc(dbService, 'comment', comment.id));
    const data = snapshot.data();
    if (data.id === editComments.id) {
      setEditComments({
        ...editComments,
        commentText: data.commentText,
      });
    }
  };

  // 리렌더링 일어날 때마다 최초 1번만 getCommet() 실행
  useEffect(() => {
    getComment();
  }, []);

  const onClickToggleModal = () => {
    setOpenProfileModal(!isOpenProfileModal);
  };

  return (
    <>
      {viewDeleteModal ? (
        <DeleteModal
          setDeleteViewModal={setDeleteViewModal}
          comment={comment}
        />
      ) : null}
      {viewEditModal ? (
        <EditModal
          setEditViewModal={setEditViewModal}
          comment={comment}
          editText={editText}
          setEditComments={setEditComments}
          editComments={editComments}
          setEditText={setEditText}
        />
      ) : null}
      <CommentContentContainer>
        {/* 댓글쓴이+날짜 */}
        <CommentTopContainer>
          <ProfileContainer>
            {isOpenProfileModal ? (
              <UserProfileModal
                setOpenProfileModal={setOpenProfileModal}
                isOpenProfileModal={isOpenProfileModal}
              />
            ) : null}
            <ProfilePhoto
              background={comment.profileImg ?? basicImg}
              onClick={onClickToggleModal}
            />
            <ProfileNickName>{comment.nickName}</ProfileNickName>
            <ButtonContainer>
              {editComments.isEdit ? (
                <>
                  <CommentButton onClick={openEditModalClick}>
                    등록
                  </CommentButton>
                  <CommentButton
                    onClick={() => {
                      cancleEditButton(comment.id);
                    }}
                  >
                    취소
                  </CommentButton>
                </>
              ) : uid === comment.userId ? (
                // 로그인한 uid와 댓글의 uid가 같아야지만 수정,삭제버튼 보이게
                <>
                  <CommentButton
                    onClick={() => {
                      onClickIsEditSwitch(comment.id);
                    }}
                  >
                    수정
                  </CommentButton>
                  <CommentButton onClick={openDeleteModalClick}>
                    삭제
                  </CommentButton>
                </>
              ) : null}
            </ButtonContainer>
          </ProfileContainer>
          <Date>{comment.createdAt}</Date>
        </CommentTopContainer>
        {/* 수정버튼 누르면 인풋 생기게 */}
        {editComments.isEdit ? (
          <CommentEditInput
            defaultValue={comment.commentText}
            onChange={editTextOnChange}
          />
        ) : (
          <ContentText>{comment.commentText}</ContentText>
        )}
      </CommentContentContainer>
    </>
  );
}
const CommentContentContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 24px;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  box-shadow: 3px 3px 3px #aaa;
`;

const CommentTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePhoto = styled.button`
  background-image: url(${(props) => props.background});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const ProfileNickName = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 0 8px;
`;

const Date = styled.div`
  color: #aaa;
  font-size: 12px;
  height: 100%;
`;

const ContentText = styled.p`
  white-space: pre-wrap;
`;

const CommentEditInput = styled.textarea`
  width: 500px;
  border-radius: 10px;
  padding: 20px 55px 20px 20px;
  outline-color: #262b7f;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 4px;

  margin-top: 1px;
`;

const CommentButton = styled.span`
  font-size: 12px;
  color: #aaa;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;
