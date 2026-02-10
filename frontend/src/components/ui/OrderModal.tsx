import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import { ordersApi } from '../../api';
import type { Work, Service, Language } from '../../types';

interface OrderModalProps {
    work?: Work;
    service?: Service;
    imageSrc?: string;
    onClose: () => void;
}

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.18, ease: "linear" }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.18, ease: "linear", delay: 0.1 }
    }
};

const modalVariants = {
    hidden: {
        opacity: 0,
        scale: 1, // Start slightly scaled down for "pop" effect if desired, but 1 is cleaner for glide
        y: 20,
        filter: "blur(4px)"
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.42,
            ease: [0.22, 1, 0.36, 1] // --ag-primary-ease
        }
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        y: 20,
        filter: "blur(4px)",
        transition: {
            duration: 0.2,
            ease: [0.55, 0, 0.68, 0.53] // --ag-exit-ease
        }
    }
};

const imageVariants = {
    hidden: { scale: 1.1, filter: "brightness(0.8)" },
    visible: {
        scale: 1,
        filter: "brightness(1)",
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

export default function OrderModal({ work, service, imageSrc, onClose }: OrderModalProps) {
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const lang = i18n.language as Language;

    const itemName = work
        ? (work.title[lang] || work.title.uz)
        : service
            ? (service.name[lang] || service.name.uz)
            : '';

    // Auto-close on success
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                toast.custom((t) => (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-sm w-full bg-[#1e1e1e] border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl pointer-events-auto flex items-center gap-4 p-4 relative overflow-hidden`}
                    >
                        {/* Subtle Gradient Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none" />

                        {/* Icon */}
                        <div className="flex-shrink-0 relative z-10">
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                                <Bell className="h-5 w-5 text-white" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 relative z-10">
                            <p className="text-sm font-semibold text-white truncate">
                                Qabul qilindi!
                            </p>
                            <p className="text-xs text-white/70 truncate">
                                10 daqiqada siz bilan boglanamiz
                            </p>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="flex-shrink-0 relative z-10 p-2 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </motion.div>
                ), {
                    duration: 4000,
                    position: 'top-center',
                });
                onClose();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [success, onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) return;

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
            setSuccess(true);
        } catch (error) {
            console.error('Failed to submit order:', error);
            toast.error(t('contact.error'));
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <AnimatePresence>
            <motion.div
                key="overlay"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4"
                onClick={onClose}
            >
                <motion.div
                    key="modal"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative w-full sm:max-w-4xl bg-white dark:bg-dark-900 overflow-hidden rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col sm:flex-row h-[85vh] sm:h-[600px]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button (Absolute) */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-black/20 dark:hover:bg-white/10 text-dark-500 hover:text-dark-900 dark:text-white/70 dark:hover:text-white transition-colors duration-200"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Left Side: Cinematic Image */}
                    <div className="relative w-full sm:w-1/2 h-1/2 sm:h-full overflow-hidden">
                        {imageSrc && (
                            <motion.img
                                src={imageSrc}
                                alt={itemName}
                                variants={imageVariants}
                                className="w-full h-full object-cover"
                            />
                        )}
                        {/* Gradient adaptation for both themes - subtly darken image on light mode too for text readability if needed, but mainly for transition */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/10 dark:from-dark-900 dark:via-transparent dark:to-black/30 sm:bg-gradient-to-r sm:from-transparent sm:to-white dark:sm:to-dark-900" />

                        {/* Mobile Title Overlay */}
                        <div className="absolute bottom-0 left-0 p-6 sm:hidden">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <p className="text-primary-500 font-medium text-sm mb-1 uppercase tracking-wider">
                                    {work ? t('common.orderSimilar') : t('common.service')}
                                </p>
                                <h2 className="text-2xl font-bold text-dark-900 dark:text-white leading-tight">
                                    {itemName}
                                </h2>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side: content & Form */}
                    <div className="w-full sm:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-white dark:bg-dark-900 relative">

                        {/* Desktop Title */}
                        <div className="hidden sm:block mb-8">
                            <p className="text-primary-500 font-medium text-sm mb-2 uppercase tracking-wider">
                                {work ? t('common.orderSimilar') : t('common.service')}
                            </p>
                            <h2 className="text-3xl font-bold text-dark-900 dark:text-white mb-2 leading-tight">
                                {itemName}
                            </h2>
                            <p className="text-dark-500 dark:text-gray-400 text-sm">
                                {t('contact.subtitle')}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-6">
                                {/* Name Input */}
                                <div className="group relative">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="peer w-full bg-transparent border-b border-dark-200 dark:border-white/20 py-3 text-dark-900 dark:text-white placeholder-transparent focus:border-primary-500 focus:outline-none transition-colors duration-300"
                                        placeholder={t('common.name')}
                                        required
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute left-0 -top-3.5 text-xs text-dark-400 dark:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:text-dark-500 dark:peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-primary-500 transition-all duration-300"
                                    >
                                        {t('common.name')}
                                    </label>
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-primary-500 peer-focus:w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                                </div>

                                {/* Phone Input */}
                                <div className="group relative">
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="peer w-full bg-transparent border-b border-dark-200 dark:border-white/20 py-3 text-dark-900 dark:text-white placeholder-transparent focus:border-primary-500 focus:outline-none transition-colors duration-300"
                                        placeholder={t('common.phone')}
                                        required
                                    />
                                    <label
                                        htmlFor="phone"
                                        className="absolute left-0 -top-3.5 text-xs text-dark-400 dark:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:text-dark-500 dark:peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-primary-500 transition-all duration-300"
                                    >
                                        {t('common.phone')}
                                    </label>
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-primary-500 peer-focus:w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={loading || success}
                                whileHover={!loading && !success ? { scale: 1.02 } : {}}
                                whileTap={!loading && !success ? { scale: 0.96 } : {}}
                                className={`w-full relative h-14 overflow-hidden rounded-xl font-medium text-lg transition-all duration-300 ${success
                                    ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                                    : 'bg-primary-500 text-white hover:bg-primary-600 shadow-[0_4px_14px_0_rgba(74,109,78,0.39)]'
                                    }`}
                            >
                                <AnimatePresence mode="wait">
                                    {loading ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="absolute inset-0 flex items-center justify-center"
                                        >
                                            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        </motion.div>
                                    ) : success ? (
                                        <motion.div
                                            key="success"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="absolute inset-0 flex items-center justify-center gap-2"
                                        >
                                            <Check className="w-6 h-6" />
                                            <span>Muvaffaqiyatli</span>
                                        </motion.div>
                                    ) : (
                                        <motion.span
                                            key="idle"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="flex items-center justify-center gap-2"
                                        >
                                            Konsultatsiyaga yozilish
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </form>

                        <div className="h-6 mt-6 relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {success && (
                                    <motion.p
                                        key="success"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center text-xs text-green-600 dark:text-green-400 font-medium absolute w-full"
                                    >
                                        Rahmat! Siz bilan 10 daqiqa ichida bog‘lanamiz.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
