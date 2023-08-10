import React, {useEffect}from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import Project_recruit_board from "./components/recruit/project/Project_recruit_board";
import Roommate_recruit from "./components/recruit/roommate/Roommate_recruit";
import Roommate_recruit_write from "./components/recruit/roommate/Roommate_recruit_write";
import Project_recruit_write from "./components/recruit/project/Project_recruit_write";
import Main from './components/Main';
import Header from './layout/header/Header';
import Map from './components/MapPage';
import Promotion from './components/Promotion'
import Project_recruit_detail from "./routes/Project_recruit_detail";
import Project_recruit_update from "./routes/Project_recruit_update";

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
                <Route path="/recruitment/project" element={<Project_recruit_board/>}></Route>
                <Route path="/recruitment/project/write" element={<Project_recruit_write/>}></Route>
                <Route path="/promotion" element={<Promotion/>}></Route>
                <Route path="/map" element={<Map/>}></Route>
                <Route path="/recruitment/project/:boardId" element={<Project_recruit_detail/>}/>
                <Route path="/recruitment/project/:boardId/update" element={<Project_recruit_update/>}/>
            </Routes>
          </BrowserRouter>
       </div>
    )
}

export default App;