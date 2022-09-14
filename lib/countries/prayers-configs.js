"use strict";
// for country code, visit https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes and get the corresponding numeric code for the country
// value for calculation_method must match values defined in calculation-method.yml
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
exports.defaultConfig = {
    code: '',
    prayer_settings: {
        asr_method: 'Standard',
        calculation_method: 'MWL',
    },
    mosque: {
        denomination: 'sunni',
        language_services: 'english',
    },
};
var prayersConfigs = {
    united_states: {
        code: null,
        prayer_settings: {
            calculation_method: 'ISNA',
        },
        mosque: {
            language_services: 'english',
            denomination: 'sunni',
        },
    },
    canada: {
        code: 124,
        prayer_settings: {
            calculation_method: 'ISNA',
        },
    },
    bangladesh: {
        code: 50,
        prayer_settings: {
            asr_method: 'Hanafi',
            calculation_method: 'Karachi',
        },
        mosque: {
            language_services: 'bangla',
            denomination: 'sunni',
        },
    },
    turkiye: {
        //make sure values turkey and turkiye are the same
        code: 792,
        prayer_settings: {
            calculation_method: 'turkey-presidency-of-religious-affairs',
        },
        mosque: {
            language_services: 'Türkçe',
            denomination: 'sunni',
        },
    },
    turkey: 'turkiye',
    united_kingdom: {
        code: 840,
        prayer_settings: {
            calculation_method: 'MWL',
        },
        mosque: {
            language_services: 'english',
            denomination: 'sunni',
        },
    },
    australia: {
        code: 36,
        prayer_settings: {
            asr_method: 'Hanafi',
        },
    },
};
exports.default = prayersConfigs;
//# sourceMappingURL=prayers-configs.js.map