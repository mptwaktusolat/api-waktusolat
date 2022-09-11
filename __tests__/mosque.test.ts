import {createMocks} from 'node-mocks-http';
import mosque from '../pages/api/mosque/[zone]';
import {describe, expect, test} from '@jest/globals';

describe('/api/mosque/{zone}', () => {
    test('Get image mosque given zone', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                zone: 'SGR01'
            }
        });

        await mosque(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getHeaders()).toHaveProperty('content-type',  'image/jpg');
    });

    test('Get image mosque given invalid zone', async () => {
        const {req, res} = createMocks({
            method: 'GET',
            query: {
                zone: 'KTY83'
            }
        });

        await mosque(req, res);

        expect(res._getStatusCode()).toBe(404);
    });
});