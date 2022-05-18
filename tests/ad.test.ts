import {AdRecord} from "../records/ad.record";

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