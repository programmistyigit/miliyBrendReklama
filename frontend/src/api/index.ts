import axios from 'axios';
import { AuthTokens } from '../types';

const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for auth
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
                        headers: { Authorization: `Bearer ${refreshToken}` }
                    });

                    const tokens: AuthTokens = response.data;
                    localStorage.setItem('accessToken', tokens.accessToken);
                    localStorage.setItem('refreshToken', tokens.refreshToken);

                    originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/admin/login';
            }
        }

        return Promise.reject(error);
    }
);

// Auth
export const authApi = {
    login: (username: string, password: string) =>
        api.post<AuthTokens>('/auth/login', { username, password }),
    logout: () => api.post('/auth/logout'),
};

// Works
export const worksApi = {
    getActive: () => api.get('/works'),
    getAll: () => api.get('/works/admin/all'),
    getOne: (id: string) => api.get(`/works/${id}`),
    getStats: () => api.get('/works/admin/stats'),
    create: (data: FormData | object) => api.post('/works', data),
    update: (id: string, data: object) => api.patch(`/works/${id}`, data),
    delete: (id: string) => api.delete(`/works/${id}`),
};

// Services
export const servicesApi = {
    getActive: () => api.get('/services'),
    getAll: () => api.get('/services/admin/all'),
    getByCategory: (category: string) => api.get(`/services/category/${category}`),
    getOne: (id: string) => api.get(`/services/${id}`),
    create: (data: object) => api.post('/services', data),
    update: (id: string, data: object) => api.patch(`/services/${id}`, data),
    delete: (id: string) => api.delete(`/services/${id}`),
};

// Contacts
export const contactsApi = {
    create: (data: { name: string; phone: string; message: string }) =>
        api.post('/contacts', data),
    getAll: () => api.get('/contacts'),
    getNew: () => api.get('/contacts/new'),
    getStats: () => api.get('/contacts/stats'),
    update: (id: string, data: object) => api.patch(`/contacts/${id}`, data),
    delete: (id: string) => api.delete(`/contacts/${id}`),
};

// Orders
export const ordersApi = {
    create: (data: object) => api.post('/orders', data),
    getAll: () => api.get('/orders'),
    getNew: () => api.get('/orders/new'),
    getStats: () => api.get('/orders/stats'),
    update: (id: string, data: object) => api.patch(`/orders/${id}`, data),
    delete: (id: string) => api.delete(`/orders/${id}`),
};

// Upload
export const uploadApi = {
    upload: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

// Settings
export const settingsApi = {
    getAll: () => api.get('/settings'),
    get: (key: string) => api.get(`/settings/${key}`),
    set: (key: string, value: any) => api.post('/settings', { key, value }),
    delete: (key: string) => api.delete(`/settings/${key}`),
};

// Telegram
export const telegramApi = {
    restart: () => api.post('/telegram/restart'),
    checkAdmin: (userId: string) => api.get(`/telegram/admin-check?userId=${userId}`),
};

export default api;
