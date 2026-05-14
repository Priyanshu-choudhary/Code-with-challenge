import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import { FormProvider } from './Context/FormContext';
import { CourseProvider } from './Context/CourseContex';
import PageLoader from './components/ui/PageLoader';

// ─── Eagerly loaded (needed on first paint) ───────────────────────────────────
import Home from './home/Home';

// ─── Lazy loaded routes (each gets its own chunk) ─────────────────────────────
const LogOut               = lazy(() => import('./loginSigin/LogOut'));
const YourProfile          = lazy(() => import('./Profile/YourProfile'));
const EditorComponent      = lazy(() => import('./onlineEditor/EditorComponent'));
const QuestionApi          = lazy(() => import('./SolvingSection/ReceiveQuestion'));
const LeetCodeClone        = lazy(() => import('./Leetcode/ProblemSet'));
const LeaderBoard          = lazy(() => import('./LeaderBoard/LeaderBoard'));
const MyStepper            = lazy(() => import('./UploadSection/Stepper'));
const LearningPage         = lazy(() => import('./learnPath/learningPage'));
const QuestionTypeSelector = lazy(() => import('./UploadSection/QuestionTypeSelector'));
const ProblemEditForm      = lazy(() => import('./Leetcode/ProblemEditForm'));
const PublicProfile        = lazy(() => import('./publicUser/PublicProfile'));
const Testing              = lazy(() => import('./loginSigin/NewForm/testing'));
const LoginGuiNew          = lazy(() => import('./loginSigin/NewForm/LoginGuiNew'));
const Tinymce              = lazy(() => import('./TinyMCE/TinyMCE'));
const CourseEdit           = lazy(() => import('./Leetcode/CourseEdit'));
const Firstpage            = lazy(() => import('./Contest/FirstPage/Firstpage'));
const ContestDetails       = lazy(() => import('./Contest/ContestDetail/ContestDetails'));
const TestScreen           = lazy(() => import('./Contest/TestScreen'));
const ContestEdit          = lazy(() => import('./Contest/Create/CreateContest'));
const ContestProblemList   = lazy(() => import('./Contest/Problems/ContestProblemList'));
const ContestResult        = lazy(() => import('./Contest/Results/ContestResult'));
const NewLeaderboard       = lazy(() => import('./LeaderBoard/NewLeaderboard'));
const CourseForm           = lazy(() => import('./UploadSection/newCourse'));
const ContinueLearing      = lazy(() => import('./Leetcode/continueLearning'));
const TopicsWiseSkill      = lazy(() => import('./Skill/TreeViewQuestion'));
const ManagerDashbord      = lazy(() => import('./Admins/ManagerDashbord'));
const DocumentPage         = lazy(() => import('./Document/DocumentPage'));
const TutorialMain         = lazy(() => import('./TutorialPage/TutorialMain'));
const Lecture              = lazy(() => import('./TutorialPage/Lecture'));
const AboutUs              = lazy(() => import('./home/Aboutus/AboutUs'));
const LectureForm          = lazy(() => import('./TutorialPage/CreateLecture'));
const EditLecture          = lazy(() => import('./TutorialPage/editLecture'));
const CreateTopicSkillForm = lazy(() => import('./Skill/CreateTopicWiseSkill'));
const NestedForm           = lazy(() => import('./Form/NestedForm'));
const TestForm             = lazy(() => import('./Form/TestForm'));
const CustomRoomForm       = lazy(() => import('./Contest/CustomRoom/Form'));
const ProblemSet           = lazy(() => import('./Problems/ProblemSet'));
const TermsAndServise      = lazy(() => import('./TermsAndService/TermsAndServise'));

function App() {
  return (
    <div className="App">
      <UserProvider>
        <FormProvider>
          <CourseProvider>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"                                element={<Home />} />
                <Route path="/Upload"                          element={<QuestionTypeSelector />} />
                <Route path="/logout"                          element={<LogOut />} />
                <Route path="/yourProfile"                     element={<YourProfile />} />
                <Route path="/EditorComponent"                 element={<EditorComponent />} />
                <Route path="/QuestionApi"                     element={<LeetCodeClone />} />
                <Route path="/ContinueLearing"                 element={<ContinueLearing />} />
                <Route path="/question/:id/:detailsType"       element={<QuestionApi />} />
                <Route path="/edit/:problemId/:username"       element={<ProblemEditForm />} />
                <Route path="/ProblemSet"                      element={<ProblemSet />} />
                <Route path="/Leaderboard2"                    element={<LeaderBoard />} />
                <Route path="/learn"                           element={<LearningPage />} />
                <Route path="/publicProfile"                   element={<PublicProfile />} />
                <Route path="/register"                        element={<Testing />} />
                <Route path="/login"                           element={<LoginGuiNew />} />
                <Route path="/TextEditor"                      element={<Tinymce />} />
                <Route path="/CourseEdit"                      element={<CourseEdit />} />
                <Route path="/contest"                         element={<Firstpage />} />
                <Route path="/ContestDetail/:id"               element={<ContestDetails />} />
                <Route path="/vhgfh7t67xw5458gf5643sd6x"      element={<TestScreen />} />
                <Route path="/UploadQuestion/:contestName"     element={<MyStepper />} />
                <Route path="/create-contest"                  element={<ContestEdit />} />
                <Route path="/contestProblemsList"             element={<ContestProblemList />} />
                <Route path="/ContestResults/findBy"           element={<ContestResult />} />
                <Route path="/leaderboard"                     element={<NewLeaderboard />} />
                <Route path="/CourseForm"                      element={<CourseForm />} />
                <Route path="/LectureForm"                     element={<LectureForm />} />
                <Route path="/QuestionTypeSelector/:uploadURL" element={<QuestionTypeSelector />} />
                <Route path="/TreeView"                        element={<TopicsWiseSkill />} />
                <Route path="/Doc"                             element={<ManagerDashbord />} />
                <Route path="/Document"                        element={<DocumentPage />} />
                <Route path="/Tutorials"                       element={<TutorialMain />} />
                <Route path="/lecture/:title"                  element={<Lecture />} />
                <Route path="/EditLecture/:id"                 element={<EditLecture />} />
                <Route path="/AboutUs"                         element={<AboutUs />} />
                <Route path="/TopicWiseSkill/CreateForm"       element={<CreateTopicSkillForm />} />
                <Route path="/Form"                            element={<NestedForm />} />
                <Route path="/TestForm"                        element={<TestForm />} />
                <Route path="/CustomRoom"                      element={<CustomRoomForm />} />
                <Route path="/TermsAndServise"                 element={<TermsAndServise />} />
              </Routes>
            </Suspense>
          </CourseProvider>
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
