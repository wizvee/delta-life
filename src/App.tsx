import { Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "./routes/ProtectedLayout";

import LoginPage from "./pages/LoginPage";
// import OAuthCallback from "./pages/OAuthCallback";

import Home from "./pages/Home";
import StatPage from "./pages/StatPage";
import WeeklyPage from "./pages/WeeklyPage";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/stat/:statId" element={<StatPage />} />
        <Route path="/weekly/:weekStart" element={<WeeklyPage />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
        {/* <Route path="/oauth2callback" element={<OAuthCallback />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
