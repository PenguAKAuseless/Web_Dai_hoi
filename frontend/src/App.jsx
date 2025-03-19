import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MainPage from './components/MainPage';
import CheckInPage from './components/CheckInPage';

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/hidden-checkin-page" element={<CheckInPage />} />
                <Route path="/status" element={<MainPage />} />
            </Routes>
        </div>
    );
}