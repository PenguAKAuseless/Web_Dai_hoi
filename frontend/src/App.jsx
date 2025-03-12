import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CheckInPage from './pages/CheckInPage';

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/check-in" element={<CheckInPage />} />
            </Routes>
        </div>
    );
}