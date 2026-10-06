// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../views/pages/home';
import RegistrationPage from '../views/pages/Registration/RegistrationPage.jsx';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inscricao" element={<RegistrationPage />} />        
        </Routes>
    );
}