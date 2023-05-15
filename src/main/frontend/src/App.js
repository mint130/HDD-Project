import React, {useEffect}from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import Main from './components/Main';

function App() {

    return (
       <div className='App'>
          <BrowserRouter>

            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/api/auth/signin" element={<SignIn/>}></Route>
                <Route path="/api/auth/signup/create" element={<SignUp/>}></Route>
            </Routes>
          </BrowserRouter>
       </div>
    )
}

export default App;