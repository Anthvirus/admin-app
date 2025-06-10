import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from './pages/home';
import OverviewPage from "./pages/overview";
import LoginPage from "./pages/loginPage";
import AdminPage from "./pages/adminPage";

export default function App() {
  return (
    <Router>
      <div className="max-w-screen h-screen border flex app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}