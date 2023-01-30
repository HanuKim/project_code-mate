import {useEffect, useState} from 'react';
import styled from 'styled-components';

export function TopBtn() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 0) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    console.log(window.scrollY);
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    // && 논리연산자로 인해 showButton가 true면,  && 뒤에 식을 return한다.
    showButton && (
      <TopButton onClick={scrollToTop}>
        <TopButtonText>Top</TopButtonText>
      </TopButton>
    )
  );
}

const TopButton = styled.div`
  position: fixed;
  bottom: 100px;
  right: 70px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 68px;
  height: 68px;

  border-radius: 100%;

  background-color: #3e46d1;
  color: #fff;

  transition-duration: 0.3s;
  cursor: pointer;
  :hover {
    background-color: #eee;
    color: #3e46d1;
    box-shadow: 3px 3px 5px #aaa;
  }
`;

const TopButtonText = styled.p`
  font-size: 14px;
`;
