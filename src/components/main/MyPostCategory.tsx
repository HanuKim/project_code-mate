import styled from "styled-components";
import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "../../shared/firebase";
import { useEffect } from "react";

export default function MyPostCategory({
  category,
  setCategory,
}: {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const setCat = async (cat: string) => {
    setCategory(cat);
  };

  return (
    <CategoryContainer>
      <CategoryBt
        onClick={() => setCat("all")}
        style={{ color: category === "all" ? "#333" : "#d0d0d0" }}>
        전체
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat("front")}
        style={{ color: category === "front" ? "#333" : "#d0d0d0" }}>
        프론트엔드
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat("back")}
        style={{ color: category === "back" ? "#333" : "#d0d0d0" }}>
        백엔드
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat("design")}
        style={{ color: category === "design" ? "#333" : "#d0d0d0" }}>
        디자이너
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat("publ")}
        style={{ color: category === "publ" ? "#333" : "#d0d0d0" }}>
        퍼블리셔
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat("pm")}
        style={{ color: category === "pm" ? "#333" : "#d0d0d0" }}>
        PM
      </CategoryBt>
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  gap: 25px;
`;
const CategoryBt = styled.button`
  height: 52px;
  width: 140px;
  border: 1px solid #d0d0d0;
  background-color: white;
  border-radius: 30px;
  color: #a8a8a8;
  transition-duration: 0.3s;
  cursor: pointer;
  :focus {
    transform: scale(1.1);
    box-shadow: 3px 3px 5px #aaa;
  }
`;
