// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../views/pages/home';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}