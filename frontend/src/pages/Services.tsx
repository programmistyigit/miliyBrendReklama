import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
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
import { servicesApi } from '../api';
import type { Service, Language } from '../types';
import OrderModal from '../components/ui/OrderModal';

// Helper function to get local service image
const getServiceImage = (nameUz: string) => {
    // Exact mapping for names that don't match public filenames perfectly
    const mapping: Record<string, string> = {
        'Instagram post va story dizayn': 'Instagram Facebook reklama.jpg',
        'UI/UX dizayn': 'UX dizayn.png',
        'WebAR / AR reklama loyihalari': 'WebAR  AR reklama loyihalari.jpg',
        'O\'lchov olish va joylash rejalash': 'O\'lchov olish va joylash rejalash Reklama joylashtirishdan oldin professional o\'lchov va rejalashtiris.png',
        'Texnik xizmat va yangilash': 'Texnik xizmat va yangilash Mavjud reklama konstruksiyalariga texnik xizmat ko\'rsatish va yangilas.png',
        'Qadoqlash dizayni': 'qadozlash dizayni.png'
    };

    if (mapping[nameUz]) return `/${mapping[nameUz]}`;

    // Common JPG services
    const jpgServices = [
        'Brendlangan ruchkalar',
        'Instagram Facebook reklama',
        'NFC vizitkalar va stikerlar',
        'Onlayn katalog va portfolio',
        'Veb-sayt yaratish',
        'WebAR  AR reklama loyihalari',
        'Dizayndan bosmagacha to\'liq xizmat'
    ];

    const extension = jpgServices.includes(nameUz) ? 'jpg' : 'png';
    return `/${nameUz}.${extension}`;
};

// Category configuration with colors, icons, and images
const categoryConfig = {
    poligrafiya: {
        icon: Printer,
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-500/10',
        textColor: 'text-blue-500',
        image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&q=80',
    },
    tashqi_reklama: {
        icon: Megaphone,
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-orange-500/10',
        textColor: 'text-orange-500',
        image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
    },
    ichki_reklama: {
        icon: HomeIcon,
        color: 'from-teal-500 to-teal-600',
        bgColor: 'bg-teal-500/10',
        textColor: 'text-teal-500',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    },
    dizayn: {
        icon: Palette,
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-purple-500/10',
        textColor: 'text-purple-500',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    },
    raqamli_it: {
        icon: Monitor,
        color: 'from-cyan-500 to-cyan-600',
        bgColor: 'bg-cyan-500/10',
        textColor: 'text-cyan-500',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    },
    souvenir_promo: {
        icon: Gift,
        color: 'from-pink-500 to-pink-600',
        bgColor: 'bg-pink-500/10',
        textColor: 'text-pink-500',
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=80',
    },
    ishlab_chiqarish: {
        icon: Wrench,
        color: 'from-amber-500 to-amber-600',
        bgColor: 'bg-amber-500/10',
        textColor: 'text-amber-500',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
    },
};

type CategoryKey = keyof typeof categoryConfig;

const categoryOrder: CategoryKey[] = [
    'poligrafiya',
    'tashqi_reklama',
    'ichki_reklama',
    'dizayn',
    'raqamli_it',
    'souvenir_promo',
    'ishlab_chiqarish',
];

