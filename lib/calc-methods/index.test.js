"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe('calc-methods', function () {
    describe('getCalcMethodByName', function () {
        it('returns undefined if no method found', function () {
            var method = (0, index_1.getCalcMethodByName)('foo');
            expect(method).toBeUndefined();
        });
        it('returns method if found', function () {
            var method = (0, index_1.getCalcMethodByName)('Egypt');
            expect(method).toMatchSnapshot();
        });
    });
    describe('getCalcMethods', function () {
        it('returns all methods', function () {
            var methods = (0, index_1.getCalcMethods)();
            expect(methods).toMatchSnapshot();
        });
    });
    describe('getCalcMethodsByCountry', function () {
        it('returns method and asr method for USA', function () {
            var methods = (0, index_1.getCalcMethodsByCountry)('United States');
            expect(methods).toMatchInlineSnapshot("\n        {\n          \"asrMethod\": \"Standard\",\n          \"method\": \"ISNA\",\n        }\n      ");
        });
        it('returns method and asr method for Turkey', function () {
            var methods = (0, index_1.getCalcMethodsByCountry)('Turkey');
            expect(methods).toMatchInlineSnapshot("\n        {\n          \"asrMethod\": \"Standard\",\n          \"method\": \"turkey-presidency-of-religious-affairs\",\n        }\n      ");
        });
        it('returns method and asr method for UK', function () {
            var methods = (0, index_1.getCalcMethodsByCountry)('United Kingdom');
            expect(methods).toMatchInlineSnapshot("\n        {\n          \"asrMethod\": \"Standard\",\n          \"method\": \"MWL\",\n        }\n      ");
        });
        it('returns method and asr method for AU', function () {
            var methods = (0, index_1.getCalcMethodsByCountry)('Australia');
            expect(methods).toMatchInlineSnapshot("\n        {\n          \"asrMethod\": \"Hanafi\",\n          \"method\": \"MWL\",\n        }\n      ");
        });
        it('returns method and asr method for BD', function () {
            var methods = (0, index_1.getCalcMethodsByCountry)('Bangladesh');
            expect(methods).toMatchInlineSnapshot("\n        {\n          \"asrMethod\": \"Hanafi\",\n          \"method\": \"Karachi\",\n        }\n      ");
        });
    });
});
//# sourceMappingURL=index.test.js.map