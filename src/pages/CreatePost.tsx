import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import Map from "../components/main/Map";
import CreateCategory from "../components/main/CreateCategory";
import { PostState, MapProps } from "../shared/type";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { dbService, authService } from "../shared/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import basicImg from "../../img/basicImg.png";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent]: any = useState("");
  const [correcttitle, setCorrectTitle] = useState(true);
  const [correctcontent, setCorrectContent] = useState(true);
  const [category, setCategory] = useState(["all"]);

  const [state, setState] = useState<MapProps>({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });

  const authService = getAuth();
  const uid = authService.currentUser?.uid;
  const displayName = authService.currentUser?.displayName;
  const photoURL = authService.currentUser?.photoURL;

  addDoc(collection(dbService, "detail"), {
    title: title,
    content: content,
  });

  console.log("displayName", displayName);

  //add
  const newPost = {
    title,
    content,
    category,
    userId: uid,
    nickName: displayName,
    createdAt: Date.now(),
    isEdit: false,
    profileImg: photoURL,
    coord: state.center,
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmitButtonClick = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    // 내용
    if (!newPost.title || title === null) {
      setCorrectTitle(true);
      return;
    }
    if (!content.trim() || content === null) {
      setCorrectContent(true);
      return;
    }
    if (newPost == null) {
      console.log("빈값있음");
      return;
    } else {
      await addDoc(collection(dbService, "post"), newPost);
      setTitle("");
      setContent("");
      navigate(`/`);
    }
  };

  return (
    <Container>
      <CommentForm onSubmit={handleSubmitButtonClick}>
        <Map state={state} setState={setState} />
        <PostsTopContainer>
          <ProfileContainer>
            <ProfilePhoto background={photoURL ?? "black"} />
            <ProfileNickName>{displayName}</ProfileNickName>
          </ProfileContainer>
        </PostsTopContainer>
        <CreateCategory category={category} setCategory={setCategory} />
        <CommentLabel>
          <Postitle
            placeholder="제목을 입력 해주세요."
            onChange={handleChangeTitle}
            value={title}
            cols={10}
            wrap="hard"
          />
          {correcttitle && (
            <TitleErrorText>제목을 입력하지 않았습니다.</TitleErrorText>
          )}
          <PostText
            placeholder="내용을 입력 해주세요."
            onChange={handleChangeContent}
            value={content}
            cols={30}
            wrap="hard"
          />
          {correctcontent && (
            <TitleErrorText>내용을 입력하지 않았습니다.</TitleErrorText>
          )}
          <CommentSubmitButton>등록</CommentSubmitButton>
        </CommentLabel>
      </CommentForm>
    </Container>
  );
};
export default CreatePost;

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

const CommentForm = styled.form``;

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
