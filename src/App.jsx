import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginUser from './loginSigin/NewForm/LoginUserGUI';
// import EditorPosts from './UploadSection/UploadQ';
import Home from './home/Home';
import { UserProvider } from './Context/UserContext';
import { logPageView } from './Analytics/AnalyticsGoogle';
import { FormProvider } from './Context/FormContext';
import LogOut from './loginSigin/LogOut';
import YourProfile from './Profile/YourProfile';
import EditorComponent from './onlineEditor/EditorComponent';
import QuestionApi from './SolvingSection/ReceiveQuestion';
import LeetCodeClone from './Leetcode/ProblemSet';
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
import LoginGuiNew from './loginSigin/NewForm/LoginGuiNew';
import Tinymce from './TinyMCE/TinyMCE';
import CourseEdit from './Leetcode/CourseEdit';
import Firstpage from './Contest/FirstPage/Firstpage';
import ContestDetails from './Contest/ContestDetail/ContestDetails';

function App() {
  console.log("app rerender");

  const location = useLocation();

  useEffect(() => {
    logPageView();
    console.log("it is triggering..");
  }, [location]);

  return (
    <div className="App">
      <UserProvider>
        <FormProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Upload" element={<QuestionTypeSelector />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/yourProfile" element={<YourProfile />} />
            <Route path="/EditorComponent" element={<EditorComponent />} />
            <Route path="/QuestionApi" element={<LeetCodeClone />} />
            <Route path="/question/:id" element={<QuestionApi />} />
            <Route path="/loginOld" element={<LoginUser />} />
            <Route path="/edit/:problemId" element={<ProblemEditForm />} />
            <Route path="/Data" element={<MyDataGrid />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/learn" element={<LearningPage />} />
            <Route path="/publicProfile" element={<PublicProfile />} />
            <Route path="/register" element={<Testing />} />
            <Route path="/verify-email" element={<QueryParamsExample />} />
            <Route path="/login" element={<LoginGuiNew />} />
            <Route path="/TextEditor" element={<Tinymce />} />
            <Route path="/CourseEdit" element={<CourseEdit />} />
            <Route path="/contest" element={<Firstpage />} />
            <Route path="/ContestDetail/:id" element={<ContestDetails />} />
          </Routes>
        </FormProvider>
      </UserProvider>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
