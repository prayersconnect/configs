"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalcMethodByCountry = exports.getCalcMethods = exports.getCalcMethodByName = void 0;
var methods_1 = __importDefault(require("./methods"));
var countries_1 = require("../countries");
var getCalcMethodByName = function (name) {
    return methods_1.default.find(function (method) { return method.name === name; });
};
exports.getCalcMethodByName = getCalcMethodByName;
var getCalcMethods = function () {
    return methods_1.default;
};
exports.getCalcMethods = getCalcMethods;
var getCalcMethodByCountry = function (country) {
    var _a;
    if (!country) {
        return undefined;
    }
    var countryConf = (0, countries_1.getConfigByISOName)(country);
    return (_a = countryConf === null || countryConf === void 0 ? void 0 : countryConf.prayer_settings) === null || _a === void 0 ? void 0 : _a.calculation_method;
};
exports.getCalcMethodByCountry = getCalcMethodByCountry;
//# sourceMappingURL=index.js.map