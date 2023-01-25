import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Comment from '../components/comment/Comments';
import CreatePost from '../pages/CreatePost';
import Detail from "../pages/Detail";
const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/comment/:id' element={<Comment />} />
        <Route path='/createpost' element={<CreatePost />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
      <Footer />

    </BrowserRouter>
  );
};

export default Router;
