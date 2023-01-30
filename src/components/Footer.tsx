import styled from 'styled-components';
import CodeMate from '../img/CodeMate.png';
import gitIcon from '../img/gitIcon.png';

export default function Footer() {
  const url = 'https://enfp-jake.tistory.com';

  // 외부 브라우저 열기
  window.open(url, '_blank');

  return (
    <Container>
      <InnerContainer>
        <InfoWrap />
        <LinkGitContainer>
          <a
            href='https://github.com/HanuKim/project_code-mate'
            target='_blank'
          >
            <LinkGit />
          </a>
          <LinkGitText>Go GitHub</LinkGitText>
        </LinkGitContainer>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 180px;
  margin-top: 100px;
  background-color: #fff;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1280px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const InfoWrap = styled.div`
  width: 120px;
  height: 80px;
  margin: auto 0;
  background-image: url(${CodeMate});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const LinkGitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LinkGit = styled.div`
  width: 74px;
  height: 74px;
  background-image: url(${gitIcon});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const LinkGitText = styled.div`
  font-size: 12px;
  text-align: center;
`;
