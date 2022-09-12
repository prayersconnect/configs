"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalcMethodByCountry = exports.getCalcMethods = exports.getCalcMethodByName = exports.getCountryByISOName = exports.getConfigByISOName = void 0;
var countries_1 = require("./countries");
Object.defineProperty(exports, "getConfigByISOName", { enumerable: true, get: function () { return countries_1.getConfigByISOName; } });
Object.defineProperty(exports, "getCountryByISOName", { enumerable: true, get: function () { return countries_1.getCountryByISOName; } });
var calc_methods_1 = require("./calc-methods");
Object.defineProperty(exports, "getCalcMethodByName", { enumerable: true, get: function () { return calc_methods_1.getCalcMethodByName; } });
Object.defineProperty(exports, "getCalcMethods", { enumerable: true, get: function () { return calc_methods_1.getCalcMethods; } });
Object.defineProperty(exports, "getCalcMethodByCountry", { enumerable: true, get: function () { return calc_methods_1.getCalcMethodByCountry; } });
//# sourceMappingURL=index.js.map