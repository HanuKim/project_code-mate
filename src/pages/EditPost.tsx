import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Map from "../components/main/Map";
import CreateCategory from "../components/main/CreateCategory";
import { PostState, MapProps } from "../shared/type";
import {
  collection,
  updateDoc,
  doc,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { dbService, authService } from "../shared/firebase";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import basicImg from "../../img/basicImg.png";

const EditPost = () => {
  const location = useLocation();
  const {
    content,
    coord: { lat, lng },
    createdAt,
    isEdit,
    nickName,
    profileImg,
    title,
    userId,
  } = location.state.setDetail;

  const navigate = useNavigate();
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [correcttitle, setCorrectTitle] = useState<boolean>(false); //제목 유효성 검사
  const [correctcontent, setCorrectContent] = useState<boolean>(false); //제목 유효성 검사
  const [category, setCategory] = useState(["all"]); //카테고리
  const [editPost, setEditPost] = useState<DocumentData>({
    title: "",
    category: category,
    content: "",
    coord: { lat, lng },
  });
  const ref = useRef(null);
  const authService = getAuth();
  const { id } = useParams();
  const displayName = authService.currentUser?.displayName;
  const photoURL = authService.currentUser?.photoURL;
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditContent(e.target.value);
  };
  //카테고리 토글기능..category안에 넣을 수 있는지
  const handleCategory = (e: any) => {
    const checkCat = category.includes(e.target.value);
    if (checkCat) {
      setCategory(category.filter((prev: any) => prev !== e.target.value));
    } else {
      setCategory((prev: any) => [...prev, e.target.value]);
    }
  };
  const [state, setState] = useState<MapProps>({
    // 지도의 초기 위치
    center: { lat, lng },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });

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

  const handleEditButton = async () => {
    if (!editTitle.trim() || title === null) {
      setCorrectTitle(true);
      return;
    }
    if (!editContent.trim() || content === null) {
      setCorrectContent(true);
      return;
    } else {
      await updateDoc(doc(dbService, "post", id), {
        title: editTitle,
        category: category,
        content: editContent,
        coord: state.center,
      });
      navigate(`/detail/${id}`);
    }
  };
  return (
    <Container>
      <CommentForm>
        <Map state={state} setState={setState} />
        <PostsTopContainer>
          <ProfileContainer>
            <ProfilePhoto background={photoURL ?? "black"} />
            <ProfileNickName>{displayName}</ProfileNickName>
          </ProfileContainer>
        </PostsTopContainer>
        <CreateCategory
          category={category}
          setCategory={setCategory}
          handleCategory={handleCategory}
        />
        <CommentLabel>
          <Postitle
            defaultValue={editPost.title}
            onChange={handleChangeTitle}
            id="title"
            name="title"
            ref={ref}
          />
          {correcttitle && (
            <TitleErrorText>제목을 입력하지 않았습니다.</TitleErrorText>
          )}
          <PostText
            defaultValue={editPost.content}
            onChange={handleChangeContent}
            id="content"
            name="content"
            ref={ref}
          />
          {correctcontent && (
            <TitleErrorText>내용을 입력하지 않았습니다.</TitleErrorText>
          )}
          <CommentSubmitButton onClick={handleEditButton}>
            등록
          </CommentSubmitButton>
          <CommentSubmitButton
            onClick={() => {
              navigate(`/detail/${id}`);
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
  border: 1px solid #d0d0d0;
  border-radius: 50%;
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

const Postitle = styled.input`
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

const PostText = styled.input`
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
