import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { servicesApi } from '../../api';
import type { Service } from '../../types';

const categoryNames = {
    poligrafiya: 'Poligrafiya',
    tashqi_reklama: 'Tashqi reklama',
    dizayn: 'Dizayn',
};

export default function AdminServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const response = await servicesApi.getAll();
            setServices(response.data);
        } catch (error) {
            toast.error('Xizmatlarni yuklashda xatolik');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (service: Service) => {
        try {
            await servicesApi.update(service._id, {
                status: service.status === 'active' ? 'inactive' : 'active',
            });
            toast.success('Status yangilandi');
            loadServices();
        } catch (error) {
            toast.error('Xatolik yuz berdi');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const grouped = services.reduce((acc, service) => {
        if (!acc[service.category]) acc[service.category] = [];
        acc[service.category].push(service);
        return acc;
    }, {} as Record<string, Service[]>);

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Xizmatlar</h2>
            <p className="text-dark-500">Xizmatlar avtomatik seed qilingan. Faqat status o'zgartirish mumkin.</p>

            {(['poligrafiya', 'tashqi_reklama', 'dizayn'] as const).map((category) => (
                <div key={category}>
                    <h3 className="text-lg font-bold mb-4">{categoryNames[category]}</h3>
                    <div className="grid gap-3">
                        {(grouped[category] || []).map((service, index) => (
                            <motion.div
                                key={service._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                                className="flex items-center justify-between p-4 bg-white dark:bg-dark-800 rounded-xl border border-dark-200 dark:border-dark-700"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="font-medium">{service.name.uz}</div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${service.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-dark-100 text-dark-500'
                                        }`}>
                                        {service.status === 'active' ? 'Faol' : 'Nofaol'}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleToggleStatus(service)}
                                    className={`p-2 rounded-lg transition-colors ${service.status === 'active' ? 'hover:bg-dark-100 dark:hover:bg-dark-700' : 'hover:bg-green-100 dark:hover:bg-green-900/30'
                                        }`}
                                >
                                    {service.status === 'active' ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
