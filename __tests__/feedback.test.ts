import {describe, expect, test} from "@jest/globals";
import {createMocks} from "node-mocks-http";
import feedback from "../pages/api/feedback";

describe('/api/feedback', () => {
    test('Post feedback', async () => {
        const {req, res} = createMocks({
            method: 'POST',
            body: {
                "User email": null,
                "User message": "This is a test from Jest",
                "App version": "99-test",
                "App build number": 99,
                "Prayer API called": "hehehe",
                "position": "102.22, 3.12",
                "Device info": {
                    "model": "Jest",
                },
                "zone": "SGR01",
                "app locale": "ms",
                "device locale": "en"
            }
        });

        await feedback(req, res);

        expect(res._getStatusCode()).toBe(200);
        expect(res._getJSONData().result).toMatch("success");
        // ticketId and document id will be the same string
        expect(res._getJSONData().id).toMatch(new RegExp("MPT-[A-Z0-9]{5}"));
        expect(res._getJSONData().payload.ticketId).toMatch(new RegExp("MPT-[A-Z0-9]{5}"));
    });

    test('Post feedback with no body', async () => {
        const {req, res} = createMocks({
            method: 'POST',
        });

        await feedback(req, res);

        expect(res._getStatusCode()).toBe(400);
    });
});