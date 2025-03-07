import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <nav className="p-4 bg-blue-500 text-white flex justify-between">
            <Link to="/" className="text-xl font-bold">Đại hội Hội Sinh viên khoa Khoa học và Kỹ thuật Máy tính nhiệm kỳ 2025 - 2028</Link>
            <Link to="/check-in" className="px-4 py-2 bg-gray-700 rounded">Check-in</Link>
        </nav>
    );
}