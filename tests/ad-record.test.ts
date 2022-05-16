import {AdRecord} from "../records/ad.record";

const defaultAdObject = {
    name: 'Test Name',
    description: 'blabal',
    url: 'https://megak.pl',
    price: 0,
    lat: 9,
    lon: 9,
}

test('Can build AdRecord', () => {
    const record = new AdRecord(defaultAdObject);

    expect(record.name).toBe('Test Name');
    expect(record.description).toBe('blabal');
});

test('Validates invalid price', () => {
      expect(() => new AdRecord({
          ...defaultAdObject,
          price: -3,
      })).toThrow('Proszę podać cenę z zakresu 0 - 9 999 999')
})

// @TODO: Check all the validations