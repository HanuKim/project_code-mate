import React, { useState } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Footer from '../components/Footer';
import styled from 'styled-components';

import { useRef } from 'react';
import { signup, login, logout, useAuth } from '../shared/firebase';
import Profile from '../components/Profile';

export default function Home() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      console.log('error:', error);
      alert('Error!');
    }
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert('Error!');
    }
    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert('Error!');
    }
    setLoading(false);
  }

  return (
    <>
      {/* <div>아이템입니다.</div>
      <button onClick={() => setIsOpen(true)}>사진 등록</button>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
      <Testbox>sdfdfsf</Testbox> */}
      <div id="main">
        <div>Currently logged in as: {currentUser?.email} </div>

        {!currentUser && (
          <>
            <div className="fields">
              <input ref={emailRef} placeholder="Email" />
              <input ref={passwordRef} type="password" placeholder="Password" />
            </div>

            <button disabled={loading} onClick={handleSignup}>
              Sign Up
            </button>
            <button disabled={loading} onClick={handleLogin}>
              Log In
            </button>
          </>
        )}
        {currentUser && (
          <>
            <Profile />
            <button disabled={loading || !currentUser} onClick={handleLogout}>
              Log Out
            </button>
          </>
        )}
      </div>
    </>
  );
}

{
  /* const Testbox = styled.div`
  height: 1000px;
    `; */
}
