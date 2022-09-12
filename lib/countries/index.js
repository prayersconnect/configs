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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigByISOName = exports.getCountryByISOName = void 0;
var list_1 = __importDefault(require("./list"));
var prayers_configs_1 = __importStar(require("./prayers-configs"));
function getCountryByISOName(name) {
    var key = Object.keys(list_1.default).find(function (key) {
        return list_1.default[key].iso_name === name;
    });
    if (!key) {
        return null;
    }
    return list_1.default[key];
}
exports.getCountryByISOName = getCountryByISOName;
function getConfigByISOName(country) {
    var countryConf = prayers_configs_1.default[countrySlug(country)];
    return Object.assign({}, prayers_configs_1.defaultConfig, countryConf);
}
exports.getConfigByISOName = getConfigByISOName;
function countrySlug(country) {
    return country.toLowerCase().replace(/\s+/, '_');
}
//# sourceMappingURL=index.js.map