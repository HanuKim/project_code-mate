import React from "react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import styled from "styled-components";
import Background from "../shared/Background";

export default function Home() {
  return (
    <Container>
      <Header />
      {/* <Modal /> */}
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
`;
