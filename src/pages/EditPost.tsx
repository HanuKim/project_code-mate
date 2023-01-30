import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Map from "../components/map/Map";
import CreateCategory from "../components/post/CreateCategory";
import { MapProps } from "../shared/type";
import { updateDoc, doc, getDoc, DocumentData } from "firebase/firestore";
import { dbService } from "../shared/firebase";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";

const EditPost = () => {
  const location = useLocation();
  const {
    content,
    coord: { lat, lng },
    title,
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
      <InnerContainer>
        <Map state={state} setState={setState} />
        <ContentsWrap>
          <ProfileContainer>
            <ProfilePhoto background={photoURL ?? "black"} />
            <ProfileNickName>{displayName}</ProfileNickName>
          </ProfileContainer>
          <PostsTopContainer>
            <HirePositionText>Hiring Position : </HirePositionText>
            <CreateCategory
              category={category}
              setCategory={setCategory}
              handleCategory={handleCategory}
            />
          </PostsTopContainer>
        </ContentsWrap>

        <PostTitle
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
          ref={ref}></PostText>
        {correctcontent && (
          <TitleErrorText>내용을 입력하지 않았습니다.</TitleErrorText>
        )}
        <SubmitBtnContainer>
          <SubmitBtn onClick={handleEditButton}>등록</SubmitBtn>
          <SubmitBtn
            onClick={() => {
              navigate(`/detail/${id}`);
            }}>
            취소
          </SubmitBtn>
        </SubmitBtnContainer>
      </InnerContainer>
    </Container>
  );
};
export default EditPost;

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
  margin-bottom: 30px;
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

const PostsTopContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ProfileNickName = styled.p`
  font-size: 15px;
  font-weight: 500;
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

const HirePositionText = styled.p`
  width: 120px;
  height: 100%;
  margin-right: 12px;
  text-align: center;
`;

const PostTitle = styled.input`
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
    border-radius: 10px;
  }
`;

const PostText = styled.input`
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
  gap: 4px;
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
