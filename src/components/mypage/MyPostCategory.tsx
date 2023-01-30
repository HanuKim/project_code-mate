import styled from 'styled-components';
import { doc, updateDoc } from 'firebase/firestore';
import { dbService } from '../../shared/firebase';
import { useEffect } from 'react';

export default function MainCategory({
  category,
  setCategory,
}: {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const setCat = async (cat: string) => {
    setCategory(cat);
  };

  return (
    <CategoryContainer>
      <CategoryBt
        onClick={() => setCat('all')}
        style={{
          color: category === 'all' ? '#333' : '#d0d0d0',
        }}
      >
        All
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat('FrontEnd')}
        style={{
          color: category === 'FrontEnd' ? '#333' : '#d0d0d0',
        }}
      >
        FrontEnd
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat('BackEnd')}
        style={{
          color: category === 'BackEnd' ? '#333' : '#d0d0d0',
        }}
      >
        BackEnd
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat('Designer')}
        style={{
          color: category === 'Designer' ? '#333' : '#d0d0d0',
        }}
      >
        Designer
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat('Web Publish')}
        style={{
          color: category === 'Web Publish' ? '#333' : '#d0d0d0',
        }}
      >
        Web Publish
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat('Product Manage')}
        style={{
          color: category === 'Product Manage' ? '#333' : '#d0d0d0',
        }}
      >
        Product Manage
      </CategoryBt>
    </CategoryContainer>
  );
}
const CategoryContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  gap: 25px;
`;
const CategoryBt = styled.button`
  height: 52px;
  width: 140px;
  border: 1px solid #d0d0d0;
  background-color: white;
  border-radius: 30px;
  color: #a8a8a8;
  transition-duration: 0.3s;
  cursor: pointer;
  :focus {
    transform: scale(1.1);
    box-shadow: 3px 3px 5px #aaa;
  }
`;
