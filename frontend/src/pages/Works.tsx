import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { worksApi, ordersApi } from '../api';
import type { Work, Language } from '../types';
import OrderModal from '../components/ui/OrderModal';

export default function Works() {
    const { t, i18n } = useTranslation();
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedWork, setSelectedWork] = useState<Work | null>(null);
    const lang = i18n.language as Language;

    useEffect(() => {
        loadWorks();
    }, []);

    const loadWorks = async () => {
        try {
            const response = await worksApi.getActive();
            setWorks(response.data);
        } catch (error) {
            console.error('Failed to load works:', error);
            toast.error(t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    const handleOrderSimilar = (work: Work) => {
        setSelectedWork(work);
    };

    return (
        <>
            <Helmet>
                <title>{t('works.title')} | Milliy Brend Reklama</title>
                <meta name="description" content={t('works.subtitle')} />
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
                        <h1 className="section-title">{t('works.title')}</h1>
                        <p className="section-subtitle">{t('works.subtitle')}</p>
                    </motion.div>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="mt-4 text-dark-500">{t('common.loading')}</p>
                        </div>
                    ) : works.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {works.map((work, index) => (
                                <motion.div
                                    key={work._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="card-hover overflow-hidden group"
                                >
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src={work.image.startsWith('/') ? work.image : `/uploads/${work.image}`}
                                            alt={work.title[lang] || work.title.uz}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold mb-2 text-dark-900 dark:text-white">
                                            {work.title[lang] || work.title.uz}
                                        </h3>
                                        <p className="text-dark-500 dark:text-dark-400 text-sm mb-4 line-clamp-2">
                                            {work.description[lang] || work.description.uz}
                                        </p>
                                        <button
                                            onClick={() => handleOrderSimilar(work)}
                                            className="btn-outline text-sm py-2"
                                        >
                                            {t('common.orderSimilar')}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-dark-500 dark:text-dark-400">{t('works.emptyMessage')}</p>
                        </div>
                    )}
                </div>
            </motion.div>

            {selectedWork && (
                <OrderModal
                    work={selectedWork}
                    imageSrc={selectedWork.image.startsWith('/') ? selectedWork.image : `/uploads/${selectedWork.image}`}
                    onClose={() => setSelectedWork(null)}
                />
            )}
        </>
    );
}
