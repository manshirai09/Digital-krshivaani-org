import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LanguageSelection from './pages/LanguageSelection';
import Dashboard from './pages/Dashboard';
import NewsCommunity from './pages/NewsCommunity';
import MarketPrice from './pages/MarketPrice';
import CropRecommendation from './pages/CropRecommendation';
import WeatherUpdates from './pages/WeatherUpdates';
import SoilHealth from './pages/SoilHealth';
import DiseaseDetection from './pages/DiseaseDetection';
import SmartShop from './pages/SmartShop';
import Chatbot from './pages/Chatbot';
import ProfitCalculator from './pages/ProfitCalculator';
import IoTMonitoring from './pages/IoTMonitoring';
import HarvestPlanning from './pages/HarvestPlanning';
import MarketGuidance from './pages/MarketGuidance';
import FinancePlan from './pages/FinancePlan';

const ProtectedRoute: React.FC<{ children: React.ReactNode; requireLanguage?: boolean }> = ({ 
  children, 
  requireLanguage = true 
}) => {
  const { isAuthenticated } = useAuth();
  const hasSelectedLanguage = localStorage.getItem('userLanguageSelected');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireLanguage && !hasSelectedLanguage) {
    return <Navigate to="/language-selection" />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/language-selection" element={
            <ProtectedRoute requireLanguage={false}>
              <LanguageSelection />
            </ProtectedRoute>
          } />

          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/news" element={<NewsCommunity />} />
            <Route path="/market-price" element={<MarketPrice />} />
            <Route path="/crop-recommendation" element={<CropRecommendation />} />
            <Route path="/weather" element={<WeatherUpdates />} />
            <Route path="/soil-health" element={<SoilHealth />} />
            <Route path="/disease-detection" element={<DiseaseDetection />} />
            <Route path="/shop" element={<SmartShop />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/profit-calculator" element={<ProfitCalculator />} />
            <Route path="/iot" element={<IoTMonitoring />} />
            <Route path="/harvest" element={<HarvestPlanning />} />
            <Route path="/market-guidance" element={<MarketGuidance />} />
            <Route path="/finance" element={<FinancePlan />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
