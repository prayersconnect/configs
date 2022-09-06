"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalcMethods = exports.getCalcMethodByName = void 0;
var methods_1 = __importDefault(require("./methods"));
var getCalcMethodByName = function (name) {
    return methods_1.default.find(function (method) { return method.name === name; });
};
exports.getCalcMethodByName = getCalcMethodByName;
var getCalcMethods = function () {
    return methods_1.default.map(function (_a) {
        var name = _a.name, label = _a.label;
        return { name: name, label: label };
    });
};
exports.getCalcMethods = getCalcMethods;
//# sourceMappingURL=index.js.map