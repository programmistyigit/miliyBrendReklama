import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
    Printer,
    Megaphone,
    Home as HomeIcon,
    Palette,
    Monitor,
    Gift,
    Wrench,
    ArrowRight
} from 'lucide-react';

const services = [
    {
        icon: Printer,
        categoryKey: 'poligrafiya',
        color: 'from-blue-500 to-blue-600',
        shadow: 'shadow-blue-500/30',
        image: '/poligrafiya.png',
    },
    {
        icon: Megaphone,
        categoryKey: 'tashqi_reklama',
        color: 'from-orange-500 to-orange-600',
        shadow: 'shadow-orange-500/30',
        image: '/tashqi_reklama.png',
    },
    {
        icon: HomeIcon,
        categoryKey: 'ichki_reklama',
        color: 'from-teal-500 to-teal-600',
        shadow: 'shadow-teal-500/30',
        image: '/ichki_reklama.png',
    },
    {
        icon: Palette,
        categoryKey: 'dizayn',
        color: 'from-purple-500 to-purple-600',
        shadow: 'shadow-purple-500/30',
        image: '/dizayn_hizmatlari.png',
    },
    {
        icon: Monitor,
        categoryKey: 'raqamli_it',
        color: 'from-cyan-500 to-cyan-600',
        shadow: 'shadow-cyan-500/30',
        image: '/raqamli_reklama_&_IT.png',
    },
    {
        icon: Gift,
        categoryKey: 'souvenir_promo',
        color: 'from-pink-500 to-pink-600',
        shadow: 'shadow-pink-500/30',
        image: '/Souvenir_&_Promo.png',
    },
    {
        icon: Wrench,
        categoryKey: 'ishlab_chiqarish',
        color: 'from-amber-500 to-amber-600',
        shadow: 'shadow-amber-500/30',
        image: '/Ishlab_Chiqarish_&_Montaj.png',
    },
];

export default function ServicesPreview() {
    const { t } = useTranslation();

    return (
        <section className="section bg-dark-50 dark:bg-dark-900/50">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="section-title">{t('services.title')}</h2>
                    <p className="section-subtitle">{t('services.subtitle')}</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.categoryKey}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                to={`/services?category=${service.categoryKey}`}
                                className="group relative block overflow-hidden rounded-2xl bg-white dark:bg-dark-800 shadow-lg hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Image */}
                                <div className="relative h-32 md:h-40 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={t(`services.categories.${service.categoryKey}.title`)}
                                        className="w-full h-[125%] object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20 group-hover:opacity-10 transition-opacity duration-300`} />

                                    {/* Icon Badge */}
                                    <div className="absolute top-3 left-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <service.icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-bold text-sm md:text-base text-dark-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-1">
                                        {t(`services.categories.${service.categoryKey}.title`)}
                                    </h3>
                                    <p className="text-dark-500 dark:text-dark-400 text-xs md:text-sm mt-1 line-clamp-2 hidden sm:block">
                                        {t(`services.categories.${service.categoryKey}.description`)}
                                    </p>
                                    <div className="mt-2 flex items-center gap-1 text-primary-500 text-xs md:text-sm font-medium">
                                        <span>{t('common.learnMore')}</span>
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-10"
                >
                    <Link to="/services" className="btn-primary">
                        {t('common.viewAll')}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
