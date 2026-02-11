import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { worksApi } from '../../api';
import type { Work, Language } from '../../types';
import AppImage from '../ui/Image';

export default function WorksPreview() {
    const { t, i18n } = useTranslation();
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const lang = i18n.language as Language;

    useEffect(() => {
        loadWorks();
    }, []);

    const loadWorks = async () => {
        try {
            const response = await worksApi.getActive();
            setWorks(response.data.slice(0, 3));
        } catch (error) {
            console.error('Failed to load works:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="section">
                <div className="container">
                    <div className="text-center">{t('common.loading')}</div>
                </div>
            </section>
        );
    }

    return (
        <section className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="section-title">{t('works.title')}</h2>
                    <p className="section-subtitle">{t('works.subtitle')}</p>
                </motion.div>

                {works.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-6">
                        {works.map((work, index) => (
                            <motion.div
                                key={work._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="card-hover overflow-hidden group"
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    <AppImage
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
                                    <p className="text-dark-500 dark:text-dark-400 text-sm line-clamp-2">
                                        {work.description[lang] || work.description.uz}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-dark-500 dark:text-dark-400">{t('works.emptyMessage')}</p>
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-10"
                >
                    <Link to="/works" className="btn-primary">
                        {t('common.viewAll')}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
