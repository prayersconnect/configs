"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalcMethodByCountry = exports.getCalcMethods = exports.getCalcMethodByName = exports.getConfig = void 0;
var country_config_1 = require("./country-config");
Object.defineProperty(exports, "getConfig", { enumerable: true, get: function () { return country_config_1.getConfig; } });
var calc_methods_1 = require("./calc-methods");
Object.defineProperty(exports, "getCalcMethodByName", { enumerable: true, get: function () { return calc_methods_1.getCalcMethodByName; } });
Object.defineProperty(exports, "getCalcMethods", { enumerable: true, get: function () { return calc_methods_1.getCalcMethods; } });
Object.defineProperty(exports, "getCalcMethodByCountry", { enumerable: true, get: function () { return calc_methods_1.getCalcMethodByCountry; } });
//# sourceMappingURL=index.js.map