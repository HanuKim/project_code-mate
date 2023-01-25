import React, { FC, useState } from "react";
import styled from "styled-components";
import Map from "./Map";
import { RootState } from "../../../redux/config/configStore";
import { PostState } from "../../../shared/type";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { dbService } from "../../../shared/firebase";
import { useNavigate } from "react-router-dom";
import { Id } from "@reduxjs/toolkit/dist/tsHelpers";

const CreatePost = () => {
  const navigate = useNavigate();

  const [TitleText, setTitleText]: any = useState("");
  const [ContentText, setContentText]: any = useState("");
  const [Postcategory, setCategory]: any = useState(false);
  const [editText, setEditText]: any = useState("");

  //add
  const newPost = {
    TitleText,
    ContentText,
    Postcategory,
    userId: "1",
    nickName: "묨묘미",
    createdAt: Date.now(),
    isEdit: false,
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
      alert("제목");
      return;
    }
    if (!ContentText.trim() || ContentText === null) {
      alert("내용");
      return;
    } else {
      await addDoc(collection(dbService, "post"), newPost);
      setTitleText("");
      setContentText("");
      navigate(`/`);
    }
  };

  return (
    <Container>
      <CommentForm onSubmit={handleSubmitButtonClick}>
        <Map />
        <CommentLabel>
          <CommentText
            placeholder="제목을 입력 해주세요."
            onChange={handleChangeTitle}
            value={TitleText}
            cols={10}
            wrap="hard"
          />
          <CommentText
            placeholder="내용을 입력 해주세요."
            onChange={handleChangeContent}
            value={ContentText}
            cols={30}
            wrap="hard"
          />
          <CommentSubmitButton>등록</CommentSubmitButton>
        </CommentLabel>
      </CommentForm>
    </Container>
  );
};
export default CreatePost;

const Container = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;

const CommentForm = styled.form``;

const CommentLabel = styled.label`
  position: relative;
`;

const CommentText = styled.textarea`
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
