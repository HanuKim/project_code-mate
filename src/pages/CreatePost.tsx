import React, { useState } from "react";
import styled from "styled-components";
import Map from "../components/map/Map";
import CreateCategory from "../components/post/CreateCategory";
import { MapProps } from "../shared/type";
import { collection, addDoc } from "firebase/firestore";
import { dbService } from "../shared/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); //제목
  const [content, setContent]: any = useState(""); //내용
  const [correcttitle, setCorrectTitle] = useState<boolean>(false); //제목 유효성 검사
  const [correctcontent, setCorrectContent] = useState<boolean>(false); //제목 유효성 검사
  const [category, setCategory]: any = useState(["all"]); //카테고리
  //map
  const [state, setState] = useState<MapProps>({
    // 지도의 초기 위치
    center: { lat: 37.50233764246866, lng: 127.04445691495785 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });
  //로그인 관련
  const authService = getAuth();
  const uid = authService.currentUser?.uid;
  const displayName = authService.currentUser?.displayName;
  const photoURL = authService.currentUser?.photoURL;
  // 카테고리 함수
  const handleCategory = (e: any) => {
    const checkCat = category.includes(e.target.value);
    if (checkCat) {
      setCategory(category.filter((prev: any) => prev !== e.target.value));
    } else {
      setCategory((prev: any) => [...prev, e.target.value]);
    }
  };

  //add
  const newPost = {
    title,
    content,
    category,
    userId: uid,
    nickName: displayName,
    createdAt: Date.now(),
    profileImg: photoURL,
    coord: state.center,
  };
  //타이틀 값
  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };
  //내용 값
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleSubmitButtonClick = async () => {
    // 유효성검사용
    if (!title.trim() || title === null) {
      setCorrectTitle(true);
      return;
    }
    if (!content.trim() || content === null) {
      setCorrectContent(true);
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
      <InnerContainer>
        {/* Map 컴포넌트 */}
        <Map state={state} setState={setState} />
        <ContentsWrap>
          <ProfileContainer>
            <ProfilePhoto background={photoURL ?? "black"} />
            <p>{displayName}</p>
          </ProfileContainer>
          <HirePositionContainer>
            <HirePositionText>Hiring Position : </HirePositionText>
            <CreateCategory
              category={category}
              setCategory={setCategory}
              handleCategory={handleCategory}
            />
          </HirePositionContainer>
          {/* 제목,내용 input */}
          <PostTitle
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
            wrap="hard">
            {correctcontent && (
              <TitleErrorText>내용을 입력하지 않았습니다.</TitleErrorText>
            )}
          </PostText>
          <SubmitBtnContainer>
            <SubmitBtn onClick={handleSubmitButtonClick}>등록</SubmitBtn>
          </SubmitBtnContainer>
        </ContentsWrap>
      </InnerContainer>
    </Container>
  );
};
export default CreatePost;

const Container = styled.div`
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

const InnerContainer = styled.div`
  max-width: 1100px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const ContentsWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
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

const HirePositionContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 50px;
  margin-left: 4px;
`;

const HirePositionText = styled.p`
  width: 120px;
  height: 100%;
  margin-right: 12px;
  text-align: center;
`;

const PostTitle = styled.textarea`
  width: 100%;
  height: 34px;
  margin-bottom: 12px;
  padding-left: 8px;
  border-left: 2px solid #aaa;
  resize: none;
  line-height: 2.4;
  font-size: 14px;
  transition-duration: 0.3s;
  :focus {
    border-left: 2px solid #fff;
    box-shadow: 5px 5px 5px #aaa;
    background-color: #fff;
  }
`;

const PostText = styled.textarea`
  min-height: 150px;
  width: 100%;
  height: 100%;
  margin-bottom: 12px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 10px;
  resize: none;
  transition-duration: 0.3s;
  :focus {
    border: 1px solid #333;
    box-shadow: 5px 5px 5px #c0c0c0;
  }
`;

const TitleErrorText = styled.p`
  font-size: 12px;
  color: #ff6f6f;
  margin: inherit;
  margin-top: -12px;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const SubmitBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const SubmitBtn = styled.button`
  width: 50px;
  height: 30px;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  color: #262b7f;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #262b7f;
    color: #ffffff;
  }
`;
