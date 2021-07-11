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
exports.EducationDto = void 0;
const class_validator_1 = require("class-validator");
class EducationDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'School should not be empty!' }),
    __metadata("design:type", String)
], EducationDto.prototype, "school", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Degree should not be empty!' }),
    __metadata("design:type", String)
], EducationDto.prototype, "degree", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Field of Study should not be empty!' }),
    __metadata("design:type", String)
], EducationDto.prototype, "fieldofstudy", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Date is required!' }),
    __metadata("design:type", Date)
], EducationDto.prototype, "from", void 0);
exports.EducationDto = EducationDto;
;
//# sourceMappingURL=education.dto.js.map