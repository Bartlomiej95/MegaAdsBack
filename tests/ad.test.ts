import {AdRecord} from "../records/ad.record";
import { AdEntity } from "../types";
import { pool } from "../utils/db";

const defaultObj = {
    name: 'Test Name',
    description: 'blah',
    url: 'https://megal.pl',
    price: 0,
    lat: 9,
    lon: 9,
}

afterAll(async () => {
    await pool.end();
})

test('AdRecord returns data from database for one entry', async () => {
    const ad = await AdRecord.getOne('ABC');

    expect(ad).toBeDefined();
    expect(ad.name).toBe('Testowy Name');
    expect(ad.id).toBe('ABC');
});

test('AdRecord return null from database for unexisting entry', async () => {
    const ad = await AdRecord.getOne('---');

    console.log(ad);

    expect(ad).toBeNull();
})

test('AdRecord.findAll returns array of found entries', async () => {
    const ads = await AdRecord.findAll('');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns empty array when searching for something that does not exists.', async () => {
    const ads = await AdRecord.findAll('-----------------------');

    expect(ads).toEqual([]);

})

test('AdRecord.findAll returns small amount of data', async () => {
    const ads = await AdRecord.findAll('');

    expect((ads[0] as AdEntity).price).toBeUndefined();
    expect((ads[0] as AdEntity).description).toBeUndefined()
});

test('AdRecord.insert returns new UUID.', async () => {
    const ad = new AdRecord(defaultObj);

    await ad.insert();

    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
});

test('AdRecord.insert inerts data to database.', async () => {
    const ad = new AdRecord(defaultObj);
    await ad.insert();

    const foundAd = await AdRecord.getOne(ad.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id)
});

// @TODO Add mock implementation