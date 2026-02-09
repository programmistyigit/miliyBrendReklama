import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { worksApi, uploadApi } from '../../api';
import type { Work } from '../../types';

export default function AdminWorks() {
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingWork, setEditingWork] = useState<Work | null>(null);
    const [formData, setFormData] = useState({
        title: { uz: '', ru: '', en: '' },
        description: { uz: '', ru: '', en: '' },
        image: '',
        category: '',
        status: 'active',
    });

    useEffect(() => {
        loadWorks();
    }, []);

    const loadWorks = async () => {
        try {
            const response = await worksApi.getAll();
            setWorks(response.data);
        } catch (error) {
            toast.error('Ishlarni yuklashda xatolik');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingWork) {
                await worksApi.update(editingWork._id, formData);
                toast.success('Ish yangilandi');
            } else {
                await worksApi.create(formData);
                toast.success('Yangi ish qo\'shildi');
            }
            loadWorks();
            closeModal();
        } catch (error) {
            toast.error('Xatolik yuz berdi');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('O\'chirishni tasdiqlaysizmi?')) return;
        try {
            await worksApi.delete(id);
            toast.success('Ish o\'chirildi');
            loadWorks();
        } catch (error) {
            toast.error('O\'chirishda xatolik');
        }
    };

    const handleToggleStatus = async (work: Work) => {
        try {
            await worksApi.update(work._id, {
                status: work.status === 'active' ? 'inactive' : 'active',
            });
            loadWorks();
        } catch (error) {
            toast.error('Statusni o\'zgartirishda xatolik');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const response = await uploadApi.upload(file);
            setFormData({ ...formData, image: response.data.url });
            toast.success('Rasm yuklandi');
        } catch (error) {
            toast.error('Rasmni yuklashda xatolik');
        }
    };

    const openModal = (work?: Work) => {
        if (work) {
            setEditingWork(work);
            setFormData({
                title: work.title,
                description: work.description,
                image: work.image,
                category: work.category || '',
                status: work.status,
            });
        } else {
            setEditingWork(null);
            setFormData({
                title: { uz: '', ru: '', en: '' },
                description: { uz: '', ru: '', en: '' },
                image: '',
                category: '',
                status: 'active',
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingWork(null);
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
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Biz qilgan ishlar</h2>
                <button onClick={() => openModal()} className="btn-primary">
                    <Plus className="w-5 h-5" /> Yangi ish
                </button>
            </div>

            <div className="grid gap-4">
                {works.map((work, index) => (
                    <motion.div
                        key={work._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 p-4 bg-white dark:bg-dark-800 rounded-xl border border-dark-200 dark:border-dark-700"
                    >
                        <img
                            src={work.image.startsWith('/') ? work.image : `/uploads/${work.image}`}
                            alt={work.title.uz}
                            className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold truncate">{work.title.uz}</h3>
                            <p className="text-sm text-dark-500 truncate">{work.description.uz}</p>
                            <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full mt-1 ${work.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-dark-100 text-dark-500'
                                }`}>
                                {work.status === 'active' ? 'Faol' : 'Nofaol'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleToggleStatus(work)} className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700">
                                {work.status === 'active' ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                            </button>
                            <button onClick={() => openModal(work)} className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700">
                                <Edit className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleDelete(work._id)} className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={closeModal}>
                    <div className="bg-white dark:bg-dark-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6 border-b border-dark-200 dark:border-dark-700">
                            <h3 className="text-xl font-bold">{editingWork ? 'Ishni tahrirlash' : 'Yangi ish qo\'shish'}</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sarlavha (UZ)</label>
                                    <input type="text" value={formData.title.uz} onChange={(e) => setFormData({ ...formData, title: { ...formData.title, uz: e.target.value } })} className="input" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sarlavha (RU)</label>
                                    <input type="text" value={formData.title.ru} onChange={(e) => setFormData({ ...formData, title: { ...formData.title, ru: e.target.value } })} className="input" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Sarlavha (EN)</label>
                                    <input type="text" value={formData.title.en} onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })} className="input" required />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tavsif (UZ)</label>
                                    <textarea value={formData.description.uz} onChange={(e) => setFormData({ ...formData, description: { ...formData.description, uz: e.target.value } })} className="textarea" rows={3} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tavsif (RU)</label>
                                    <textarea value={formData.description.ru} onChange={(e) => setFormData({ ...formData, description: { ...formData.description, ru: e.target.value } })} className="textarea" rows={3} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tavsif (EN)</label>
                                    <textarea value={formData.description.en} onChange={(e) => setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })} className="textarea" rows={3} required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Rasm</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="input" />
                                {formData.image && <img src={formData.image.startsWith('/') ? formData.image : `/uploads/${formData.image}`} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={closeModal} className="btn-secondary flex-1">Bekor qilish</button>
                                <button type="submit" className="btn-primary flex-1">{editingWork ? 'Yangilash' : 'Qo\'shish'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
