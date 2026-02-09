# Milliy Brend Reklama Agency - Web Platform

Professional reklama agentligi uchun premium darajadagi web platforma.

## 🚀 Texnologiyalar

### Backend
- NestJS + TypeScript
- MongoDB (Mongoose)
- JWT Authentication + Refresh Tokens
- Role-based Access Control (ADMIN/USER)
- Telegram Bot Integration
- File Upload (Local Storage)
- Rate Limiting

### Frontend
- Vite + React + TypeScript
- TailwindCSS (Custom Design System)
- Framer Motion (Premium Animations)
- React Router
- i18n (O'zbek, Rus, Ingliz)
- Dark/Light Theme (Circle Animation)

## 📦 O'rnatish

### 1. Node.js o'rnatish
Node.js 18+ versiyasini o'rnating: https://nodejs.org

### 2. MongoDB o'rnatish
MongoDB o'rnating: https://mongodb.com/try/download/community

### 3. Backend sozlash
```bash
cd backend
npm install
```

.env faylini tahrirlang:
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/milliy-reklama

# JWT
JWT_SECRET=your-super-secret-key-change-me
JWT_REFRESH_SECRET=your-refresh-secret-key

# Telegram Bot
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_ADMIN_CHAT_ID=your-chat-id
```

### 4. Frontend sozlash
```bash
cd frontend
npm install
```

### 5. Ishga tushirish

Backend:
```bash
cd backend
npm run start:dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## 🔐 Admin Panel

- URL: http://localhost:5173/admin
- Default Login: admin / admin123

⚠️ **Production uchun parolni albatta o'zgartiring!**

## 📱 Telegram Bot Sozlash

1. @BotFather dan yangi bot yarating
2. Token va Chat ID ni .env fayliga kiriting
3. Serverni qayta ishga tushiring

## 🌐 Sahifalar

### Public
- `/` - Bosh sahifa
- `/works` - Biz qilgan ishlar
- `/services` - Xizmatlar
- `/contact` - Bog'lanish

### Admin
- `/admin` - Dashboard
- `/admin/works` - Ishlar boshqaruvi
- `/admin/services` - Xizmatlar boshqaruvi
- `/admin/contacts` - Murojatlar
- `/admin/orders` - Buyurtmalar
- `/admin/settings` - Sozlamalar

## 🎨 Xususiyatlar

- ✅ Premium UI/UX dizayn
- ✅ Dark/Light tema (circle animation)
- ✅ Ko'p tilli (UZ/RU/EN)
- ✅ SEO optimizatsiya
- ✅ Fully responsive
- ✅ Framer Motion animatsiyalar
- ✅ JWT + Refresh Token
- ✅ Role-based access
- ✅ Telegram notifications
- ✅ File upload
- ✅ Rate limiting
- ✅ Production ready

## 🚀 Production Deploy

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
```

Build fayllar `frontend/dist` papkasida joylashadi.

## 📝 Litsenziya

MIT License - Milliy Reklama Agency
