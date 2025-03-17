import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CheckInPage from './pages/CheckInPage';

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/hidden-checkin-page" element={<CheckInPage />} />
            </Routes>
        </div>
    );
}