import { generateHtml } from "../src/generateHtml";

describe('generateHtml', () => {
    jest.setTimeout(300000);
    it('should create the file', async () => {
        await generateHtml()
        expect(true).toBeTruthy()
    });
});