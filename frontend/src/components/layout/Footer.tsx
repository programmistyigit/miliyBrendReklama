import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Instagram, Send } from 'lucide-react';

export default function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { path: '/', label: t('common.home') },
        { path: '/works', label: t('common.works') },
        { path: '/services', label: t('common.services') },
        { path: '/contact', label: t('common.contact') },
    ];

    const socialLinks = [
        { icon: Instagram, href: 'https://instagram.com/milliybrend_sam', label: 'Instagram' },
        { icon: Send, href: 'https://t.me/MBREKLAM', label: 'Telegram' },
    ];

    return (
        <footer className="bg-dark-900 dark:bg-dark-950 text-dark-300 pt-16 pb-8">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl overflow-hidden">
                                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="font-display font-bold text-xl text-white">
                                Milliy Brend Reklama
                            </span>
                        </Link>
                        <p className="text-dark-400 leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-dark-400 hover:text-primary-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">{t('footer.contactUs')}</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-dark-400">
                                <Phone className="w-4 h-4 text-primary-500" />
                                <span>+998 99 550 60 40</span>
                            </li>
                            <li className="flex items-center gap-3 text-dark-400">
                                <Mail className="w-4 h-4 text-primary-500" />
                                <span>holmamatovsamandar10@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-dark-400">
                                <MapPin className="w-4 h-4 text-primary-500" />
                                <span>Samarqand, Farxadiskiy 10</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">{t('footer.followUs')}</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 text-dark-400 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-dark-800 text-center text-dark-500 text-sm">
                    <p>
                        © {currentYear} Milliy Brend Reklama. {t('footer.rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
