import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { BtnProps, MixBtnProps } from "../shared/type";
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "../shared/firebase";
// 버튼 크기를 props로 내려서 경우에 따라 다르게 적용하고싶은데 어떻게 해야??
// interface 생성해서.

export default function Button(props: MixBtnProps) {
  let { id } = useParams();

  const [setDetail, getSetDetail] = useState("");
  const getDetail = async () => {
    const snapshot = await getDoc(doc(dbService, "post", id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    // @ts-ignore
    getSetDetail(data);
  };
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <Container>
      <DeleteBtn style={{ width: props.btnWidth, height: props.btnHeight }}>
        {props.delete}
      </DeleteBtn>
      <Link to={`/edit/${id}`} state={{ setDetail }}>
        <EditBtn style={{ width: props.btnWidth, height: props.btnHeight }}>
          {props.edit}
        </EditBtn>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  gap: 12px;
  width: 200px;
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
  transition-duration: 0.3s;
  :hover {
    color: #f2f2f2;
    background-color: #262b7f;
    border: 1px solid #262b7f;
  }
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

  transition-duration: 0.3s;
  :hover {
    color: #f2f2f2;
    background-color: #262b7f;
    border: 1px solid #262b7f;
  }
`;
