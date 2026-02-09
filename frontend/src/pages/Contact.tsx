import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { contactsApi } from '../api';

export default function Contact() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.message) {
            toast.error(t('common.error'));
            return;
        }

        setLoading(true);
        try {
            await contactsApi.create(formData);
            toast.success(t('contact.success'));
            setFormData({ name: '', phone: '', message: '' });
        } catch (error) {
            console.error('Failed to submit contact form:', error);
            toast.error(t('contact.error'));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Helmet>
                <title>{t('contact.title')} | Milliy Brend Reklama</title>
                <meta name="description" content={t('contact.subtitle')} />
            </Helmet>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="section"
            >
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t('contact.title')}</h1>
                        <p className="text-dark-500 dark:text-dark-400 max-w-2xl mx-auto px-4">{t('contact.subtitle')}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="card p-6 sm:p-8"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
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

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        {t('common.message')} *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={t('contact.form.messagePlaceholder')}
                                        rows={5}
                                        className="textarea"
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
                                            {t('contact.form.submit')}
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-6 lg:space-y-8"
                        >
                            <div className="card p-6 sm:p-8">
                                <h3 className="text-xl font-bold mb-6">{t('contact.info.title')}</h3>

                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                                            <Phone className="w-5 h-5 text-primary-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs sm:text-sm text-dark-500 dark:text-dark-400">{t('common.phone')}</div>
                                            <div className="font-medium text-sm sm:text-base">+998 99 550 60 40 / <br className="sm:hidden" /> +998 93 999 91 64</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                                            <Mail className="w-5 h-5 text-primary-500" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-xs sm:text-sm text-dark-500 dark:text-dark-400">Email</div>
                                            <div className="font-medium text-sm sm:text-base break-words">holmamatovsamandar10@gmail.com</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                                            <MapPin className="w-5 h-5 text-primary-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs sm:text-sm text-dark-500 dark:text-dark-400">Manzil</div>
                                            <div className="font-medium text-sm sm:text-base">Samarqand shaxar, Farxadiskiy 10</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                                            <Clock className="w-5 h-5 text-primary-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs sm:text-sm text-dark-500 dark:text-dark-400">Ish vaqti</div>
                                            <div className="font-medium text-sm sm:text-base">Dush-Shan: 9:00 - 20:00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map or additional info card */}
                            <div className="card p-6 sm:p-8 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                                <h3 className="text-xl font-bold mb-3">Bizga qo'ng'iroq qiling!</h3>
                                <p className="text-primary-100 mb-4">
                                    Savollaringiz bormi? Biz har doim yordam berishga tayyormiz.
                                </p>
                                <a
                                    href="tel:+998995506040"
                                    className="inline-flex items-center gap-2 bg-white text-primary-600 px-5 py-2.5 rounded-xl font-medium hover:bg-primary-50 transition-colors"
                                >
                                    <Phone className="w-5 h-5" />
                                    Qo'ng'iroq qilish
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
