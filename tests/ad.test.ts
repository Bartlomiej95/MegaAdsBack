import {AdRecord} from "../records/ad.record";
import { AdEntity } from "../types";
import { pool } from "../utils/db";

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

})