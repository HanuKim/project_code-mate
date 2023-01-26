import { current } from "@reduxjs/toolkit";
import React, { useCallback } from "react";
import styled from "styled-components";

export default function CreateCategory({ Postcategory, setPostCategory }: any) {
  const setCat = useCallback(
    (e: any) => {
      const cat = e.target.value;
      console.log("checked = ", cat);
      const setCate = Postcategory.filter((current: string) => current !== cat);
      console.log("setCate = ", setCate);
      if (e.target.value) {
        setCate.push(cat);
      }
      setPostCategory(setCate);
    },
    [Postcategory]
  );

  console.log("Postcategory = ", Postcategory);

  return (
    <CategoryContainer>
      <CategoryBt
        value="front"
        onClick={setCat}
        style={{
          borderColor: Postcategory === "front" ? "#262b7f" : "#a8a8a8",
        }}
      >
        프론트엔드
      </CategoryBt>
      <CategoryBt
        value="back"
        onClick={setCat}
        style={{ borderColor: Postcategory === "back" ? "#262b7f" : "#a8a8a8" }}
      >
        백엔드
      </CategoryBt>
      <CategoryBt
        value="design"
        onClick={setCat}
        style={{
          borderColor: Postcategory === "design" ? "#262b7f" : "#a8a8a8",
        }}
      >
        디자이너
      </CategoryBt>
      <CategoryBt
        value="publ"
        onClick={setCat}
        style={{ borderColor: Postcategory === "publ" ? "#262b7f" : "#a8a8a8" }}
      >
        퍼블리셔
      </CategoryBt>
      <CategoryBt
        value="pm"
        onClick={setCat}
        style={{ borderColor: Postcategory === "pm" ? "#262b7f" : "#a8a8a8" }}
      >
        PM
      </CategoryBt>
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;
`;
const CategoryBt = styled.button`
  height: 55px;
  width: 150px;
  border: 1px solid #a8a8a8;
  background-color: white;
  border-radius: 30px;
  color: #a8a8a8;
  font-size: 18px;
  cursor: pointer;
`;
