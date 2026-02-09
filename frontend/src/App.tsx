import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Works from './pages/Works';
import Services from './pages/Services';
import Contact from './pages/Contact';
import AdminLogin from './admin/pages/Login';
import AdminLayout from './admin/components/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import AdminWorks from './admin/pages/Works';
import AdminServices from './admin/pages/Services';
import AdminContacts from './admin/pages/Contacts';
import AdminOrders from './admin/pages/Orders';
import AdminSettings from './admin/pages/Settings';
import { telegramApi } from './api';

declare global {
    interface Window {
        Telegram?: {
            WebApp?: {
                initDataUnsafe?: {
                    user?: {
                        id: number;
                    };
                };
                ready?: () => void;
                expand?: () => void;
            };
        };
    }
}

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Initialize Telegram Web App
        const tg = window.Telegram?.WebApp;
        if (tg) {
            tg.ready?.();
            tg.expand?.();

            // Check if the user is admin
            const userId = tg.initDataUnsafe?.user?.id;
            if (userId && location.pathname === '/') {
                telegramApi.checkAdmin(String(userId))
                    .then((res) => {
                        if (res.data?.isAdmin) {
                            navigate('/admin');
                        }
                    })
                    .catch(() => {
                        // Ignore errors
                    });
            }
        }
    }, [navigate, location.pathname]);

    return (
        <AnimatePresence mode="wait">
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="works" element={<Works />} />
                    <Route path="services" element={<Services />} />
                    <Route path="contact" element={<Contact />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="works" element={<AdminWorks />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="contacts" element={<AdminContacts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="settings" element={<AdminSettings />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

export default App;
