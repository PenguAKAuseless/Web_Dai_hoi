import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StatusPage from './components/StatusPage';
import CheckInPage from './components/CheckInPage';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/hidden-checkin-page" element={<CheckInPage />} />
            <Route path="/status" element={<StatusPage />} />
        </Routes>
    );
}