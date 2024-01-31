import React from "react";
import Navbar from "./Components/Home Components/Navbar";
import HomePage from "./Components/Home Components/HomePage";
import SignUpPage from "./Components/Authentication/SignUpPage";
import LoginPage from "./Components/Authentication/LoginPage";
import MyImages from "./Components/User Profile Components/MyImages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyEmailPage from "./Components/Authentication/VerifyEmailPage";
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useLoadingBar } from "./context/LoadingBarContext";

function App() {

  // fetching progress value from LoadingBarContext context
  const { progress } = useLoadingBar();

  return (
    <>
      <BrowserRouter>
      <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/verifyEmail/:userId" element={<VerifyEmailPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/MyImages" element={<MyImages />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
