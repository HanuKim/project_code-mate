import React, { FC, useState } from "react";
import styled from "styled-components";
import basicImg from "../img/basicImg.png";
import Map from "../components/main/Map";
import CreateCategory from "../components/main/CreateCategory";
import { PostState, MapProps } from "../shared/type";
import { collection, addDoc } from "firebase/firestore";
import { dbService } from "../shared/firebase";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const [TitleText, setTitleText]: any = useState("");
  const [ContentText, setContentText]: any = useState("");
  const [correcttitle, setCorrectTitle] = useState(true);
  const [correctcontent, setCorrectContent] = useState(true);
  const [Postcategory, setPostCategory] = useState([]);
  const [editText, setEditText]: any = useState("");
  const [state, setState] = useState<MapProps>({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });

  //add
  const newPost = {
    TitleText,
    ContentText,
    Postcategory,
    userId: "1",
    nickName: "묨묘미",
    createdAt: Date.now(),
    isEdit: false,
    coord: state.center,
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitleText(e.target.value);
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentText(e.target.value);
  };

  const handleSubmitButtonClick = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    // 내용
    if (!TitleText.trim() || TitleText === null) {
      setCorrectTitle(true);
      return;
    }
    if (!ContentText.trim() || ContentText === null) {
      setCorrectContent(true);
      return;
    } else {
      await addDoc(collection(dbService, "post"), newPost);
      setTitleText("");
      setContentText("");
      navigate(`/`);
    }
  };
  console.log("newPost", newPost);
  return (
    <Container>
      <CommentForm onSubmit={handleSubmitButtonClick}>
        <Map state={state} setState={setState} />
        <PostsTopContainer>
          <ProfileContainer>
            <ProfilePhoto />
            <ProfileNickName>닉네임</ProfileNickName>
          </ProfileContainer>
        </PostsTopContainer>
        <CreateCategory
          Postcategory={Postcategory}
          setPostCategory={setPostCategory}
        />
        <CommentLabel>
          <Postitle
            placeholder="제목을 입력 해주세요."
            onChange={handleChangeTitle}
            value={TitleText}
            cols={10}
            wrap="hard"
          />
          {correcttitle && (
            <TitleErrorText>제목을 입력하지 않았습니다.</TitleErrorText>
          )}
          <PostText
            placeholder="내용을 입력 해주세요."
            onChange={handleChangeContent}
            value={ContentText}
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

const ProfilePhoto = styled.div`
  background-image: url(${basicImg});
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

const Dates = styled.p`
  color: #aaaaaa;
  font-size: 15px;
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
