import { getTestFiles } from "../src/getTestFiles";

describe('getTestFiles', () => {
    it('should get the file names', async () => {
        const files = await getTestFiles()

        expect(files.length > 0).toBeTruthy()
    });
});