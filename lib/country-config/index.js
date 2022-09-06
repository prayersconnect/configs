"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryByCoords = exports.getConfig = void 0;
var configs_1 = __importStar(require("./configs"));
var country_locator_1 = require("country-locator");
function getConfig(country) {
    var countryConf = configs_1.default[countrySlug(country)];
    return Object.assign({}, configs_1.defaultConfig, countryConf);
}
exports.getConfig = getConfig;
/**
 * Using this wrapper function in case we need any country name normalization!
 * @param lat
 * @param long
 */
function getCountryByCoords(lat, long) {
    return (0, country_locator_1.findCountryByCoordinate)(lat, long);
}
exports.getCountryByCoords = getCountryByCoords;
function countrySlug(country) {
    return country.toLowerCase().replace(/\s+/, '_');
}
//# sourceMappingURL=index.js.map