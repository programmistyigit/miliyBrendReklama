import { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Image,
    Briefcase,
    MessageSquare,
    ShoppingCart,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';

const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/works', label: 'Ishlar', icon: Image },
    { path: '/admin/services', label: 'Xizmatlar', icon: Briefcase },
    { path: '/admin/contacts', label: 'Murojatlar', icon: MessageSquare },
    { path: '/admin/orders', label: 'Buyurtmalar', icon: ShoppingCart },
    { path: '/admin/settings', label: 'Sozlamalar', icon: Settings },
];

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-dark-100 dark:bg-dark-950 flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-900 border-r border-dark-200 dark:border-dark-800 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-5 border-b border-dark-200 dark:border-dark-800">
                        <Link to="/admin" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden">
                                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <span className="font-bold text-dark-900 dark:text-white block">Admin Panel</span>
                                <span className="text-xs text-dark-500 font-medium">Milliy Brend</span>
                                <span className="text-xs text-dark-500">Reklama</span>
                            </div>
                        </Link>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                        ? 'bg-primary-500 text-white'
                                        : 'text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-dark-200 dark:border-dark-800">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Chiqish
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main */}
            <div className="flex-1 lg:ml-64">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-white dark:bg-dark-900 border-b border-dark-200 dark:border-dark-800 px-4 py-3 flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 rounded-xl hover:bg-dark-100 dark:hover:bg-dark-800"
                    >
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    <h1 className="text-lg font-bold">
                        {menuItems.find((item) => item.path === location.pathname)?.label || 'Admin'}
                    </h1>
                </header>

                {/* Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
