import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { ordersApi } from '../../api';
import type { Order } from '../../types';

const statusLabels = {
    new: { label: 'Yangi', color: 'bg-primary-100 text-primary-600' },
    in_progress: { label: 'Jarayonda', color: 'bg-yellow-100 text-yellow-600' },
    completed: { label: 'Tugallangan', color: 'bg-green-100 text-green-600' },
};

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const response = await ordersApi.getAll();
            setOrders(response.data);
        } catch (error) {
            toast.error('Buyurtmalarni yuklashda xatolik');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await ordersApi.update(id, { status });
            toast.success('Status yangilandi');
            loadOrders();
        } catch (error) {
            toast.error('Xatolik yuz berdi');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('O\'chirishni tasdiqlaysizmi?')) return;
        try {
            await ordersApi.delete(id);
            toast.success('O\'chirildi');
            loadOrders();
        } catch (error) {
            toast.error('O\'chirishda xatolik');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Buyurtmalar</h2>

            {orders.length === 0 ? (
                <div className="text-center py-12 text-dark-500">Buyurtmalar yo'q</div>
            ) : (
                <div className="grid gap-4">
                    {orders.map((order, index) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-5 bg-white dark:bg-dark-800 rounded-xl border border-dark-200 dark:border-dark-700"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-bold">{order.name}</span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${statusLabels[order.status].color}`}>
                                            {statusLabels[order.status].label}
                                        </span>
                                        <span className="text-xs px-2 py-1 rounded-full bg-dark-100 text-dark-500">
                                            {order.type === 'service' ? 'Xizmat' : 'O\'xshash ish'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-dark-500 mb-2">{order.phone}</div>
                                    <div className="text-dark-700 dark:text-dark-300">
                                        {order.serviceName || order.workName || 'Noma\'lum'}
                                    </div>
                                    <div className="text-xs text-dark-400 mt-2">
                                        {order.source} • {new Date(order.createdAt).toLocaleString('uz-UZ')}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {order.status === 'new' && (
                                        <button
                                            onClick={() => handleUpdateStatus(order._id, 'in_progress')}
                                            className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 hover:bg-yellow-200"
                                            title="Jarayonga olish"
                                        >
                                            <Clock className="w-5 h-5" />
                                        </button>
                                    )}
                                    {order.status === 'in_progress' && (
                                        <button
                                            onClick={() => handleUpdateStatus(order._id, 'completed')}
                                            className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 hover:bg-green-200"
                                            title="Tugallash"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(order._id)}
                                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
