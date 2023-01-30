import React, {useState, useRef, ChangeEvent} from 'react';
import styled from 'styled-components';
import {storage, dbService} from '../../shared/firebase';
import {ref, getDownloadURL, uploadString} from 'firebase/storage';
import {AiOutlineUpload} from 'react-icons/ai';
import {addDoc, serverTimestamp, collection} from 'firebase/firestore';

export default function UploadImage() {
  const [nickName, setNickName] = useState('');
  const [contents, setContents] = useState('');
  const [preview, setPreview] = useState<
    string | ArrayBuffer | null | undefined
  >('');

  const inputRef = useRef<HTMLInputElement>(null);

  const showImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e?.target?.files?.[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = (e) => {
      setPreview(e?.target?.result);
    };
  };

  const submitToFirebase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageRef = ref(storage, `${nickName}`);
    uploadString(imageRef, preview as string, 'data_url').then((snapshot) => {
      getDownloadURL(imageRef).then(async (url) => {
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
  };

  return (
    <>
      <ModalContainer>
        <ModalForm onSubmit={submitToFirebase}>
          <UploadTitle>Upload Image</UploadTitle>
          <PhotoBox>
            {preview && (
              <img src={preview as string} width={150} height={150} alt='' />
            )}
          </PhotoBox>
          <PreviewWrap>
            <PhotoTitle
              placeholder='Nickname'
              onChange={(e) => setNickName(e.target.value)}
              value={nickName}
            ></PhotoTitle>
            <PhotoTitle
              placeholder='Stack'
              onChange={(e) => setContents(e.target.value)}
              value={contents}
            ></PhotoTitle>
            <input
              type='file'
              hidden
              ref={inputRef}
              onChange={showImagePreview}
            />
            <AiOutlineUpload
              onClick={() => inputRef.current?.click()}
              size={30}
              style={{cursor: 'pointer'}}
            />
          </PreviewWrap>
          <PhotoUploadBtn>Upload</PhotoUploadBtn>
        </ModalForm>
      </ModalContainer>
    </>
  );
}

const ModalContainer = styled.div`
  height: 100px;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
`;

const UploadTitle = styled.h1`
  text-align: center;
  font-size: 20px;
`;
const PreviewWrap = styled.div``;

const PhotoTitle = styled.input``;
const PhotoUploadBtn = styled.button``;
const PhotoBox = styled.div`
  width: 300px;
  height: 300px;
`;
