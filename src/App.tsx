import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import { ProtectedLayout } from "./routes/ProtectedLayout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" />
      </Route>
    </Routes>
  );
}

export default App;
