import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, Zap, Clock, DollarSign } from 'lucide-react';

const trustItems = [
    {
        icon: Award,
        titleKey: 'trust.items.experience.title',
        descKey: 'trust.items.experience.description',
        color: 'from-yellow-500 to-orange-500',
    },
    {
        icon: Zap,
        titleKey: 'trust.items.quality.title',
        descKey: 'trust.items.quality.description',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Clock,
        titleKey: 'trust.items.speed.title',
        descKey: 'trust.items.speed.description',
        color: 'from-green-500 to-emerald-500',
    },
    {
        icon: DollarSign,
        titleKey: 'trust.items.price.title',
        descKey: 'trust.items.price.description',
        color: 'from-purple-500 to-pink-500',
    },
];

export default function TrustSection() {
    const { t } = useTranslation();

    return (
        <section className="section bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="section-title text-white">{t('trust.title')}</h2>
                    <p className="section-subtitle text-dark-400">{t('trust.subtitle')}</p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trustItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center p-6 rounded-2xl bg-dark-800/50 border border-dark-700/50 hover:bg-dark-800 hover:border-dark-600 transition-all group"
                        >
                            <div
                                className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                            >
                                <item.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                {t(item.titleKey)}
                            </h3>
                            <p className="text-dark-400 text-sm">
                                {t(item.descKey)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
