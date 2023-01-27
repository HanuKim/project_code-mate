import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import MapContainer from "../components/MapContainer";
import JobCategory from "../components/JobCategory";
import CodeMate from "../img/CodeMate.png";
import Comments from "../components/comment/Comments";
import CommentInput from "../components/comment/CommentInput";
import CommentList from "../components/comment/CommentList";
import basicImg from "../../img/basicImg.png";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { dbService, authService } from "../shared/firebase";
import { getAuth } from "firebase/auth";

export default function Detail() {
  return (
    <>
      <Container>
        <InnerWidth>
          <div className="map">
            <MapContainer />
          </div>
          <ContentsContainer>
            <ProfileContainer>
              <ProfileWrap>
                <ProfilePic></ProfilePic>
                <ProfileName>7전8기</ProfileName>
              </ProfileWrap>
              <Button
                delete="삭제"
                edit="수정"
                btnWidth={80}
                btnHeight={40}></Button>
            </ProfileContainer>
            <Title>CodeMate 토이 프로젝트 하실 분 구합니다.</Title>
            <Contents>여기엔 내용이 들어갑니다.</Contents>
            <JobCategory></JobCategory>
          </ContentsContainer>
        </InnerWidth>
        <CommentInput />
        <CommentList />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const InnerWidth = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
`;

const ContentsContainer = styled.div`
  position: relative;
  min-height: 700px;
  width: 100%;
  height: 100%;
  padding: 30px;
  border: 1px solid #d0d0d0;
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 30px;
`;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ProfilePic = styled.div`
  max-width: 64px;
  max-height: 64px;
  width: 100%;
  height: 100%;
  background-image: url(${CodeMate});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  border: 1px solid #d0d0d0;
  border-radius: 50%;
`;

const ProfileName = styled.div`
  margin-left: 20px;
  font-size: 20px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
`;

const CommentEdit = styled.form`
  position: relative;

  max-width: 1100px;
  min-height: 130px;
  width: 100%;
  height: 100%;

  padding: 15px;

  border: 1px solid #d0d0d0;
  border-radius: 10px;
`;

const Input = styled.textarea`
  max-width: 1060px;
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
  padding: 15px;
  border: none;
  word-wrap: wrap;
  word-break: break-all;
  background-color: #f2f2f2;
  transition-duration: 0.3s;
  &:focus {
    box-shadow: 7px 7px 7px #d0d0d0;
  }
`;

// const CommentEditBtn = styled.button`
// position : absolute;
// right : 0;
//   width: 60px;
//   height: 40px;
//   border: 1px solid #d0d0d0;
//   border-radius: 10px;
//   cursor: pointer;
//   transition-duration : .3s;
//   :hover {
//     color: #f2f2f2;
//     background-color #262b7f;
//     border: 1px solid #262b7f;
//   };
// `;

const CommentContainer = styled.div`
  max-width: 1100px;
  width: 100%;
  height: 100%;
`;

const CommentTitle = styled.div`
  padding-left: 5px;
  margin-top: 32px;
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: bold;
`;

const CommentWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  min-height: 25px;
  width: 100%;

  margin: 4px 0;
`;

const CommentWriter = styled.div`
  margin-left: 12px;
  font-size: 14px;
  font-weight: 500;
`;

// 댓글 수정 삭제버튼..
