import {
  getCalcMethodByName,
  getCalcMethods,
  getCalcMethodsByCountry, getJuristicMethods,
} from './index';

describe('calc-methods', () => {
  describe('getCalcMethodByName', () => {
    it('returns undefined if no method found', () => {
      const method = getCalcMethodByName('foo');
      expect(method).toBeUndefined();
    });

    it('returns method if found', () => {
      const method = getCalcMethodByName('Egypt');
      expect(method).toMatchSnapshot();
    });
  });

  describe('getCalcMethods', () => {
    it('returns all methods', () => {
      const methods = getCalcMethods();
      expect(methods).toMatchSnapshot();
    });
  });

  describe('getCalcMethodsByCountry', () => {
    it('returns method and asr method for USA', () => {
      const methods = getCalcMethodsByCountry('United States');
      expect(methods).toMatchInlineSnapshot(`
        {
          "asrMethod": "Standard",
          "method": "ISNA",
        }
      `);
    });
    it('returns method and asr method for Turkey', () => {
      const methods = getCalcMethodsByCountry('Turkey');
      expect(methods).toMatchInlineSnapshot(`
        {
          "asrMethod": "Standard",
          "method": "turkey-presidency-of-religious-affairs",
        }
      `);
    });
    it('returns method and asr method for UK', () => {
      const methods = getCalcMethodsByCountry('United Kingdom');
      expect(methods).toMatchInlineSnapshot(`
        {
          "asrMethod": "Standard",
          "method": "MWL",
        }
      `);
    });
    it('returns method and asr method for AU', () => {
      const methods = getCalcMethodsByCountry('Australia');
      expect(methods).toMatchInlineSnapshot(`
        {
          "asrMethod": "Hanafi",
          "method": "MWL",
        }
      `);
    });
    it('returns method and asr method for BD', () => {
      const methods = getCalcMethodsByCountry('Bangladesh');
      expect(methods).toMatchInlineSnapshot(`
        {
          "asrMethod": "Hanafi",
          "method": "Karachi",
        }
      `);
    });
    it('returns default config if country not found', () => {
      const methods = getCalcMethodsByCountry('foo');
      expect(methods).toMatchInlineSnapshot(`
        {
          "asrMethod": "Standard",
          "method": "MWL",
        }
      `);
    });
    it('returns null if country not provided', () => {
      const methods = getCalcMethodsByCountry(null as any);
      expect(methods).toBeNull();
    });
  });

  describe('getJuristicMethods', () => {
    it('returns all asr methods', () => {
      const methods = getJuristicMethods();
      expect(methods).toMatchSnapshot();
    });
  })
});
