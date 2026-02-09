import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactsApi } from '../../api';
import type { Contact } from '../../types';

export default function AdminContacts() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        try {
            const response = await contactsApi.getAll();
            setContacts(response.data);
        } catch (error) {
            toast.error('Murojatlarni yuklashda xatolik');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkReviewed = async (id: string) => {
        try {
            await contactsApi.update(id, { status: 'reviewed' });
            toast.success('Ko\'rib chiqildi deb belgilandi');
            loadContacts();
        } catch (error) {
            toast.error('Xatolik yuz berdi');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('O\'chirishni tasdiqlaysizmi?')) return;
        try {
            await contactsApi.delete(id);
            toast.success('O\'chirildi');
            loadContacts();
        } catch (error) {
            toast.error('O\'chirishda xatolik');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Murojatlar</h2>

            {contacts.length === 0 ? (
                <div className="text-center py-12 text-dark-500">Murojatlar yo'q</div>
            ) : (
                <div className="grid gap-4">
                    {contacts.map((contact, index) => (
                        <motion.div
                            key={contact._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-5 bg-white dark:bg-dark-800 rounded-xl border ${contact.status === 'new' ? 'border-primary-300 dark:border-primary-700' : 'border-dark-200 dark:border-dark-700'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-bold">{contact.name}</span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${contact.status === 'new' ? 'bg-primary-100 text-primary-600' : 'bg-dark-100 text-dark-500'
                                            }`}>
                                            {contact.status === 'new' ? 'Yangi' : 'Ko\'rilgan'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-dark-500 mb-2">{contact.phone}</div>
                                    <p className="text-dark-700 dark:text-dark-300">{contact.message}</p>
                                    <div className="text-xs text-dark-400 mt-3">
                                        {new Date(contact.createdAt).toLocaleString('uz-UZ')}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {contact.status === 'new' && (
                                        <button
                                            onClick={() => handleMarkReviewed(contact._id)}
                                            className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 hover:bg-green-200"
                                        >
                                            <Check className="w-5 h-5" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
