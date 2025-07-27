import { Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "./routes/ProtectedLayout";

import Home from "./pages/Home";
import StatPage from "./pages/StatPage";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/stat/:statId" element={<StatPage />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
      </Route>
    </Routes>
  );
}

export default App;
