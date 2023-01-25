import React, { useState, useRef, ChangeEvent } from 'react';
import styled from 'styled-components';
import { storage, dbService } from '../shared/firebase';
import {
  ref,
  getDownloadURL,
  uploadString,
  deleteObject,
} from 'firebase/storage';
import { AiOutlineUpload } from 'react-icons/ai';
import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

export default function UploadImage() {
  const [nickName, setNickName] = useState('');
  const [contents, setContents] = useState('');
  const [preview, setPreview] = useState<
    string | ArrayBuffer | null | undefined
  >('');

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const showImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e?.target?.files?.[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = e => {
      setPreview(e?.target?.result);
      // saveToFirebaseStorage(file);
    };
  };

  //   const saveToFirebaseStorage = (file: any) => {
  //     const uniqueKey = new Date().getTime();
  //     const newName = file.name
  //       .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, '')
  //       .split(' ')
  //       .join('');
  //   };

  const submitToFirebase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageRef = ref(
      storage,
      `${nickName}`
      //   `${v4()}`
    );
    uploadString(imageRef, preview as string, 'data_url').then(snapshot => {
      getDownloadURL(imageRef).then(async url => {
        await addDoc(collection(dbService, 'images'), {
          nickName,
          contents,
          imageUrl: url,
          serverTime: serverTimestamp(),
        });
      });
    });
    console.log(`$(imageRef) --> added`);
    setPreview(null);
    setNickName('');
    setContents('');
    // navigate(-1);
  };

  // 여기가 delete 코드입니다.
  //   const deleteFile = () => {
  //     const desertRef = ref(storage, 'ProfilePhoto/--1674560036425');

  //     deleteObject(desertRef)
  //       .then(() => {
  //         console.log(`delete success`);
  //       })
  //       .catch(error => {
  //         console.log(`delete ${error}`);
  //       });
  //   };

  return (
    <>
      <ModalContainer>
        <ModalForm onSubmit={submitToFirebase}>
          <UploadTitle>Upload Image</UploadTitle>
          <PhotoBox>
            {preview && (
              <img src={preview as string} width={150} height={150} alt="" />
            )}
          </PhotoBox>
          <PreviewWrap>
            <PhotoTitle
              //   type="text"
              placeholder="Nickname"
              onChange={e => setNickName(e.target.value)}
              value={nickName}
            ></PhotoTitle>
            <PhotoTitle
              //   type="text"
              placeholder="Stack"
              onChange={e => setContents(e.target.value)}
              value={contents}
            ></PhotoTitle>
            <input
              type="file"
              hidden
              ref={inputRef}
              onChange={showImagePreview}
            />
            <AiOutlineUpload
              onClick={() => inputRef.current?.click()}
              size={30}
              style={{ cursor: 'pointer' }}
            />
          </PreviewWrap>
          <PhotoUploadBtn>Upload</PhotoUploadBtn>
        </ModalForm>
        {/* <button onClick={deleteFile}>delete</button> */}
      </ModalContainer>
    </>
  );
}

const ModalContainer = styled.div`
  /* background-color: blue; */
  height: 100px;
`;

const ModalForm = styled.form`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
`;

const UploadTitle = styled.h1`
  text-align: center;
  font-size: 20px;
`;
const PreviewWrap = styled.div`
  /* background-color: green; */
`;

const PhotoTitle = styled.input``;
const PhotoUploadBtn = styled.button``;
const PhotoBox = styled.div`
  /* background-color: red; */
  width: 300px;
  height: 300px;
`;
