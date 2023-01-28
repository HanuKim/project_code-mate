import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { ChangeEvent, useEffect, useState } from "react";
import { storage, auth } from "../shared/firebase";
import styled from "styled-components";

export default function Profile() {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );

  function useAuth() {
    const [currentUser, setCurrentUser] = useState<any>();

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
      return unsub;
    }, []);

    return currentUser;
  }

  async function upload(file: any, currentUser: any, setLoading: any) {
    const fileRef = ref(storage, currentUser.uid + ".png");

    setLoading(true);

    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, { photoURL });
    setPhotoURL(photoURL);
    setLoading(false);
    alert("Uploaded file!");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e?.target?.files?.[0]) {
      setPhoto(e?.target?.files?.[0]);
    }
  }

  async function handleClick() {
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <PicContainer>
      <ImageWrap>
        <ProfileImage src={photoURL} width={150} height={130} />
      </ImageWrap>
      <ButtonWrap>
        <FileSelectBtn htmlFor="input-file">
          {" "}
          사진 선택
          <input type="file" hidden id="input-file" onChange={handleChange} />
        </FileSelectBtn>
        <UploatBtn disabled={loading || !photo} onClick={handleClick}>
          사진 등록
        </UploatBtn>
      </ButtonWrap>
    </PicContainer>
  );
}

const PicContainer = styled.div`
  width: 160px;
  height: 100%;
`;

const ImageWrap = styled.div`
  width: 140px;
  height: 140px;
  margin: 0 auto;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #d0d0d0;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 12px;
`;

const FileSelectBtn = styled.label`
  padding: 4px 12px;
  font-size: 12px;
  color: #262b7f;
  background-color: #fff;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    color: #fff;
    background-color: #262b7f;
    border: 1px solid #262b7f;
  }
`;

const UploatBtn = styled.button`
  padding: 4px 12px;
  font-size: 12px;
  color: #262b7f;
  background-color: #fff;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    color: #fff;
    background-color: #262b7f;
    border: 1px solid #262b7f;
  }
`;
