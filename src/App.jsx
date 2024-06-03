import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginUser from './loginSigin/LoginUser';
import EditorPosts from './UploadSection/EditorPosts';
import Home from './home/Home';
import StandAloneEditor from './editor/StandAloneEditor';
import { UserProvider } from './Context/UserContext';
import { Logo } from '@react-login-page/page2';
import LogOut from './loginSigin/LogOut';
import YourProfile from './Profile/YourProfile';
import JDoodleExample from './JDoodle/JDoodleExample';

function App() {
  console.log("app rerender");
  return (
    <div className="App">
      <UserProvider>
      <Router>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<StandAloneEditor />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/Upload" element={<EditorPosts />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/yourProfile" element={<YourProfile />} />
          
   
        </Routes>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
