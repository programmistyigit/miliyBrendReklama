import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Send, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { settingsApi, telegramApi } from '../../api';

export default function AdminSettings() {
    const [telegramToken, setTelegramToken] = useState('');
    const [telegramChatId, setTelegramChatId] = useState('');
    const [saving, setSaving] = useState(false);
    const [restarting, setRestarting] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const [tokenRes, adminRes] = await Promise.all([
                    settingsApi.get('telegram_token'),
                    settingsApi.get('telegram_admin_id'),
                ]);
                setTelegramToken(tokenRes.data?.value || '');
                setTelegramChatId(adminRes.data?.value || '');
            } catch (error) {
                // Settings may not exist yet
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await Promise.all([
                settingsApi.set('telegram_token', telegramToken),
                settingsApi.set('telegram_admin_id', telegramChatId),
            ]);
            toast.success('Sozlamalar saqlandi!');
        } catch (error) {
            toast.error('Xatolik yuz berdi');
        } finally {
            setSaving(false);
        }
    };

    const handleRestart = async () => {
        setRestarting(true);
        try {
            await telegramApi.restart();
            toast.success('Telegram bot qayta ishga tushirildi!');
        } catch (error) {
            toast.error('Botni qayta ishga tushirishda xatolik');
        } finally {
            setRestarting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <h2 className="text-2xl font-bold">Sozlamalar</h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-dark-200 dark:border-dark-700"
            >
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary-500" />
                    Telegram Bot Sozlamalari
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Bot Token</label>
                        <input
                            type="text"
                            value={telegramToken}
                            onChange={(e) => setTelegramToken(e.target.value)}
                            placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                            className="input"
                        />
                        <p className="text-xs text-dark-500 mt-1">
                            @BotFather dan olingan token
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Admin Chat ID</label>
                        <input
                            type="text"
                            value={telegramChatId}
                            onChange={(e) => setTelegramChatId(e.target.value)}
                            placeholder="123456789"
                            className="input"
                        />
                        <p className="text-xs text-dark-500 mt-1">
                            Xabarlar yuboriladigan chat ID (sizning Telegram ID)
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="btn-primary"
                        >
                            <Save className="w-5 h-5" />
                            {saving ? 'Saqlanmoqda...' : 'Saqlash'}
                        </button>
                        <button
                            onClick={handleRestart}
                            disabled={restarting || !telegramToken}
                            className="btn-secondary"
                        >
                            <RefreshCw className={`w-5 h-5 ${restarting ? 'animate-spin' : ''}`} />
                            {restarting ? 'Qayta ishga tushirilmoqda...' : 'Botni qayta ishga tushirish'}
                        </button>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white"
            >
                <h3 className="text-lg font-bold mb-3">Telegram Bot Yaratish</h3>
                <ol className="list-decimal list-inside space-y-2 text-primary-100">
                    <li>Telegram'da @BotFather ni oching</li>
                    <li>/newbot buyrug'ini yuboring</li>
                    <li>Bot nomini va username'ni kiriting</li>
                    <li>Berilgan tokenni yuqoriga kiriting</li>
                    <li>Chat ID olish uchun @userinfobot ga yozing</li>
                    <li>Sozlamalarni saqlang va botni qayta ishga tushiring</li>
                </ol>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-dark-200 dark:border-dark-700"
            >
                <h3 className="text-lg font-bold mb-4">Admin Hisobi</h3>
                <div className="bg-dark-50 dark:bg-dark-900 rounded-xl p-4">
                    <p className="text-sm text-dark-500 mb-2">Joriy admin:</p>
                    <p className="font-mono">Username: admin</p>
                    <p className="font-mono">Password: admin123</p>
                    <p className="text-xs text-red-500 mt-3">
                        ⚠️ Production uchun parolni albatta o'zgartiring!
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
