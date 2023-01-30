import { useEffect, useState } from "react";
import styled from "styled-components";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDoc,
  where,
} from "firebase/firestore";
import { dbService, authService } from "../../shared/firebase";

import { PostState } from "../../shared/type";
import { useParams } from "react-router-dom";
import MyPostCategory from "./MyPostCategory";
import MyPostList from "./MyPostList";

export default function MyPost() {
  const [posts, setPosts] = useState<PostState[]>([]);
  const [category, setCategory] = useState("");
    authService.currentUser?.uid || window.localStorage.getItem("userid");

  const q = query(
    collection(dbService, "post"),
    orderBy("createdAt", "desc"),
    where("userId", "==", useParams().id)
  );

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
    if (minutegap > 60) {
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
          ...doc.data(),
          createdAt: getTimegap(doc.data().createdAt),
        } as PostState;
        return newPost;
      });
      setPosts(newPosts);
    });
  };

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

  return (
    <Container>
      <MyPostCategory category={category} setCategory={setCategory} />

      <MyPostList posts={posts} category={category} />
    </Container>
  );
}
const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 20px auto;
`;
