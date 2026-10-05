import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { ScanPrescription } from './pages/ScanPrescription';
import { ReviewPrescription } from './pages/ReviewPrescription';
import { AnalysisResult } from './pages/AnalysisResult';
import { HealthcareNearMe } from './pages/HealthcareNearMe';
import { VisionoVerify } from './pages/VisionoVerify';
import { Emergency } from './pages/Emergency';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="scan" element={<ScanPrescription />} />
            <Route path="review-prescription" element={<ReviewPrescription />} />
            <Route path="analysis-result" element={<AnalysisResult />} />
            <Route path="visionoverify" element={<VisionoVerify />} />
            <Route path="healthcare" element={<HealthcareNearMe />} />
            <Route path="emergency" element={<Emergency />} />
            <Route path="history" element={<div className="p-8 text-center text-slate-500">History Coming Soon</div>} />
            <Route path="reminders" element={<div className="p-8 text-center text-slate-500">Reminders Coming Soon</div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
