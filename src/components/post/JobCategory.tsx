import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import {doc, getDoc, DocumentData} from 'firebase/firestore';
import {dbService} from '../../shared/firebase';

export default function JobCategory() {
  const [categorypost, setCategoryPost] = useState<DocumentData>({
    category: [],
  });
  let {id} = useParams();
  const getPost = async () => {
    const snapshot = await getDoc(doc(dbService, 'post', id));
    const data = snapshot.data(); // 가져온 doc의 객체 내용
    setCategoryPost(data);
  };
  useEffect(() => {
    getPost();
  }, []);

  return (
    <Container>
      {categorypost.category.map((item: string) => {
        // 카테고리가 all이면 버튼보이지않게
        if (item === 'all') {
          return;
        } else {
          return (
            // BottomCategoryBt에 key 지정해줘야 함.
            <JobBar>
              {item === 'FrontEnd'
                ? 'FrontEnd'
                : item === 'BackEnd'
                ? 'BackEnd'
                : item === 'Designer'
                ? 'Designer'
                : item === 'Web Publish'
                ? 'Web Publish'
                : item === 'Product Manage'
                ? 'Product Manage'
                : ''}
            </JobBar>
          );
        }
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  position: absolute;
  bottom: 30px;
  left: 30px;
`;

const JobBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px 12px;

  border-radius: 10px;

  background-color: #262b7f;

  font-size: 12px;
  color: #f2f2f2;

  cursor: default;
`;
