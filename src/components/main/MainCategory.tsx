import styled from 'styled-components';
import {doc, updateDoc} from 'firebase/firestore';
import {dbService} from '../../shared/firebase';
import { useEffect } from 'react';

export default function MainCategory({
  category,
  setCategory,
}: {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>
;
}) {
  const setCat = async (cat: string) => {
    setCategory(cat);
  };


  return (
    <CategoryContainer>
      <CategoryBt
        onClick={() => setCat('all')}
        style={{borderColor: category === 'all' ? '#262b7f' : '#a8a8a8'}}
      >
        전체
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat('front')}
        style={{
          borderColor: category === 'front' ? '#262b7f' : '#a8a8a8',
        }}
      >
        프론트엔드
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat('back')}
        style={{borderColor: category === 'back' ? '#262b7f' : '#a8a8a8'}}
      >
        백엔드
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat('design')}
        style={{
          borderColor: category === 'design' ? '#262b7f' : '#a8a8a8',
        }}
      >
        디자이너
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat('publ')}
        style={{borderColor: category === 'publ' ? '#262b7f' : '#a8a8a8'}}
      >
        퍼블리셔
      </CategoryBt>
      <CategoryBt
        onClick={() => setCat('pm')}
        style={{borderColor: category === 'pm' ? '#262b7f' : '#a8a8a8'}}
      >
        PM
      </CategoryBt>
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center
`;
const CategoryBt = styled.button`
  height: 55px;
  width: 150px;
  border: 1px solid #a8a8a8;
  background-color: white;
  border-radius: 30px;
  color: #a8a8a8;
  font-size: 18px;
  cursor: pointer;
`;
