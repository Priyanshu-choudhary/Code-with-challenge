import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginUser from './loginSigin/LoginUser';
import EditorPosts from './UploadSection/EditorPosts';
import Home from './home/Home';

import { UserProvider } from './Context/UserContext';

import LogOut from './loginSigin/LogOut';
import YourProfile from './Profile/YourProfile';

import EditorComponent from './editor/EditorComponent';
import QuestionApi from './question/QuestionApi';
import LeetCodeClone from './Leetcode/ProblemSet';


function App() {
  console.log("app rerender");
  return (
    <div className="App">
      <UserProvider>
      <Router>
      
        <Routes>
          <Route path="/" element={<LeetCodeClone />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/Upload" element={<EditorPosts />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/yourProfile" element={<YourProfile />} />
          <Route path="/EditorComponent" element={<EditorComponent />} />
          <Route path="/QuestionApi" element={<LeetCodeClone />} />
          <Route path="/question/:id" element={<QuestionApi />} />
       
      
          
   
        </Routes>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
