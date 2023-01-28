import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  collection,
  updateDoc,
  doc,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { dbService, authService } from "../shared/firebase";

export default function JobCategory() {
  const [categorypost, setCategoryPost] = useState<DocumentData>({
    category: [],
  });
  let { id } = useParams();
  const getPost = async () => {
    const snapshot = await getDoc(doc(dbService, "post", id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    setCategoryPost(data);
  };
  useEffect(() => {
    getPost();
  }, []);

  return (
    <Container>
      {categorypost.category.map((item: string) => {
        // 카테고리가 all이면 버튼보이지않게
        if (item === "all") {
          return;
        } else {
          return (
            // BottomCategoryBt에 key 지정해줘야 함.
            <JobBar>
              {item === "front"
                ? "프론트엔드"
                : item === "back"
                ? "백엔드"
                : item === "design"
                ? "디자이너"
                : item === "publ"
                ? "퍼블리셔"
                : item === "pm"
                ? "PM"
                : ""}
            </JobBar>
          );
        }
      })}
      {/* <JobBar>백엔드</JobBar>
      <JobBar>프론트엔드</JobBar>
      <JobBar>UX/UI</JobBar>
      <JobBar>웹 디자이너</JobBar>
      <JobBar>퍼블리셔</JobBar> */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  position: absolute;
  bottom: 30px;
  left: 30px;
`;

const JobBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border-radius: 50px;
  background-color #262b7f;
  color: #f2f2f2;
  font-size: 14px;
  cursor: pointer;

`;
