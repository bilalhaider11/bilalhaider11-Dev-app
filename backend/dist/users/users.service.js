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
exports.UsersService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../schemas/user.schema");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt_payload_interface_1 = require("../auth/jwt-payload.interface");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async createTask(createUserDto) {
        const { name, email, password } = createUserDto;
        let user = await this.userModel.findOne({ email });
        if (user) {
            throw new common_1.ConflictException({ message: 'user already exists!' });
        }
        ;
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        user = new this.userModel({
            name,
            email,
            avatar,
            password,
        });
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = { email };
        const accessToken = await this.jwtService.sign(payload);
        return accessToken;
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
;
//# sourceMappingURL=users.service.js.map