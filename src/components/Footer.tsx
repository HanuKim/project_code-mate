import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (

    <Container>
      <InfoWrap>
        <div>Infomation</div>
      </InfoWrap>
    </Container>

  );
}

const Container = styled.div`



  width: 100%;
  height: 180px;
  margin-top: 100px;

  /* position: absolute; */
  bottom: 0;
  left: 0;


  border-top: 1px solid #262b7f;
  background-color: #262b7f;
`;

const InfoWrap = styled.div`
  /* max-width: 300px; */
  width: 100%;
  height: 100%;
  color: white;

  /* background-color: white; */
`;
