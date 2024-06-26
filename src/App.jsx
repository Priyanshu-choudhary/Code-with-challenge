import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginUser from './loginSigin/LoginUser';
// import EditorPosts from './UploadSection/UploadQ';
import Home from './home/Home';
import { UserProvider } from './Context/UserContext';

import { FormProvider } from './Context/FormContext';
import LogOut from './loginSigin/LogOut';
import YourProfile from './Profile/YourProfile';

import EditorComponent from './onlineEditor/EditorComponent';
import QuestionApi from './SolvingSection/ReceiveQuestion';
import LeetCodeClone from './Leetcode/ProblemSet';
import RegisterUser from './loginSigin/RegisterUser';
import MyDataGrid from './Problems/DataGrid';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import MyStepper from './UploadSection/Stepper';
import LearningPage from './learnPath/learningPage';
import QuestionTypeSelector from './UploadSection/QuestionTypeSelector';
import ProblemEditForm from './Leetcode/ProblemEditForm';
import PublicProfile from './publicUser/PublicProfile';
import Test from './Leetcode/test';
import Testing from './loginSigin/NewForm/testing';
import QueryParamsExample from './loginSigin/NewForm/QuearyParamsExample';




function App() {
  console.log("app rerender");
  return (
    <div className="App">
      <UserProvider>
        <FormProvider>
          <Router>

            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/Upload" element={<QuestionTypeSelector />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="/yourProfile" element={<YourProfile />} />
              <Route path="/EditorComponent" element={<EditorComponent />} />
              <Route path="/QuestionApi" element={<LeetCodeClone />} />
              <Route path="/question/:id" element={<QuestionApi />} />


              <Route path="/login" element={<LoginUser />} />

              <Route path="/edit/:problemId" element={<ProblemEditForm />} />
              {/* <Route path="/register" element={<RegisterUser />} /> */}
              <Route path="/Data" element={<MyDataGrid />} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route path="/learn" element={<LearningPage />} />
              <Route path="/publicProfile" element={<PublicProfile />} />
              
              <Route path="/register" element={<Testing />} />
              <Route path="/verify-email" element={<QueryParamsExample />} />




            </Routes>
          </Router>
        </FormProvider>
      </UserProvider>

    </div>
  );
}

export default App;
