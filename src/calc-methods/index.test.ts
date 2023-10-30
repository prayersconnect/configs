import {
  getCalcMethodByName,
  getCalculationMethods,
  getCalculationMethodByCountry,
  getJuristicMethods,
} from './index';

describe('calc-methods', () => {
  describe('getCalcMethodByName', () => {
    it('returns undefined if no method found', () => {
      // @ts-expect-error invalid type
      const method = getCalcMethodByName('foo');
      expect(method).toBeUndefined();
    });

    it('returns method if found', () => {
      const method = getCalcMethodByName('Egyptian');
      expect(method).toMatchSnapshot();
    });
  });

  describe('getCalculationMethods', () => {
    it('returns all methods', () => {
      const methods = getCalculationMethods();
      expect(methods).toMatchSnapshot();
      methods.forEach((method) => {
        expect(method).toHaveProperty('calculationKey');
        expect(method.calculationKey).toMatchSnapshot(
          `values for ${method.calculationKey}`
        );
      });
    });
  });

  describe('getCalcMethodsByCountry', () => {
    it('returns method and asr method for USA', () => {
      const methods = getCalculationMethodByCountry('United States');
      expect(methods).toMatchInlineSnapshot(`
        {
          "asrCalculation": "Standard",
          "calculationMethod": "IslamicSocietyOfNorthAmerica",
        }
      `);
    });
    it('returns method and asr method for Turkey', () => {
      const methods = getCalculationMethodByCountry('Turkey');
      expect(methods).toMatchInlineSnapshot(`
        {
          "asrCalculation": "Standard",
          "calculationMethod": "Turkey",
        }
      `);
    });
    it('returns method and asr method for UK', () => {
      const methods = getCalculationMethodByCountry('United Kingdom');
      expect(methods).toMatchInlineSnapshot(`
        {
          "asrCalculation": "Standard",
          "calculationMethod": "MoonsightingCommittee",
        }
      `);
    });
    it('returns method and asr method for AU', () => {
      const methods = getCalculationMethodByCountry('Australia');
      expect(methods).toMatchInlineSnapshot(`
        {
          "asrCalculation": "Hanafi",
          "calculationMethod": "MuslimWorldLeague",
        }
      `);
    });
    it('returns method and asr method for BD', () => {
      const methods = getCalculationMethodByCountry('Bangladesh');
      expect(methods).toMatchInlineSnapshot(`
        {
          "asrCalculation": "Hanafi",
          "calculationMethod": "Karachi",
        }
      `);
    });
    it('returns method and asr method for Russia', () => {
      const methods = getCalculationMethodByCountry('Russia');

      expect(methods).toMatchInlineSnapshot(`
        {
          "asrCalculation": "Standard",
          "calculationMethod": "Russia",
        }
      `);
    });
    it('returns default config if country not found', () => {
      const methods = getCalculationMethodByCountry('foo');
      expect(methods).toMatchInlineSnapshot(`
        {
          "asrCalculation": "Standard",
          "calculationMethod": "MuslimWorldLeague",
        }
      `);
    });
    it('returns null if country not provided', () => {
      const methods = getCalculationMethodByCountry(null as any);
      expect(methods).toBeNull();
    });
  });

  describe('getJuristicMethods', () => {
    it('returns all asr methods', () => {
      const methods = getJuristicMethods();
      expect(methods).toMatchSnapshot();
    });
  });
});
