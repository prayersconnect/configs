"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJuristicMethods = exports.getCalcMethodsByCountry = exports.getCalcMethods = exports.getCalcMethodByName = void 0;
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
/**
 * Returns the calculation method and asr method for a given country's ISO name
 * @param country ISO Country Name
 */
var getCalcMethodsByCountry = function (country) {
    if (!country) {
        return null;
    }
    var countryConf = (0, countries_1.getConfigByISOName)(country);
    return {
        method: countryConf.prayer_settings.calculation_method,
        asrMethod: countryConf.prayer_settings.asr_method || 'Standard',
    };
};
exports.getCalcMethodsByCountry = getCalcMethodsByCountry;
var getJuristicMethods = function () {
    return [
        { name: 'Standard', label: 'Standard (Shafii, Maliki, Jafari) and Hanbali' },
        { name: 'Hanafi', label: 'Hanafi' },
    ];
};
exports.getJuristicMethods = getJuristicMethods;
//# sourceMappingURL=index.js.map