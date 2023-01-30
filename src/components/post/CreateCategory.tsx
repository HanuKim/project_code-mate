import {useState} from 'react';
import styled from 'styled-components';

export default function CreateCategory({
  handleCategory,
}: any) {
  const [isClickfront, setIsClickfront] = useState(false);
  const [isClickBack, setIsClickBack] = useState(false);
  const [isClickDesign, setIsClickDesign] = useState(false);
  const [isClickPul, setIsClickPul] = useState(false);
  const [isClickPm, setIsClickPm] = useState(false);

  return (
    <CategoryContainer>
      <CategoryBt
        type='button'
        value={'FrontEnd'}
        id='iscategory'
        name='iscategory'
        onClick={(e) => {
          handleCategory(e);
          setIsClickfront(!isClickfront);
        }}
        style={{
          background: isClickfront ? '#262b7f' : '#fff',
          color: isClickfront ? '#f2f2f2' : '#aaa',
        }}
      />

      <CategoryBt
        type='button'
        value={'BackEnd'}
        id='iscategory'
        name='iscategory'
        onClick={(e) => {
          handleCategory(e);
          setIsClickBack(!isClickBack);
        }}
        style={{
          background: isClickBack ? '#262b7f' : '#fff',
          color: isClickBack ? '#f2f2f2' : '#aaa',
        }}
      />

      <CategoryBt
        type='button'
        value={'Designer'}
        id='iscategory'
        name='iscategory'
        onClick={(e) => {
          handleCategory(e);
          setIsClickDesign(!isClickDesign);
        }}
        style={{
          background: isClickDesign ? '#262b7f' : '#fff',
          color: isClickDesign ? '#f2f2f2' : '#aaa',
        }}
      />

      <CategoryBt
        type='button'
        value={'Web Publish'}
        id='iscategory'
        name='iscategory'
        onClick={(e) => {
          handleCategory(e);
          setIsClickPul(!isClickPul);
        }}
        style={{
          background: isClickPul ? '#262b7f' : '#fff',
          color: isClickPul ? '#f2f2f2' : '#aaa',
        }}
      />

      <CategoryBt
        type='button'
        value={'Product Manage'}
        id='iscategory'
        name='iscategory'
        onClick={(e) => {
          handleCategory(e);
          setIsClickPm(!isClickPm);
        }}
        style={{
          background: isClickPm ? '#262b7f' : '#fff',
          color: isClickPm ? '#f2f2f2' : '#aaa',
        }}
      />
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 12px;
`;

const CategoryBt = styled.input`
  width: 140px;
  height: 44px;
  border-radius: 30px;
  border: 1px solid #d0d0d0;
  color: #aaa;
  font-size: 14px;
  cursor: pointer;
`;
