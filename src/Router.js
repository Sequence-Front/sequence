import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './main/MainPage';
import LoginPage from './login/LoginPage';
import AnnouncementList from './announcement/list/AnnouncementList';
import AnnouncementDetail from './announcement/detail/AnnouncementDetail';
import Archivelist from './archive/ArchiveList';
import ArchiveRegistration from './archiveregistration/ArchiveRegistration';
import ProjectRegistration from './projectregistration/ProjectRegistration';
import MyPage from './mypage/MyPage';
import FindIdPage from './login/page/FindIdPage';
import FindPasswordPage from './login/page/FindPasswordPage';
import SignUpPage from './signup/SignUpPage';
import ProjectPage from './project/ProjectPage';
import ArchiveDetail from './archivedetail/ArchiveDetail'
import WithdrawPage from './withdraw/WithdrawPage';
import ProjectDetailPage from './projectdetail/ProjectDetailPage';
import TeamEvaluationPage from './teamevaluation/TeamEvaluationPage';
import NoticeItem from './asset/component/NoticeItem';
import ResultView from './teamevaluation/components/ResultView';
import Report from './report/Report';
import Layout from './asset/component/Layout';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/about" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />    
        <Route path="/findId" element={<FindIdPage />} />
        <Route path="/findPassword" element={<FindPasswordPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
        {/* <Route path="/announcement" element={<AnnouncementList />} />
        <Route path="/announcement/1" element={<AnnouncementDetail />} /> */}
        <Route path="/archive" element={<Archivelist />} />
        <Route path="/archive/:id" element={<ArchiveDetail />} />
        <Route path="/:archiveId/a" element={<ResultView />} />
        <Route path="/archive/registration" element={<ArchiveRegistration />} />
        <Route path="/archive/edit/:archiveId" element={<ArchiveRegistration />} />
        <Route path=":archiveId/teamevaluation" element={<TeamEvaluationPage />} />
        <Route path="/" element={<ProjectPage />} />
        <Route path="/projectdetail/:id" element={<ProjectDetailPage />} />
        <Route path="/project/registration" element={<ProjectRegistration />} />
        <Route path="/project/edit/:projectId" element={<ProjectRegistration />} />
        <Route path="/report" element={<Report />} />
        
        <Route path="/1" element={<NoticeItem />} />
        </Route>
      </Routes>
    </Router> 
  );
};

export default AppRouter;
