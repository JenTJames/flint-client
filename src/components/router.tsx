import DashboardPage from "@/pages/dashboard-page";
import LoginPage from "@/pages/login-page";
import SignupPage from "@/pages/signup-page";
import { Navigate, Route, Routes } from "react-router";

const router = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Routes>
  );
};

export default router;