export default function Services() {
    const { t, i18n } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>('all');
    const lang = i18n.language as Language;

    // Initialize category from URL params
    useEffect(() => {
        const categoryParam = searchParams.get('category') as CategoryKey | null;
        if (categoryParam && categoryOrder.includes(categoryParam)) {
            setActiveCategory(categoryParam);
        }
    }, [searchParams]);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const response = await servicesApi.getActive();
            setServices(response.data);
        } catch (error) {
            console.error('Failed to load services:', error);
            toast.error(t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category: CategoryKey | 'all') => {
        setActiveCategory(category);
        if (category === 'all') {
            setSearchParams({});
        } else {
            setSearchParams({ category });
        }
    };

    // Filter services based on active category
    const filteredServices = activeCategory === 'all'
        ? services
        : services.filter(s => s.category === activeCategory);

    // Group filtered services by category for display
    const groupedServices = filteredServices.reduce((acc, service) => {
        if (!acc[service.category]) {
            acc[service.category] = [];
        }
        acc[service.category].push(service);
        return acc;
    }, {} as Record<CategoryKey, Service[]>);

    return (
        <>
            <Helmet>
                <title>{t('services.title')} | Milliy Brend Reklama</title>
                <meta name="description" content={t('services.subtitle')} />
            </Helmet>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="section"
            >
                <div className="container">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10"
                    >
                        <h1 className="section-title">{t('services.title')}</h1>
                        <p className="section-subtitle">{t('services.subtitle')}</p>
                    </motion.div>

                    {/* Category Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-10"
                    >
                        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                            {/* All button */}
                            <button
                                onClick={() => handleCategoryChange('all')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${activeCategory === 'all'
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 scale-105'
                                    : 'bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700 border border-dark-200 dark:border-dark-700'
                                    }`}
                            >
                                {t('services.filter.all')}
                            </button>

                            {/* Category buttons */}
                            {categoryOrder.map((category) => {
                                const config = categoryConfig[category];
                                const IconComponent = config.icon;
                                const isActive = activeCategory === category;

                                return (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${isActive
                                            ? `bg-gradient-to-r ${config.color} text-white shadow-lg scale-105`
                                            : `bg-white dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:${config.bgColor} border border-dark-200 dark:border-dark-700`
                                            }`}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                        <span className="hidden sm:inline">
                                            {t(`services.categories.${category}.title`)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="mt-4 text-dark-500">{t('common.loading')}</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-12"
                            >
                                {categoryOrder.map((category) => {
                                    const categoryServices = groupedServices[category] || [];
                                    if (categoryServices.length === 0) return null;

                                    const config = categoryConfig[category];
                                    const IconComponent = config.icon;

                                    return (
                                        <motion.div
                                            key={category}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {/* Category Header */}
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}>
                                                    <IconComponent className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl md:text-3xl font-bold text-dark-900 dark:text-white">
                                                        {t(`services.categories.${category}.title`)}
                                                    </h2>
                                                    <p className="text-dark-500 dark:text-dark-400 text-sm">
                                                        {t(`services.categories.${category}.description`)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Service Cards Grid */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                                {categoryServices.map((service, index) => (
                                                    <motion.div
                                                        key={service._id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                                        className="group relative overflow-hidden rounded-2xl bg-white dark:bg-dark-800 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                                                        onClick={() => setSelectedService(service)}
                                                    >
                                                        {/* Card Image */}
                                                        <div className="relative h-48 overflow-hidden">
                                                            <img
                                                                src={getServiceImage(service.name.uz)}
                                                                alt={service.name[lang] || service.name.uz}
                                                                className="w-full h-[125%] object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    target.src = service.image || config.image;
                                                                }}
                                                            />
                                                            <div className={`absolute inset-0 bg-gradient-to-t ${config.color} opacity-20 group-hover:opacity-10 transition-opacity duration-300`} />

                                                            {/* Category Badge */}
                                                            <div className="absolute top-3 left-3">
                                                                <div className={`w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center`}>
                                                                    <IconComponent className="w-5 h-5 text-white" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Card Content */}
                                                        <div className="p-5">
                                                            <h3 className="font-bold text-lg mb-2 text-dark-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                                                {service.name[lang] || service.name.uz}
                                                            </h3>
                                                            <p className="text-dark-500 dark:text-dark-400 text-sm line-clamp-2 mb-4">
                                                                {service.description[lang] || service.description.uz}
                                                            </p>
                                                            <button
                                                                className={`inline-flex items-center gap-2 ${config.textColor} font-medium text-sm group/btn`}
                                                            >
                                                                {t('common.orderNow')}
                                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    );
                                })}

                                {/* Empty State */}
                                {filteredServices.length === 0 && !loading && (
                                    <div className="text-center py-20">
                                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-dark-100 dark:bg-dark-800 flex items-center justify-center">
                                            <Palette className="w-10 h-10 text-dark-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
                                            {t('services.emptyMessage')}
                                        </h3>
                                        <p className="text-dark-500">
                                            {t('services.emptyDescription')}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </motion.div>

            {/* Order Modal */}
            {selectedService && (
                <OrderModal
                    service={selectedService}
                    imageSrc={getServiceImage(selectedService.name.uz)}
                    onClose={() => setSelectedService(null)}
                />
            )}
        </>
    );
}
