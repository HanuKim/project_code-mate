import React from "react";
import styled from "styled-components";
import { BtnProps } from "../shared/type";
import { useNavigate } from "react-router-dom";
// 버튼 크기를 props로 내려서 경우에 따라 다르게 적용하고싶은데 어떻게 해야??
// interface 생성해서.

export default function Button(props: BtnProps) {
  console.log(props);
  const navigate = useNavigate();
  return (
    <Container>
      <DeleteBtn style={{ width: props.btnWidth, height: props.btnHeight }}>
        {props.delete}
      </DeleteBtn>
      <EditBtn
        onClick={() => {
          navigate("edit");
        }}
        style={{ width: props.btnWidth, height: props.btnHeight }}
      >
        {props.edit}
      </EditBtn>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  width: 160px;
  height: 100%;
`;

const DeleteBtn = styled.div<BtnProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #d0d0d0;
  border-radius: 20px;

  color: #262b7f;
  font-size: 14px;
  cursor: pointer;
  transition-duration : .3s;
  :hover {
    color: #f2f2f2;
    background-color #262b7f;
    border: 1px solid #262b7f;
  };
`;

const EditBtn = styled.div<BtnProps>`  
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #d0d0d0;
  border-radius: 20px;

  color: #262b7f;
  font-size: 14px;
  cursor: pointer;

  transition-duration : .3s;
  :hover {
    color: #f2f2f2;
    background-color #262b7f;
    border: 1px solid #262b7f;
  };
`;
