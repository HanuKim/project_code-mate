import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import Map from "../components/main/Map";
import CreateCategory from "../components/main/CreateCategory";
import { PostState, MapProps } from "../shared/type";
import { collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { dbService, authService } from "../shared/firebase";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import basicImg from "../../img/basicImg.png";

const EditPost = () => {
  const navigate = useNavigate();
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [correcttitle, setCorrectTitle] = useState(true);
  const [correctcontent, setCorrectContent] = useState(true);
  const [editPost, setEditPost] = useState<any>({});
  const state = useLocation();
  const authService = getAuth();
  const { id } = useParams();
  const uid = authService.currentUser?.uid;
  const displayName = authService.currentUser?.displayName;
  const photoURL = authService.currentUser?.photoURL;
  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTitle(e.target.value);
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };

  //post의 doc.id 가져오기(params이용)
  const getPost = async () => {
    const snapshot = await getDoc(doc(dbService, "post", id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    setEditPost(data);
  };
  // 리렌더링 일어날 때마다 최초 1번만 실행
  useEffect(() => {
    getPost();
  }, []);

  const handleEditButton = () => {
    setEditPost({
      ...editPost,
      title: editPost.title,
      category: editPost.category,
      content: editPost.content,
      coord: editPost.coord,
    });
    updateDoc(doc(dbService, "post", id), editPost);
    //alert("수정");
    navigate(`/comment/:id`);
  };

  return (
    <Container>
      <CommentForm>
        <Map location={editPost.coord} />
        <PostsTopContainer>
          <ProfileContainer>
            <ProfilePhoto background={photoURL ?? "black"} />
            <ProfileNickName>{displayName}</ProfileNickName>
          </ProfileContainer>
        </PostsTopContainer>
        <CreateCategory />
        <CommentLabel>
          <Postitle
            defaultValue={editPost.title}
            onChange={handleChangeTitle}
            value={editTitle}
            cols={10}
            wrap="hard"
          />
          {correcttitle && (
            <TitleErrorText>제목을 입력하지 않았습니다.</TitleErrorText>
          )}
          <PostText
            defaultValue={editPost.content}
            onChange={handleChangeContent}
            value={editContent}
            cols={30}
            wrap="hard"
          />
          {correctcontent && (
            <TitleErrorText>내용을 입력하지 않았습니다.</TitleErrorText>
          )}
          <CommentSubmitButton onClick={handleEditButton}>
            등록
          </CommentSubmitButton>
          <CommentSubmitButton
            onClick={() => {
              navigate("/comment/:id");
            }}
          >
            취소
          </CommentSubmitButton>
        </CommentLabel>
      </CommentForm>
    </Container>
  );
};
export default EditPost;

const PostsTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ProfilePhoto = styled.div<{ background: any }>`
  background-image: url(${(props) => props.background});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

const ProfileNickName = styled.p`
  font-size: 15px;
  font-weight: 500;
`;

const Container = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;

const CommentForm = styled.div``;

const CommentLabel = styled.label`
  position: relative;
`;

const Postitle = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  padding: 20px 55px 20px 20px;
  resize: none;
  outline-color: #262b7f;
`;

const TitleErrorText = styled.p`
  color: #ff6f6f;
  padding: 10px 0;
`;

const PostText = styled.textarea`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  padding: 20px 55px 20px 20px;
  resize: none;
  outline-color: #262b7f;
`;

const CommentSubmitButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #000000;
  width: 50px;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #262b7f;
    color: #ffffff;
  }
`;
