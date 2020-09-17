import { getDocs, DocResult } from "../src/docBuilder";

describe('For a single describe and it', () => {
    it('should return the correct names', async () => {
        const expected = {
            fileName: './mockTests/oneDescribe.test.ts',
            describes: [{
                name: 'Single describe',
                describes: [],
                its: [{
                    name: 'single it'
                }]
            }]
        } as DocResult
        const actual = await getDocs("./mockTests/oneDescribe.test.ts")
        expect(actual).toEqual(expected)
    });
});

describe('For a single describe and multiple it', () => {
    it('should return the all the its', async () => {
        const expected = {
            fileName: './mockTests/oneDescribe_twoIt.test.ts',
            describes: [{
                name: 'Single describe',
                describes: [],
                its: [{
                    name: 'first it'
                },
                {
                    name: 'second it'
                }]
            }]
        } as DocResult
        const actual = await getDocs("./mockTests/oneDescribe_twoIt.test.ts")
        expect(actual).toEqual(expected)
    });
});

describe('For a multiple describe and multiple it', () => {
    it('should return the all the describes and its', async () => {
        const expected = {
            fileName: './mockTests/twoDescribe_oneIts.test.ts',
            describes: [{
                name: 'This is the first desc',
                describes: [],
                its: [{
                    name: 'the it for the first'
                }]
            },
            {
                name: 'This is the second desc',
                describes: [],
                its: [{
                    name: 'the it for the second'
                }]
            }]
        } as DocResult
        const actual = await getDocs("./mockTests/twoDescribe_oneIts.test.ts")
        expect(actual).toEqual(expected)
    });
});

describe('For nested describes', () => {
    it('should show the nested describes and it', async () => {
        const expected = {
            fileName: './mockTests/nestedDescribe.test.ts',
            describes: [{
                name: 'This is the outer describe',
                describes: [{
                    name: 'This is the inner describe',
                    describes: [],
                    its: [{
                        name: 'and this is the it'
                    }]
                }],
                its: []
            }]
        } as DocResult
        const actual = await getDocs("./mockTests/nestedDescribe.test.ts")
        expect(actual).toEqual(expected)
    });
});

describe('When tests use other functions', () => {
    it('should not include the functions', async () => {
        const expected = {
            fileName: './mockTests/extraFunction.test.ts',
            describes: [{
                name: 'This is a describe',
                describes: [],
                its: [{
                    name: 'This is an it'
                }]
            }]
        } as DocResult
        const actual = await getDocs("./mockTests/extraFunction.test.ts")
        expect(actual).toEqual(expected)
    });
});