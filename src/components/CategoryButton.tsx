import React from 'react';
import styled from 'styled-components';

export default function CategoryButton() {
  return (
    <MainTopBt></MainTopBt>
  );
}
const MainTopBt = styled.button`
  height: 55px;
  width: 150px;
  border: 1px solid #bcbcbc;
  background-color: white;
  border-radius: 30px;
  color: #bcbcbc;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    border: 1px solid #262b7f;
    color: #262b7f;
  }
`;