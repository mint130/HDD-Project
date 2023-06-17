import React, {useEffect}from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import Project_recruit from "./components/Project_recruit";
import Roommate_recruit from "./components/Roommate_recruit";
import Main from './components/Main';
import Header from './components/layout/header/Header';

function App() {

    return (
       <div className='App'>
          <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/api/auth/signin" element={<SignIn/>}></Route>
                <Route path="/api/auth/signup/create" element={<SignUp/>}></Route>
                <Route path="/roommate" element={<Roommate_recruit/>}></Route>
                <Route path="/project" element={<Project_recruit/>}></Route>
            </Routes>
          </BrowserRouter>
       </div>
    )
}

export default App;