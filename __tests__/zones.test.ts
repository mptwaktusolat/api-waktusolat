import {createMocks} from 'node-mocks-http';
import zones from '../pages/api/zones';
import zonesCode from '../pages/api/zones/[code]';
import zonesFromCoordinates from '../pages/api/zones/gps';
import {describe, expect, test} from '@jest/globals';

describe('/api/zones', () => {
    test('Get all zones', async () => {
        const {req, res} = createMocks({
            method: 'GET',
        });

        await zones(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toHaveLength(59) // number of negeri
        expect(res._getJSONData()).toEqual(expect.arrayContaining([
            expect.objectContaining({
                jakimCode: expect.any(String),
                negeri: expect.any(String),
                daerah: expect.any(String),
            })
        ]))
    });
});

describe('/api/zones/{code}', () => {
    test('Get zones by jakim code', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                code: 'prk04'
            }
        });

        await zonesCode(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual(expect.arrayContaining([
            expect.objectContaining({
                jakimCode: expect.stringMatching("PRK04"),
                negeri: expect.stringMatching("Perak"),
                daerah: expect.any(String),
            })
        ]))
    });

    test('Get zones by jakim code given text only', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                code: 'wly'
            }
        });

        await zonesCode(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual(expect.arrayContaining([
            expect.objectContaining({
                jakimCode: expect.stringMatching("WLY02"), // can also be WLY01
                negeri: expect.stringMatching("Wilayah Persekutuan"),
                daerah: expect.any(String),
            })
        ]))
    });

    test('Get zones by invalid jakim code', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                code: 'kkb10'
            }
        });

        await zonesCode(req, res);

        expect(res._getStatusCode()).toBe(404);
    });
});

describe('/api/zones/gps', () => {
    test('Get zones by GPS coordinates (Petaling, Selangor)', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                lat: '3.0738',
                long: '101.5183'
            }
        });

        await zonesFromCoordinates(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual(expect.objectContaining({
            state: "SGR",
            district: "Petaling",
            zone: "SGR01",
        }));
    });

    test('Get zones by GPS coordinates (Pulau Tioman, Pahang)', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                lat: '2.781101',
                long: '104.160032'
            }
        });

        await zonesFromCoordinates(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData()).toEqual(expect.objectContaining({
            state: "PHG",
            district: "Pulau Tioman",
            zone: "PHG01",
        }));
    });

    test('Get zones by invalid coordinates', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                lat: '1.0738',
                long: '10.5183'
            }
        });

        await zonesFromCoordinates(req, res);

        expect(res._getStatusCode()).toBe(404);
    });
});