import { getDocs, DocResult } from "../src/docBuilder";

describe('For a single describe and it', () => {
    it('should return the correct names', async () => {
        const expected = {
            fileName: './mockTests/oneDescribe.test.ts',
            describe: {
                name: 'Single describe',
                its: [{
                    name: 'single it'
                }]
            }
        } as DocResult
        const actual = await getDocs("./mockTests/oneDescribe.test.ts")
        expect(actual).toEqual(expected)
    });
});

describe('For a single describe and multiple it', () => {
    it('should return the all the its', async () => {
        const expected = {
            fileName: './mockTests/oneDescribe_twoIt.test.ts',
            describe: {
                name: 'Single describe',
                its: [{
                    name: 'first it'
                },
                {
                    name: 'second it'
                }]
            }
        } as DocResult
        const actual = await getDocs("./mockTests/oneDescribe_twoIt.test.ts")
        expect(actual).toEqual(expected)
    });
});
// TODO return for a nested describe