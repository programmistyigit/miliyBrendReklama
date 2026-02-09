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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceSchema = exports.Service = exports.ServiceCategory = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var ServiceCategory;
(function (ServiceCategory) {
    ServiceCategory["POLIGRAFIYA"] = "poligrafiya";
    ServiceCategory["TASHQI_REKLAMA"] = "tashqi_reklama";
    ServiceCategory["ICHKI_REKLAMA"] = "ichki_reklama";
    ServiceCategory["DIZAYN"] = "dizayn";
    ServiceCategory["RAQAMLI_IT"] = "raqamli_it";
    ServiceCategory["SOUVENIR_PROMO"] = "souvenir_promo";
    ServiceCategory["ISHLAB_CHIQARISH"] = "ishlab_chiqarish";
})(ServiceCategory || (exports.ServiceCategory = ServiceCategory = {}));
let Service = class Service {
};
exports.Service = Service;
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], Service.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], Service.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Service.prototype, "icon", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ServiceCategory, required: true }),
    __metadata("design:type", String)
], Service.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'active', enum: ['active', 'inactive'] }),
    __metadata("design:type", String)
], Service.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Service.prototype, "order", void 0);
exports.Service = Service = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Service);
exports.ServiceSchema = mongoose_1.SchemaFactory.createForClass(Service);
//# sourceMappingURL=service.schema.js.map