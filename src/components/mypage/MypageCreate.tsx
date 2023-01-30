import React, {useState} from 'react';
import styled from 'styled-components';

import {collection, addDoc} from 'firebase/firestore';
import {dbService} from '../../shared/firebase';

export default function MypageCreate() {
  const [introduce, setIntroduce] = useState('');

  const newIntroduce = {
    introduce,
    userId: '0000',
    createdAt: Date.now(),
  };

  const introducehandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduce(e.target.value);
  };

  const addIntroduce = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!introduce.trim() || introduce === null) {
      alert('입력을 완료해주세요');
      return;
    } else {
      await addDoc(collection(dbService, 'introduce'), newIntroduce);
      setIntroduce('');
    }
  };
  console.log(introduce);
  return (
    <Container>
      <CreateForm onSubmit={addIntroduce}>
        <CreateBox
          placeholder='내용을 입력해주세요'
          onChange={introducehandle}
          value={introduce}
          cols={30}
          wrap='hard'
        />
        <CreateBtnWrap>
          <CreateBtn>등록</CreateBtn>
        </CreateBtnWrap>
      </CreateForm>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const CreateForm = styled.form``;

const CreateBox = styled.textarea`
  background-color: white;
  height: 530px;
  width: 100%;
  border-radius: 10px;
  padding: 15px;
`;

const CreateBtn = styled.button`
  background-color: #262b7f;
  color: white;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
`;

const CreateBtnWrap = styled.div`
  background-color: red;
  display: flex;
`;
