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
        if (count > 0)
            return;
        const defaultServices = [
            {
                name: { uz: 'Vizitkalar', ru: 'Визитные карточки', en: 'Business Cards' },
                description: {
                    uz: 'Oddiy va premium vizitkalar - biznesingiz uchun ajoyib birinchi taassurot',
                    ru: 'Обычные и премиальные визитки - отличное первое впечатление для вашего бизнеса',
                    en: 'Standard and premium business cards - great first impression for your business'
                },
                icon: 'credit-card',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 1,
            },
            {
                name: { uz: 'Flyer va listovkalar', ru: 'Флаеры и листовки', en: 'Flyers and Leaflets' },
                description: {
                    uz: 'Reklamangizni yoyish uchun samarali va arzon yechim',
                    ru: 'Эффективное и доступное решение для распространения рекламы',
                    en: 'Effective and affordable solution for advertising distribution'
                },
                icon: 'file-text',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 2,
            },
            {
                name: { uz: 'Buklet va kataloglar', ru: 'Буклеты и каталоги', en: 'Brochures and Catalogs' },
                description: {
                    uz: 'Mahsulot va xizmatlaringizni professional tarzda taqdim eting',
                    ru: 'Профессионально представьте свои продукты и услуги',
                    en: 'Professionally present your products and services'
                },
                icon: 'book-open',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 3,
            },
            {
                name: { uz: 'Plakat va afishalar', ru: 'Плакаты и афиши', en: 'Posters and Banners' },
                description: {
                    uz: 'Katta hajmli reklamalar uchun yuqori sifatli bosma mahsulotlar',
                    ru: 'Высококачественная печатная продукция для масштабной рекламы',
                    en: 'High-quality print products for large-scale advertising'
                },
                icon: 'image',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 4,
            },
            {
                name: { uz: 'Menyu va prays-listlar', ru: 'Меню и прайс-листы', en: 'Menus and Price Lists' },
                description: {
                    uz: 'Restoran va do\'konlar uchun zamonaviy menyu va narxlar ro\'yxati',
                    ru: 'Современные меню и прайс-листы для ресторанов и магазинов',
                    en: 'Modern menus and price lists for restaurants and stores'
                },
                icon: 'list',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 5,
            },
            {
                name: { uz: 'Sticker va etiketkalar', ru: 'Стикеры и этикетки', en: 'Stickers and Labels' },
                description: {
                    uz: 'Mahsulot va brend uchun sifatli stiker va etiketkalar',
                    ru: 'Качественные стикеры и этикетки для продуктов и бренда',
                    en: 'Quality stickers and labels for products and branding'
                },
                icon: 'tag',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 6,
            },
            {
                name: { uz: 'Taklifnoma va sertifikatlar', ru: 'Приглашения и сертификаты', en: 'Invitations and Certificates' },
                description: {
                    uz: 'Maxsus tadbirlar uchun chiroyli taklifnoma va sertifikatlar',
                    ru: 'Красивые приглашения и сертификаты для особых мероприятий',
                    en: 'Beautiful invitations and certificates for special events'
                },
                icon: 'award',
                category: service_schema_1.ServiceCategory.POLIGRAFIYA,
                order: 7,
            },
            {
                name: { uz: 'Banner va bilbordlar', ru: 'Баннеры и билборды', en: 'Banners and Billboards' },
                description: {
                    uz: 'Ko\'chalarda e\'tibor tortuvchi katta hajmli reklamalar',
                    ru: 'Привлекающая внимание крупная реклама на улицах',
                    en: 'Eye-catching large-scale street advertising'
                },
                icon: 'monitor',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 1,
            },
            {
                name: { uz: 'Reklama stendlari', ru: 'Рекламные стенды', en: 'Advertising Stands' },
                description: {
                    uz: 'Ko\'rgazma va tadbirlar uchun professional stendlar',
                    ru: 'Профессиональные стенды для выставок и мероприятий',
                    en: 'Professional stands for exhibitions and events'
                },
                icon: 'layout',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 2,
            },
            {
                name: { uz: 'Magazin yozuvlari', ru: 'Вывески магазинов', en: 'Store Signage' },
                description: {
                    uz: 'Do\'koningiz uchun chiroyli va zamonaviy yozuvlar',
                    ru: 'Красивые и современные вывески для вашего магазина',
                    en: 'Beautiful and modern signage for your store'
                },
                icon: 'shopping-bag',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 3,
            },
            {
                name: { uz: 'Fasad yozuvlari', ru: 'Фасадные надписи', en: 'Facade Signs' },
                description: {
                    uz: 'Bino va ofis fasadlari uchun professional yozuvlar',
                    ru: 'Профессиональные надписи для фасадов зданий и офисов',
                    en: 'Professional signage for building and office facades'
                },
                icon: 'home',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 4,
            },
            {
                name: { uz: 'Orakal va vinil', ru: 'Оракал и винил', en: 'Oracal and Vinyl' },
                description: {
                    uz: 'Avtomobil va oynalar uchun yopishqoq materiallar',
                    ru: 'Клейкие материалы для автомобилей и стекол',
                    en: 'Adhesive materials for vehicles and glass'
                },
                icon: 'layers',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 5,
            },
            {
                name: { uz: 'Lightbox', ru: 'Лайтбоксы', en: 'Lightboxes' },
                description: {
                    uz: 'Kechalari ham ko\'rinuvchi yorug\'lik reklamalari',
                    ru: 'Световая реклама, видимая и в ночное время',
                    en: 'Illuminated advertising visible at night'
                },
                icon: 'sun',
                category: service_schema_1.ServiceCategory.TASHQI_REKLAMA,
                order: 6,
            },
            {
                name: { uz: 'Logo yaratish', ru: 'Создание логотипа', en: 'Logo Design' },
                description: {
                    uz: 'Brendingiz uchun noyob va esda qoladigan logotip',
                    ru: 'Уникальный и запоминающийся логотип для вашего бренда',
                    en: 'Unique and memorable logo for your brand'
                },
                icon: 'hexagon',
                category: service_schema_1.ServiceCategory.DIZAYN,
                order: 1,
            },
            {
                name: { uz: 'Brend dizayn', ru: 'Брендинг', en: 'Brand Design' },
                description: {
                    uz: 'To\'liq brend identifikatsiyasi - rang, shrift, uslub',
                    ru: 'Полная идентификация бренда - цвета, шрифты, стиль',
                    en: 'Complete brand identity - colors, fonts, style'
                },
                icon: 'palette',
                category: service_schema_1.ServiceCategory.DIZAYN,
                order: 2,
            },
            {
                name: { uz: 'Instagram dizayn', ru: 'Дизайн для Instagram', en: 'Instagram Design' },
                description: {
                    uz: 'Ijtimoiy tarmoqlar uchun zamonaviy va jozibali dizayn',
                    ru: 'Современный и привлекательный дизайн для социальных сетей',
                    en: 'Modern and attractive design for social media'
                },
                icon: 'instagram',
                category: service_schema_1.ServiceCategory.DIZAYN,
                order: 3,
            },
            {
                name: { uz: 'Reklama maketlari', ru: 'Рекламные макеты', en: 'Advertising Layouts' },
                description: {
                    uz: 'Har qanday reklama uchun professional maketlar',
                    ru: 'Профессиональные макеты для любой рекламы',
                    en: 'Professional layouts for any advertising'
                },
                icon: 'layout',
                category: service_schema_1.ServiceCategory.DIZAYN,
                order: 4,
            },
        ];
        await this.serviceModel.insertMany(defaultServices);
        console.log('✅ Default services seeded');
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(service_schema_1.Service.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ServicesService);
//# sourceMappingURL=services.service.js.map