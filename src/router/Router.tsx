import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mypage from '../pages/Mypage';
import Home from '../pages/Home';
import Footer from '../components/Footer';
import Header from '../components/Header';
const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
