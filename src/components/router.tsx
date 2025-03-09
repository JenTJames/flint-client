import LoginPage from "@/pages/login-page";
import { Navigate, Route, Routes } from "react-router";

const router = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<LoginPage />} />

      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Routes>
  );
};

export default router;
