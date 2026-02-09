import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, MessageSquare, ShoppingCart, TrendingUp } from 'lucide-react';
import { worksApi, contactsApi, ordersApi } from '../../api';

interface Stats {
    works: { total: number; active: number };
    contacts: { total: number; new: number };
    orders: { total: number; new: number };
}

export default function Dashboard() {
    const [stats, setStats] = useState<Stats>({
        works: { total: 0, active: 0 },
        contacts: { total: 0, new: 0 },
        orders: { total: 0, new: 0 },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [worksRes, contactsRes, ordersRes] = await Promise.all([
                worksApi.getStats(),
                contactsApi.getStats(),
                ordersApi.getStats(),
            ]);
            setStats({
                works: worksRes.data,
                contacts: contactsRes.data,
                orders: ordersRes.data,
            });
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            label: 'Jami ishlar',
            value: stats.works.total,
            subValue: `${stats.works.active} faol`,
            icon: Image,
            color: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-50 dark:bg-blue-950/30',
        },
        {
            label: 'Murojatlar',
            value: stats.contacts.total,
            subValue: `${stats.contacts.new} yangi`,
            icon: MessageSquare,
            color: 'from-green-500 to-green-600',
            bg: 'bg-green-50 dark:bg-green-950/30',
        },
        {
            label: 'Buyurtmalar',
            value: stats.orders.total,
            subValue: `${stats.orders.new} yangi`,
            icon: ShoppingCart,
            color: 'from-orange-500 to-orange-600',
            bg: 'bg-orange-50 dark:bg-orange-950/30',
        },
        {
            label: 'Bugungi faollik',
            value: stats.contacts.new + stats.orders.new,
            subValue: 'Yangi so\'rovlar',
            icon: TrendingUp,
            color: 'from-purple-500 to-purple-600',
            bg: 'bg-purple-50 dark:bg-purple-950/30',
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Salom, Admin! 👋</h2>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-5 rounded-2xl ${card.bg} border border-dark-200 dark:border-dark-700`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-sm text-dark-500 dark:text-dark-400 mb-1">
                                    {card.label}
                                </div>
                                <div className="text-3xl font-bold text-dark-900 dark:text-white">
                                    {card.value}
                                </div>
                                <div className="text-sm text-dark-500 dark:text-dark-400 mt-1">
                                    {card.subValue}
                                </div>
                            </div>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                                <card.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Info */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-dark-200 dark:border-dark-700">
                    <h3 className="text-lg font-bold mb-4">Tezkor havolalar</h3>
                    <div className="space-y-3">
                        <a href="/admin/works" className="flex items-center gap-3 p-3 rounded-xl bg-dark-50 dark:bg-dark-900 hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors">
                            <Image className="w-5 h-5 text-primary-500" />
                            <span>Yangi ish qo'shish</span>
                        </a>
                        <a href="/admin/contacts" className="flex items-center gap-3 p-3 rounded-xl bg-dark-50 dark:bg-dark-900 hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors">
                            <MessageSquare className="w-5 h-5 text-green-500" />
                            <span>Murojatlarni ko'rish</span>
                        </a>
                        <a href="/admin/orders" className="flex items-center gap-3 p-3 rounded-xl bg-dark-50 dark:bg-dark-900 hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors">
                            <ShoppingCart className="w-5 h-5 text-orange-500" />
                            <span>Buyurtmalarni ko'rish</span>
                        </a>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
                    <h3 className="text-lg font-bold mb-2">Eslatma</h3>
                    <p className="text-primary-100 mb-4">
                        Telegram bot sozlanganidan so'ng, barcha yangi murojat va buyurtmalar avtomatik ravishda admin Telegram ID'ga yuboriladi.
                    </p>
                    <a href="/admin/settings" className="inline-flex items-center gap-2 bg-white text-primary-600 px-4 py-2 rounded-xl font-medium hover:bg-primary-50 transition-colors">
                        Sozlamalarga o'tish →
                    </a>
                </div>
            </div>
        </div>
    );
}
