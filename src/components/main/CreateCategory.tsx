import { current } from "@reduxjs/toolkit";
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { dbService } from "../../shared/firebase";

export default function CreateCategory({
  category,
  setCategory,
  handleCategory,
}: any) {
  const [isClickfront, setIsClickfront] = useState(false);
  const [isClickBack, setIsClickBack] = useState(false);
  const [isClickDesign, setIsClickDesign] = useState(false);
  const [isClickPul, setIsClickPul] = useState(false);
  const [isClickPm, setIsClickPm] = useState(false);
  const { id } = useParams();

  return (
    <CategoryContainer>
      <CategoryBt
        type="button"
        value={"front"}
        id="iscategory"
        name="iscategory"
        onClick={(e) => {
          handleCategory(e);
          setIsClickfront(!isClickfront);
        }}
        style={{
          borderColor: isClickfront ? "#262b7f" : "#a8a8a8",
        }}
      />

      <CategoryBt
        type="button"
        value={"back"}
        id="iscategory"
        name="iscategory"
        onClick={(e) => {
          handleCategory(e);
          setIsClickBack(!isClickBack);
        }}
        style={{ borderColor: isClickBack ? "#262b7f" : "#a8a8a8" }}
      />

      <CategoryBt
        type="button"
        value={"design"}
        id="iscategory"
        name="iscategory"
        onClick={(e) => {
          handleCategory(e);
          setIsClickDesign(!isClickDesign);
        }}
        style={{
          borderColor: isClickDesign ? "#262b7f" : "#a8a8a8",
        }}
      />

      <CategoryBt
        type="button"
        value={"publ"}
        id="iscategory"
        name="iscategory"
        onClick={(e) => {
          handleCategory(e);
          setIsClickPul(!isClickPul);
        }}
        style={{ borderColor: isClickPul ? "#262b7f" : "#a8a8a8" }}
      />

      <CategoryBt
        type="button"
        value={"pm"}
        id="iscategory"
        name="iscategory"
        onClick={(e) => {
          handleCategory(e);
          setIsClickPm(!isClickPm);
        }}
        style={{ borderColor: isClickPm ? "#262b7f" : "#a8a8a8" }}
      />
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;
`;
const CategoryBt = styled.input`
  height: 55px;
  width: 150px;
  border: 1px solid #a8a8a8;
  background-color: white;
  border-radius: 30px;
  color: #a8a8a8;
  font-size: 18px;
  cursor: pointer;
`;
