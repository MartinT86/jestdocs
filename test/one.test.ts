import { example } from "../src";

describe('Name of the group', () => {
    it('should ', async () => {
        const tester = await example()
        expect(tester[0]).toEqual('Name of the group example')
    });
});