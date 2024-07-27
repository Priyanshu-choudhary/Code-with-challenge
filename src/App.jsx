import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
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
import TestScreen from './Contest/TestScreen';
import ContestEdit from './Contest/Create/CreateContest';
import ContestProblemList from './Contest/Problems/ContestProblemList';
import ContestResult from './Contest/Results/ContestResult';
import Maintenance from './Maintenance/Maintenance'; // Ensure correct import path
import NewLeaderboard from './LeaderBoard/NewLeaderboard';
import CourseForm from './UploadSection/newCourse';
import { CourseProvider } from './Context/CourseContex';

function App() {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return (
    <div className="App">
      <UserProvider>
        <FormProvider>
          <CourseProvider>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Upload" element={<QuestionTypeSelector />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="/yourProfile" element={<YourProfile />} />
              <Route path="/EditorComponent" element={<EditorComponent />} />
              <Route path="/QuestionApi" element={<LeetCodeClone />} />
              <Route path="/question/:id/:detailsType" element={<QuestionApi />} />
              <Route path="/loginOld" element={<LoginUser />} />
              <Route path="/edit/:problemId/:username" element={<ProblemEditForm />} />
              <Route path="/Data" element={<MyDataGrid />} />
              <Route path="/Leaderboard2" element={<LeaderBoard />} />
              <Route path="/learn" element={<LearningPage />} />
              <Route path="/publicProfile" element={<PublicProfile />} />
              <Route path="/register" element={<Testing />} />
              <Route path="/verify-email" element={<QueryParamsExample />} />
              <Route path="/login" element={<LoginGuiNew />} />
              <Route path="/TextEditor" element={<Tinymce />} />
              <Route path="/CourseEdit" element={<CourseEdit />} />
              <Route path="/contest" element={<Firstpage />} />
              <Route path="/ContestDetail/:id" element={<ContestDetails />} />
              <Route path="/vhgfh7t67xw5458gf5643sd6x" element={<TestScreen />} />
              <Route path="/UploadQuestion/:contestName" element={<MyStepper />} />
              <Route path="/create-contest" element={<ContestEdit />} />
              <Route path="/contestProblemsList" element={<ContestProblemList />} />
              <Route path="/ContestResults/findBy" element={<ContestResult />} />
              <Route path="/leaderboard" element={<NewLeaderboard />} />
              <Route path="/CourseForm" element={<CourseForm />} />
              <Route path="/QuestionTypeSelector/:uploadURL" element={<QuestionTypeSelector />} />
            </Routes>

          </CourseProvider>
        </FormProvider>
      </UserProvider>
    </div>
  );
}

function AppWrapper() {
  const [isServerUp, setIsServerUp] = useState(true);
  const [response, setResponse] = useState("");

  const checkBackendHealth = async () => {
    try {
      const response = await axios.get('https://hytechlabs.online:9090/Public/HealthCheck');
      setIsServerUp(response.data === 'Ok!');
      setResponse(response.data);
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Server response error:", error.message);
      setIsServerUp(false);
    }
  };

  useEffect(() => {
    checkBackendHealth();
    const intervalId = setInterval(checkBackendHealth, 300000); // Check every 5 minutes
    console.log("Checking server health...");

    const checkLocalStorageLimit = () => {
      try {
        // Test item to check localStorage quota
        const testItem = 'test';
        localStorage.setItem('testKey', testItem);
        localStorage.removeItem('testKey');
        console.log('Local storage is within limit.');
      } catch (e) {
        if (e.code === DOMException.QUOTA_EXCEEDED_ERR || e.name === 'QuotaExceededError') {
          console.warn('Local storage limit exceeded. Clearing all data.');
          localStorage.clear();
        } else {
          console.error('Failed to save to local storage:', e);
        }
      }
    };

    checkLocalStorageLimit();

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  if (!isServerUp) {
    return <Maintenance />;
  }

  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
