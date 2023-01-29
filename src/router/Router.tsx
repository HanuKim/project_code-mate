import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mypage from "../pages/Mypage";
import Home from "../pages/Home";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Comment from "../components/comment/Comments";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
import Detail from "../pages/Detail";
import { getAuth } from "firebase/auth";
import ScrollToTop from "./ScrollToTop";
import { TopBtn } from "../components/TopBtn";

const Router = () => {
  const authService = getAuth();
  const uid = authService.currentUser?.uid;
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comment/:id" element={<Comment />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/Mypage/:id" element={<Mypage />} />
      </Routes>
      <TopBtn />
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
