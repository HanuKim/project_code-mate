import  { useEffect, useState } from "react";
import styled from "styled-components";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { dbService } from "../shared/firebase";
import MainCategory from "../components/post/MainCategory";
import PostList from "../components/post/PostList";
import { PostState } from "../shared/type";
import { useNavigate } from "react-router-dom";
import AlertModal from "../components/modal/AlertModal";

export default function Home({ setOpenModal }: any) {
  const [posts, setPosts] = useState<PostState[]>([]);
  const [category, setCategory] = useState("");
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const [AlertMessageText, setAlertMessageText] = useState("");
  const navigate = useNavigate();
  const authService = getAuth();
  // post 데이터에서 createAt을 내림차순으로 정렬
  const q = query(collection(dbService, "post"), orderBy("createdAt", "desc"));

  const getTimegap = (posting: number) => {
    const msgap = Date.now() - posting;
    const minutegap = Math.floor(msgap / 60000);
    const hourgap = Math.floor(msgap / 3600000);
    const daygap = Math.floor(msgap / 86400000);
    if (msgap < 0) {
      return "0분전";
    }
    if (daygap > 7) {
      const time = new Date(posting);
      const timegap = time.toJSON().substring(0, 10);
      return <p>{timegap}</p>;
    }
    if (hourgap > 24) {
      return <p>{daygap}일 전</p>;
    }
    if (minutegap > 59) {
      return <p>{hourgap}시간 전</p>;
    } else {
      return <p>{minutegap}분 전</p>;
    }
  };
  const getPost = () => {
    onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => {
        const newPost = {
          id: doc.id,
          ...doc.data(), // <- poststate
          createdAt: getTimegap(doc.data().createdAt), // timestamp로 저장된 데이터 가공
        } as PostState;
        // poststate로 들어올걸 확신해서 as를 사용함
        // as 사용하기 전에는 doc을 추론하지 못해서 계속 에러가 났음
        return newPost;
      });
      setPosts(newPosts);
    });
  };

  // 현재 누른 카테고리를 category 컬렉션에 업데이트

  useEffect(() => {
    getPost();

    const getCategory = async () => {
      const snapshot = await getDoc(
        doc(dbService, "category", "currentCategory")
      );
      setCategory(snapshot.data().category); 
    };
    getCategory();
  }, []);

  const handleWriteNaviageClick = () => {
    // 유효성검사용
    let authWrite = authService.currentUser
      ? navigate("/createpost")
      : handleWriteLoginModal();
    return authWrite;
  };
  const handleWriteLoginModal = () => {
    setAlertModal(true);
    setAlertMessageText("로그인이 필요합니다!");
  };
  return (
    <Container>
      {alertModal ? (
        <AlertModal
          children={AlertMessageText}
          setAlertModal={setAlertModal}
          setOpenModal={setOpenModal}
        />
      ) : null}
      {/* 카테고리 */}
      {/* Slice로 어떻게 넣지..? */}
      <MainCategory category={category} setCategory={setCategory} />

      {/* 글쓰기 버튼 */}

      <WriteContainer>
        <WriteBt onClick={handleWriteNaviageClick}>
          <HiOutlinePencilSquare size={30} />
        </WriteBt>
      </WriteContainer>

      {/* 포스트 */}
      <PostList posts={posts} category={category} />
    </Container>
  );
}
const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 20px auto;
`;

const WriteContainer = styled.div`
  width: 100%;
  text-align: right;
`;

const WriteBt = styled.button`
  width: 52px;
  height: 52px;
  margin: 40px 0 20px 0;
  border: 1px solid #d0d0d0;
  border-radius: 50%;
  background-color: #f2f2f2;
  cursor: pointer;
  &:hover {
    background-color: #262b7f;
    color: #f2f2f2;
  }
`;
