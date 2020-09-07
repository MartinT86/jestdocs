import { getDocs } from "../src";

describe('Name of the group', () => {
    it('should ', async () => {
        // TODO rename function and pass in the file name
        const tester = await getDocs("./test/two.test.ts")
        expect(tester[0]).toEqual('Name of the group example yay2')
    });
});