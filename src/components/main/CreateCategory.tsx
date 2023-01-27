import { current } from "@reduxjs/toolkit";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

export default function CreateCategory({ category, setCategory }: any) {
  const [isClickfront, setIsClickfront] = useState(false);
  const [isClickBack, setIsClickBack] = useState(false);
  const [isClickDesign, setIsClickDesign] = useState(false);
  const [isClickPul, setIsClickPul] = useState(false);
  const [isClickPm, setIsClickPm] = useState(false);

  const setCat = (e: any) => {
    //console.log("setCat!!!!!");
    const cat = e.target.value;
    const setCate = category.filter((current: string) => current !== cat);

    if (cat) {
      setCate.push(cat);
    }
    setCategory(setCate);
  };

  return (
    <CategoryContainer>
      <CategoryBt
        value="front"
        onClick={(e) => {
          setCat(e);
          setIsClickfront(!isClickfront);
        }}
        style={{
          borderColor: isClickfront ? "#262b7f" : "#a8a8a8",
        }}
      >
        프론트엔드
      </CategoryBt>
      <CategoryBt
        value="back"
        onClick={(e) => {
          setCat(e);
          setIsClickBack(!isClickBack);
        }}
        style={{ borderColor: isClickBack ? "#262b7f" : "#a8a8a8" }}
      >
        백엔드
      </CategoryBt>
      <CategoryBt
        value="design"
        onClick={(e) => {
          setCat(e);
          setIsClickDesign(!isClickDesign);
        }}
        style={{
          borderColor: isClickDesign ? "#262b7f" : "#a8a8a8",
        }}
      >
        디자이너
      </CategoryBt>
      <CategoryBt
        value="publ"
        onClick={(e) => {
          setCat(e);
          setIsClickPul(!isClickPul);
        }}
        style={{ borderColor: isClickPul ? "#262b7f" : "#a8a8a8" }}
      >
        퍼블리셔
      </CategoryBt>
      <CategoryBt
        value="pm"
        onClick={(e) => {
          setCat(e);
          setIsClickPm(!isClickPm);
        }}
        style={{ borderColor: isClickPm ? "#262b7f" : "#a8a8a8" }}
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
