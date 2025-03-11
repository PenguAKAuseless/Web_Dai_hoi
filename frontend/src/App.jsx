import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CheckInPage from './pages/CheckInPage';
import Navbar from './components/Navbar';

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