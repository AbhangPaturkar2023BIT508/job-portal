import React from "react";
import Homepage from "./Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindJobs from "./FindJobs";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import FindTalents from "./FindTalents";
import PostJobPage from "./PostJobPage";
import JobDescriptionPage from "./JobDescriptionPage";
import ApplyJobPage from "./ApplyJobPage";
import CompanyPage from "./CompanyPage";
import PostedJobPage from "./PostedJobPage";
import JobHistoryPage from "./JobHistoryPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
import TalentProfilePage from "./TalentProfilePage";
import ProtectedRoute from "../Services/ProtectedRoute";
import PublicRoute from "../Services/PublicRoute";

const AppRoutes = () => {
  // const user = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <div className="relative">
        <Header />
        <Routes>
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talent" element={<FindTalents />} />
          <Route path="/company/:name" element={<CompanyPage />} />
          <Route path="/jobs/:id" element={<JobDescriptionPage />} />
          <Route path="/apply-job/:id" element={<ApplyJobPage />} />
          <Route path="/talent-profile/:id" element={<TalentProfilePage />} />
          <Route
            path="/post-job/:id"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                <PostJobPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posted-job/:id"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                <PostedJobPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-history"
            element={
              <ProtectedRoute allowedRoles={["APPLICANT"]}>
                <JobHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="*" element={<Homepage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
