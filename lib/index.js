"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalcMethods = exports.getCalcMethodByName = exports.getCountryByCoords = exports.getConfig = void 0;
var country_config_1 = require("./country-config");
Object.defineProperty(exports, "getConfig", { enumerable: true, get: function () { return country_config_1.getConfig; } });
Object.defineProperty(exports, "getCountryByCoords", { enumerable: true, get: function () { return country_config_1.getCountryByCoords; } });
var calc_methods_1 = require("./calc-methods");
Object.defineProperty(exports, "getCalcMethodByName", { enumerable: true, get: function () { return calc_methods_1.getCalcMethodByName; } });
Object.defineProperty(exports, "getCalcMethods", { enumerable: true, get: function () { return calc_methods_1.getCalcMethods; } });
//# sourceMappingURL=index.js.map