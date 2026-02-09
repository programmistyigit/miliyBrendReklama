import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';
import ServicesPreview from '../components/sections/ServicesPreview';
import WorksPreview from '../components/sections/WorksPreview';
import TrustSection from '../components/sections/TrustSection';

export default function Home() {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>Milliy Brend Reklama Agency | {t('hero.title')} {t('hero.titleHighlight')}</title>
                <meta name="description" content={t('hero.subtitle')} />
            </Helmet>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Hero />
                <ServicesPreview />
                <WorksPreview />
                <TrustSection />
            </motion.div>
        </>
    );
}
