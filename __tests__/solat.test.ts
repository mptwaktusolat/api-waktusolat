import {createMocks} from 'node-mocks-http';
import solat from '../pages/api/solat';
import solatZone from '../pages/api/solat/[zone]';
import solatZoneDay from '../pages/api/solat/[zone]/[day]';
import {describe, expect, test} from '@jest/globals';

describe('/api/solat', () => {
    test('Return waktu solat for all location', async () => {
        const {req, res} = createMocks({
            method: 'GET',
        });

        await solat(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toHaveLength(58) // number of negeri
        expect(res._getJSONData()).toEqual(expect.arrayContaining([
            expect.objectContaining({
                prayerTime: expect.any(Array<any>),
                status: expect.any(String),
                periodType: expect.stringMatching('month'),
                lang: expect.any(String),
                zone: expect.any(String),
                serverTime: expect.any(String),
                bearing: expect.any(String),
            })
        ]))
    });
});

describe('/api/solat/{zone}', () => {
    test('Return waktu solat for SGR01 for a month', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                zone: 'SGR01'
            }
        });

        await solatZone(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual(expect.objectContaining({
            prayerTime: expect.any(Array<any>),
            status: expect.any(String),
            periodType: expect.stringMatching('month'),
            lang: expect.any(String),
            zone: expect.stringMatching("SGR01"),
            serverTime: expect.any(String),
            bearing: expect.any(String),
        }))
        expect(res._getJSONData().prayerTime).not.toBeNull()
    });

    test('Return waktu solat for undefined zone for a month', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                zone: 'bad123'
            }
        });

        await solatZone(req, res);

        expect(res._getStatusCode()).toBe(404);
    });
});

describe('/api/solat/{zone}/{day}', () => {
    test('Return waktu solat for SGR01 for a day 1', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                zone: 'SGR01',
                day: 1
            }
        });

        await solatZoneDay(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual(expect.objectContaining({
            hijri: expect.any(String),
            date: expect.any(String),
            day: expect.any(String),
            imsak: expect.any(String),
            fajr: expect.any(String),
            syuruk: expect.any(String),
            dhuhr: expect.any(String),
            asr: expect.any(String),
            maghrib: expect.any(String),
            isha: expect.any(String),
        }))
        expect(res._getJSONData().date).toMatch(/01-.*-.*/);
    });

    test('Return waktu solat for undefined zone for a day 1', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                zone: 'bad123',
                day: 1
            }
        });

        await solatZoneDay(req, res);

        expect(res._getStatusCode()).toBe(404);
    });

    test('Return waktu solat for jhr01 for a out-of-range day', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                zone: 'jhr01',
                day: 99
            }
        });

        await solatZoneDay(req, res);

        expect(res._getStatusCode()).toBe(404);
    });

    test('Return waktu solat for undefined zone for a out-of-range day', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                zone: 'bad123',
                day: 99
            }
        });

        await solatZoneDay(req, res);

        expect(res._getStatusCode()).toBe(404);
    });
});