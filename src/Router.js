import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './main/MainPage';
import LoginPage from './login/LoginPage';
import Header from './asset/component/Header';
import AnnouncementList from './announcement/list/AnnouncementList';
import AnnouncementDetail from './announcement/detail/AnnouncementDetail';
import Archivelist from './archive/ArchiveList';
import ArchiveRegistration from './archiveregistration/ArchiveRegistration';
import ProjectRegistration from './projectregistration/ProjectRegistration';
import MyPage from './mypage/MyPage';
import Register from './register/Register';
import FindIdPage from './login/page/FindIdPage';
import FindPasswordPage from './login/page/FindPasswordPage';
import SignUpPage from './signup/SignUpPage';
import ProjectPage from './project/ProjectPage';
import ArchiveDetail from './archivedetail/ArchiveDetail'
import WithdrawPage from './withdraw/WithdrawPage';
import ProjectDetailPage from './projectdetail/ProjectDetailPage';
import CommentDetail from './projectdetail/components/CommentDetail';
import TeamEvaluationPage from './teamevaluation/TeamEvaluationPage';
import NoticeItem from './asset/component/NoticeItem';

const AppRouter = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />    
        <Route path="/findId" element={<FindIdPage />} />
        <Route path="/findPassword" element={<FindPasswordPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/announcement" element={<AnnouncementList />} />
        <Route path="/announcement/1" element={<AnnouncementDetail />} />
        <Route path="/archive" element={<Archivelist />} />
        <Route path="/1" element={<NoticeItem />} />
        <Route path="/archive/1" element={<ArchiveDetail />} />
        <Route path="/archive/registration" element={<ArchiveRegistration />} />
        <Route path="/project/registration" element={<ProjectRegistration />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/header" element={<Header />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
        <Route path="/projectdetail/:id" element={<ProjectDetailPage />} />
        <Route path="/commentdetail" element={<CommentDetail />} />
        <Route path=":archiveId/teamevaluation" element={<TeamEvaluationPage />} />
      </Routes>
    </Router> 
  );
};

export default AppRouter;
