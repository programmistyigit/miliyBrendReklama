import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { ordersApi } from '../../api';
import type { Work, Service, Language } from '../../types';

interface OrderModalProps {
    work?: Work;
    service?: Service;
    onClose: () => void;
}

export default function OrderModal({ work, service, onClose }: OrderModalProps) {
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    });
    const lang = i18n.language as Language;

    const itemName = work
        ? (work.title[lang] || work.title.uz)
        : service
            ? (service.name[lang] || service.name.uz)
            : '';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.phone) {
            toast.error(t('common.error'));
            return;
        }

        setLoading(true);
        try {
            await ordersApi.create({
                ...formData,
                type: work ? 'similar_work' : 'service',
                workId: work?._id,
                serviceId: service?._id,
                workName: work ? (work.title[lang] || work.title.uz) : undefined,
                serviceName: service ? (service.name[lang] || service.name.uz) : undefined,
                source: work ? 'Works Page' : 'Services Page',
            });
            toast.success(t('contact.success'));
            onClose();
        } catch (error) {
            console.error('Failed to submit order:', error);
            toast.error(t('contact.error'));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-dark-200 dark:border-dark-700">
                        <h3 className="text-lg font-bold">{t('common.orderNow')}</h3>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        {/* Item Info */}
                        <div className="mb-5 p-4 rounded-xl bg-dark-50 dark:bg-dark-900">
                            <div className="text-sm text-dark-500 mb-1">
                                {work ? t('common.orderSimilar') : t('common.orderNow')}
                            </div>
                            <div className="font-medium">{itemName}</div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {t('common.name')} *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.namePlaceholder')}
                                    className="input"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {t('common.phone')} *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder={t('contact.form.phonePlaceholder')}
                                    className="input"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        {t('contact.form.sending')}
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        {t('common.orderNow')}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
