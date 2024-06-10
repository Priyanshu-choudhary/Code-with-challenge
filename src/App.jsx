import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginUser from './loginSigin/LoginUser';
import EditorPosts from './UploadSection/UploadQ';
import Home from './home/Home';

import { UserProvider } from './Context/UserContext';

import LogOut from './loginSigin/LogOut';
import YourProfile from './Profile/YourProfile';

import EditorComponent from './onlineEditor/EditorComponent';
import QuestionApi from './SolvingSection/ReceiveQuestion';
import LeetCodeClone from './Leetcode/ProblemSet';
import RegisterUser from './loginSigin/RegisterUser';
import MyDataGrid from './Problems/DataGrid';
import LeaderBoard from './LeaderBoard/LeaderBoard';



function App() {
  console.log("app rerender");
  return (
    <div className="App">
      <UserProvider>
      <Router>
      
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/Upload" element={<EditorPosts />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/yourProfile" element={<YourProfile />} />
          <Route path="/EditorComponent" element={<EditorComponent />} />
          <Route path="/QuestionApi" element={<LeetCodeClone />} />
          <Route path="/question/:id" element={<QuestionApi />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/Data" element={<MyDataGrid />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          
      
          
   
        </Routes>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
