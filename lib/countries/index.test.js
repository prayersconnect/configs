"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe('country helpers', function () {
    describe('getCountryByISOName', function () {
        it('returns null if country not found', function () {
            expect((0, index_1.getCountryByISOName)('not-found')).toBeNull();
        });
        it('returns country info if found', function () {
            expect((0, index_1.getCountryByISOName)('United States')).toMatchSnapshot();
        });
    });
    describe('getConfigByISOName', function () {
        it('returns default config if country not found', function () {
            expect((0, index_1.getConfigByISOName)('not-found')).toMatchSnapshot();
        });
        it('returns country config for USA', function () {
            expect((0, index_1.getConfigByISOName)('United States')).toMatchSnapshot();
        });
        it('returns country config for UK', function () {
            expect((0, index_1.getConfigByISOName)('United Kingdom')).toMatchSnapshot();
        });
    });
});
//# sourceMappingURL=index.test.js.map