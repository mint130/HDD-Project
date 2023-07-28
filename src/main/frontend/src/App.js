import React, {useEffect}from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import Project_recruit from "./components/layout/recruit/Project_recruit";
import Roommate_recruit from "./components/layout/recruit/Roommate_recruit";
import Roommate_recruit_write from "./components/layout/recruit/Roommate_recruit_write";
import Main from './components/Main';
import Header from './components/layout/header/Header';
import Map from './components/MapPage';
import Promotion from './components/Promotion'

function App() {

    return (
       <div className='App'>
          <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/api/auth/signin" element={<SignIn/>}></Route>
                <Route path="/api/auth/signup/create" element={<SignUp/>}></Route>
                <Route path="/recruitment/roommate" element={<Roommate_recruit/>}></Route>
                <Route path="/recruitment/roommate/write" element={<Roommate_recruit_write/>}></Route>
                <Route path="/project" element={<Project_recruit/>}></Route>
                <Route path="/promotion" element={<Promotion/>}></Route>
                <Route path="/map" element={<Map/>}></Route>
            </Routes>
          </BrowserRouter>
       </div>
    )
}

export default App;