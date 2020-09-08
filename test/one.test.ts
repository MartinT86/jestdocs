import { getDocs, DocResult } from "../src/docBuilder";

describe('For a single describe and it', () => {
    it('should return the correct names', async () => {
        const expected = {
            fileName: './mockTests/oneDescribe.test.ts',
            describe: {
                name: 'Single describe',
                it: {
                    name: 'single it'
                }
            }
        } as DocResult
        const actual = await getDocs("./mockTests/oneDescribe.test.ts")
        expect(actual).toEqual(expected)
    });
});

// TODO return for a nested describe