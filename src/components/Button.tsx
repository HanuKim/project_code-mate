import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link, useParams} from 'react-router-dom';
import {BtnProps, MixBtnProps} from '../shared/type';
import {doc, getDoc} from 'firebase/firestore';
import {dbService} from '../shared/firebase';
import DeleteModal from './modal/DeleteModal';

export default function Button(props: MixBtnProps, {comment}: any) {
  let {id} = useParams();
  const [viewDeleteModal, setDeleteViewModal] = useState(false);
  const [setDetail, getSetDetail] = useState('');

  const openDeleteModalClick = () => {
    setDeleteViewModal(true);
  };

  const getDetail = async () => {
    const snapshot = await getDoc(doc(dbService, 'post', id));
    const data = snapshot.data();
    // @ts-ignore
    getSetDetail(data);
  };
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <Container>
      {viewDeleteModal ? (
        <DeleteModal
          setDeleteViewModal={setDeleteViewModal}
          comment={comment}
        />
      ) : null}
      <DeleteBtn
        onClick={openDeleteModalClick}
        style={{width: props.btnWidth, height: props.btnHeight}}
      >
        {props.delete}
      </DeleteBtn>
      <Link to={`/edit/${id}`} state={{setDetail}}>
        <EditBtn style={{width: props.btnWidth, height: props.btnHeight}}>
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
