import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Lab from './pages/Lab';
import Sertifikat from './pages/Sertifikat';
import Materi from './pages/Materi';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard Layout wrapper for protected routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/materi" element={<Materi />} />
            <Route path="/lab/:id" element={<Lab />} />
            <Route path="/sertifikat" element={<Sertifikat />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
