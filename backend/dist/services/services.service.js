"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const service_schema_1 = require("./schemas/service.schema");
let ServicesService = class ServicesService {
    constructor(serviceModel) {
        this.serviceModel = serviceModel;
    }
    async onModuleInit() {
        await this.seedServices();
    }
    async create(createServiceDto) {
        const service = new this.serviceModel(createServiceDto);
        return service.save();
    }
    async findAll() {
        return this.serviceModel.find().sort({ category: 1, order: 1 }).exec();
    }
    async findActive() {
        return this.serviceModel.find({ status: 'active' }).sort({ category: 1, order: 1 }).exec();
    }
    async findByCategory(category) {
        return this.serviceModel.find({ category, status: 'active' }).sort({ order: 1 }).exec();
    }
    async findOne(id) {
        const service = await this.serviceModel.findById(id);
        if (!service) {
            throw new common_1.NotFoundException('Service not found');
        }
        return service;
    }
    async update(id, updateServiceDto) {
        const service = await this.serviceModel.findByIdAndUpdate(id, updateServiceDto, { new: true });
        if (!service) {
            throw new common_1.NotFoundException('Service not found');
        }
        return service;
    }
    async remove(id) {
        const result = await this.serviceModel.findByIdAndDelete(id);
        if (!result) {
            throw new common_1.NotFoundException('Service not found');
        }
    }
    async seedServices() {
        const count = await this.serviceModel.countDocuments();
        if (count > 0 && count < 60) {
            await this.serviceModel.deleteMany({});
            console.log('🔄 Old services cleared, reseeding with full list...');
        }
        else if (count >= 60) {
            return;
        }
        const defaultServices = [
            {
                name: { uz: 'Vizitkalar', ru: 'Визитные карточки', en: 'Business Cards' },
                description: {
                    uz: 'Professional taassurot qoldiring! Oddiy, premium, laminatsiyali va relieflik vizitkalar - sizning brendingiz uchun mukammal birinchi qadam.',
                    ru: 'Произведите профессиональное впечатление! Обычные, премиальные, ламинированные и рельефные визитки - идеальный первый шаг для вашего бренда.',
                    en: 'Make a professional impression! Standard, premium, laminated and embossed business cards - the perfect first step for your brand.'
                },
                icon: 'credit-card',
                image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 1,
            },
            {
                name: { uz: 'Flyer va listovkalar', ru: 'Флаеры и листовки', en: 'Flyers and Leaflets' },
                description: {
                    uz: 'Reklamangizni keng ommaga yetkazing! Rangli, yorqin va e\'tiborni tortuvchi flyer va listovkalar bilan mijozlaringizni jalb qiling.',
                    ru: 'Донесите вашу рекламу до широкой аудитории! Привлекайте клиентов яркими цветными флаерами и листовками.',
                    en: 'Reach your audience effectively! Attract customers with colorful, vibrant flyers and leaflets that grab attention.'
                },
                icon: 'file-text',
                image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 2,
            },
            {
                name: { uz: 'Bukletlar', ru: 'Буклеты', en: 'Brochures' },
                description: {
                    uz: '2-3 buklamali professional bukletlar - mahsulot va xizmatlaringizni batafsil va jozibador tarzda taqdim eting.',
                    ru: 'Профессиональные буклеты с 2-3 сгибами - представьте ваши продукты и услуги детально и привлекательно.',
                    en: 'Professional 2-3 fold brochures - present your products and services in detail and attractively.'
                },
                icon: 'book-open',
                image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=600&q=80',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 3,
            },
            {
                name: { uz: 'Kataloglar', ru: 'Каталоги', en: 'Catalogs' },
                description: {
                    uz: 'Mahsulotlaringizni professional katalogda jamlang. Yuqori sifatli bosma va dizayn bilan brendingizni yangi darajaga olib chiqing.',
                    ru: 'Соберите ваши продукты в профессиональном каталоге. Поднимите ваш бренд на новый уровень с качественной печатью и дизайном.',
                    en: 'Compile your products in a professional catalog. Elevate your brand with high-quality printing and design.'
                },
                icon: 'book',
                image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 4,
            },
            {
                name: { uz: 'Plakat va afishalar', ru: 'Плакаты и афиши', en: 'Posters and Banners' },
                description: {
                    uz: 'Katta formatli reklamalar uchun yuqori sifatli plakat va afishalar. Tadbirlar, aksiyalar va reklama kampaniyalari uchun ideal.',
                    ru: 'Высококачественные плакаты и афиши для крупноформатной рекламы. Идеально для мероприятий, акций и рекламных кампаний.',
                    en: 'High-quality posters for large-format advertising. Perfect for events, promotions and advertising campaigns.'
                },
                icon: 'image',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 5,
            },
            {
                name: { uz: 'Menyu va prays-listlar', ru: 'Меню и прайс-листы', en: 'Menus and Price Lists' },
                description: {
                    uz: 'Restoran, kafe va do\'konlar uchun zamonaviy menyu va narxlar ro\'yxati. Chiroyli dizayn, qulay format.',
                    ru: 'Современные меню и прайс-листы для ресторанов, кафе и магазинов. Красивый дизайн, удобный формат.',
                    en: 'Modern menus and price lists for restaurants, cafes and stores. Beautiful design, convenient format.'
                },
                icon: 'list',
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 6,
            },
            {
                name: { uz: 'Sticker va etiketkalar', ru: 'Стикеры и этикетки', en: 'Stickers and Labels' },
                description: {
                    uz: 'Mahsulotlaringizni brendlang! Turli shakl va o\'lchamdagi sifatli stiker va etiketkalar - qadoqlashdan logistikagacha.',
                    ru: 'Брендируйте вашу продукцию! Качественные стикеры и этикетки различных форм и размеров - от упаковки до логистики.',
                    en: 'Brand your products! Quality stickers and labels of various shapes and sizes - from packaging to logistics.'
                },
                icon: 'tag',
                image: 'https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=600&q=80',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 7,
            },
            {
                name: { uz: 'Taklifnoma va sertifikatlar', ru: 'Приглашения и сертификаты', en: 'Invitations and Certificates' },
                description: {
                    uz: 'Maxsus tadbirlar uchun hashamatli taklifnomalar va rasmiy sertifikatlar. To\'y, konferensiya, mukofotlash marosimlari uchun.',
                    ru: 'Роскошные приглашения и официальные сертификаты для особых мероприятий. Для свадеб, конференций, церемоний награждения.',
                    en: 'Luxurious invitations and official certificates for special events. For weddings, conferences, award ceremonies.'
                },
                icon: 'award',
                image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=80',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 8,
            },
            {
                name: { uz: 'Bloknot, daftar, papkalar', ru: 'Блокноты, тетради, папки', en: 'Notepads, Notebooks, Folders' },
                description: {
                    uz: 'Korporativ poligrafiya - brendlangan bloknot, daftar va papkalar. Ofis uchun professional ko\'rinish.',
                    ru: 'Корпоративная полиграфия - брендированные блокноты, тетради и папки. Профессиональный вид для офиса.',
                    en: 'Corporate printing - branded notepads, notebooks and folders. Professional look for the office.'
                },
                icon: 'folder',
                image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 9,
            },
            {
                name: { uz: 'Brendlangan konvertlar', ru: 'Брендированные конверты', en: 'Branded Envelopes' },
                description: {
                    uz: 'Rasmiy yozishmalaringiz uchun korporativ konvertlar. Logotip va firmenniy rang bilan professional imij.',
                    ru: 'Корпоративные конверты для официальной переписки. Профессиональный имидж с логотипом и фирменными цветами.',
                    en: 'Corporate envelopes for official correspondence. Professional image with logo and brand colors.'
                },
                icon: 'mail',
                image: 'https://images.unsplash.com/photo-1579275542618-a1dfed5f54ba?w=600&q=80',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 10,
            },
            {
                name: { uz: 'Qadoqlash dizayni va bosma', ru: 'Дизайн и печать упаковки', en: 'Packaging Design and Print' },
                description: {
                    uz: 'Mahsulot qadoqlash - box, paket, quti dizayni va bosma. Mijozlaringizni birinchi qarashdan jalb qiling.',
                    ru: 'Упаковка продукции - дизайн и печать коробок, пакетов, коробок. Привлекайте клиентов с первого взгляда.',
                    en: 'Product packaging - box, bag, carton design and printing. Attract customers at first glance.'
                },
                icon: 'package',
                image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 11,
            },
            {
                name: { uz: 'Chek-kitob blanklari', ru: 'Чековые книжки и бланки', en: 'Checkbooks and Forms' },
                description: {
                    uz: 'Moliya hujjatlari uchun professional blanklar. Chek-kitoblar, kvitansiyalar va boshqa rasmiy hujjatlar.',
                    ru: 'Профессиональные бланки для финансовых документов. Чековые книжки, квитанции и другие официальные документы.',
                    en: 'Professional forms for financial documents. Checkbooks, receipts and other official documents.'
                },
                icon: 'file-check',
                image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 12,
            },
            {
                name: { uz: 'Diplom va guvohnomalar', ru: 'Дипломы и свидетельства', en: 'Diplomas and Certificates' },
                description: {
                    uz: 'Rasmiy diplom va guvohnomalar chop etish. Ta\'lim muassasalari, kurslar va tashkilotlar uchun yuqori sifat.',
                    ru: 'Печать официальных дипломов и свидетельств. Высокое качество для образовательных учреждений, курсов и организаций.',
                    en: 'Printing official diplomas and certificates. High quality for educational institutions, courses and organizations.'
                },
                icon: 'graduation-cap',
                image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 13,
            },
            {
                name: { uz: 'Banner va bilbordlar', ru: 'Баннеры и билборды', en: 'Banners and Billboards' },
                description: {
                    uz: 'Ko\'chalarda e\'tiborni tortuvchi katta hajmli reklamalar! Minglab ko\'zga tushadigan banner va bilbordlar bilan brendingizni taniting.',
                    ru: 'Привлекающая внимание крупномасштабная реклама на улицах! Представьте ваш бренд с баннерами и билбордами.',
                    en: 'Eye-catching large-scale street advertising! Introduce your brand with banners and billboards visible to thousands.'
                },
                icon: 'monitor',
                image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 1,
            },
            {
                name: { uz: 'Reklama stendlari', ru: 'Рекламные стенды', en: 'Advertising Stands' },
                description: {
                    uz: 'Ko\'rgazma, tadbir va savdo nuqtalari uchun professional reklama stendlari. Mustahkam konstruksiya, zamonaviy dizayn.',
                    ru: 'Профессиональные рекламные стенды для выставок, мероприятий и торговых точек. Прочная конструкция, современный дизайн.',
                    en: 'Professional advertising stands for exhibitions, events and sales points. Durable construction, modern design.'
                },
                icon: 'layout',
                image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 2,
            },
            {
                name: { uz: 'Magazin peshtaxta yozuvlari', ru: 'Вывески для витрин', en: 'Storefront Signs' },
                description: {
                    uz: 'Do\'koningiz uchun zamonaviy peshtaxta yozuvlari. Mijozlarni ichkariga taklif qiluvchi professional dizayn.',
                    ru: 'Современные вывески для витрин вашего магазина. Профессиональный дизайн, приглашающий клиентов внутрь.',
                    en: 'Modern storefront signs for your shop. Professional design inviting customers inside.'
                },
                icon: 'shopping-bag',
                image: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=600&q=80',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 3,
            },
            {
                name: { uz: 'Fasaddagi katta yozuvlar', ru: 'Крупные фасадные надписи', en: 'Large Facade Signs' },
                description: {
                    uz: 'Bino fasadlarida katta hajmli yozuvlar va brendlar. Uzoqdan ko\'rinadigan, ta\'sirli va mustahkam.',
                    ru: 'Крупные надписи и бренды на фасадах зданий. Видимые издалека, впечатляющие и прочные.',
                    en: 'Large inscriptions and brands on building facades. Visible from afar, impressive and durable.'
                },
                icon: 'home',
                image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&q=80',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 4,
            },
            {
                name: { uz: 'Orakal va vinil yopishtirish', ru: 'Оклейка оракалом и винилом', en: 'Oracal and Vinyl Application' },
                description: {
                    uz: 'Oyna, avtomobil va yuzalar uchun professional orakal va vinil yopishtirish xizmati. Sifatli material, uzoq muddat.',
                    ru: 'Профессиональная оклейка стекол, автомобилей и поверхностей оракалом и винилом. Качественный материал, долгий срок.',
                    en: 'Professional oracal and vinyl application for windows, vehicles and surfaces. Quality material, long lasting.'
                },
                icon: 'layers',
                image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 5,
            },
            {
                name: { uz: 'Lightbox (yoritiladigan reklama)', ru: 'Лайтбоксы (световая реклама)', en: 'Lightboxes (Illuminated Signs)' },
                description: {
                    uz: 'Kecha-kunduz ko\'rinadigan yoritilgan reklama panellari. LED texnologiyasi bilan tejamkor va yorqin.',
                    ru: 'Освещенные рекламные панели, видимые днем и ночью. Экономичные и яркие благодаря LED технологии.',
                    en: 'Illuminated advertising panels visible day and night. Economical and bright with LED technology.'
                },
                icon: 'sun',
                image: 'https://images.unsplash.com/photo-1563642421748-5047b6585a4a?w=600&q=80',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 6,
            },
            {
                name: { uz: 'Hajmli harflar (3D lettering)', ru: 'Объемные буквы (3D)', en: '3D Lettering' },
                description: {
                    uz: 'Hajmli 3D harflar va logotiplar. Metall, plastik yoki kompozit materialdan - brend imijingiz uchun.',
                    ru: 'Объемные 3D буквы и логотипы. Из металла, пластика или композитных материалов - для имиджа вашего бренда.',
                    en: '3D letters and logos. From metal, plastic or composite materials - for your brand image.'
                },
                icon: 'type',
                image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&q=80',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 7,
            },
            {
                name: { uz: 'Neon yozuvlar', ru: 'Неоновые вывески', en: 'Neon Signs' },
                description: {
                    uz: 'Retro va zamonaviy uslubdagi neon yozuvlar. Kafe, bar, do\'kon va ofislar uchun jozibador yechim.',
                    ru: 'Неоновые вывески в ретро и современном стиле. Привлекательное решение для кафе, баров, магазинов и офисов.',
                    en: 'Neon signs in retro and modern styles. Attractive solution for cafes, bars, shops and offices.'
                },
                icon: 'zap',
                image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 8,
            },
            {
                name: { uz: 'Tom reklamalari', ru: 'Крышные конструкции', en: 'Rooftop Advertising' },
                description: {
                    uz: 'Bino tomlarida joylashtirilgan katta hajmli reklama konstruksiyalari. Shahar bo\'ylab ko\'rinuvchanlik.',
                    ru: 'Крупные рекламные конструкции на крышах зданий. Видимость по всему городу.',
                    en: 'Large advertising structures on rooftops. Visibility across the city.'
                },
                icon: 'building',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 9,
            },
            {
                name: { uz: 'Yo\'l ko\'rsatkich belgilar', ru: 'Указатели и навигация', en: 'Directional Signs' },
                description: {
                    uz: 'Savdo markazlari, biznes binolar va hududlar uchun yo\'l ko\'rsatkich va navigatsiya belgilari.',
                    ru: 'Указатели и навигационные знаки для торговых центров, бизнес-зданий и территорий.',
                    en: 'Directional and navigation signs for shopping centers, business buildings and territories.'
                },
                icon: 'map-pin',
                image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=600&q=80',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 10,
            },
            {
                name: { uz: 'Avtotransport reklamalari', ru: 'Реклама на транспорте', en: 'Vehicle Advertising' },
                description: {
                    uz: 'Avtomobil, avtobus va yuk mashinalarini brendlash. Harakatlanuvchi reklama - har kuni minglab ko\'z.',
                    ru: 'Брендирование автомобилей, автобусов и грузовиков. Передвижная реклама - тысячи просмотров каждый день.',
                    en: 'Branding cars, buses and trucks. Mobile advertising - thousands of views every day.'
                },
                icon: 'truck',
                image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 11,
            },
            {
                name: { uz: 'Vitrina dizayni va yopishtirish', ru: 'Дизайн и оклейка витрин', en: 'Window Design and Application' },
                description: {
                    uz: 'Do\'kon va ofis oynalari uchun kreativ dizayn va yopishtirish. Mijozlarni jalb qiluvchi ko\'rinish.',
                    ru: 'Креативный дизайн и оклейка витрин магазинов и офисов. Привлекательный вид для клиентов.',
                    en: 'Creative design and application for shop and office windows. Attractive look for customers.'
                },
                icon: 'square',
                image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=600&q=80',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 12,
            },
            {
                name: { uz: 'Roll-up va X-bannerlar', ru: 'Ролл-апы и X-баннеры', en: 'Roll-ups and X-Banners' },
                description: {
                    uz: 'Oson o\'rnatiladigan va ko\'chma reklama stendlari. Prezentatsiya, ko\'rgazma va tadbirlar uchun ideal.',
                    ru: 'Легко устанавливаемые мобильные рекламные стенды. Идеально для презентаций, выставок и мероприятий.',
                    en: 'Easy to set up mobile advertising stands. Perfect for presentations, exhibitions and events.'
                },
                icon: 'flag',
                image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
                category: service_schema_1.ServiceCategory.ICHKI_REKLAMA,
                order: 1,
            },
            {
                name: { uz: 'Press-wall (fotozonalar)', ru: 'Пресс-воллы (фотозоны)', en: 'Press Walls (Photo Zones)' },
                description: {
                    uz: 'Tadbirlar va konferensiyalar uchun professional fotozona press-wall. Brendingiz har bir suratda.',
                    ru: 'Профессиональные пресс-воллы для мероприятий и конференций. Ваш бренд на каждом фото.',
                    en: 'Professional press walls for events and conferences. Your brand in every photo.'
                },
                icon: 'camera',
                image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
                category: service_schema_1.ServiceCategory.ICHKI_REKLAMA,
                order: 2,
            },
            {
                name: { uz: 'Akril va plastik stendlar', ru: 'Акриловые и пластиковые стенды', en: 'Acrylic and Plastic Stands' },
                description: {
                    uz: 'Zamonaviy akril va plastik reklama stendlari. Ofis, klinika, bank va savdo markazlari uchun.',
                    ru: 'Современные акриловые и пластиковые рекламные стенды. Для офисов, клиник, банков и торговых центров.',
                    en: 'Modern acrylic and plastic advertising stands. For offices, clinics, banks and shopping centers.'
                },
                icon: 'box',
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
                category: service_schema_1.ServiceCategory.ICHKI_REKLAMA,
                order: 3,
            },
            {
                name: { uz: 'Stol usti reklama materiallari', ru: 'Настольные рекламные материалы', en: 'Desktop Advertising Materials' },
                description: {
                    uz: 'Stol usti menyu tutqichlari, broshyura stendlari va reklama kartonlari. Kichik, lekin samarali.',
                    ru: 'Настольные держатели меню, стенды для брошюр и рекламные картонки. Небольшие, но эффективные.',
                    en: 'Desktop menu holders, brochure stands and advertising cards. Small but effective.'
                },
                icon: 'clipboard',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
                category: service_schema_1.ServiceCategory.ICHKI_REKLAMA,
                order: 4,
            },
            {
                name: { uz: 'Ofis ichki yo\'riqnomalari', ru: 'Внутренняя навигация офиса', en: 'Office Interior Navigation' },
                description: {
                    uz: 'Ofis ichida yo\'nalish ko\'rsatuvchi belgilar va yozuvlar. Xodimlar va mehmonlar uchun qulay navigatsiya.',
                    ru: 'Направляющие знаки и надписи внутри офиса. Удобная навигация для сотрудников и посетителей.',
                    en: 'Directional signs and inscriptions inside the office. Convenient navigation for staff and visitors.'
                },
                icon: 'map',
                image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80',
                category: service_schema_1.ServiceCategory.ICHKI_REKLAMA,
                order: 5,
            },
            {
                name: { uz: 'Devorga yozuv va grafikalar', ru: 'Настенные надписи и графика', en: 'Wall Graphics and Inscriptions' },
                description: {
                    uz: 'Devorlar uchun kreativ yozuv va grafika dizayni. Ofis, restoran va do\'konlarga hayot ulashing.',
                    ru: 'Креативные надписи и графика для стен. Оживите офисы, рестораны и магазины.',
                    en: 'Creative inscriptions and graphics for walls. Bring life to offices, restaurants and stores.'
                },
                icon: 'edit-3',
                image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80',
                category: service_schema_1.ServiceCategory.ICHKI_REKLAMA,
                order: 6,
            },
            {
                name: { uz: 'Navigatsion belgilar', ru: 'Навигационные знаки', en: 'Navigation Signs' },
                description: {
                    uz: 'Bino ichida yo\'nalish ko\'rsatuvchi professional belgilar. WC, chiqish, qavatlar va bo\'limlar uchun.',
                    ru: 'Профессиональные указатели внутри здания. Для туалетов, выходов, этажей и отделов.',
                    en: 'Professional signs inside buildings. For restrooms, exits, floors and departments.'
                },
                icon: 'navigation',
                image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=600&q=80',
                category: service_schema_1.ServiceCategory.ICHKI_REKLAMA,
                order: 7,
            },
            {
                name: { uz: 'Logo yaratish', ru: 'Создание логотипа', en: 'Logo Design' },
                description: {
                    uz: 'Brendingiz uchun noyob va esda qoladigan logotip! Zamonaviy dizayn, cheksiz imkoniyatlar.',
                    ru: 'Уникальный и запоминающийся логотип для вашего бренда! Современный дизайн, безграничные возможности.',
                    en: 'Unique and memorable logo for your brand! Modern design, unlimited possibilities.'
                },
                icon: 'hexagon',
                image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
                category: service_schema_1.ServiceCategory.DIZAYN,
                order: 1,
            },
            {
                name: { uz: 'Brend dizayn (brandbook)', ru: 'Брендинг (брендбук)', en: 'Brand Design (Brandbook)' },
                description: {
                    uz: 'To\'liq brend identifikatsiyasi - rang palitrasi, shriftlar, elementlar va qo\'llanma. Brendingizni professional boshqaring.',
                    ru: 'Полная идентификация бренда - цветовая палитра, шрифты, элементы и руководство. Управляйте брендом профессионально.',
                    en: 'Complete brand identity - color palette, fonts, elements and guidelines. Manage your brand professionally.'
                },
                icon: 'palette',
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
                category: service_schema_1.ServiceCategory.DIZAYN,
                order: 2,
            },
            {
                name: { uz: 'Firmenniy stil', ru: 'Фирменный стиль', en: 'Corporate Identity' },
                description: {
                    uz: 'Vizitka, blanka, konvert, papka - barcha korporativ materiallar uchun yagona dizayn tili.',
                    ru: 'Визитки, бланки, конверты, папки - единый язык дизайна для всех корпоративных материалов.',
                    en: 'Business cards, letterheads, envelopes, folders - unified design language for all corporate materials.'
                },
                icon: 'briefcase',
                image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80',
                category: service_schema_1.ServiceCategory.DIZAYN,
                order: 3,
            },
            {
                name: { uz: 'Instagram post va story dizayn', ru: 'Дизайн постов и сторис', en: 'Instagram Post and Story Design' },
                description: {
                    uz: 'Ijtimoiy tarmoqlar uchun zamonaviy va jozibador post hamda story dizaynlari. Like va follow\'lar kafolatlangan!',
                    ru: 'Современные и привлекательные дизайны постов и сторис для соцсетей. Лайки и подписки гарантированы!',
                    en: 'Modern and attractive post and story designs for social media. Likes and follows guaranteed!'
                },
                icon: 'instagram',
                image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=600&q=80',
                category: service_schema_1.ServiceCategory.DIZAYN,
                order: 4,
            },
            {
                name: { uz: 'Reklama maketlari', ru: 'Рекламные макеты', en: 'Advertising Layouts' },
                description: {
                    uz: 'Har qanday reklama uchun professional maketlar - banner, flyer, billboard va boshqalar.',
                    ru: 'Профессиональные макеты для любой рекламы - баннеры, флаеры, билборды и другое.',
                    en: 'Professional layouts for any advertising - banners, flyers, billboards and more.'
                },
                icon: 'layout',
                image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80',
                category: service_schema_1.ServiceCategory.DIZAYN,
                order: 5,
            },
            {
                name: { uz: 'Banner dizayn (web & outdoor)', ru: 'Дизайн баннеров (веб и наружных)', en: 'Banner Design (Web & Outdoor)' },
                description: {
                    uz: 'Veb-sayt va tashqi reklama uchun banner dizayn. Mijozlarni jalb qiluvchi, professional grafika.',
                    ru: 'Дизайн баннеров для веб-сайтов и наружной рекламы. Профессиональная графика, привлекающая клиентов.',
                    en: 'Banner design for websites and outdoor advertising. Professional graphics that attract customers.'
                },
                icon: 'image',
                image: 'https://images.unsplash.com/photo-1561070791-36c11767b26a?w=600&q=80',
                category: service_schema_1.ServiceCategory.DIZAYN,
                order: 6,
            },
            {
                name: { uz: 'Qadoqlash dizayni', ru: 'Дизайн упаковки', en: 'Packaging Design' },
                description: {
                    uz: 'Mahsulot qadoqlamasi uchun kreativ dizayn. Raqobatchilardan ajralib turing!',
                    ru: 'Креативный дизайн упаковки продукции. Выделяйтесь среди конкурентов!',
                    en: 'Creative packaging design for products. Stand out from the competition!'
                },
                icon: 'gift',
                image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80',
                category: service_schema_1.ServiceCategory.DIZAYN,
                order: 7,
            },
            {
                name: { uz: 'UI/UX dizayn', ru: 'UI/UX дизайн', en: 'UI/UX Design' },
                description: {
                    uz: 'Veb-sayt va mobil ilovalar uchun foydalanuvchiga qulay interfeys dizayni. Landing va korporativ saytlar.',
                    ru: 'Удобный интерфейс для веб-сайтов и мобильных приложений. Лендинги и корпоративные сайты.',
                    en: 'User-friendly interface design for websites and mobile apps. Landing and corporate sites.'
                },
                icon: 'monitor',
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
                category: service_schema_1.ServiceCategory.DIZAYN,
                order: 8,
            },
            {
                name: { uz: 'Motion dizayn', ru: 'Моушен дизайн', en: 'Motion Design' },
                description: {
                    uz: 'Animatsion bannerlar, video intro va dinamik grafikalar. Brendingizga hayot ulashing!',
                    ru: 'Анимированные баннеры, видео-интро и динамическая графика. Оживите ваш бренд!',
                    en: 'Animated banners, video intros and dynamic graphics. Bring your brand to life!'
                },
                icon: 'play-circle',
                image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
                category: service_schema_1.ServiceCategory.DIZAYN,
                order: 9,
            },
            {
                name: { uz: 'Rebranding xizmatlari', ru: 'Услуги ребрендинга', en: 'Rebranding Services' },
                description: {
                    uz: 'Mavjud brendingizni yangilash va zamonaviylashtirish. Yangi imij, yangi muvaffaqiyat!',
                    ru: 'Обновление и модернизация вашего бренда. Новый имидж, новый успех!',
                    en: 'Update and modernize your existing brand. New image, new success!'
                },
                icon: 'refresh-cw',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
                category: service_schema_1.ServiceCategory.DIZAYN,
                order: 10,
            },
            {
                name: { uz: 'Veb-sayt yaratish', ru: 'Создание веб-сайтов', en: 'Website Development' },
                description: {
                    uz: 'Landing, korporativ va internet do\'kon veb-saytlari. Zamonaviy dizayn, tez ishlash, mobil moslashuvchanlik.',
                    ru: 'Лендинги, корпоративные сайты и интернет-магазины. Современный дизайн, быстрая работа, мобильная адаптивность.',
                    en: 'Landing pages, corporate and e-commerce websites. Modern design, fast performance, mobile responsive.'
                },
                icon: 'globe',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
                category: service_schema_1.ServiceCategory.RAQAMLI_IT,
                order: 1,
            },
            {
                name: { uz: 'Instagram/Facebook reklama', ru: 'Реклама в Instagram/Facebook', en: 'Instagram/Facebook Advertising' },
                description: {
                    uz: 'Ijtimoiy tarmoqlarda maqsadli reklama kampaniyalari. Aniq auditoriya, maksimal natija.',
                    ru: 'Целевые рекламные кампании в социальных сетях. Точная аудитория, максимальный результат.',
                    en: 'Targeted advertising campaigns on social networks. Precise audience, maximum results.'
                },
                icon: 'facebook',
                image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80',
                category: service_schema_1.ServiceCategory.RAQAMLI_IT,
                order: 2,
            },
            {
                name: { uz: 'SMM dizayn + kontent', ru: 'SMM дизайн + контент', en: 'SMM Design + Content' },
                description: {
                    uz: 'Ijtimoiy tarmoqlar uchun to\'liq xizmat - dizayn, kontent yozish va nashr qilish.',
                    ru: 'Полный сервис для соцсетей - дизайн, написание контента и публикация.',
                    en: 'Full service for social media - design, content writing and publishing.'
                },
                icon: 'share-2',
                image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80',
                category: service_schema_1.ServiceCategory.RAQAMLI_IT,
                order: 3,
            },
            {
                name: { uz: 'QR-kodli reklama yechimlari', ru: 'QR-код рекламные решения', en: 'QR Code Advertising Solutions' },
                description: {
                    uz: 'Zamonaviy QR-kod asosidagi reklama yechimlari. Offline\'dan online\'ga oson o\'tish.',
                    ru: 'Современные рекламные решения на основе QR-кодов. Легкий переход из офлайна в онлайн.',
                    en: 'Modern QR code-based advertising solutions. Easy transition from offline to online.'
                },
                icon: 'qr-code',
                image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&q=80',
                category: service_schema_1.ServiceCategory.RAQAMLI_IT,
                order: 4,
            },
            {
                name: { uz: 'NFC vizitkalar va stikerlar', ru: 'NFC визитки и стикеры', en: 'NFC Business Cards and Stickers' },
                description: {
                    uz: 'Bir tegish bilan ma\'lumot almashish! NFC texnologiyali zamonaviy vizitka va stikerlar.',
                    ru: 'Обмен информацией одним касанием! Современные визитки и стикеры с NFC технологией.',
                    en: 'Share information with one touch! Modern business cards and stickers with NFC technology.'
                },
                icon: 'wifi',
                image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
                category: service_schema_1.ServiceCategory.RAQAMLI_IT,
                order: 5,
            },
            {
                name: { uz: 'WebAR / AR reklama loyihalari', ru: 'WebAR / AR рекламные проекты', en: 'WebAR / AR Advertising Projects' },
                description: {
                    uz: 'Kengaytirilgan haqiqat texnologiyasi bilan innovatsion reklama. Mijozlaringizni hayratda qoldiring!',
                    ru: 'Инновационная реклама с технологией дополненной реальности. Удивите ваших клиентов!',
                    en: 'Innovative advertising with augmented reality technology. Amaze your customers!'
                },
                icon: 'box',
                image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&q=80',
                category: service_schema_1.ServiceCategory.RAQAMLI_IT,
                order: 6,
            },
            {
                name: { uz: 'Google reklama (Ads)', ru: 'Google реклама (Ads)', en: 'Google Advertising (Ads)' },
                description: {
                    uz: 'Google qidiruv va display reklamalari. Qidiruvda birinchi bo\'ling, mijozlar sizni topsn!',
                    ru: 'Поисковая и медийная реклама Google. Будьте первыми в поиске, пусть клиенты найдут вас!',
                    en: 'Google search and display advertising. Be first in search, let customers find you!'
                },
                icon: 'search',
                image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&q=80',
                category: service_schema_1.ServiceCategory.RAQAMLI_IT,
                order: 7,
            },
            {
                name: { uz: 'Onlayn katalog va portfolio', ru: 'Онлайн каталог и портфолио', en: 'Online Catalog and Portfolio' },
                description: {
                    uz: 'Mahsulot va xizmatlaringiz uchun onlayn katalog. Professional portfolio sayti.',
                    ru: 'Онлайн каталог для ваших продуктов и услуг. Профессиональный сайт-портфолио.',
                    en: 'Online catalog for your products and services. Professional portfolio website.'
                },
                icon: 'folder-open',
                image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80',
                category: service_schema_1.ServiceCategory.RAQAMLI_IT,
                order: 8,
            },
            {
                name: { uz: 'Brendlangan ruchkalar', ru: 'Брендированные ручки', en: 'Branded Pens' },
                description: {
                    uz: 'Logotip va brend ranglari bilan ruchkalar. Arzon, samarali va uzoq muddatli reklama.',
                    ru: 'Ручки с логотипом и фирменными цветами. Недорогая, эффективная и долгосрочная реклама.',
                    en: 'Pens with logo and brand colors. Affordable, effective and long-lasting advertising.'
                },
                icon: 'edit-2',
                image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&q=80',
                category: service_schema_1.ServiceCategory.SOUVENIR_PROMO,
                order: 1,
            },
            {
                name: { uz: 'Futbolkalar va kepkalar', ru: 'Футболки и кепки', en: 'T-shirts and Caps' },
                description: {
                    uz: 'Korporativ tadbirlar va jamoaviy kiyim uchun brendlangan futbolka va kepkalar.',
                    ru: 'Брендированные футболки и кепки для корпоративных мероприятий и командной одежды.',
                    en: 'Branded t-shirts and caps for corporate events and team clothing.'
                },
                icon: 'shirt',
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
                category: service_schema_1.ServiceCategory.SOUVENIR_PROMO,
                order: 2,
            },
            {
                name: { uz: 'Paket va sumkalar', ru: 'Пакеты и сумки', en: 'Bags and Packages' },
                description: {
                    uz: 'Brendlangan paket, qog\'oz sumka va shopper. Ekologik va zamonaviy.',
                    ru: 'Брендированные пакеты, бумажные сумки и шопперы. Экологичные и современные.',
                    en: 'Branded packages, paper bags and shoppers. Eco-friendly and modern.'
                },
                icon: 'shopping-bag',
                image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80',
                category: service_schema_1.ServiceCategory.SOUVENIR_PROMO,
                order: 3,
            },
            {
                name: { uz: 'Kalendarlar', ru: 'Календари', en: 'Calendars' },
                description: {
                    uz: 'Devoriy, stol va cho\'ntak kalendarlari. Yil davomida brendingiz mijozlar ko\'z o\'ngida.',
                    ru: 'Настенные, настольные и карманные календари. Ваш бренд перед глазами клиентов весь год.',
                    en: 'Wall, desktop and pocket calendars. Your brand in front of customers all year round.'
                },
                icon: 'calendar',
                image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80',
                category: service_schema_1.ServiceCategory.SOUVENIR_PROMO,
                order: 4,
            },
            {
                name: { uz: 'Fleshka va sovg\'a buyumlar', ru: 'Флешки и сувениры', en: 'USB Drives and Gift Items' },
                description: {
                    uz: 'Brendlangan USB fleshka, powerbank va boshqa texnik sovg\'alar. Foydali va esda qoladigan.',
                    ru: 'Брендированные USB флешки, пауэрбанки и другие технические подарки. Полезные и запоминающиеся.',
                    en: 'Branded USB drives, power banks and other tech gifts. Useful and memorable.'
                },
                icon: 'usb',
                image: 'https://images.unsplash.com/photo-1618410320928-25228d811631?w=600&q=80',
                category: service_schema_1.ServiceCategory.SOUVENIR_PROMO,
                order: 5,
            },
            {
                name: { uz: 'Idishlar (krujka, termos)', ru: 'Посуда (кружки, термосы)', en: 'Drinkware (Mugs, Thermoses)' },
                description: {
                    uz: 'Brendlangan piyola, krujka, termos va boshqa idishlar. Har kuni ishlatiladi, har kuni reklama!',
                    ru: 'Брендированные чашки, кружки, термосы и другая посуда. Используется каждый день, реклама каждый день!',
                    en: 'Branded cups, mugs, thermoses and other drinkware. Used daily, advertising daily!'
                },
                icon: 'coffee',
                image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
                category: service_schema_1.ServiceCategory.SOUVENIR_PROMO,
                order: 6,
            },
            {
                name: { uz: 'Reklama konstruksiyalarini tayyorlash', ru: 'Изготовление рекламных конструкций', en: 'Advertising Structure Manufacturing' },
                description: {
                    uz: 'Metall, alyuminiy va kompozit materiallardan reklama konstruksiyalari. Mustahkam va uzoq muddatli.',
                    ru: 'Рекламные конструкции из металла, алюминия и композитных материалов. Прочные и долговечные.',
                    en: 'Advertising structures from metal, aluminum and composite materials. Durable and long-lasting.'
                },
                icon: 'tool',
                image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
                category: service_schema_1.ServiceCategory.ISHLAB_CHIQARISH,
                order: 1,
            },
            {
                name: { uz: 'Montaj va demontaj', ru: 'Монтаж и демонтаж', en: 'Installation and Removal' },
                description: {
                    uz: 'Professional montaj xizmati - tashqi va ichki reklama o\'rnatish. Xavfsiz va sifatli ish.',
                    ru: 'Профессиональные услуги монтажа - установка наружной и внутренней рекламы. Безопасная и качественная работа.',
                    en: 'Professional installation services - outdoor and indoor advertising setup. Safe and quality work.'
                },
                icon: 'settings',
                image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
                category: service_schema_1.ServiceCategory.ISHLAB_CHIQARISH,
                order: 2,
            },
            {
                name: { uz: 'Texnik xizmat va yangilash', ru: 'Техобслуживание и обновление', en: 'Maintenance and Updates' },
                description: {
                    uz: 'Mavjud reklama konstruksiyalariga texnik xizmat ko\'rsatish va yangilash. Doimo yangi ko\'rinishda.',
                    ru: 'Техническое обслуживание и обновление существующих рекламных конструкций. Всегда свежий вид.',
                    en: 'Maintenance and updates for existing advertising structures. Always looking fresh.'
                },
                icon: 'refresh-cw',
                image: 'https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=600&q=80',
                category: service_schema_1.ServiceCategory.ISHLAB_CHIQARISH,
                order: 3,
            },
            {
                name: { uz: 'O\'lchov olish va joylash rejalash', ru: 'Замеры и планирование размещения', en: 'Measurements and Placement Planning' },
                description: {
                    uz: 'Reklama joylashtirishdan oldin professional o\'lchov va rejalashtirish xizmati.',
                    ru: 'Профессиональные замеры и планирование перед размещением рекламы.',
                    en: 'Professional measurements and planning before advertising placement.'
                },
                icon: 'ruler',
                image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
                category: service_schema_1.ServiceCategory.ISHLAB_CHIQARISH,
                order: 4,
            },
            {
                name: { uz: 'Dizayndan bosmagacha to\'liq xizmat', ru: 'Полный цикл от дизайна до печати', en: 'Full Service from Design to Print' },
                description: {
                    uz: 'Bir joyda barcha xizmatlar - g\'oyadan tayyor mahsulotgacha. Vaqt va pulni tejang!',
                    ru: 'Все услуги в одном месте - от идеи до готового продукта. Экономьте время и деньги!',
                    en: 'All services in one place - from idea to finished product. Save time and money!'
                },
                icon: 'check-circle',
                image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&q=80',
                category: service_schema_1.ServiceCategory.ISHLAB_CHIQARISH,
                order: 5,
            },
        ];
        await this.serviceModel.insertMany(defaultServices);
        console.log('✅ 61 services seeded successfully!');
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(service_schema_1.Service.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ServicesService);
//# sourceMappingURL=services.service.js.map