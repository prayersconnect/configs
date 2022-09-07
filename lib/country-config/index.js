"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var country = (0, country_locator_1.findCountryByCoordinate)(lat, long);
    if ((country === null || country === void 0 ? void 0 : country.isoA3Code) === 'USA') {
        return __assign(__assign({}, country), { name: 'United States' });
    }
    else {
        return country;
    }
}
exports.getCountryByCoords = getCountryByCoords;
function countrySlug(country) {
    return country.toLowerCase().replace(/\s+/, '_');
}
//# sourceMappingURL=index.js.map