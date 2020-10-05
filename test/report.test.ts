import { DocResult } from "../src/docBuilder";
import { reportBuilder } from "../src/reportBuilder";

describe('Given a project name', () => {
    it('should output the name in the header', () => {
        const expected = '<h1>My project</h1>'
        const projectName = 'My project'
        const docResult: DocResult[] = [{
            fileName: 'file',
            describes: [
                {
                    name: 'Given I have a describe',
                    its: [],
                    describes: []
                }
            ]
        }]

        const actual = reportBuilder(projectName, docResult)

        expect(actual).toMatch(expected)
    });
});

describe('Given a describe', () => {
    it('should add it to the report', () => {
        // const expected = '<h3>Describe one</h3>'
        const docResult: DocResult[] = [{
            fileName: 'file',
            describes: [
                {
                    name: 'Describe one',
                    its: [{
                        name: 'It one'
                    }],
                    describes: [{
                        name: 'Describe one - two',
                        its: [{
                            name: 'It one - two'
                        }],
                        describes: []
                    }]
                },
                {
                    name: 'Describe two',
                    its: [{
                        name: 'It two'
                    }],
                    describes: []
                }
            ]
        }]

        const actual = reportBuilder('project', docResult)

        expect(actual).toMatch('<h3>Describe one</h3>')
        expect(actual).toMatch('<h4>It one</h4>')
        expect(actual).toMatch('<h3>Describe one - two</h3>')
        expect(actual).toMatch('<h4>It one - two</h4>')
        expect(actual).toMatch('<h3>Describe two</h3>')
        expect(actual).toMatch('<h4>It two</h4>')
    });
});