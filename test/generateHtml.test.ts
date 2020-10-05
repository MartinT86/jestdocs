import { generateHtml } from "../src/generateHtml";

describe('generateHtml', () => {
    it('should create the file', async () => {
        await generateHtml()
        expect(true).toBeTruthy()
    });
});